angular.module('slamp.datafactory', ['ionic'])

// pass data between views
.factory('LedsFactory', function($q){
	return{
		lampModel: {
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
			}]
		}
		,selectedLed: null
		,GetModel: function(){
			return this.lampModel;
		}
		,SelectLed: function(ledId){
			for(var i in this.lampModel.sides){
				var side = this.lampModel.sides[i];
				console.debug("SIDE: "+this.lampModel.sides[i].id);
				for(var j in side.leds){
					console.debug("LED "+side.leds[j].id)
					if(side.leds[j].id == ledId){
						console.debug("found:"+ledId);
						this.selectedLed = side.leds[j];
						break; 
					}
				}
			}
		}

		,ToggleLedStatus: function(){
			console.debug(this.selectedLed);
			this.selectedLed.status = "ON";
			console.debug(this.lampModel);
		}
		,ToggleLedRGB: function(color, value){
			console.debug(this.selectedLed);
			this.selectedLed.status = "ON";
			console.debug(this.lampModel);
		}
	}

})