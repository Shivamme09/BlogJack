var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
	Stamplay.init("blogitinternshala");
	localStorage.removeItem('https://blogitinternshala.stamplayapp.com-jwt');
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller : "HomeCtrl"
    })
    .when("/login", {
        templateUrl : "templates/login.html",
        controller : "LoginCtrl"
    })
	.when("/signup", {
        templateUrl : "templates/signup.html",
        controller : "SignupCtrl"
    });
});
app.controller("SignupCtrl",function($scope) {
		$scope.newUser={};
		$scope.signup=function(){
			if($scope.newUser.firstName && $scope.newUser.lastName && $scope.newUser.email && $scope.newUser.Password
				&& $scope.newUser.confirmPassword){
				console.log('All Fields are Valid');
			if($scope.newUser.Password == $scope.newUser.confirmPassword){
				console.log('All Good !,Let`s Sign-Up');
				$Stamplay.User.signup($scope.newUser)
				.then(function(response){
					console.log(response);
				},function(error){
					console.log(error);
				});
			}
			else{
				console.log("Password Do Not Match");
			}
		}
		else{
			console.log("Some Fields Are Invalid");
		}
		}
});
app.controller("LoginCtrl", function ($scope) {
		$scope.login=function(){
			Stamplay.User.currentUser()
			.then(function(res){
				console.log(res);
			if(res.user){
				// User Already Logged in
				$timeout(function(){
				$location.path("/viewBlogs");
				});
			}
			else{
				//proceed with login
				Stamplay.User.login($scope.user);
				-then(function(res){
					console.log("Logged in" +res);
					$timeout(function(){
						$location.path("/viewBlogs");
					});
			},function(err){	
				console.log(err);
			})
			}
			}, function(error){
			console.log(error);
		});
		}
});