app.factory("Datarow", ["$resource", function($resource) {
  return $resource("/api/datarows/:id", { id: "@id" },
  {
    'create':  { method: 'POST' },
    'index':   { method: 'GET', isArray: true },
    'show':    { method: 'GET', isArray: false },
    'update':  { method: 'PUT' },
    'destroy': { method: 'DELETE' }
  });
}]);