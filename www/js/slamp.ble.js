angular.module('slamp.ble', ['ionic'])

.run(function($ionicPlatform) {
	
})

/**
* BT Controller
*/
.controller('BluetoothCtrl', function($scope, $ionicPlatform, $state, $ionicLoading) {


	$scope.devices = [
		{address: "84:10:0D:94:15:0A", class: "1796", id: "84:10:0D:94:15:0A", name: "Test device de broma"},
	];

	$scope.listDevices = function(){
		if(typeof(bluetoothSerial) === "undefined")
			return;
		bluetoothSerial.list(
			function(devices){
				console.debug(devices);
				$scope.devices = devices;
			},
			function(){
				alert("peto");
			}
		);

	}

	$scope.onDeviceClick = function(device){

		bluetoothSerial.connect(
			device.address, 
			function(){
				alert("connected!")
				console.debug("connected");
			},
			function(failure){
				alert("cant connect!"+failure);
				console.debug("no conecto:"+failure);
			}
		);     
	}

})