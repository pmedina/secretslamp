angular.module('slamp.datafactory', ['ionic'])

// pass data between views
.factory('LedsFactory', function(bluetoothService, $q){
	return{
		lampModel: [
			// SIDE 1: LEFT
			{side: "1", ledId: "10",order: "0", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "11",order: "1", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "12",order: "2", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "13",order: "3", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "14",order: "4", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "15",order: "5", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "16",order: "6", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "17",order: "7", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "1", ledId: "18",order: "8", r: "120", g: "120", b: "120", status: "OFF"},

			// SIDE 2 : FRONT
			{side: "2", ledId: "20",order: "0", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "21",order: "1", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "22",order: "2", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "23",order: "3", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "24",order: "4", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "25",order: "5", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "26",order: "6", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "27",order: "7", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "2", ledId: "28",order: "8", r: "120", g: "120", b: "120", status: "OFF"},

			// SIDE 3 : RIGHT
			{side: "3", ledId: "30",order: "0", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "31",order: "1", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "32",order: "2", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "33",order: "3", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "34",order: "4", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "35",order: "5", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "36",order: "6", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "37",order: "7", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "3", ledId: "38",order: "8", r: "120", g: "120", b: "120", status: "OFF"},

			// SIDE 4 : BACK
			{side: "4", ledId: "40",order: "0", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "41",order: "1", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "42",order: "2", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "43",order: "3", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "44",order: "4", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "45",order: "5", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "46",order: "6", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "47",order: "7", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "4", ledId: "48",order: "8", r: "120", g: "120", b: "120", status: "OFF"},

			// SIDE 5: TOP
			{side: "5", ledId: "50",order: "0", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "51",order: "1", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "52",order: "2", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "53",order: "3", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "54",order: "4", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "55",order: "5", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "56",order: "6", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "57",order: "7", r: "120", g: "120", b: "120", status: "OFF"},
			{side: "5", ledId: "58",order: "8", r: "120", g: "120", b: "120", status: "OFF"}
		]

		,selectedLed: null


		/*
		* #0   stand by , aunque esto sólo se activará por el estado del pairing, esta para debuggear, hace el fade up que viste en el último video
		* #1   modo secreto 
		* #2   modo led random 
		* #3   modo sweep
		* 
		*/
		,currentMode: "#0"


		,GetMode: function(){
			return this.currentMode;
		}
		,SetMode: function(mode){
			this.currentMode = mode;
			var modeStr = mode; // maybe we need to play with the text to send. The mode stays
			bluetoothService.SendCommand(modeStr); 
		}

		,GetModel: function(){
			return this.lampModel;
		}

		
		,GetSelectedLed: function(){
			return this.selectedLed;
		}

		,SelectLed: function(ledId){
			this.selectedLed = this._findLed(ledId);
		}

		,GetStatusLed: function(ledId){
			var status = this._findLed(ledId).status;
			console.debug(status);
			return status;
		}

		,_findLed: function(ledId){
			for(var i=0; i<this.lampModel.length; i++){
				var led = this.lampModel[i];
				if(led.ledId == ledId){
					return led; 
				}

			}
			return null;
		}


	}

})