/**
 * Bento File Uploader NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.1.1
 * @date 26/12/2014
 *
 * Changelog:
 *
 * 26/12/2014
 * - [CXUI-492] Resetting input file value to select the same file after it's removed
 *
 * 11/08/2014
 * Initial build
 *
 * TODO: find out IE9 solution for input field solution, display the file name when selected
 *
 */

(function (angular, window, undefined) {

  'use strict';

  angular.module('bento.fileselector', ['bento.busyloader', 'bento.services'])
    .factory('$fileSelectorServices', [
      '$bentoServices',
      function ($bentoServices) {

        /**
         * Parse a File out from the file list and forward it back to the callback function
         * @param scope
         * @param files
         * @param callback
         * @param fileType
         */
        var parseFiles = function (scope, files, callback, fileType) {

          // Ignore non-file selection
          if (typeof files === 'undefined') {
            return;
          }

          var originalFiles = (scope.multiple()) ? files : [files[0]]; //1 element when `mutiple` is NOT `true`
          var selectedFiles = [];

          for (var i = 0; i < originalFiles.length; i++) {
            var file = originalFiles[i];
            if (isValidFileType(file, fileType)) {
              selectedFiles.push(file);
            }
          }

          // Add a file reference to scope
          scope.selectedFiles = selectedFiles;

          // Since this is a single file uploader for this version
          // Only the first element will be included into the callback function
          if (!!callback) {
            callback({
              files: selectedFiles
            });
          }


          $bentoServices.safeApply(scope);

        };

        /**
         * Determine if the first element in files has the right file type
         * @param file
         * @param fileTypes
         * @returns {boolean}
         */
        var isValidFileType = function (file, fileTypes) {
          var _ft = (!!fileTypes) ? fileTypes.trim() : '';
          var fileNameBreakDown = file.name.split('.');
          var fileExtension = fileNameBreakDown[fileNameBreakDown.length - 1];

          // This is no filetype specified
          if (typeof _ft === 'undefined' || _ft.length === 0) {
            return true;
          }

          // Check if this file extension exists in fileTypes string
          if (fileTypes.search(fileExtension) !== -1) {
            return true;
          }

          // File extension does not exist in the fileTypes
          return false;
        };

        /**
         * Resets variables for the selector
         * @param scope
         */
        var resetFileSelector = function (scope) {
          scope.selectedFiles = undefined;
        };

        /**
         * Construct a new file input
         * @param scope
         * @returns {*}
         */
        var getFileInput = function (scope) {
          var fileInput = angular.element(
            '<input type="file" name="fileselect[]" ' +
            'class="sr-only" tabindex="-1"' +
            (!!scope.multiple ? ' multiple' : '') +
            ' />');

          return fileInput;
        };

        return {
          resetFileSelector: resetFileSelector,
          isValidFileType  : isValidFileType,
          parseFiles       : parseFiles,
          getFileInput     : getFileInput
        };

      }
    ])
    .controller('fileSelectorController', [
      '$scope',
      '$element',
      '$timeout',
      '$bentoServices',
      '$fileSelectorServices',
      function ($scope, $element, $timeout, $bentoServices, $fileSelectorServices) {

        // Initialize fileInput
        var fileInput = $fileSelectorServices.getFileInput($scope);

        // File input field file change callback
        fileInput.on('change', onFileInputChange);
        $element.append(fileInput);

        // Browse button click and trigger file input
        $scope.onBrowseClick = function ($event) {

          // Use native dispatch for IEs
          console.log($bentoServices.getIEVersion());
          if($bentoServices.getIEVersion() !== -1) {
            // Using the native dispatcher on click for the file selector
            var clickEvent = document.createEvent('Event');
            clickEvent.initEvent('click', true, true);
            fileInput[0].dispatchEvent(clickEvent);
          }else{
            // Otherwise simple
            fileInput[0].click();
          }

          if($event) {
            $event.stopPropagation();
            $event.preventDefault();
          }
        };

        // Watch Selected files count when removing
        $scope.$watch(function(){
          return !!$scope.selectedFiles? $scope.selectedFiles.length: 0;
        },
        function(newVal, oldVal){
          if(newVal < oldVal){
            // Create a new  input field for the next file selection
            var newFileInput = $fileSelectorServices.getFileInput($scope);
            newFileInput.on('change', onFileInputChange);

            // Replace the old fileInput with the new one
            fileInput.off('change', onFileInputChange);
            fileInput.replaceWith(newFileInput);
            fileInput = newFileInput;
          }
        });

        // User clicks on the file name remove icon
        // Removes the file name pill and notify the
        // parent controller if there is a callback function `onFileRemove()`
        $scope.onRemoveClick = function ($index) {
          var fileToBeRemoved = $scope.selectedFiles[$index];

          $scope.selectedFiles.splice($index, 1);

          if (!!$scope.onFileRemove) {
            $scope.onFileRemove({
              file: fileToBeRemoved
            });
          }
        };

        // Add drag and drop event listeners
        $element[0].addEventListener('dragover', function (event) {
          $element.addClass('dragged-over');

          // prevent browsers to open the file
          event.stopPropagation();
          event.preventDefault();

        });

        // When user drags the file away from the dropping area
        $element[0].addEventListener('dragleave', function (event) {
          $element.removeClass('dragged-over');
        });

        // When user drops a files into the dropping area
        $element[0].addEventListener('drop', function (event) {
          $element.removeClass('dragged-over');

          $fileSelectorServices.parseFiles(
            $scope,
            event.dataTransfer.files,
            $scope.onFileSelect,
            $scope.fileType);

          // prevent browsers to open the file
          event.stopPropagation();
          event.preventDefault();
        });

        function onFileInputChange(event){
          $fileSelectorServices.parseFiles(
            $scope,
            event.target.files,
            $scope.onFileSelect,
            $scope.fileType);
        }
      }
    ])
    .directive('fileSelector', [
      function () {
        return {
          controller : 'fileSelectorController',
          replace    : true,
          scope      : {
            fileType    : '@',    // Limit the type of file that needs to be selected
            onFileSelect: '&',    // Callback when a file is selected
            onFileRemove: '&',    // Callback when the selected file's reference is removed from this directive
            multiple    : '&'     // (Boolean) for multiple file selections
          },
          templateUrl: '../templates/file_selector/bento-file-selector.html'
        };
      }
    ]);

})(window.angular, window);
