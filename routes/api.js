var repository=require('./repository');

var comparator = function(a, b) {
	if(a.hour > b.hour){
		return 1;
	}
	if(a.hour < b.hour){
		return -1;
	}
	return 0;
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


exports.stats = function(req,res) {
	var write_back=function (totals) {
		res.render('stats',  
			{
				title: "Energy usage",
				totalEnergy : totals.totalEnergy,
				totalEnergyWeek: totals.totalEnergyWeek,
				totalEnergyHour: totals.totalEnergyHour
			}
		);
	};
	repository.get_stats(write_back);
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
		repository.get_data(dayOffset, write_back);
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
		repository.get_data(dayOffset, write_back);
};
