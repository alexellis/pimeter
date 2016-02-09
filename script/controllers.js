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
