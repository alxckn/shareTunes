/**
 * Created by mathieu on 10/02/16.
 */
(function() {
    'use strict';

    angular
        .module('sharetunesApp')
        .controller('HomeController',HomeController);


    function HomeController($scope,$mdSidenav){
        var self = this;

        self.toggleList = toggleUsersList;


        $scope.firstname = "Mathieu";
        $scope.lastname = "Chabas";

        /**
         * Hide or Show the 'left' sideNav area
         */
        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }
    }
})();