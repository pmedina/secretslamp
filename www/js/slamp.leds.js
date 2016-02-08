/**************************************************
+	Module:		ionicApp
**************************************************/
angular.module('slamp.leds', ['ionic'])

.run(function($ionicPlatform) {
	console.debug("RUN");
	// TODO: la miga de parear. 
})

/**
*  LEDS CONTROLLER
*/
.controller('LedsCtrl', function ($scope, $state, LedsFactory) {
	
	$scope._findLed = function(ledId){
		
	};

	$scope.lampmodel = LedsFactory.GetModel();
	console.debug()

	$scope.toggle = function(ledId){


	};

	$scope.setRGB = function(ledId, r, g, b){

		
	};

	$scope.test = function(ledId){
		$scope.lampModel = LedsFactory.GetModel();
		console.debug($scope.lampModel);
		LedsFactory.SelectLed(ledId);
		//$scope.selectedLed.status = "ON";
		$state.go('app.led');
	}

	$scope.testi = function(){
		LedsFactory.ToggleLed();
	}

	$scope.btSend = function(){


	}

})