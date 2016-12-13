;(function() {
  "use strict";

  angular.
    module("bookApp").
    component("bookApp", {
      template: `
        <a href="new-book">Add new book</a><br>

        <div class="book-container" ng-repeat="book in $ctrl.books">
          <h3>{{book.title}}</h3>
          <p>{{book.author}}</p>
          <img ng-src="book.bookCover" alt="" />
          <p>{{book.rate}}</p>
          <p>{{book.description}}</p>
        </div>
      `,
      controller: BookAppController
    });

  BookAppController.$inject = ["$scope"];

  function BookAppController($scope) {
    let vm = this,
        bookRef = firebase.database().ref("Books");


    vm.books = [];

    bookRef.on("value", function(snapshot) {
      // vm.users.push(snapshot.val());
      snapshot.forEach(function(subSnap) {
        vm.books.push(subSnap.val());
      });

      if(!$scope.$$phase) $scope.$apply();
    });
  }
})();