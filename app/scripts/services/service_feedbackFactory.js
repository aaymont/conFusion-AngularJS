'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://localhost:3000/")

.service('feedbackFactory', ['$resource', 'baseURL', function($resource,baseURL){
            
            this.getComments = function() {
                return $resource(baseURL + "feedback/:id", null, {'create':{method:"POST"}});    
            };
        
    }]);