'use strict';

angular.module('confusionApp')

       .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {
            
            $scope.showLeaders = false;
            $scope.message = "Loading...";
            
            $scope.corpLeaders = corporateFactory.getLeaders().query(
            
                        function(response){
                            $scope.corpLeaders = response;
                            $scope.showLeaders = true;

                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
        }]);