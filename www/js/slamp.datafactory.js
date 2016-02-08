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
		,GetSelectedLed: function(){
			return this.selectedLed;
		}

		,SelectLed: function(ledId){
			for(var i in this.lampModel.sides){
				var side = this.lampModel.sides[i];
				for(var j in side.leds){
					if(side.leds[j].id == ledId){
						this.selectedLed = side.leds[j];
						break; 
					}
				}
			}
		}

		,ToggleLedStatus: function(){
			console.debug("Selected:"+this.selectedLed);
			this.selectedLed.status = "ON";
		}

		,ToggleLedRGB: function(color, value){
			console.debug(this.selectedLed);
			this.selectedLed.status = "ON";
		}
	}

})