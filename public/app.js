;(function() {
  "use strict";

  angular.
    module("bookApp", [
      "ngRoute",
      "appLogin"
    ]).
    config(AppConfig);

    AppConfig.$inject = ["$routeProvider", "$locationProvider"];

    function AppConfig($routeProvider, $locationProvider) {
      var config = {
        apiKey: "AIzaSyA1JpfN0-lBf_uxO7q74awI0s1ky6AIUuM",
        authDomain: "levelup-db.firebaseapp.com",
        databaseURL: "https://levelup-db.firebaseio.com",
        storageBucket: "levelup-db.appspot.com"
      };
      firebase.initializeApp(config);

      firebase.auth().onAuthStateChanged(function(user) {
        if(user) {
          console.log("loged in");
        }
      })

      console.log($routeProvider);
      $routeProvider.
        when("/login", {
          template: "<app-login></app-login>"
        }).
        when("/", {
          template: "<a href='/login'>login</a>",
          controller: function() {

          }
        });

      $locationProvider.html5Mode(true);

      
    }

})();
