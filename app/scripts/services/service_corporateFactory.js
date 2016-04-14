'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource,baseURL) {
    
            var corpfac = {};
    
            corpfac.getLeaders = function() {
                return $resource(baseURL + "leadership/:id", null, {'update':{method:'PUT'}});
            };
            
            return corpfac;
    
        }]);