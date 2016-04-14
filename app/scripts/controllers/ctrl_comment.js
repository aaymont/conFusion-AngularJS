'use strict';

angular.module('confusionApp')   

.controller('ContactController', ['$scope', function($scope) {
            
            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:""};
            
            var channels = [{value:"tel", label:"Tel."}, 
                            {value:"Email", label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
            
            
            
        }]);