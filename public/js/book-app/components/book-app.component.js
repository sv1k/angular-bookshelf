;(function() {
  "use strict";

  angular.
    module("bookApp").
    component("bookApp", {
      template: `
        <a href="new-book">Add new book</a><br>
        <input type="text" ng-model="$ctrl.newUserName"/>
        <button
          ng-click="$ctrl.createNewUser()">
          Create user
        </button>

        <br>

        <input type="text" ng-model="$ctrl.searchUserName"/>
        <button ng-click="$ctrl.searchUser()" >Search</button>

        <ul>
          <li ng-repeat="user in $ctrl.users">{{user.name}}</li>
        </ul>
      `,
      controller: BookAppController
    });

  BookAppController.$inject = ["$scope"];

  function BookAppController($scope) {
    let vm = this,
        usersRef = firebase.database().ref("Users");

    vm.newUserName = "";
    vm.users = [];
    vm.createNewUser = createNewUser;
    vm.searchUserName = "";
    vm.searchUser = searchUser;

    function searchUser() {
      let name = vm.searchUserName;

      if(!name.trim().length) return;

      usersRef.
        orderByChild("name").
        equalTo(name).
        on("value", function(snap) {
          vm.users = [];
          snap.forEach(function(childSnap) {
            vm.users.push(childSnap.val());
          });
        });
    }

    function createNewUser() {
      let name = vm.newUserName;

      if(!name.trim().length) return;

      usersRef.push({ name });
    }

    usersRef.on("value", function(snapshot) {
      // vm.users.push(snapshot.val());
      snapshot.forEach(function(subSnap) {
        vm.users.push(subSnap.val());
      });

      if(!$scope.$$phase) $scope.$apply();
    });
  }
})();