;(function() {
  "use strict";

  angular.
    module("newBook").
    component("imageUploader", {
      template: `
        <div
          id="dnd-container"
          ng-style="{'background': $ctrl.imageUploaded ? 'url(' + $ctrl.imageUrl + ') 50% 50% / contain no-repeat' : '#fff'}">
        </div>
        <label for="book-cover-select">Select Cover</label>
        <input id="book-cover-select" name="book-cover-select" type="file" accept=".png,.jpg,.bmp"/>
      `,
      bindings: {
        createCover: "&"
      },
      controller: ImageUploaderController
    });

  ImageUploaderController.$inject = ["$scope"];

  function ImageUploaderController($scope) {
    let vm = this;

    vm.uploadFile = uploadFile;
    vm.selectCover = selectCover;
    vm.imageUploaded = false;
    vm.imageUrl = null;

    document.getElementById("book-cover-select").addEventListener("change", selectCover);
    document.getElementById("dnd-container").addEventListener("dragover", cancelDrag, false);
    document.getElementById("dnd-container").addEventListener("dragenter", cancelDrag, false);
    document.getElementById("dnd-container").addEventListener("drop", dropCover, false);

    function uploadFile() {}
    function selectCover(ev) {
      let file = ev.target.files[0];

      renderPreview(file);

      vm.createCover({ file });
    }

    function cancelDrag(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }

    function dropCover(ev) {
      ev.preventDefault();
      ev.stopPropagation();

      let file = ev.dataTransfer.files[0];

      renderPreview(file);
    }

    function renderPreview(file) {
      let reader = new FileReader();
      reader.addEventListener("load", renderImage);

      function renderImage() {
        vm.imageUrl = reader.result;
        vm.imageUploaded = true;
        $scope.$apply();
      }

      reader.readAsDataURL(file);
      vm.createCover({ file });
    }
  }
})();





















