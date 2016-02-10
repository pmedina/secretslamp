
var requestToken = "";
var accessToken = "";
var clientId = "101408338031-ql7flepeaeskd22k9ndggctn99qlnhcf.apps.googleusercontent.com";
var clientSecret = "9m92Fhei0wB2XLaEha7pUFIT";

angular.module('slamp.files', ['ionic'])

.run(function($ionicPlatform, $http) {

	console.debug("run auth");
	return;
	// Open in external browser
 	var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/drive.file&response_type=code&access_type=online', '_blank', 'location=no');
	ref.addEventListener('loadstart', function(event) { 
	    if((event.url).startsWith("http://localhost/callback")) {
	        requestToken = (event.url).split("code=")[1];
	        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
			$http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
			.then(
				function(data){
					accessToken = data.access_token;
				}
				,function(data, status){
					alert("ERROR: " + data);
				}

			)
            ref.close();
	    }
	});
})

.controller('FilesCtrl', function(filesService, cameraService, $scope, $ionicPlatform, $state, $ionicLoading) {
	

	//$scope.files = [];
    //$currentDir = null;
    //$hasParent = false;


    $ionicPlatform.ready(function() {
   		/*filesService.GetFileEntryFromPath().then(
   			function(entry){
   				$scope.files = entry;
   			}
   			,function(failure){
   				console.debug(failure);
   			}
   		)*/
    })

	$scope.fromCamera = function()
	{
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
		console.debug($scope.getCurrentPhotoData());
		alert("TODO! base64 content exists in $scope.getCurrentPhotoData()");
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

.factory('filesService', function($http, $q){
	return{
		GetFileEntryFromPath: function(path){
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
