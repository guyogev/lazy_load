/*globals angular, document, JST, window, _ */
angular.module('app')
  .controller('homeCtl', function ($scope, $http) {
    'use strict';

    var http_get = function (url) {
      return $http.get(url);
    };

    var buffer = [0];

    var get_more = function () {
      http_get('/give_me_more').then(function (response) {
        buffer = response.data;
      });
    };

    $scope.next = function () {
      console.log(buffer);
      $scope.current_value = buffer.shift();
      if (buffer.length === 0) {
        get_more();
      }
    };

    $scope.init = function () {
      $scope.next();
    };
  });

