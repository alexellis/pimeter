var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('energy.db');

var get_data = function(offset, write_back) {
	var modifier='';
	if(offset>0) {
		modifier = ',\'-'+offset+' days\'';
	}
	var query="select sum(kw_h) as total, strftime('%H', energy_time) as hour from energy "+
	"where energy_date = date('now'"+modifier+") "+
	"group by strftime('%H', energy_time);";
	// console.log(query);
	db.serialize(function() {
		db.all(query, function(err,rows) {
			if(err){
				console.log(err);
			}
			// console.log(rows);
			write_back(offset, rows);
		});
	});
};

	var describe_offset = function(offset) {
		if(offset==0){
			return 'today';
		}
		else if(offset==1) {
			return "yesterday";
		}
		return offset + " days ago";
	};

	var comparator = function(a, b) {
		if(a.hour > b.hour){
			return 1;
		}
		if(a.hour < b.hour){
			return -1;
		}
		return 0;
	};

var get_highest_value =function(results){
		var highest = undefined;
		results.forEach(function(r){
			if(!highest) {
				highest = r;
			} else {
				if(r.total > highest.total) {
					highest = r;
				}
			}
		});
		return highest;
};
exports.overview = function(req,res) {
	var write_back = function(dayOffset, results){ 
		var total=0;
		results.forEach(function(r){
			total += Number(r.total);
		});

		res.render('overview', 
				{title: "Energy usage",
				usage_results : results.sort(comparator).reverse(),
				total: total,
				highest_hour: get_highest_value(results),
				offset_desc: describe_offset(dayOffset),
				offset:dayOffset
			});
		};
		var dayOffset=0;
		if(req.params&&req.params.days) {
			dayOffset=req.params.days;
		}
		get_data(dayOffset, write_back);
};

exports.graph = function(req,res) {
	var write_back = function(dayOffset, results){ 
		var total=0;
		results.forEach(function(r){
			total += Number(r.total);
		});

		res.render('graph', 
				{title: "Energy usage",
				usage_results : results.sort(comparator),
				total: total,
				highest_hour: get_highest_value(results),
				offset_desc: describe_offset(dayOffset),
				offset:dayOffset
			});
		};
		var dayOffset=0;
		if(req.params&&req.params.days) {
			dayOffset=req.params.days;
		}
		get_data(dayOffset, write_back);
};

