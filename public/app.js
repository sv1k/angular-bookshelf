;(function() {
  "use strict";

  angular.
    module("bookApp", []).
    config(function() {
      var config = {
        apiKey: "AIzaSyA1JpfN0-lBf_uxO7q74awI0s1ky6AIUuM",
        authDomain: "levelup-db.firebaseapp.com",
        databaseURL: "https://levelup-db.firebaseio.com",
        storageBucket: "levelup-db.appspot.com"
      };
      firebase.initializeApp(config);
    });

})();
