app.controller("DatarowIndexCtrl", ["$scope", "$rootScope", "$location", "Datarow", function($scope, $rootScope, $location, Datarow) {

  $rootScope.resolved = false;

  $scope.datarows = Datarow.query(function() {
    $rootScope.resolved = true;
  });

  $scope.createDatarow = function() {
    var datarow = new Datarow({ title: "Undefined name" });
    datarow.$create(function(data) {
      $location.url("/datarows/" + data.id);
    });
  };

}]);