angular.module('slamp.ble', ['ionic'])

.run(function($ionicPlatform) {
	
})

/**
* BT Controller
*/
.controller('BluetoothCtrl', function(LedsFactory, bluetoothService, $scope, $ionicPlatform, $state, $ionicLoading) {


	$scope.devices = [
		{address: "84:10:0D:94:15:0A", class: "1796", id: "84:10:0D:94:15:0A", name: "Test device de broma"},
	];

	$scope.initBluetoothCard = function(){
		if(typeof(bluetoothSerial) === "undefined")
			return;
		bluetoothService.GetDevices().then(
			function(list){
				$scope.devices = list;
			}
			,function(){
				alert("Can not get devices!");
			}
		);
	}

	$scope.onDeviceClick = function(device){

		bluetoothService.Connect(device).then(
			function(){
				console.debug("connected");
				alert("Connected!");
			}
			,function(error){
				alert(error);
			}
		);  
	}

	$scope.isDeviceConnected = function(device){
		console.debug(bluetoothService.IsDeviceConnected(device.address));
		return bluetoothService.IsDeviceConnected(device.address);
	}

})


.factory('bluetoothService', function($q){
	
	return{
		
		isConnected: false
		,connectedDevice: null
		,devicesList: null

		,Connect: function(device){
			var deferred = $q.defer();
			var that = this;
			bluetoothSerial.connect(
				device.address, 
				function(){
					that.connectedDevice = device;
					deferred.resolve();
				},
				function(failure){
					deferred.reject(failure);
					that.connectedDevice = null;
				}
			);   
			return deferred.promise;
		}

		,GetDevices: function(){
			var deferred = $q.defer();
			var that = this;
			bluetoothSerial.list(
				function(devicesList){
					console.debug(devicesList);
					that.devicesList = devicesList;
					deferred.resolve(that.devicesList);
				},
				function(error){
					deferred.reject(error);
				}
			);
			return deferred.promise;
		}

		,IsDeviceConnected: function(deviceId){
			return this.connectedDevice != null && this.connectedDevice.address == deviceId;

		}

		,SendCommand: function(command){
			console.debug("BluetoothFactory.SendCommand() received:"+command);
			alert("BluetoothFactory.SendCommand():"+command);
		}

	}

})