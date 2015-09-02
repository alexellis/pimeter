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

	db.serialize(function() {
		db.all(query, function(err,rows) {
			if(err){
				console.log(err);
			}
			var hours = [];
			var padHour = function(index){
				if(index==0){
					return "0";
				}
				else if(index<10){
					return "0"+index;
				}
				return index+"";
			}
			for(var i=0;i<24;i++){
				hours[i]={total:0,hour: padHour(i) };
			}

			rows.forEach(function(row){
				hours[Number(row.hour)].total = row.total;
			});
			write_back(offset, hours);
		});
	});
};

var get_total =function(timeClause,back)
{
	var query=";";
	if(!timeClause) {
		query="select sum(kw_h) as total from energy"+ query;
	}else {
		query="select sum(kw_h) as total from energy "+timeClause+ query;
	}
		db.serialize(function() {
			db.all(query, function(err,rows) {
				if(err){
					console.log(err);
				}
				back(rows[0].total);
			});
		});
};

var get_stats=function(write_back){
	var totals={
		totalEnergy : 0,
		totalEnergyWeek : 0,
		totalEnergyHour: 0
	};

	var third = function(value3) {
		totals.totalEnergyHour=value3?value3:0;
		write_back(totals);
	};
	var second = function(value2) {
		totals.totalEnergyWeek=value2?value2:0;
		get_total("where energy_date=date('now') and energy_time between time('now','-60 minutes') and time('now')", third);
	};
	var first =function(value) {
		totals.totalEnergy=value?value:0;
		get_total("where energy_date between datetime('now','-7 days') and datetime('now')", second);
	};
	get_total(undefined, first);
};

exports.get_data=get_data;
exports.get_stats=get_stats;

