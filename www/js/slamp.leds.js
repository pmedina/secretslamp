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
.controller('LedsCtrl', function ($scope) {
	$scope.lampModel = {
		sides: [
			{
				id: "home",
				leds: [
					{
						id: "h1",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h2",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h3",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h4",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h5",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h6",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					},
					{
						id: "h7",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					}
					,{
						id: "h8",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					}
					,{
						id: "h9",
						status: "OFF",
						r: 255,
						g: 255,
						b: 255
					}
				]
			}
		]

	}
	console.debug($scope.lampModel);

	$scope.findLed = function(ledId){
		for(var i in $scope.lampModel.sides){
			var side = $scope.lampModel.sides[i];
			console.debug("SIDE: "+$scope.lampModel.sides[i].id);
			for(var j in side.leds){
				console.debug("LED "+side.leds[j].id)
				if(side.leds[j].id == ledId){
					console.debug("found:"+ledId);
					return side.leds[j];
				}
			}
		}
	}

	,$scope.toggle = function(ledId){


	}

	,$scope.setRGB = function(ledId, r, g, b){

		
	}

})
