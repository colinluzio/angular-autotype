/*
 * autotype
 * Autotype directive for AngularJS
 * By Colin Luzio
 */

/*! Copyright (c) 2015 Colin Luzio | Licensed under the MIT license */

'use strict';

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // CommonJS
    module.exports = factory(require('angular'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(['angular'], factory);
  } else {
    // Global Variables
    factory(root.angular);
  }
}(window, function (angular) {

angular.module('auto-type',[]).directive('autoType',['$templateCache',function($templateCache){
        
    var TEMPLATE_URL = '/typeahead/index.html';
        
    // Set the default template for this directive
    $templateCache.put(TEMPLATE_URL,
    '<style>.form-group ul{display:block} a[ng-click]{ cursor: pointer}</style>'+
    '<div class="form-group">'+
    '<label for="usr">Name:</label>'+
    '<input placeholder= "{{placeholder}}" type="text" class="form-control"  ng-model="newData" ng-keyUp="onKeyDown($event)">'+
    '<ul class ="dropdown-menu" ng-show="showDropdown">'+
    '<li ng-repeat="item in allData | limitTo:limit" ng-mouseover="showCurrent($index)"><a ng-class="{current: isCurrent($index)}" ng-click="selectItem($index)">{{item.name}}</a></li>'+
    '</ul>'+
    '</div>'
    );
        return {
            restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
            scope: {
                //@ reads the attribute value, = provides two-way binding, & works with functions
                searchfield: '@',
                name:        '@',
                placeholder: '@',
                limit:       '@',
                data:        '='
                },
                templateUrl: function(element, attrs) {
                return attrs.templateUrl || TEMPLATE_URL;
            },
       
            link: function ($scope, element, attrs) { 
 
                if(attrs.ngClick || attrs.href === '' || attrs.href === '#'){
                    elem.on('click', function(e){
                    e.preventDefault();
                    });
                }           
              
                $scope.showDropdown = false;
                $scope.currentIndex = 0;
                $scope.allData = [];
            
                $scope.$watch('allData', function (newVal,oldVal){
                    if($scope.allData.length>0){
                        $scope.showDropdown = true;
                    }else{
                        $scope.showDropdown = false;
                    }
                });
            
                $scope.isCurrent = function(index){
                    if($scope.currentIndex==index){
                        return true;
                    } else {
                    return false;
                    }
                }
        
                $scope.showCurrent = function(index){
                    $scope.currentIndex = index;
                }
            
                // Handle all keydown events
                $scope.onKeyDown = function(e){
            
                    if(e.which==8 || (e.which>64 && e.which<91)){
                        var results = showAll($scope.newData,$scope.data);
                        $scope.allData = results;
                    }else if(e.which==40){
                        if($scope.allData.length>0 && $scope.currentIndex < $scope.allData.length-1 ){
                        $scope.currentIndex +=1;    
                        }
                    }else if(e.which==38){
                        e.preventDefault();
                        if($scope.allData.length>0 && $scope.currentIndex>0 ){
                    
                        $scope.currentIndex -=1;
                        }                   
                    }
                };
                $scope.selectItem = function(index){
                    //send selected object back to parent scope
                    $scope.$parent.autoCompleteData = $scope.allData[index];
                }
                function showAll(target,data){

                    var variableName = $scope.name;
                    if(!Array.isArray(data)){
                        return null;
                    }
                    var returnResults = [];
                    
                    for(var x=0;x<data.length;x++){
                        if(typeof data[x]==='object'){
                            var returnData = data[x][variableName].toLowerCase();
                            if(returnData.indexOf(target)>-1){
                                returnResults.push(data[x]);
                            }
                        } else if( typeof data[x]==='string'){
                            var returnData = data[x].toLowerCase();
                            if(returnData.indexOf(target)>-1){
                                var Obj = {};
                                Obj.name = data[x];
                                returnResults.push(Obj);
                            }
                        }
                    } 
                    return returnResults;
                }
        
            }
        }
    }]);
        
}));
    