
var requestToken = "";
var accessToken = "";
var clientId = "101408338031-ql7flepeaeskd22k9ndggctn99qlnhcf.apps.googleusercontent.com";
var clientSecret = "9m92Fhei0wB2XLaEha7pUFIT";

angular.module('slamp.files', ['ionic'])

.run(function($ionicPlatform, $http, filesService) {
})

.controller('FilesCtrl', function(LampstatusService, bluetoothService, LedsFactory, filesService, cameraService, $scope, $ionicPlatform, $state, $ionicLoading) {
	

    $ionicPlatform.ready(function() {
    })


    $scope.initSecretsCard = function(){

    }

	$scope.fromCamera = function()
	{
		if(LampstatusService.getLampStatus() != "#1"){
			alert("Please set the lamp in Secrets mode first!");
			return;
		}
		cameraService.GetPicture(0).then(
			function(result){
				console.debug(result);
				cameraService.currentPhotoUri = result;
				window.plugins.Base64.encodeFile(
					result, 
					function(base64){
            			cameraService.currentPhotoData = base64;
            			$state.go('app.photobrowser');
        			}
        		);
			}
			,function(error){
				console.debug(error);
			}
		);
	};

	$scope.getCurrentPhotoData = function(){
		return cameraService.currentPhotoData;
	}

	$scope.getCurrentPhotoUri = function(){
		return cameraService.currentPhotoUri;
	}

	$scope.uploadPhoto = function(){

		$ionicLoading.show({
      		template: '<p><ion-spinner class="spinner-energized"></i></p>'
    	});

		filesService.CreateFile(
			"secret_"+ Date.now().toString()+".jpg"
			,"description"
			,filesService.GetToken()
		).then(
			function(resultData){
				$ionicLoading.hide();
				console.debug(resultData);
				$ionicLoading.show({
      				template: '<p><ion-spinner class="spinner-energized"></i></p>'
    			});
				filesService.UploadPhoto(
					resultData.id, 
					cameraService.currentPhotoData,
					filesService.GetToken()
				).then(
					function(response){
						console.debug(response);
						$ionicLoading.hide();
						LedsFactory.SwitchRandomSecret();
						$state.go('app.upload_secret');
						alert("Secret stored");
					}
					,function(response){
						console.debug(response);
						$ionicLoading.hide();
					}
				)

			}
			,function(failureData){
				alert(failureData.statusText);
				$ionicLoading.hide();
			}
		);

	}

	 
	$scope.fromFilesystem = function()
	{
		filesService.GetFileEntryFromPath().then(
			function(result){
				console.debug(result);
			}
			,function(error){
				console.debug(error);
			}
		);

	};


    $scope.OnBackClick = function()
    {
    	$scope.currentDir.getParent(
    		function(parent){
				filesService.GetContents(parent).then(
					function(entryCOL)
					{
						$scope.files = entryCOL;
					}
					,function(error){
						console.debug(error);
					}
				)
    		},
    		function(error){

    		}
    	)
    }

    $scope.OnFileClick = function(fileEntry)
    {
    	$ionicLoading.show({
      		template: 'Loading...'
    	});
    	if(typeof(fileEntry.isFile) != "undefined" && fileEntry.isFile){
    		alert("upload file. ask for confirmation?");
    	}else{
    		$scope.currentDir = fileEntry;
    		$scope.hasParent = true;
	    	filesService.GetContents(fileEntry).then(
				function(entryCOL)
				{
					$scope.files = entryCOL;
					$ionicLoading.hide();
				}
				,function(error){


				}
			)	
    	}
    }

	$scope.viewSecrets = function()
	{
		// Open in app browser
		window.open('http://google.com','_blank'); 

	};

	$scope.isConnected = function(){
		return bluetoothService.IsConnected();
	}
	
})



.factory('cameraService', function($q){
	
	return{

		currentPhotoData: null
		,currentPhotoUri: ""

		,GetPicture: function(src){
			var source = src == 0 ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;
			var deferred = $q.defer();
			var that = this;
			navigator.camera.getPicture(
				function(result) {
        			// Do any magic you need
        			deferred.resolve(result);

      			}, 
      			function(err) {
       				deferred.reject(err);
      			}, 
      			{
      				destinationType: Camera.DestinationType.FILE_URI,
			      	sourceType: source,
			      	allowEdit: false,
			      	encodingType: Camera.EncodingType.JPEG,
			      	popoverOptions: CameraPopoverOptions,
			      	saveToPhotoAlbum: false
      			} // TODO: CAmera options! https://github.com/apache/cordova-plugin-camera
      		);
      		return deferred.promise;
		}

		,SavePicture: function(path){
			var newFileUri  = cordova.file.dataDirectory + "images/";
			var fileExt     = "." + oldFileUri.split('.').pop();
		}
	}
})

.factory('filesService', function($http, $q, $ionicLoading){
	return{

		gToken: null

		,GetToken: function(){
			return this.gToken;
		}
		,SetToken: function(token){
			this.gToken = token;
		}

		/**
		* Returns a promise that creates a file in google drive
		*
		*/
		,CreateFile: function(name, description, gToken){
		    
		    var deferred = $q.defer();
    		
    		var that = this;
		    var req = {
				 method: 'POST',
				 url: 'https://www.googleapis.com/drive/v2/files?access_token='+that.GetToken(), // Apparently the authorisation header is not taken? I just pass it along too.
				 headers: {
				   'Content-Type': 'application/json',
				   'Authorization': 'Bearer '+that.GetToken()
				 },
				 data: {
		    		title: name,
		    		"mimeType": 'image/jpeg',
		    		description: description
		    	}
			}

		    $http(req).then(
				function(response){
					deferred.resolve(response.data);
				}
				,function(data, status){
					deferred.reject(data); 
				}

			)

			return deferred.promise

		}

		/**
		* Returns a promise that puts contents into a given file id
		*
		*/
		,UploadPhoto: function(fileId, base64content, gtoken){
			
			var deferred = $q.defer();
			console.debug("about to add content for file:"+fileId);
			console.debug("content to push:"+base64content);

			const boundary = '-------314159265358979323846';
  			const delimiter = "\r\n--" + boundary + "\r\n";
  			const close_delim = "\r\n--" + boundary + "--";
			var contentType = 'application/octect-stream';
		    var metadata = {
		      'title': name,
		      'mimeType': contentType
		    };

		    var multipartRequestBody =
		        delimiter +
		        'Content-Type: application/json\r\n\r\n' +
		        //JSON.stringify(metadata) +
		        delimiter +
		        'Content-Type: ' + contentType + '\r\n' +
		        'Content-Transfer-Encoding: base64\r\n' +
		        '\r\n' +
		        base64content +
		        close_delim;

			var req = {
				 method: 'PUT',
				 url: 'https://www.googleapis.com/upload/drive/v2/files/'+fileId+'?access_token='+ gtoken+"&uploadType=multipart", // Apparently the authorisation header is not taken? I just pass it along too.
				 headers: {
				  'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
				   'Authorization': 'Bearer '+ gtoken
				 },
				 body: multipartRequestBody
			}

			$http(req).then(
				function(response){
					console.debug(response);
					deferred.resolve(response);
				}
				,function(data, status){
					console.debug(data);
					deferred.reject(data)
				}

			)

			return deferred.promise;

		}


		,GetFileEntryFromPath: function(path){
			var deferred = $q.defer();
			try{
				if(typeof(path) === "undefined")
					path = cordova.file.externalRootDirectory
				var deferred = $q.defer();
				window.resolveLocalFileSystemURL(
					path
					,function(entry){
						deferred.resolve(entry)
					}
					,function(error){
						deferred.reject(error);
					}
				);
			}catch(error){
				console.debug("GetFileEntryFromPath. Peta. Estás en local?");
				deferred.reject(error);
			}
			
            return deferred.promise;
		},



		GetContents: function(fileEntry){
			var deferred = $q.defer();
			directoryReader = (typeof(fileEntry.root) != "undefined") ? fileEntry.root.createReader() : fileEntry.createReader();
			directoryReader.readEntries(
				function(entries){
					deferred.resolve(entries);
				}
				,function(error){
					deferred.reject(errorr)
				}
			)
			return deferred.promise;
		}


		,MoveFile: function(fileEntry, moveToPath){
			console.log("move from");
			console.debug(fileEntry);
			console.log("move to");
			console.debug(moveToPath);
		}
	}
})



if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (str){
        return this.indexOf(str) == 0;
    };
}
