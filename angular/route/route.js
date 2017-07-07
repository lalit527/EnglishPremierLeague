//routing for league app

leagueApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{
            // location of the template
        	templateUrl		: 'views/result-view.html',
        	// Which controller it should use 
            controller 		: 'leagueController',
            // what is the alias of that controller.
        	controllerAs 	: 'leagueCtrl'
        })
		.when('/match-details/:matchId',{
        	templateUrl     : 'views/matchdetails-view.html',
        	// Which controller it should use 
            controller 		: 'matchDetailController',
            // what is the alias of that controller.
        	controllerAs 	: 'detalCtrl'
        })
        .when('/table',{
        	templateUrl     : 'views/standing-view.html',
        	// Which controller it should use 
            controller 		: 'tableController',
            // what is the alias of that controller.
        	controllerAs 	: 'leagueCtrl'
        })
        

        .otherwise(
            {
                //redirectTo:'/'
                template   : '<h1>404 page not found</h1>'
            }
        );
}]);