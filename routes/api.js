var repository=require('./repository');
var overview = require('./overview');

var padHour = function(index) {
	if(index==0){
		return "00";
	}
	else if(index<10){
		return "0" + index;
	}
	return index + "";
};

// Also duplicated in the web.js route... this could be somehow refactored?
exports.stats = function(req, res) {
	var write_back = function (totals) {
		res.json({
				totalEnergy : Number(totals.totalEnergy).toFixed(2),
				totalEnergyWeek: Number(totals.totalEnergyWeek).toFixed(2),
				totalEnergyHour: Number(totals.totalEnergyHour).toFixed(2)
			});
	};
	repository.get_stats(write_back);
};


exports.overview = function(req, res) {
	var write_back = function(dayOffset, results) { 
		var total=0;
		results.forEach(function(r){
			total += Number(r.total);
		});

		var hours = [];

		for(var i = 0; i < 24; i++){
			hours[i]= { total: 0, hour: padHour(i) };
		}
		results.forEach(function(row){
			var index =Number(row.hour);
			hours[index].total = Number(row.total).toFixed(2);
		});

		res.json({
				total : total,
				usage_results: hours.sort(overview.hour_comparator).reverse(),
				highest_hour: overview.get_highest_value(hours),
				offset_desc: overview.describe_offset(dayOffset),
				offset: dayOffset
			});
		};

		var dayOffset=0;
		if(req.params && req.params.days) {
			dayOffset = req.params.days;
		}
		repository.get_data(dayOffset, write_back);
};