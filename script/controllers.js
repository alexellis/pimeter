var app = angular.module('pimeter', []);

app.controller('OverviewController', ['$scope', '$http', function($scope, $http) {
	var statsController = this;
	$http.get("/api/day/" + dayOffset).then(function(response) {

    var highest;
		response.data.usage_results.forEach(function(f) {
      if(!highest || f.total > highest.total) {
        highest = f;
      }
    });
    $scope.highest = highest;
    $scope.overview = response.data;

	}).catch(function() {
		$scope.error = "Unable to reach day API";
	})
}]);

app.controller('GraphController', ["$scope", "$http", function($scope, $http) {
	$http.get("/api/day/"+dayOffset)
	.then(function(response) {

			var results = response.data.usage_results.sort(function(x,y) {
				var a = parseInt(x.hour);
				var b = parseInt(y.hour);
				if(a>b) {
					return 1;
				}else if(a<b) {
					return -1;
				}
				return 0;
			});

			var dataSet = [];
			function add_data(set, v) {
				set.push(v);
			}
			results.forEach(function(result){
					dataSet.push(result.total);
			});

			var hourLabels = buildPaddedList(24);
			var data = {
					labels: hourLabels,
					datasets: [
							{
									label: "Today's usage",
									fillColor: "rgba(92, 173, 92,0.4)",
									strokeColor: "rgba(220,220,220,1)",
									pointColor: "rgba(220,220,220,1)",
									pointStrokeColor: "#fff",
									pointHighlightFill: "#fff",
									pointHighlightStroke: "rgba(220,220,220,1)",
									data: dataSet
							},
					]
			};
			var ctx = $("#myChart").get(0).getContext("2d");
			var chart = new Chart(ctx).Line(data, graphOptions);
	})
	.catch(function(err) {

	});
}]);
