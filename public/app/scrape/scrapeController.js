
var app = angular.module('scrapeApp', ['ngRoute']);

app.service('scrapeService', ['$q', '$http', 
	function($q, $http) {
		var getContent = function(targetUrl) {
			var deferred = $q.defer();				
			$http({
				method: 'GET',
				url: '/api/scrape',
				params : {url : targetUrl} 
			}).success(function(data, status){
				deferred.resolve(data);
			}).error(function(data, status){
				deferred.reject(data);
			});
			 return deferred.promise;
		}
		return {
			getContent : getContent
		}
	}]);

app.controller('scrapeController', ['$scope', 'scrapeService',
	function($scope, scrapeService) {

		$scope.targetUrl= '';	
		$scope.submitClicked = false;

		$scope.scrapeUrl = function(url) {		
			$scope.output = '';
			$scope.outputReady = false;
			$scope.submitClicked = true;

			scrapeService.getContent(url)
							.then(function(response) {
								$scope.output = parseHTML(response);
								$scope.outputReady = true;
								$scope.submitClicked = false;
							},
							function(error) {
								$scope.output = error;
								$scope.outputReady = true;
							});

		}

		$scope.clearInput = function() {
			$scope.targetUrl= '';
			$scope.output = '';
			$scope.outputReady = false;
			$scope.submitClicked = false;
		}

		function parseHTML(text){
	        var x = $('<div/>').html(text);
	        var isFormatted = (x.children().length > 0);
	        if(isFormatted){
	            htmlS = x[0].innerHTML;
	        }else{
	            htmlS = x.text()
	        }
	        return htmlS;
    	}
		
	}]);

app.filter('toTrustedHTML', ['$sce', function($sce){

    return function(value, type) {
        return $sce.trustAsHtml(value);
    }
}]);





