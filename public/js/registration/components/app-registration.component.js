;(function() {
  "use strict";

  angular.
    module("appRegistration").
    component("appRegistration", {
      template: `
        <div class="reg-form-container">
          Registration
          <form action="/" ng-submit="$ctrl.onRegistration($event)">
            <label for="reg-name">Name: </label>
            <input type="text" id="reg-name" ng-model="$ctrl.regName"/>
            <label for="reg-email">Email: </label>
            <input id="reg-email" type="email" ng-model="$ctrl.regEmail"/><br>
            <label for="reg-password">Password: </label>
            <input id="reg-password" type="password" ng-model="$ctrl.password"/><br>
            <button>Login</button>
          </form>
          <p ng-show="$ctrl.error.isError">{{$ctrl.error.errorText}}</p>
        </div>
      `,
      controller: AppRegistrationController
    });

    AppRegistrationController.$inject = [];

    function AppRegistrationController() {
      let vm = this;

      vm.regEmail = "";
      vm.regName = "";
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
      vm.onRegistration = onRegistration;

      let usersRef = firebase.database().ref("Users"),
          auth = firebase.auth();

      function onRegistration(ev) {
        ev.preventDefault();

        let isValidPass = _validatePass(vm.password);

        if(!isValidPass) return;
        if(vm.regName.trim().length < 3) {
          vm.error.setError("Name should be at least 3 symbols");
          return;
        }

        auth.
          createUserWithEmailAndPassword(vm.regEmail, vm.password).
          then(function(res) {
            let user = {
              name: vm.regName,
              email: res.email
            };

            usersRef.child(res.uid).set(user);
          }).
          catch(function(e) {
            console.log("CREATE USER ERROR: ", e);
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