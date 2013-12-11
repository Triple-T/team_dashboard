app.controller("DatarowShowCtrl", ["$scope", "$rootScope", "$routeParams", "$location", "$q", "$dialog", "$window", "Datarow", "Point", function($scope, $rootScope, $routeParams, $location, $q, $dialog, $window, Datarow, Point) {

  var resources = [
    Datarow.get({ id: $routeParams.id }),
    Point.query({ datarow_id: $routeParams.id })
  ];

  function handleResults(results) {
    $scope.datarow = results[0];
    $scope.points = results[1];
    $rootScope.resolved = true;
  }

  $rootScope.resolved = false;
  $q.all(resources).then(handleResults);

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
