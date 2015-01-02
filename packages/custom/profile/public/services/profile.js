'use strict';

angular.module('mean.profile').factory('Profile', ['$resource',
  function($resource) {
      return $resource('profile/:profileId:userId',
      {
          profileId: '@_id',
          userId : '@_uid'
      },
      {
          update: {
              method: 'PUT'
          }
      });
  }
]);
