'use strict';

angular.module('confusionApp')

.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function($scope, menuFactory, corporateFactory) {
            
            $scope.showDish = false;
            $scope.showPromo = false;
            $scope.showLeader = false;
            $scope.message = "Loading...";
            
            $scope.featuredItem = menuFactory.getDishes().get({id:0})
            .$promise.then(
                        function(response){
                            $scope.featuredItem = response;
                            $scope.showDish = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
  
            $scope.promoItem = menuFactory.getPromotion().get({id:0})
            .$promise.then(
                        function(response){
                            $scope.promoItem = response;
                            $scope.showPromo = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
            
            $scope.chefItem = corporateFactory.getLeaders().get({id:0})
            .$promise.then(
                        function(response){
                            $scope.chefItem = response;
                            $scope.showLeader = true;
                        },
                        function(response) {
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
                    );
           
        }])