app.factory("Point", ["$resource", function($resource) {
  return $resource("/api/datarows/:datarow_id/points/:id", { id: "@id", datarow_id: "@datarow_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);