var repository=require('./repository');
var overview = require('./overview');

exports.stats = function(req,res) {
	var write_back = function (totals) {
		res.render('stats', {
			title: "stats",
			totalEnergy : totals.totalEnergy,
			totalEnergyWeek: totals.totalEnergyWeek,
			totalEnergyHour: totals.totalEnergyHour
		});
	};
	repository.get_stats(write_back);
};

exports.overview = function(req,res) {
	var write_back = function(dayOffset, results) {
		var total = 0;
		results.forEach(function(r) {
			total += Number(r.total);
		});

		res.render('overview', {
					title : "overview",
					offset : dayOffset
			});
	};

	var dayOffset = 0;
	if(req.params && req.params.days) {
		dayOffset = req.params.days;
	}
	repository.get_data(dayOffset, write_back);
};

exports.graph = function(req, res) {
	var write_back = function(dayOffset, results) {
		var total=0;
		results.forEach(function(r) {
			total += Number(r.total);
		});

		res.render('graph', {
			title : "graph",
			usage_results : results.sort(overview.hour_comparator),
			total : total,
			highest_hour : overview.get_highest_value(results),
			offset_desc : overview.describe_offset(dayOffset),
			offset : dayOffset
		});
	};
	var dayOffset = 0;
	if(req.params && req.params.days) {
		dayOffset = req.params.days;
	}
	repository.get_data(dayOffset, write_back);
};
