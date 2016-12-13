;(function() {
  "use strict";

  angular.
    module("newBook").
    component("imageUploader", {
      template: `
        <input id="book-cover-select" type="file" accept=".png,.jpg"/>
      `,
      bindings: {
        createCover: "&"
      },
      controller: ImageUploaderController
    });

  function ImageUploaderController() {
    let vm = this;

    vm.uploadFile = uploadFile;
    vm.selectCover = selectCover;

    document.getElementById("book-cover-select").addEventListener("change", selectCover);

    function uploadFile() {}
    function selectCover(ev) {
      let file = ev.target.files[0];
      console.log(file);

      vm.createCover({ file });
    }
  }
})();





















