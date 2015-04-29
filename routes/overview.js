
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
	if(offset == 0) {
		return 'today';
	}
	else if(offset == 1) {
		return "yesterday";
	}
	return offset + " days ago";
};

var get_highest_value = function(results) {
	var highest = undefined;
	results.forEach(function(r) {
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

exports.get_highest_value=get_highest_value;
exports.describe_offset=describe_offset;
exports.hour_comparator=comparator;