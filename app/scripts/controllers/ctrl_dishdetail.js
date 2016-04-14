'use strict';

angular.module('confusionApp')

.controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {
            
            //$scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading...";
                
            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }]);