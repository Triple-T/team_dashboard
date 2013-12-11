app.controller("DatarowShowCtrl", ["$scope", "$rootScope", "$routeParams", "$location", "$q", "$dialog", "$window", "Datarow", "Point", function($scope, $rootScope, $routeParams, $location, $q, $dialog, $window, Datarow, Point) {

  $scope.today = new Date();
  
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
  
  function destroyPoint(point) {
  	point.$destroy(function() {
  	  $scope.points.splice($scope.points.indexOf(point), 1);
  	});
  }

  $scope.deleteDatarow = function() {
    var text = "Want to delete Datarow?";
    $window.bootbox.animate(true);
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
  
  $scope.addPoint = function() {
  	var point = new Point({ x: new Date(), y: 0, datarow_id: $scope.datarow.id});
  	point.$create(function(data) {
      $scope.points.push(point);
    });
  }
  
  $scope.deletePoint = function(point) {
  	var text = "Want to delete Point?";
    $window.bootbox.animate(true);
    $window.bootbox.confirm(text, "Cancel", "Delete", function(result) {
      if (result) destroyPoint(point);
    });
  }
  
}]);
