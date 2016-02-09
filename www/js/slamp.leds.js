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
	$scope.model = null;

	$scope.openLedControls = function(ledId){
		$scope.lampModel = LedsFactory.GetModel();
		LedsFactory.SelectLed(ledId);
		$scope.selected = LedsFactory.GetSelectedLed();
		$state.go('app.led');
	}

	/**
	* Triggered when current selected led changes status
	*
	*/
	$scope.changeStatus = function(){
		console.debug("status changed for led ID:"+ $scope.selected.ledId);
		var command = $scope.SerializeCommand($scope.selected);
		LedsFactory.BTSend(command);
	}

	$scope.getLedStatus = function(ledId){
		LedsFactory.GetStatusLed(ledId);
	}

	$scope.getSelectedLed = function(){
		$scope.selected = LedsFactory.GetSelectedLed();
	}

	$scope.SerializeCommand = function(oLed){
		var statusStr = "*"+oLed.side+","+oLed.order+","+oLed.r+","+oLed.g+","+oLed.b+","+oLed.status;
		return statusStr;
	}



})