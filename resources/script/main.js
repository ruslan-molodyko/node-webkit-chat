/**
 * Created by rmolodyko on 25.01.2016.
 */

// Create angular app
var app = angular.module('app', [
    'ngRoute',
    'appControllers'
]);

// Set routes
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/ms/:user?', {
                templateUrl: 'views/message.html',
                controller: 'MessageCtrl'
            }).
            otherwise({
                redirectTo: '/ms/:user?'
            });
    }]);

// Create controller module
var appControllers = angular.module('appControllers', []);

// Main handle controller
appControllers.controller('MessageCtrl', [
    '$scope',
    '$routeParams',
    MessageCtrl.getInstance
]);
