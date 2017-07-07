//controller for result view
leagueApp.controller('leagueController', ['$http', 'tableStanding', 'addIdResponse','changeArray', function($http, tableStanding, addIdResponse, changeArray){
      var main = this;
	  this.name = "2015-16";
	  this.searchYear = ["2012-13", "2013-14", "2014-15", "2015-16"];
	  this.resultData = ["ALL","Won", "Draw", "Lost"];
	  this.defaultNull = 'D';
	  this.teamName = 'ALL';
	  this.resultName = 'ALL';
	  this.resultMatch = 'ALL';
	  this.changeCount=function(){
	    changeArray.emptyArray();
	  }
	  this.changeCount();
	  //this.searchResult(this.name);
	  this.sortOrder = [0];//["Draw", "Won", "Lost", "O"];
	   $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/'+this.name+'/en.1.json')
	        .then(function(response){
			   
			   addIdResponse.addId(response.data);
			   tableStanding.buildTable(response.data);
			   main.searchTeam = addIdResponse.getTeams(response.data);
			   main.searchMatch = addIdResponse.groupDate(response.data);
			   main.leagueResult = addIdResponse.getObject(response.data);
			   //////console.log(JSON.stringify(main.dataWithId));
			});
	  
	  this.searchResult = function(searchYear){
	      $http.get('https://raw.githubusercontent.com/openfootball/football.json/master/'+searchYear+'/en.1.json')
	        .then(function(response){
			   
			  addIdResponse.addId(response.data);
			   main.standing = tableStanding.buildTable(response.data);
			   main.searchTeam = addIdResponse.getTeams(response.data);
			   main.searchMatch = addIdResponse.groupDate(response.data);
			   main.searchMatch = addIdResponse.groupDate(response.data);
			   main.leagueResult = addIdResponse.getObject(response.data);
			   //////console.log(JSON.stringify(main.dataWithId));
			});
	  }
      
}]);

//controller for table view
leagueApp.controller('tableController', ['tableStanding', '$timeout', function(tableStanding, $timeout){
     var main = this;
     main.standing;
     $timeout(function() { 
	 main.standing = tableStanding.getTable();
	 ////console.log('log'+JSON.stringify(tableStanding.getTable()));
	 }, 1000);
}]);

//controller for SIngle match view
leagueApp.controller('matchDetailController', ['addIdResponse', '$timeout', 'getMatchDetail', '$routeParams',  function(addIdResponse, $timeout, getMatchDetail, $routeParams){
     var main = this;
     main.data='hello';
	 main.matchDetail;
	 main.matchId = $routeParams.matchId;
     ////console.log('ID'+main.matchId);
     $timeout(function() { 
	 main.data = addIdResponse.getObject();
	 main.matchDetail = getMatchDetail.getDetailById(main.data, main.matchId);
	 ////console.log('log'+JSON.stringify(main.matchDetail));
	 }, 1000);
}]);

