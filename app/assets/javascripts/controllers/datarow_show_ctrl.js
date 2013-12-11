app.controller("DatarowShowCtrl", ["$scope", "$rootScope", "$routeParams", "$location", "$q", "$dialog", "$window", "Datarow", "Point", function($scope, $rootScope, $routeParams, $location, $q, $dialog, $window, Datarow, Point) {

  $scope.datarow = Datarow.get({ id: $routeParams.id }, function() {
    var points = Point.query({ datarow_id: $routeParams.id }, function() {
      $scope.points = points.map(function(val) {
      	val.x = new Date(val.x);
  		return val;
  	  });
  	  $rootScope.resolved = true;
    });
  });
  
  function saveDatarowChanges() {
    $scope.datarow.$update();
  }

  function destroyDatarow() {
    $scope.datarow.$destroy(function() {
      $location.url("/datarows");
    });
  }

  $scope.deleteDatarow = function() {
    var text = "Want to delete Datarow?";
    $window.bootbox.animate(false);
    $window.bootbox.confirm(text, "Cancel", "Delete", function(result) {
      if (result) destroyDatarow();
    });
  };

  $scope.save = function() {
    saveDatarowChanges();
  };
  
  $scope.updatePoint = function(point) {
    point.$update();
  };
  
}]);
