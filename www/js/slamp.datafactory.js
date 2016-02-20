angular.module('slamp.datafactory', ['ionic'])



.service('LampstatusService', function(){
	var lampMode = '#0';
	return {
        getLampStatus: function () {
            return lampMode;
        },
        setLampStatus: function(value) {
            lampMode = value;
        }
    };
})



.factory('LedsFactory', function(bluetoothService, $q){
	return{
		lampModel: [
			// SIDE 0: FRONT
			{side: "0", ledId: "00",order: "0", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "01",order: "1", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "02",order: "2", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "03",order: "3", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "04",order: "4", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "05",order: "5", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "06",order: "6", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "07",order: "7", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "0", ledId: "08",order: "8", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},

			// SIDE 1 : LEFT
			{side: "1", ledId: "10",order: "0", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "11",order: "1", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "12",order: "2", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "13",order: "3", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "14",order: "4", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "15",order: "5", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "16",order: "6", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "17",order: "7", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "1", ledId: "18",order: "8", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},

			// SIDE 2 : BACK
			{side: "2", ledId: "20",order: "0", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "21",order: "1", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "22",order: "2", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "23",order: "3", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "24",order: "4", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "25",order: "5", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "26",order: "6", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "27",order: "7", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "2", ledId: "28",order: "8", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},

			// SIDE 3 : RIGHT
			{side: "3", ledId: "30",order: "0", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "31",order: "1", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "32",order: "2", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "33",order: "3", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "34",order: "4", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "35",order: "5", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "36",order: "6", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "37",order: "7", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "3", ledId: "38",order: "8", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},

			// SIDE 4: TOP
			{side: "4", ledId: "40",order: "0", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "41",order: "1", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "42",order: "2", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "43",order: "3", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "44",order: "4", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "45",order: "5", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "46",order: "6", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "47",order: "7", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false},
			{side: "4", ledId: "48",order: "8", r: "120", g: "120", b: "120", status: "OFF" ,isSecret: false}
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
		,IsStandbyMode: function(){
			return this.currentMode == "#0";
		}
		
		,SetMode: function(mode){
			this.currentMode = mode;
			var modeStr = mode; // maybe we need to play with the text to send. The mode stays
			bluetoothService.SendCommand(modeStr); 
			// TODO: if switching from Secret Mode to Normal, set all to OFF??
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

		,SwitchRandomLed: function(switchOn, randomRGB){
			if(switchOn){
				if(this.isAllOn()){
					alert("all leds are on!");
					return;
				}
				var led = this._getRandomLedByStatus("OFF");
				led.status = "ON";
				if(randomRGB){
					led.r = Math.floor(Math.random()*255).toString();
					led.g = Math.floor(Math.random()*255).toString();
					led.b = Math.floor(Math.random()*255).toString();
				}
				bluetoothService.SendCommand(this.SerializeLed(led));
			}else{
				if(this.isAllOff()){
					alert("all leds are off!");
					return;
				}
				var led = this._getRandomLedByStatus("ON");
				led.status = "OFF";
				led.r = "0";
				led.g = "0";
				led.b = "0";
				bluetoothService.SendCommand(this.SerializeLed(led));
			}

		}

		,SwitchRandomSecret: function(){
			if(this.isAllSecrets()){
				alert("No more place for secrets!");
				return;
			}
			var randomLed = this._getRandomSecret(true);
			// Set secret to true, switch on, random rgb
			randomLed.status = "ON";
			randomLed.isSecret = true;
			randomLed.r = Math.floor(Math.random()*255).toString();
			randomLed.g = Math.floor(Math.random()*255).toString();
			randomLed.b = Math.floor(Math.random()*255).toString();
			bluetoothService.SendCommand(this.SerializeLed(randomLed)); 
		}

		,SerializeLed: function(oLed){
			var statusStr = "*"+oLed.side+","+oLed.order+","+oLed.r+","+oLed.g+","+oLed.b;
			return statusStr;
		}


		,_getRandomLedByStatus: function(status){
			var oLed = this._getRandomLed();
			if(status == "ON" && oLed.status == "ON"){
				return oLed;
			}
			if(status == "OFF" && oLed.status == "OFF")
			{
				return oLed;
			}
			return this._getRandomLedByStatus(status);
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

		,_getRandomLed: function(onlyOffStatus){
			var led = this.lampModel[Math.floor(Math.random()*this.lampModel.length)];
			if(onlyOffStatus && led.status == "ON"){
				this._getRandomLed(onlyOffStatus);
			}
			return led;
		}

		,_getRandomSecret: function(onlyNoSecret){
			var led = this.lampModel[Math.floor(Math.random()*this.lampModel.length)];
			if(onlyNoSecret && led.isSecret == true){
				this._getRandomSecret(onlyOffStatus);
			}
			return led;
		}

		,isAllOn: function(){
			var onCount = 0;
			for(var i=0; i<this.lampModel.length; i++){
				var led = this.lampModel[i];
				if(led.status == "ON")
					onCount++;
			}
			return onCount == this.lampModel.length;
		}

		,isAllOff: function(){
			var offCount = 0;
			for(var i=0; i<this.lampModel.length; i++){
				var led = this.lampModel[i];
				if(led.status == "OFF")
					offCount++;
			}
			return offCount == this.lampModel.length;
		}

		,isAllSecrets: function(){
			var secretsCount = 0;
			for(var i=0; i<this.lampModel.length; i++){
				var led = this.lampModel[i];
				if(led.isSecret == true)
					secretsCount++;
			}
			return secretsCount == this.lampModel.length;
		}

	}

})