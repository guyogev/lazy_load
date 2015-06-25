/*globals angular, document, JST, window, _ */
angular.module('app')
  .controller('homeCtl', function ($scope, $http, $interval) {
    'use strict';

    var http_get = function (url) {
      return $http.get(url);
    };

    var source;

    var get_more = function () {
      http_get('/give_me_more').then(function (response) {
        source = Rx.Observable.from(response.data);
      });
    };

    $scope.init = function () {
      get_more();
      $scope.next();
      var subscription = source.subscribe(
        function (x) { console.log('onNext: %s', x); },
        function (e) { console.log('onError: %s', e); },
        function () { console.log('onCompleted'); }
      );

      $interval(function () {
        $scope.current_value = source.next();
      }, 1000);
    };
  });

