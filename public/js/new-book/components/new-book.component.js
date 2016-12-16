;(function() {
  "use strict";

  angular.
    module("newBook").
    component("newBook", {
      templateUrl: "js/new-book/components/template/new-book.template.html",
      controller: newBookController
    });

  function newBookController() {
    let vm = this,
        cover,
        bookRef = firebase.database().ref("Books");

    vm.bookTitle = "";
    vm.bookAuthor = "";
    vm.bookDescription = "";
    vm.addNewBook = addNewBook;
    vm.coverUrl = "";
    vm.createCover = createCover;

    function addNewBook(ev) {
      ev.preventDefault();

      if(!cover) return;

      let storage = firebase.storage().ref(),
          filename = `book-covers/${Date.now()}-${cover.name}/`,
          ref = storage.child(filename);

        ref.
          put(cover, { "ContentType": cover.type }).
          then(function(e) {
            console.log(e);
            vm.coverUrl = filename;

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
          });
    }

    function createCover(file) {
      cover = file;
    }
  }
})();













