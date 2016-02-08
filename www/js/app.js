// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'slamp.leds', 'slamp.files', 'slamp.ble', 'slamp.leds'])

.run(function($ionicPlatform) {
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

  .state('app.secrets', {
    url: '/secrets',
    views: {
      'menuContent': {
        templateUrl: 'templates/secrets.html',
        controller: 'FilesCtrl'
      }
    }
  })
  .state('app.filebrowser', {
    url: '/filebrowser',
    views: {
      'menuContent': {
          templateUrl: 'templates/filebrowser.html',
          controller: 'FilesCtrl'
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
  .state('app.lampcontrol_side1', {
    url: '/lampcontrol_side1',
    views: {
      'menuContent': {
          templateUrl: 'templates/lampcontrol_side1.html'
      }
    }
  })
  .state('app.lampcontrol_side2', {
    url: '/lampcontrol_side2',
    views: {
      'menuContent': {
          templateUrl: 'templates/lampcontrol_side2.html'
      }
    }
  })
  .state('app.lampcontrol', {
      url: '/lampcontrol',
      views: {
        'menuContent': {
          templateUrl: 'templates/lampcontrol.html'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/secrets');
});
