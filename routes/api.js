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

		res.render('overview', 
				{title: "Energy usage",
				usage_results : results.sort().reverse(),
				total: total,
				highest_hour: highest
			});
		};

	get_data(write_back);
};
