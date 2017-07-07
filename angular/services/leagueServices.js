//Service to create an object for table from the data received from API
leagueApp.factory('tableStanding', function(){
        var main = this;
		main.sortedTableObject;
     
	   var buildTable = function(object){
		  //////console.log(object);
		  var tableObject = {};
		  for(var rounds in object.rounds){
			for(var match in object.rounds[rounds].matches){
                //////console.log(object.rounds[rounds].matches[match].team1.key);
				//////console.log(object.rounds[rounds].matches[match].team2.key);
				//////console.log(object.rounds[rounds].matches[match].score1);
				//////console.log(object.rounds[rounds].matches[match].score2);
				var key1 = object.rounds[rounds].matches[match].team1.key;
				var key2 = object.rounds[rounds].matches[match].team2.key;
				var score1 = object.rounds[rounds].matches[match].score1;
				var score2 = object.rounds[rounds].matches[match].score2;
				var won ='';
				var win1 = 0;
				var lost1 = 0;
				var lost2 = 0;
				var win2 = 0;
				var draw = 0;
				var formTeam1 = [];
                var formTeam2 = [];		
				if(score1 > score2){
				   won = key1;
				   win1 = 1;
				   lost1 = 0;
				   win2 = 0;
				   lost2 = 1;
				   formTeam1.push('W');
				   formTeam2.push('L');
				}else if(score1 < score2){
				   win2 = 1;
				   lost2 = 0;
				   win1 = 0;
				   lost1 = 1;
				   won = key2;
				   formTeam1.push('L');
				   formTeam2.push('W');
				}else{
				   draw = 1;
				   won = 'Draw';
				   formTeam1.push('D');
				   formTeam2.push('D');
				}
				var played = 1;
			    var win = 0;
			    var lost = 0;
			    var goalScored = score1;
			    var goalAgainst = score2;
				if(tableObject.hasOwnProperty(key1)){
				   tableObject[key1].played += 1; 
				   if(won == key1){
				     tableObject[key1].won += 1;
					 tableObject[key1].points += 3;
					 tableObject[key1].form.push('W');
				   }else if(won == 'Draw'){
				     tableObject[key1].draw += 1;
					 tableObject[key1].points += 1;
					 tableObject[key1].form.push('D');
				   }else{
				     tableObject[key1].lost += 1;
					 tableObject[key1].form.push('L');
				   }
				   tableObject[key1].goalScored += score1; 
				   tableObject[key1].goalAgainst += score2; 
				}else{
				   var team1Obj = {
				               "played": 1,
							   "won":win1,
							   "lost":lost1,
							   "draw":draw,
							   "goalScored":score1,
							   "goalAgainst":score2,
							   "form":formTeam1,
							   "name":object.rounds[rounds].matches[match].team1.name,
							   "code":object.rounds[rounds].matches[match].team1.code,
							   "points":((win1*3) + (draw*1))
				               };
					tableObject[key1] = team1Obj;
				}
				
				//check 2nd team
				if(tableObject.hasOwnProperty(key2)){
				   //////console.log(JSON.stringify(tableObject.key2));
				   //////console.log('true2');
				   tableObject[key2].played += 1; 
				   if(won == key2){
				     tableObject[key2].won += 1; 
					 tableObject[key2].points += 3;
					 tableObject[key2].form.push('W');
				   }else if(won == 'Draw'){
				     tableObject[key2].draw += 1;
					 tableObject[key2].points += 1;
					 tableObject[key2].form.push('D');
				   }else{
				     tableObject[key2].lost += 1;
					 tableObject[key2].form.push('L');
				   }
				   tableObject[key2].goalScored += score2; 
				   tableObject[key2].goalAgainst += score1; 
				}else{
					var team2Obj = {
								   "played": 1,
								   "won":win2,
								   "lost":lost2,
								   "draw":draw,
								   "goalScored":score2,
								   "goalAgainst":score1,
								   "form":formTeam2,
								   "name":object.rounds[rounds].matches[match].team2.name,
							       "code":object.rounds[rounds].matches[match].team2.code,
								   "points":((win2*3) + (draw*1))
								   };
					tableObject[key2] = team2Obj;
				}
			}
		  }
		  var sortedTableArray = [];
		  for(var team in tableObject){
		      sortedTableArray.push([team, tableObject[team]]);
		  }
		  sortedTableArray.sort(function(a, b){
		    if((b[1].points - a[1].points) !=0){
               return b[1].points - a[1].points;
            }else{
               return ((b[1].goalScored-b[1].goalAgainst) - (a[1].goalScored-a[1].goalAgainst));
            }			
		      
		  });
		  main.sortedTableObject = {};
		  for(var indx in sortedTableArray){
		     main.sortedTableObject[sortedTableArray[indx][0]] = sortedTableArray[indx][1];
		  }
		  
		}
		
		
	var getTable = function(){
	    return main.sortedTableObject;
	}
	return{	
	   buildTable: buildTable,
	   getTable : getTable
	 };
});


//service to set and get object with ID's
leagueApp.factory('addIdResponse', function(){
    var main = this;
	main.newObject;
	var addId = function(object){
	       var count = 0 ;
		   main.newObject = {};
		   main.newObject = object;
		   for(var rounds in main.newObject.rounds){
			for(var match in main.newObject.rounds[rounds].matches){
			     main.newObject.rounds[rounds].matches[match]["id"] = ++count;
			  }
		   }
		   ////console.log(JSON.stringify(main.newObject));
		   
	}
	
	var groupDate = function(object){
		 
	     var startDate;
	     var endDate;
	     var key;
	     var matchDay= {};
	     var dateObj = {};
	     var matchDayArr= [];
	     matchDayArr.push('ALL');
	     for(var rounds in object.rounds){
	     	
	     	key = object.rounds[rounds].name;
	     	matchDayArr.push(key);
	     	startDate = '';
	     	endDate = '';
	     	var length = object.rounds[rounds].matches.length;
	     	startDate  = object.rounds[rounds].matches[0].date;
	     	endDate    = object.rounds[rounds].matches[length-1].date;
	     	dateObj    = {
	     		"startDate": startDate,
	     		"endDate": endDate
	     	}
	     	matchDay[key] = dateObj;
	    }
	    return matchDayArr;
	}

	var getTeams = function(object){
	    var allTeam = [];
		var tmpTeam = '';
		allTeam.push('ALL'); 
	    for(var rounds in object.rounds){
			for(var match in object.rounds[rounds].matches){
			     
			    tmpTeam = object.rounds[rounds].matches[match].team1.name;
				if(allTeam.indexOf(tmpTeam) == -1){
				   allTeam.push(tmpTeam);
				}
				tmpTeam = object.rounds[rounds].matches[match].team2.name;
				if(allTeam.indexOf(tmpTeam) == -1){
				   allTeam.push(tmpTeam);
				}
			  }
		   }
		   return allTeam;
	}
	var getObject = function(object){
	    
		   return main.newObject;
	}
	return{
	   addId: addId,
	   getObject: getObject,
	   groupDate: groupDate,
	   getTeams: getTeams
	};
});


//service to store dates for filter
//this is to hide repeated dates
leagueApp.factory('changeArray', function(){
    var main = this;
	main.previousDate=[];
	var setArray =  function(input){
	    main.previousDate.push(input);
	}
	var getArray = function(input){
	    //console.log(input);
	    if(main.previousDate.indexOf(input) == -1){
		   return true;
		}
		return false;
	}
	var emptyArray = function(){
	   main.previousDate=[];
	}
	return{
	   setArray: setArray,
	   emptyArray : emptyArray,
	   getArray : getArray
	}
});

//service to retrive single match detail from the object
leagueApp.factory('getMatchDetail', function(){
     var main = this;
	 var getDetailById = function(object, id){
	     var matchData;
		 var flag = false;
	     for(var rounds in object.rounds){
			for(var match in object.rounds[rounds].matches){
			    ////console.log(match);
			    if(object.rounds[rounds].matches[match].id == id){
				   ////console.log(id);
				   ////console.log(match);
				   matchData = object.rounds[rounds].matches[match];
				   flag = true;
				   break;
				}
				if(flag){
				   break;
				}
			}
		}
		return matchData;
	 }
	 
	 return{
	    getDetailById: getDetailById
	 }
});
