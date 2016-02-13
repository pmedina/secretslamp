/**************************************************
+	Module:		ionicApp
**************************************************/
angular.module('slamp.leds', ['ionic'])

.run(function($ionicPlatform) {
})

/**
*  LEDS CONTROLLER
*/
.controller('LedsCtrl', function ($scope, $state, LedsFactory, bluetoothService) {
	
	$scope.selected = null;

	$scope.lampStatus = {
    	mode: "",
    	leds: []
    }

    $scope.$watch(
    	'lampStatus.mode', 
    	function(){
    		LedsFactory.SetMode($scope.lampStatus.mode);
    	}
    );

	$scope.initRandomLedCard = function(){
		$scope.lampStatus.mode = LedsFactory.GetMode();
	}

	$scope.randomLedOn = function(){
		LedsFactory.SwitchRandomLed(true, true);
	}

	$scope.randomLedOff = function(){
		LedsFactory.SwitchRandomLed(false, false);
	}

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
	$scope.changeStatus = function(oldvalue, newvalue){
		console.debug("status changed for led ID:"+ $scope.selected.ledId);
		if($scope.selected.status == "OFF"){
			$scope.selected.r = 0;
			$scope.selected.g = 0;
			$scope.selected.b = 0;
		}
		if($scope.selected.status == "ON" && $scope.selected.r == "0" && $scope.selected.g == "0" && $scope.selected.b == "0"){
			$scope.selected.r = Math.floor(Math.random()*255).toString();
			$scope.selected.g = Math.floor(Math.random()*255).toString();
			$scope.selected.b = Math.floor(Math.random()*255).toString();
		}
		var command = $scope.SerializeCommand($scope.selected);
		bluetoothService.SendCommand(command);
	}

	$scope.getLedStatus = function(ledId){
		LedsFactory.GetStatusLed(ledId);
	}

	$scope.getSelectedLed = function(){
		$scope.selected = LedsFactory.GetSelectedLed();
	}

	$scope.SerializeCommand = function(oLed){
		return LedsFactory.SerializeLed(oLed);
	}

	$scope.isConnected = function(){
		return bluetoothService.IsConnected();
	}

	$scope.isStandbyMode = function(){
		return LedsFactory.IsStandbyMode();
	}
})