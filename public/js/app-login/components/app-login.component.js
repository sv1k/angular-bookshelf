;(function() {
  "use strict";

  angular.
    module("appLogin").
    component("appLogin", {
      template: `
        <div class="login-form-container">
          <form action="/" ng-submit="$ctrl.onLogin($event)">
            <label for="login-email">Email: </label>
            <input id="login-email" type="email" ng-model="$ctrl.login"/><br>
            <label for="login-password">Password: </label>
            <input id="login-password" type="password" ng-model="$ctrl.password"/><br>
            <button>Login</button>
          </form>
          <p ng-show="$ctrl.error.isError">{{$ctrl.error.errorText}}</p>
        </div>
        <br />
        <a href="registration">Registration</a>
      `,
      controller: AppLoginController
    });

  AppLoginController.$inject = ["$location", "$scope"];
  function AppLoginController($location, $scope) {
    let vm = this;

    vm.login = "";
    vm.password = "";
    vm.error = {
      isError: false,
      errorText: "",
      setError(text) {
        this.isError = true;
        this.errorText = text;
      },
      clearError() {
        this.isError = false;
        this.errorText = "";
      }
    };
    vm.onLogin = onLogin;

    let usersRef = firebase.database().ref("Users"),
        auth = firebase.auth();

    function onLogin(ev) {
      ev.preventDefault();

      let isValidPass = _validatePass(vm.password);

      if(!isValidPass) return;

      auth.
        signInWithEmailAndPassword(vm.login, vm.password).catch(function(e) {
          vm.error.setError(e.message);
        });
    }

    function _validatePass(pass) {
      vm.error.clearError();

      if(pass.trim().length < 6) {
        vm.error.setError("Password should contain at least 6 characters");
        return false;
      }

      return true;
    }
  }
})();