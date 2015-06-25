/*globals angular, document, JST, window, _ */
angular.module('app')
  .controller('homeCtl', function ($scope, $http, $interval) {
    'use strict';

    var http_get = function (url) {
      return $http.get(url);
    };

    var get_more = function () {
      http_get('/give_me_more').then(function (response) {
        var source = Rx.Observable.from(response.data);
        var subscription = source.subscribe(
          function (x) {
            $scope.model.push(x);
          },
          function (err) {
            console.log('Error: ' + err);
          },
          function () {
            console.log('Completed');
          }
        );
      });
    };

    var next = function () {
      function stillHaveData() {
        return $scope.model.length >= $scope.index;
      }
      function needMoreData() {
        return ($scope.model.length - 3) < $scope.index;
      }
      console.log('loading next value');
      if (stillHaveData()) {
        console.log('next from model');
        $scope.current_value = $scope.model[$scope.index++];
      }
      if (needMoreData()) {
        console.log('requeting more...');
        get_more();
      }
    };

    $scope.init = function () {
      $scope.model = [];
      $scope.index = 0;
      $interval(next, 1000);
    };
  });

