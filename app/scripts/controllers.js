'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading...";
            
            $scope.dishes = menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });
            
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };
            
            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
            
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
            
            
        }])


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
            
        }])
        
        .controller('DishCommentController', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.newcomment = { 
                rating:5,
                comment:"",
                author:"",
                date:""
            };
            
            var ratings = [ {value:1, label:"1"},
                           {value:2, label:"2"},
                           {value:3, label:"3"},
                           {value:4, label:"4"},
                           {value:5, label:"5"}
                          ];
            $scope.ratings = ratings;
            
            $scope.submitComment = function() {
                    
                    $scope.newcomment.date = new Date().toISOString();
                    console.log($scope.newcomment);
                //{
                    //   rating: parseInt(newcomment.rating),
                    //    comment: newcomment.comment,
                    //    author: newcomment.author,
                    //    date: Date.now().toISOString();
                    //}
                
                    $scope.dish.comments.push($scope.newcomment);
                
                    menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                   
                    $scope.commentsForm.$setPristine();
                    $scope.newcomment = {rating:5, comment:"", author:"", date:""};
                    
            };
            
        }])


        .controller('ContactController', ['$scope', function($scope) {
            
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:""};
            
            var channels = [{value:"tel", label:"Tel."}, 
                            {value:"Email", label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
            
            
            
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log("Incorrect");
                    } 
                else {
                    $scope.invalidChannelSelection = false;
                    
                    //var myid = feedbackFactory.getComments().query().length();
                    
                    feedbackFactory.getComments().create($scope.feedback);
                    
                    
                    
                    $scope.feedback = {
                        mychannel:"", 
                        firstName:"", 
                        lastName:"",
                        agree:false,
                        email:"" 
                        };
                    
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();
                    
                    console.log($scope.feedback);
                    }
                };
                
            }])

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
        }])

;