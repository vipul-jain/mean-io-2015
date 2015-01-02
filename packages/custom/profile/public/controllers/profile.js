'use strict';

/* jshint -W098 */
angular.module('mean.profile').controller('ProfileController', ['$rootScope', '$scope', '$location', 'Global', 'Profile',
    function ($rootScope, $scope, $location, Global, Profile) {
        $scope.global = Global;
        $scope.errorCode = null;

        $scope.findOne = function() {
            Profile.get({
                userId: $scope.global.user._id
            }, function(profile) {
                $scope.global = profile;
            },function(error){
                $scope.errorCode = error.status;
            });
        };

        if(angular.equals({}, $scope.global.user))
        {
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user,
                gender : 'Male'
            };
        }

        $rootScope.$on('loggedin', function () {
            $scope.global = {
                authenticated: !!$rootScope.user,
                user: $rootScope.user,
                gender : 'Male'
            };
        });

        $scope.editProfile = function(isValid) {
            if (isValid) {
                var profile = new Profile({
                    name: this.global.user.name,
                    gender: this.global.gender,
                    dob: this.global.dob,
                    address: this.global.address,
                    city: this.global.city,
                    state: this.global.state,
                    postal: this.global.postal,
                    country: this.global.country
                });
                if($scope.errorCode)
                {
                    profile.$save(function(response) {
                        $scope.msg = 'Profile Updated';
                    },function(error){
                        $scope.msg = 'Profile Not Updated';
                    });
                }
                else{
                    profile.$update({
                        userId: $scope.global.user._id
                    },function(response){
                        $scope.msg = 'Profile Updated';
                    },function(error){
                        $scope.msg = 'Profile Not Updated';
                    });
                }
            } else {
                $scope.submitted = true;
            }
        };

        //date picker control
        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };
    }
]);