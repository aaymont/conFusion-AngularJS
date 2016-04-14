'use strict';

angular.module('confusionApp')

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
                
            }]);