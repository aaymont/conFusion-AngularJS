'use strict';

angular.module('confusionApp')

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
            
        }]);