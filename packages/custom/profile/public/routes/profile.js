'use strict';

angular.module('mean.profile').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('edit profile', {
      url: '/profile/edit',
      templateUrl: 'profile/views/index.html'
    });
  }
]);
