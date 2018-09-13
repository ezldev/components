
angular.module('ui.grid.multiselect.filter', [])
.controller('multiSelectAdvancedCtrl', ["$scope", function($scope){
	//alert(1)
	
	$scope.colFilter = $scope.col.filters[0]
	$scope.colFilter.listTerm = [];
	$scope.filter={
		input:[],
		output:[]
	}
	$scope.listOfTerms =[]
	function sortFilterObject(a,b){
		if(a.val < b.val) return -1;
		if(a.val > b.val) return 1;
		return 0;
	}
	function ifExists(obj,list){
		var found = false
		list.forEach(function(item){
				if(item.val == obj.val){
					found = true;
					return
				}
			
			/*
			if(JSON.stringify(obj) == JSON.stringify(item)){
				found = true;
				return
			}
			*/
		})
		return found
	}
	
	$scope.grid.api.core.on.rowsRendered($scope, function() {
		var gridApi = this
		gridApi.grid.rows.forEach( function ( row ) {
			 var obj = { val:row.entity[$scope.col.field],label:row.entity[$scope.col.field],ticked:false} 
			 if( !ifExists(obj,$scope.filter.input)){
				$scope.filter.input.push( obj );
			  }
		});
		$scope.filter.input.sort(sortFilterObject);
		
		
		
	});
	
	$scope.$watch("filter.output", function(output){
		output.forEach( function( item ) {
    	//$scope.grid.api.col.filters[0]
		//var t = row[col.field];
    	if(typeof item.val === "string") {
    		item.val = item.val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
    	}
		
    	$scope.colFilter.listTerm.push(item.val);
		
    });
		$scope.colFilter.term = $scope.colFilter.listTerm.join(', ');
		$scope.colFilter.condition = new RegExp($scope.colFilter.listTerm.join('|'));
		
	},true)
	
	
	
}])
.directive('multiSelectFilterAdvanced', function() {
  return {
    template: '<div style="position:fixed;z-index:9999999;"><div isteven-multi-select input-model="filter.input" output-model="filter.output" button-label="label" item-label="label" tick-property="ticked" max-labels="0" max-height="250px" > </div></div>',
    controller: 'multiSelectAdvancedCtrl'
  };
})

