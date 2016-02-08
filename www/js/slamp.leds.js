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
	
	$scope.selected = null;

	$scope.openLedControls = function(ledId){
		$scope.lampModel = LedsFactory.GetModel();
		LedsFactory.SelectLed(ledId);
		$scope.selected = LedsFactory.GetSelectedLed();
		$state.go('app.led');
	}

	$scope.toggleLed = function(){
		$scope.selected.status = "ON";
	}

	$scope.btSend = function(){


	}

	$scope.getSelectedLed = function(){
		$scope.selected = LedsFactory.GetSelectedLed();
	}

})