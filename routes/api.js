var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('energy.db');

var get_data = function(write_back) {
	var query="select sum(kw_h) as total, strftime('%H', energy_time) as hour from energy where energy_date between date('2015-04-15') and date('now') group by strftime('%H', energy_time);";
	db.serialize(function() {
		db.all(query, function(err,rows) {
			write_back(rows);
		});
	});
};

exports.overview = function(req,res) {
	var write_back=function(results){ 
		
//		console.log(results);
		var total=0;
		results.forEach(function(r){
			total += Number(r.total);
		});
		var highest=undefined;
		results.forEach(function(r){
			if(!highest) {
				highest=r;
			}else {
				if(r.total>highest.total) {
					highest=r;
				}
			}
		});

		var comparator= function(a, b) {
			// var x=a;
			// var y=b;
			// if(a[0]==' '){
			// 	x=a.substring(1);
			// }
			// if(b[0]==' '){
			// 	y=b.substring(1);
			// }
			// var nx=Number(x);
			// var ny=Number(y);
			// if(nx>ny){
			// 	return 1;
			// }else if(nx<ny){
			// 	return -1;
			// }
			// return 0;
			console.log(a);
			if(a.hour > b.hour){
				return 1;
			}
			if(a.hour < b.hour){
				return -1;
			}
			return 0;
		};
		res.render('overview', 
				{title: "Energy usage",
				usage_results : results.sort(comparator).reverse(),
				total: total,
				highest_hour: highest
			});
		};
	get_data(write_back);
};
