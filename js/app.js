var app = angular.module('chartCurrency', ['chart.js']);
app.controller("chartController", function ($scope, $http, $interval) {
  $scope.labels = [];
  $scope.data = [];
  $scope.noDataFound = true;
  //to fecth data from API
  var fetchCurrency = function () {
    $http.get('https://api.coinmarketcap.com/v1/ticker/?limit=10')
    .success(function (data) {
      if (data.length === 0) {
        $scope.noDataFound = true;
        return
      }
      $scope.noDataFound = false;
      $scope.cryptoCurrency = data;
      data.forEach(function (value) {
        $scope.labels.push(value.name);
        $scope.data.push(value.price_usd);
      })
    })
    .error(function (err) {
      console.log("Erro While Fetching", err);
    });
  };
  // intial call
  fetchCurrency();
  // interval call of five minutes
  $interval(fetchCurrency, 5*60*1000);
});
