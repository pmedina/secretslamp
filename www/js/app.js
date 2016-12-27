// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'slamp.leds', 'slamp.files', 'slamp.ble', 'slamp.leds', 'slamp.datafactory'])

.run(function($ionicPlatform, $http, filesService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    console.debug("RUN GOOGLE AUTH");
    var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/drive.file&response_type=code&access_type=online', '_blank', 'location=no');
    ref.addEventListener('loadstart', function(event) { 
      if((event.url).startsWith("http://localhost/callback")) {
          requestToken = (event.url).split("code=")[1];
          console.debug("sending request");
          $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
      .then(
        function(response){
          console.debug(response);
          filesService.SetToken(response.data.access_token);
        }
        ,function(data, status){
          console.debug(data);
          alert("ERROR: " + data);
        }

      )
            ref.close();
      }
    });
  });
})

.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/)
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.upload_secret', {
    url: '/upload_secret',
    views: {
      'menuContent': {
        templateUrl: 'templates/upload_secret.html'
      }
    }
  })
  .state('app.credits', {
    url: '/credits',
    views: {
      'menuContent': {
        templateUrl: 'templates/credits.html'
      }
    }
  })
  .state('app.bonus_modes', {
    url: '/bonus_modes',
    views: {
      'menuContent': {
        templateUrl: 'templates/bonus_modes.html'
      }
    }
  })
  .state('app.photobrowser', {
    url: '/photobrowser',
    views: {
      'menuContent': {
          templateUrl: 'templates/photobrowser.html',
          controller: 'FilesCtrl'
      }
    }
  })
  .state('app.led', {
    url: '/led',
    views: {
      'menuContent': {
          templateUrl: 'templates/led.html',
          controller: 'LedsCtrl'
      }
    }
  })
  .state('app.led_random', {
    url: '/led_random',
    views: {
      'menuContent': {
          templateUrl: 'templates/led_random.html',
          controller: 'LedsCtrl'
      }
    }
  })
  .state('app.leds_back', {
    url: '/leds_back',
    views: {
      'menuContent': {
          templateUrl: 'templates/leds_back.html'
      }
    }
  })
  .state('app.leds_top', {
    url: '/leds_top',
    views: {
      'menuContent': {
          templateUrl: 'templates/leds_top.html'
      }
    }
  })
  .state('app.leds_left', {
    url: '/leds_left',
    views: {
      'menuContent': {
          templateUrl: 'templates/leds_left.html'
      }
    }
  })
  .state('app.leds_right', {
    url: '/leds_right',
    views: {
      'menuContent': {
          templateUrl: 'templates/leds_right.html'
      }
    }
  })
  .state('app.bluetooth', {
    url: '/bluetooth',
    views: {
      'menuContent': {
          templateUrl: 'templates/bluetooth.html'
      }
    }
  })
  .state('app.lampcontrol', {
      url: '/lampcontrol',
      views: {
        'menuContent': {
          templateUrl: 'templates/lampcontrol.html',
          controller: 'LedsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/bluetooth');
});
