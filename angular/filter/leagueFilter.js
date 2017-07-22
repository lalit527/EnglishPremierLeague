//custom filter to hide repeated date
leagueApp.filter( 'dateRepeat', ['changeArray', function(changeArray) {
	var main = this;
	return function( input, val, indx, pindx ) {
	      var newData = '';
	      //console.log('v'+val);
	      /*console.log('in'+input);
	      console.log('--'+indx);
	      console.log('------'+pindx);*/
		  if(changeArray.getArray(input)){
			 newData = input;
			 changeArray.setArray(input);
		  }
		  return newData;
			  
	}
}]);

//custom filter to convert from array to string
leagueApp.filter( 'arrayToString', function() {
	return function( input ) {
			  var result = input.join(' ');
		      return result;
			  
	}
});

//custom filter to show draw, win , loss for a particular team
leagueApp.filter('showByScore', function(){
    return function(input, teamName, type){
	   if(teamName != 'ALL' && type != 'ALL'){
		   if(type == 'Draw'){
			 if(input[0].score1 == input[0].score2){
				return input;
			 }
		   }else if(type == 'Won'){
			 if((input[0].team1.name == teamName && input[0].score1 > input[0].score2)
				 ||((input[0].team2.name == teamName && input[0].score2 > input[0].score1))){
				return input;
			 }
		   }else if(type == 'Lost'){
			 if((input[0].team1.name == teamName && input[0].score1 < input[0].score2)
				 ||((input[0].team2.name == teamName && input[0].score2 < input[0].score1))){
				return input;
			 }
		   }
	   }else{
	      return input;
	   }
	}
});


