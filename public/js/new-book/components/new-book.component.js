;(function() {
  "use strict";

  angular.
    module("newBook").
    component("newBook", {
      template: `
        <form action="/" ng-submit="$ctrl.addNewBook($event)">
          <label for="book-title">Title: </label>
          <input
            type="text"
            id="book-title"
            ng-model="$ctrl.bookTitle"
            required/><br>
          <label for="book-author">Author: </label>
          <input
            type="text"
            id="book-author"
            ng-model="$ctrl.bookAuthor"
            required/><br>
          <image-uploader></image-uploader>
          <label for="book-description">Description: </label>
          <textarea
            name="book-description"
            id="book-description"
            cols="30" rows="10"
            ng-model="$ctrl.bookDescription"
            required></textarea>
            <button>Add new book</button>
        </form>
      `,
      controller: newBookController
    });

  function newBookController() {
    let vm = this,
        bookRef = firebase.database().ref("Books");

    vm.bookTitle = "";
    vm.bookAuthor = "";
    vm.bookDescription = "";
    vm.addNewBook = addNewBook;
    vm.coverUrl = "";
    vm.createCover = createCover;

    function addNewBook(ev) {
      ev.preventDefault();

      if(!vm.coverUrl) return;

      let book = {
        title: vm.bookTitle,
        author: vm.bookAuthor,
        description: vm.bookDescription,
        cover: vm.coverUrl,
        rate: 0
      };

      bookRef.push(book, function(err) {
        if(err) console.error(err);
      });
    }

    function createCover(url) {
      vm.coverUrl = url;
    }
  }
})();













