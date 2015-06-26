/*globals angular, document, JST, window, _ */
angular.module('app')
  .controller('homeCtl', function ($scope, $http, $interval) {
    'use strict';

    var http_get = function (url) {
      return $http.get(url);
    };

    var get_more = function () {
      http_get('/give_me_more').then(function (response) {
        if (response.data) {
          console.log(response.data);
          response.data.forEach(function (item) {
            $scope.model.push(item);
          });
        } else {
          console.log('no data recived');
        }
      });
    };

    var next = function () {
      function stillHaveData() {
        return $scope.model.length >= $scope.index;
      }
      function needMoreData() {
        return ($scope.model.length - 3) < $scope.index;
      }
      if (stillHaveData()) {
        console.log('process next from model');
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

