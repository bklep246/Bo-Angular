/**
 * Built on: 2015-10-30T20:40:39
 * Bento Modern v1.2.0
 * Copyright 2015 Thomson Reuters
 * Maintained by Chi Gao, Joe Huang, Aaron Mendez
 */
(function(angular){
  'use strict';
  //Register Bento Modern
  angular.module('bento.modern',[
    'ngAnimate',
    'bento.modern.ui',
    'bento.services',
    'bento.busyloader',
    'bento.append.to.parent',
    'bento.carousel',
    'bento.combobox',
    'bento.cookie',
    'bento.datatable',
    'bento.fileselector',
    'bento.inputblur',
    'bento.numberinput',
    'bento.off.canvas.menu',
    'bento.pagination',
    'bento.reset',
    'bento.select',
    'bento.splittergroup',
    'bento.tagsinput',
    'bento.translate',
    'bento.table',
    'bento.toggle',
    'bento.toolbar',
    'bento.tree',
    'bento.wizard',
    'bento.nav.toolbar',
    'bento.progressbar',
    'bento.transferbox',
    'bento.multiselectoverlay',
    'bento.dropdown.append.to.parent',
    'bento.alert',
    'bento.datepicker.rome',
    'bento.megamenu'
    
  ]).config(['$logProvider', function($logProvider){
    $logProvider.debugEnabled(false);
  }]);
})(window.angular);

angular.module('bento.modern.ui', ['../templates/alerts/bento_alert.html', '../templates/carousel/cards/bento-carousel-card-ls-default.html', '../templates/combobox/bento-combobox-container.html', '../templates/combobox/bento-combobox-row-template.html', '../templates/combobox/bento-combobox.html', '../templates/file_selector/bento-file-selector.html', '../templates/multiselect_list/bento-multiselect-list.html', '../templates/multiselect_overlay/bento-multiselect-overlay.html', '../templates/pagination/bento-pagination.html', '../templates/progressbar/bento-progressbar.html', '../templates/spread/bento-spread.html', '../templates/tags_input/bento-tags-input-pill.html', '../templates/tags_input/bento-tags-input.html', '../templates/toggle/bento-toggle.html', '../templates/toolbar/bento-toolbar.html', '../templates/transfer_box/bento-transferbox.html', '../templates/tree/bento-tree.html', 'template/accordion/accordion-group.html', 'template/tabs/tab.html', 'template/tabs/tabset.html']);

angular.module("../templates/alerts/bento_alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/alerts/bento_alert.html",
    "<div class=\"alert-container refresh-data\">\n" +
    "  <div class=\"bento-alert-container\" ng-repeat=\"alert in bentoAlertObject\" rel=\"bento-alert-{{$index}}\">\n" +
    "    <div class=\"alert bento-alert\"\n" +
    "         ng-class=\"['alert-' + (alert.type || 'warning'), alert.closeable ? 'alert-dismissable' : null]\"\n" +
    "         role=\"alert\"\n" +
    "         bento-alert-timeout-with-object=\"alert\"\n" +
    "        >\n" +
    "      <button ng-show=\"alert.closeable\" type=\"button\" class=\"close\" ng-click=\"closeBentoAlert($index)\">\n" +
    "        <span aria-hidden=\"true\"><i class=\"bento-icon-close-x\"></i></span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "      </button>\n" +
    "\n" +
    "      <span ng-bind-html=\"alert.msg\"></span>\n" +
    "\n" +
    "      <a href=\"#\" ng-if=\"alert.link.cond\"\n" +
    "         ng-click=\"alert.link.click()\"\n" +
    "         class=\"btn\"\n" +
    "          >\n" +
    "        {{ alert.link.msg }}\n" +
    "      </a>\n" +
    "\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../templates/carousel/cards/bento-carousel-card-ls-default.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/carousel/cards/bento-carousel-card-ls-default.html",
    "<article class=\"bento-carousel-card-lonestar\">\n" +
    "	<header>\n" +
    "		<h4 class=\"label\" ng-bind=\"label\"></h4>\n" +
    "	</header>\n" +
    "	<div class=\"main-title\" ng-bind=\"mainTitle\"></div>\n" +
    "	<div class=\"sub-title\" ng-bind=\"subTitle\"></div>\n" +
    "	<div class=\"content\" ng-bind=\"content\"></div>\n" +
    "	<footer>\n" +
    "		<div class=\"time-stamp\" ng-bind=\"lastEdited\" ng-if=\"lastEdited\"></div>	\n" +
    "		<div class=\"due-date\" ng-bind=\"dueDate\" ng-if=\"dueDate\"></div>	\n" +
    "	</footer>\n" +
    "</article>");
}]);

angular.module("../templates/combobox/bento-combobox-container.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/combobox/bento-combobox-container.html",
    "<div class=\"bento-combobox-container\">\n" +
    "  <ul class=\"bento-combobox-container-header\"\n" +
    "      ng-if=\"!!headers\"\n" +
    "      >\n" +
    "    <li class=\"bento-combobox-container-header-label\"\n" +
    "        ng-repeat=\"header in headers track by $index\"\n" +
    "        >\n" +
    "      {{header}}\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <div class=\"bento-combobox-container-body\"\n" +
    "       tabindex=\"-1\"\n" +
    "      >\n" +
    "    <ul ng-if=\"!isTable\"\n" +
    "        class=\"bento-combobox-container-list\">\n" +
    "      <li bento-combobox-row-template\n" +
    "          ng-repeat=\"item in data track by $index\"\n" +
    "          ng-class=\"{selected: selectedIndex == $index}\"\n" +
    "          ng-click=\"selectItem($index)\"\n" +
    "          rel=\"row-{{$index}}\"\n" +
    "          $item=\"item\"\n" +
    "          $index=\"$index\"\n" +
    "          $label-name=\"labelName\"\n" +
    "          row-template=\"rowTemplate\"\n" +
    "          >\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul ng-if=\"isTable\"\n" +
    "        class=\"bento-combobox-container-list\">\n" +
    "      <li bento-combobox-row-template\n" +
    "          ng-repeat=\"item in data track by $index\"\n" +
    "          ng-class=\"{selected: selectedIndex == $index}\"\n" +
    "          ng-click=\"selectItem($index)\"\n" +
    "          rel=\"row-{{$index}}\"\n" +
    "          $item=\"item\"\n" +
    "          $index=\"$index\"\n" +
    "          $label-name=\"labelName\"\n" +
    "          row-template=\"rowTemplate\"\n" +
    "          >\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../templates/combobox/bento-combobox-row-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/combobox/bento-combobox-row-template.html",
    "<span class=\"bento-combobox-container-item\" tabindex=\"-1\"></span>");
}]);

angular.module("../templates/combobox/bento-combobox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/combobox/bento-combobox.html",
    "<div class=\"bento-combobox bento-select form-control\"\n" +
    "     ng-class=\"{'open': isContainerVisible, 'no-value': !inputValue}\"\n" +
    "     tabindex = '-1'\n" +
    "    >\n" +
    "  <input class=\"form-control {{inputClasses}}\"\n" +
    "         type=\"text\"\n" +
    "         placeholder=\"{{placeholder}}\"\n" +
    "         name=\"comboxInput\"\n" +
    "         autocomplete=\"off\"\n" +
    "         aria-autocomplete=\"none\"\n" +
    "         ng-keyup=\"onInputKeyup($event);\"\n" +
    "         ng-keypress=\"onInputKeypress($event)\"\n" +
    "         ng-keydown=\"onInputKeyDown($event);\"\n" +
    "         ng-show=\"searchable\"\n" +
    "         ng-readonly=\"readonly\"\n" +
    "         ng-disabled=\"ngDisabled\"\n" +
    "         ng-model=\"inputLabel\"/>\n" +
    "\n" +
    "  <div class=\"input-label form-control\"\n" +
    "       ng-class=\"{'disabled': ngDisabled}\"\n" +
    "       ng-if=\"!searchable\"\n" +
    "       ng-keyup=\"onInputKeyup($event);\"\n" +
    "       ng-keydown=\"onInputKeyDown($event);\"\n" +
    "       ng-disabled=\"ngDisabled\"\n" +
    "       ng-click=\"onButtonClick($event)\"\n" +
    "       tabindex=\"0\"\n" +
    "      >\n" +
    "    {{inputLabel}}\n" +
    "  </div>\n" +
    "  <div class=\"placeholder\"\n" +
    "       ng-class=\"{'disabled': ngDisabled}\"\n" +
    "       ng-if=\"!searchable && (!inputLabel || inputLabel.length === 0)\"\n" +
    "       ng-disabled=\"ngDisabled\"\n" +
    "       >\n" +
    "    {{placeholder}}\n" +
    "  </div>\n" +
    "  <div busy-loader=\"loadingData\" busy-loader-size=\"small\" class=\"preloader\"></div>\n" +
    "\n" +
    "  <div class=\"btn\"\n" +
    "       tabindex=\"-1\"\n" +
    "       ng-class=\"{'disabled':ngDisabled}\"\n" +
    "       ng-show=\"!readonly\"\n" +
    "       ng-click=\"onButtonClick($event)\"\n" +
    "      >\n" +
    "    <i ng-class=\"{'bento-icon-caret-up':isContainerVisible,'bento-icon-caret-down':!isContainerVisible}\"></i>\n" +
    "  </div>\n" +
    "  <div bento-combobox-container\n" +
    "       tabindex=\"-1\"\n" +
    "       class=\"bento-append-to-parent\"\n" +
    "       data=\"data\"\n" +
    "       selected-index=\"selectedIndex\"\n" +
    "       headers=\"headers\"\n" +
    "       is-table=\"!!headers\"\n" +
    "       label-name=\"labelName\"\n" +
    "       on-item-click=\"onItemClick(index)\"\n" +
    "       controller=\"containerCtrl\"\n" +
    "       row-template=\"rowTemplate\"\n" +
    "       on-end-of-scroll=\"onEndOfScroll()\"\n" +
    "      ></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/file_selector/bento-file-selector.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/file_selector/bento-file-selector.html",
    "<div class=\"bento-file-selector\">\n" +
    "  <span class=\"header\">Drag a File Here</span> or<br/>\n" +
    "  <button class=\"btn btn-primary\"\n" +
    "          data-ng-click=\"onBrowseClick($event)\"\n" +
    "          role=\"button\"\n" +
    "          aria-label=\"browse for file\"\n" +
    "      ><span>Browse for File </span><i class=\"bento-icon-chevron-right\"></i>\n" +
    "  </button>\n" +
    "  <div class=\"filename-container\" ng-if=\"showSelected\">\n" +
    "    <div class=\"btn btn-default bento-file-selector-filename\" data-ng-repeat=\"file in selectedFiles\">\n" +
    "      {{file.name}}{{showFileSize? ' (' + (file.size | bentoFileSizeFilter) + ')' : ''}}\n" +
    "      <i data-ng-click=\"onRemoveClick($index)\"\n" +
    "         role=\"button\"\n" +
    "         aria-label=\"remove {{file.name}}\"\n" +
    "         class=\"bento-icon-close-circle\"\n" +
    "          >\n" +
    "      </i>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../templates/multiselect_list/bento-multiselect-list.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/multiselect_list/bento-multiselect-list.html",
    "<div class=\"bento-multiselect-list\">\n" +
    "  <div class=\"bento-multiselect-list-item bento-multiselect-search\">\n" +
    "    <div class=\"pills\">\n" +
    "      <ul class=\"nav nav-pills\">\n" +
    "        <li data-ng-class=\"{active:!showSelected}\"><a data-ng-click=\"showSelected=false\">\n" +
    "          {{\n" +
    "          'BENTO_MODERN_MULTISELECT_OVERLAY_SHOW_ALL' | bentoTranslate:showAllText\n" +
    "          }}\n" +
    "        </a></li>\n" +
    "        <li data-ng-class=\"{active:showSelected}\"><a data-ng-click=\"showSelected=true\">\n" +
    "          {{\n" +
    "          'BENTO_MODERN_MULTISELECT_OVERLAY_SHOW_SELECTED' | bentoTranslate:showSelectedText\n" +
    "          }}\n" +
    "        </a></li>\n" +
    "      </ul>\n" +
    "    </div>\n" +
    "    <input bento-reset\n" +
    "           type=\"text\"\n" +
    "           data-ng-model=\"searchTerm.name\"\n" +
    "           class=\"form-control\"\n" +
    "        />\n" +
    "  </div>\n" +
    "  <div class=\"bento-multiselect-list-scroll-pane\">\n" +
    "    <div\n" +
    "        class=\"bento-multiselect-list-item\"\n" +
    "        ng-click=\"onSelectAllClick()\"\n" +
    "        ng-class=\"{selected:selectAll}\"\n" +
    "        ng-if=\"!showSelected && ngModel && ngModel.length > 0\"\n" +
    "        tab-index=\"0\"\n" +
    "        >\n" +
    "      <input type=\"checkbox\" ng-model=\"selectAll\" aria-label=\"select all\"/>\n" +
    "      <span>({{\n" +
    "        'BENTO_MODERN_MULTISELECT_OVERLAY_SELECT_ALL' | bentoTranslate:selectAllText\n" +
    "        }})</span>\n" +
    "    </div>\n" +
    "    <div\n" +
    "        class=\"bento-multiselect-list-item\"\n" +
    "        ng-click=\"onItemClick(item)\"\n" +
    "        ng-repeat=\"item in ngModel | filter:searchTerm:strict | multiselectShowSelected:showSelected\"\n" +
    "        ng-class=\"{selected:item.__bsoChecked}\"\n" +
    "        title=\"{{item.name}}\"\n" +
    "        tab-index=\"0\"\n" +
    "        >\n" +
    "      <input type=\"checkbox\" ng-model=\"item.__bsoChecked\" aria-label=\"select {{item.name}}\"/>\n" +
    "      <span ng-bind-html=\"htmlEntities(item.name) | highlight:searchTerm.name\"></span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("../templates/multiselect_overlay/bento-multiselect-overlay.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/multiselect_overlay/bento-multiselect-overlay.html",
    "<span>{{\n" +
    "  selectedItemCount === 0 ?\n" +
    "  ''\n" +
    "  :\n" +
    "  (selectedItemCount === 1 ?\n" +
    "    firstItemName\n" +
    "    :\n" +
    "    selectedItemCount === ngModel.length ?\n" +
    "      ('BENTO_MODERN_MULTISELECT_OVERLAY_ALL_SELECTED_INFO' | bentoTranslate:allSelectedInfoText\n" +
    "      | bentoStringReplace:'NUMBER':ngModel.length)\n" +
    "      :\n" +
    "      ('BENTO_MODERN_MULTISELECT_OVERLAY_SELECTED_INFO' | bentoTranslate:selectedInfoText\n" +
    "      | bentoStringReplace:'NUMBER':selectedItemCount)\n" +
    "  ) + '&nbsp;&nbsp;&nbsp;'\n" +
    "  }}</span>\n" +
    "<div bento-side-overlay\n" +
    "     side=\"{{!!side? side : 'right'}}\"\n" +
    "     on-done=\"onDoneClick()\"\n" +
    "     overlay-height=\"multiselectListMaxHeight\"\n" +
    "     done-button-text=\"{{doneButtonText}}\"\n" +
    "    >\n" +
    "  <button bento-side-overlay-toggle class=\"btn btn-default\">{{\n" +
    "    selectedItemCount === 0 ?\n" +
    "    ('BENTO_MODERN_MULTISELECT_OVERLAY_SELECT' | bentoTranslate:selectButtonText)\n" +
    "    :\n" +
    "    ('BENTO_MODERN_MULTISELECT_OVERLAY_EDIT' | bentoTranslate:editButtonText)\n" +
    "    }}\n" +
    "  </button>\n" +
    "  <div bento-side-overlay-content>\n" +
    "    <div bento-multiselect-list\n" +
    "         ng-model=\"ngModel\"\n" +
    "         ng-change=\"ngChange()\"\n" +
    "         selected-items=\"selectedItems\"\n" +
    "         max-allowed-height=\"multiselectListMaxHeight\"\n" +
    "         select-all-text=\"{{selectAllText}}\"\n" +
    "         show-all-text=\"{{showAllText}}\"\n" +
    "         show-selected-text=\"{{showSelectedText}}\"\n" +
    "         class=\"fill\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/pagination/bento-pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/pagination/bento-pagination.html",
    "<ul class=\"bento-pagination\">\n" +
    "  <li ng-if=\"boundaryLinks()!==false\" class=\"paginate_button first first_button\"\n" +
    "      ng-class=\"{disabled: currentPage === 1||VM.maxPage === 1}\">\n" +
    "    <a ng-click=\"goToPage(1)\"><span class=\"bento-icon-chevron-first-left\"></span></a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks()!==false\" class=\"paginate_button previous\"\n" +
    "      ng-class=\"{first_button: !boundaryLinks() , disabled: currentPage === 1||VM.maxPage === 1}\">\n" +
    "    <a ng-click=\"goToPage(currentPage-1)\"><span class=\"bento-icon-chevron-left\"></span></a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"directionLinks()!==false\" class=\"paginate_button next\"\n" +
    "      ng-class=\"{last_button: !boundaryLinks(),disabled: currentPage === VM.maxPage||VM.maxPage <= 1}\">\n" +
    "    <a ng-click=\"goToPage(currentPage+1)\"><span class=\"bento-icon-chevron-right\"></span></a>\n" +
    "  </li>\n" +
    "  <li ng-if=\"boundaryLinks()!==false\" class=\"paginate_button last last_button\"\n" +
    "      ng-class=\"{disabled: currentPage === VM.maxPage||VM.maxPage <= 1}\">\n" +
    "    <a ng-click=\"goToPage('max')\"><span class=\"bento-icon-chevron-last-right\"></span></a>\n" +
    "  </li>\n" +
    "  <li class=\"paginate_input_wrap\" ng-if=\"VM.maxPage > 1\">\n" +
    "        <span class=\"input-group paginate-input-group\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"{{currentPage}}\" ng-model=\"VM.tgtPage\"\n" +
    "                   ng-keypress=\"keySelectPage($event, VM.tgtPage)\">\n" +
    "            <span class=\"input-group-btn paginate_input_wrap\">\n" +
    "            <button class=\"go btn btn-default btn-sq\" ng-click=\"goToPage(VM.tgtPage)\">\n" +
    "              {{'BENTO_MODERN_PAGINATION_GO_BUTTON' | bentoTranslate:goToText}}\n" +
    "              </button>\n" +
    "            </span>\n" +
    "        </span>\n" +
    "  </li>\n" +
    "  <li class=\"paginate-bento-select\">\n" +
    "    <div data-bento-select>\n" +
    "      <select class=\"form-control\" ng-model=\"itemsPerPage\"\n" +
    "              ng-options=\"item.value as item.label for item in itemsArray\">\n" +
    "      </select>\n" +
    "    </div>\n" +
    "  </li>\n" +
    "  <li class=\"paginate_info\" ng-if=\"VM.maxPage > 0\">\n" +
    "        <span class=\"ng-scope ng-binding\">{{\n" +
    "            'BENTO_MODERN_PAGINATION_INFO_PAGE_TEXT'\n" +
    "            | bentoTranslate:infoPageText\n" +
    "            | bentoStringReplace:'_PAGE_':currentPage\n" +
    "            | bentoStringReplace:'_PAGES_': Math.ceil(totalItems / itemsPerPage)\n" +
    "            }} </span>\n" +
    "  </li>\n" +
    "  <li class=\"paginate_info_select\" ng-if=\"VM.maxPage > 0\">\n" +
    "        <span class=\"ng-scope ng-binding\">{{\n" +
    "            'BENTO_MODERN_PAGINATION_INFO_TEXT'\n" +
    "            | bentoTranslate:infoText\n" +
    "            | bentoStringReplace:'_START_':(currentPage - 1) * itemsPerPage + 1\n" +
    "            | bentoStringReplace:'_END_':(totalItems < (itemsPerPage * currentPage)) ? totalItems : (itemsPerPage * currentPage)\n" +
    "            | bentoStringReplace:'_MAX_':totalItems\n" +
    "            }} </span>\n" +
    "  </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("../templates/progressbar/bento-progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/progressbar/bento-progressbar.html",
    "<div class=\"progressbar-cell\"><progressbar animate=\"animate\" value=\"dynamic\" type=\"{{barType}}\"></progressbar></div>\n" +
    "<div class=\"value-cell\">{{dynamic}}%</div>\n" +
    "");
}]);

angular.module("../templates/spread/bento-spread.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/spread/bento-spread.html",
    "<div id=\"ss\" class=\"bento-spreadjs\"></div>");
}]);

angular.module("../templates/tags_input/bento-tags-input-pill.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/tags_input/bento-tags-input-pill.html",
    "<div tabindex=\"-1\"\n" +
    "     class=\"bento-tags-input-pill\"\n" +
    "     ng-class=\"getClass()\"\n" +
    "    >\n" +
    "  <i class=\"bento-icon-edit\" ng-mousedown=\"onEditClick($event)\" ng-if=\"!isEditing && editable\"></i>\n" +
    "  <span\n" +
    "      class=\"bento-tags-input-pill-label\"\n" +
    "      ng-hide=\"isEditing\"\n" +
    "      >{{label}}</span>\n" +
    "  <i class=\"bento-icon-close-circle\" ng-click=\"onCloseClick($event)\" ng-if=\"!isEditing\"></i>\n" +
    "  <input ng-model=\"editLabel\"\n" +
    "         ng-trim=\"false\"\n" +
    "         ng-keyup=\"onKeyup($event)\"\n" +
    "         ng-keydown=\"onKeydown($event)\"\n" +
    "         ng-blur=\"onInputBlur($event)\"\n" +
    "         type=\"text\"\n" +
    "         ng-show=\"isEditing\"/>\n" +
    "    <span class=\"bento-tags-input-pill-size-ref\">{{editLabel | bentoTagsInputPillFilter}}</span>\n" +
    "</div>");
}]);

angular.module("../templates/tags_input/bento-tags-input.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/tags_input/bento-tags-input.html",
    "<div class=\"bento-tags-input form-control\"\n" +
    "     ng-class=\"getClass()\"\n" +
    "     tabindex=\"-1\"\n" +
    "     ng-keydown=\"onKeydown($event)\"\n" +
    "     ng-focus=\"onElementFocus()\"\n" +
    "    >\n" +
    "  <div ng-repeat=\"tag in ngModel track by $index\"\n" +
    "       bento-tags-input-pill\n" +
    "       editable=\"editable\"\n" +
    "       index=\"$index\"\n" +
    "       is-active=\"$index === activePill\"\n" +
    "       label=\"tag[propertyName]\"\n" +
    "       length=\"ngModel.length\"\n" +
    "       ng-blur=\"onPillBlur($index)\"\n" +
    "       ng-disabled=\"ngDisabled\"\n" +
    "       ng-focus=\"onPillFocus($index)\"\n" +
    "       on-close=\"onPillClose(index)\"\n" +
    "       on-delete-left=\"onPillDeleteLeft(index)\"\n" +
    "       on-delete-right=\"onPillDeleteRight(index)\"\n" +
    "       on-edit=\"onPillEdit(index)\"\n" +
    "       on-move-left=\"onPillMoveLeft(index)\"\n" +
    "       on-move-right=\"onPillMoveRight(index)\"\n" +
    "       on-pill-change=\"onPillChange(index,label)\"\n" +
    "       on-redundant-tag=\"onPillRedundant(index, isRedundant)\"\n" +
    "       on-tag-length=\"onPillTagLength(index, isValidLength)\"\n" +
    "       resize-callback=\"resizeInput(rect)\"\n" +
    "      ></div>\n" +
    "  <input class=\"bento-tags-input-text\"\n" +
    "         ng-disabled=\"ngDisabled\"\n" +
    "         ng-model=\"inputText\"\n" +
    "         ng-focus=\"onInputFocus()\"\n" +
    "         ng-keypress=\"onKeypress($event)\"\n" +
    "         ng-keyup=\"onKeyup($event)\"\n" +
    "         placeholder=\"{{(!ngModel || ngModel.length === 0)? placeholder: ''}}\"\n" +
    "         type=\"text\"\n" +
    "      />\n" +
    "  <input class=\"bento-tags-input-text-hidden\"\n" +
    "         ng-disabled=\"ngDisabled\"\n" +
    "         ng-focus=\"onHiddenInputFocus()\"\n" +
    "      />\n" +
    "</div>");
}]);

angular.module("../templates/toggle/bento-toggle.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/toggle/bento-toggle.html",
    "<div class=\"bento-toggle\"\n" +
    "     tabindex=\"0\"\n" +
    "     data-ng-class=\"{on : ngModel == true}\"\n" +
    "     role=\"toggle\"\n" +
    "  >\n" +
    "  <div class=\"bento-toggle-nob\"></div>\n" +
    "</div>");
}]);

angular.module("../templates/toolbar/bento-toolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/toolbar/bento-toolbar.html",
    "<div class=\"dataTables_toolbar_bento\">\n" +
    "    <div class=\"button-actions\">\n" +
    "        <button bento-toolbar-repeat\n" +
    "                ng-repeat=\"button in buttons\"\n" +
    "                ng-disabled=\"button.class=='disabled'\"\n" +
    "                ng-click=\"button.click()\"\n" +
    "                class=\"{{button.class}}\">\n" +
    "          <span ng-if=\"button.icon\" class=\"glyphicon {{button.icon}}\"></span>{{button.text}}\n" +
    "        </button>\n" +
    "        <div class=\"btn-group more-buttons\" dropdown is-open=\"status.isopen\" ng-if=\"morebuttons.length > 0\">\n" +
    "	      	<button type=\"button\" class=\"btn btn-primary dropdown-toggle\" dropdown-toggle ng-disabled=\"disabled\">\n" +
    "	        {{(movedButtons.length >= buttons.length) ?\n" +
    "            ('TOOLBAR_MENU' | bentoTranslate)\n" +
    "            :\n" +
    "            ('TOOLBAR_MORE' | bentoTranslate)\n" +
    "            }} <span class=\"glyphicon glyphicon-chevron-down\"></span>\n" +
    "	      	</button>\n" +
    "		    <ul class=\"dropdown-menu\" role=\"menu\">\n" +
    "		        <li ng-repeat=\"button in morebuttons\"\n" +
    "                ng-class=\"{divider: button.class == 'divider'}\">\n" +
    "              <button ng-if=\"button.class!='divider'\"\n" +
    "                      ng-click=\"button.click()\"\n" +
    "                      class=\"{{button.class}}\">\n" +
    "                <span ng-if=\"button.icon\" class=\"glyphicon {{button.icon}}\"></span>{{button.text}}\n" +
    "              </button>\n" +
    "            </li>\n" +
    "		    </ul>\n" +
    "	    </div>\n" +
    "    </div>\n" +
    "    <div id=\"dt-basic_filter\" class=\"dataTables_filter\" ng-if=\"hasSearch\">\n" +
    "        <div class=\"filter-container\">\n" +
    "            <input bento-reset\n" +
    "                   id=\"bento-reset-demo-input\"\n" +
    "                   class=\"\"\n" +
    "                   ng-keypress=\"keySelectPage($event)\"\n" +
    "                   type=\"search\"\n" +
    "                   placeholder=\"{{'TOOLBAR_SEARCH' | bentoTranslate}}\"\n" +
    "                   ng-model=\"searchInfo.term\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/transfer_box/bento-transferbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/transfer_box/bento-transferbox.html",
    "<div class=\"bento-transferbox\" ng-style=\"{'height':height}\">\n" +
    "  <div id=\"main-splitter-group\"\n" +
    "       data-bento-splitter-group\n" +
    "       data-left-width=\"60%\"\n" +
    "       data-is-left-collapsed=\"toggleRight\"\n" +
    "       data-collapsed=\"false\"\n" +
    "       data-resizable=\"true\"\n" +
    "       data-on-resize=\"onSplitterResize()\"\n" +
    "       data-no-collapse=\"true\"\n" +
    "       class=\"dark\"\n" +
    "      >\n" +
    "    <div data-bento-splitter-group-left>\n" +
    "      <div class=\"no-padding\">\n" +
    "        <div class=\"transferbox-header\">\n" +
    "          <div class=\"transferbox-header-info pull-left\" ng-show=\"currentInfo.boxOneInfoShown\">\n" +
    "            <h5 class=\"transferbox-header-title\">{{\n" +
    "              currentInfo.availableTitle\n" +
    "              }}</h5>\n" +
    "            <!-- INFO TEXT ONE -->\n" +
    "            <div class=\"transferbox-select-info\">{{\n" +
    "              currentInfo.selectedAvailableItems.length > 0 ?\n" +
    "              (BENTO_MODERN_TRANSFER_BOX_INFO_TEXT\n" +
    "              | bentoTranslate:infoText\n" +
    "              | bentoStringReplace:'_SELECTED_':currentInfo.selectedAvailableItems.length\n" +
    "              | bentoStringReplace:'_TOTAL_':currentInfo.totalAvailableItems)\n" +
    "              :\n" +
    "              currentInfo.totalAvailableItems;\n" +
    "              }}\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <button class=\"btn btn-default pull-right transferbox-btn\"\n" +
    "                  ng-class=\"{'btn-primary':currentInfo.selectedAvailableItems.length>0}\"\n" +
    "                  ng-disabled=\"currentInfo.selectedAvailableItems.length<=0\"\n" +
    "                  ng-click=\"transferItems('toAssigned')\">{{\n" +
    "            BENTO_MODERN_TRANSFER_BOX_BTN_TEXT | bentoTranslate:transferBtnText\n" +
    "            }}<span class=\"glyphicon glyphicon-chevron-right\"></span></button>\n" +
    "        </div>\n" +
    "        <div class=\"datatable-container\">\n" +
    "          <table bento-datatable\n" +
    "                 datatable-options=\"tableOptions\"\n" +
    "                 column-definitions=\"currentInfo.columnDefinitions\"\n" +
    "                 item-source=\"currentInfo.gridData\"\n" +
    "                 items-per-page=\"currentInfo.numItemsAvailable\"\n" +
    "                 is-row-editable=false\n" +
    "                 selected-items=\"currentInfo.selectedAvailableItems\"\n" +
    "                 unique-key=\"{{currentInfo.uniqueKey}}\"\n" +
    "                 page=\"currentInfo.availableItemsPage\"\n" +
    "                 server-side-data=\"false\"\n" +
    "                 search-term=\"currentInfo.availableSearchTerm\"\n" +
    "                 server-side-data=\"false\"\n" +
    "                 total-items=\"currentInfo.totalAvailableItems\"\n" +
    "                 items-per-page=\"currentInfo.numItemsAvailable\"\n" +
    "                 table-created=\"onTableCreated1(dataTableAPI)\"\n" +
    "                 table-drawn=\"onTableDrawn()\"\n" +
    "                 class=\"box1\"\n" +
    "                 checkbox-clicked=\"onCheckBoxClicked()\"\n" +
    "                 header-checkbox-click-state=\"currentInfo.boxOneClickState\"\n" +
    "                 column-filter-definitions=\"currentInfo.columnFilterDefinitions\"\n" +
    "                 column-filter-toggle=\"currentInfo.columnFilterToggle\"\n" +
    "                 transferbox=\"true\">\n" +
    "          </table>\n" +
    "          <div bento-pagination\n" +
    "               total-items=\"currentInfo.totalAvailableItems\"\n" +
    "               page=\"currentInfo.availableItemsPage\"\n" +
    "               boundary-links=\"false\"\n" +
    "               direction-links=\"true\"\n" +
    "               items-array=\"selectItems\"\n" +
    "               items-per-page=\"currentInfo.numItemsAvailable\"\n" +
    "               info-text=\"{{currentInfo.paginationInfoText}}\"\n" +
    "               info-page-text=\"{{currentInfo.paginationInfoPageText}}\"\n" +
    "               go-text=\"{{currentInfo.paginationGoText}}\"\n" +
    "               lang=\"language\"\n" +
    "               hide-go=\"true\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <section data-bento-splitter-group-main>\n" +
    "      <div class=\"no-padding\" ng-class=\"{'transferbox-cell': currentInfo.currentView =='Horizontal'}\">\n" +
    "        <div class=\"transferbox-header\">\n" +
    "          <button class=\"btn btn-default transferbox-btn pull-left\"\n" +
    "                  ng-disabled=\"currentInfo.selectedAssignedItems.length<=0\"\n" +
    "                  ng-click=\"transferItems('toAvailable')\"\n" +
    "                  ng-class=\"{'btn-primary':currentInfo.selectedAssignedItems.length>0}\"><span\n" +
    "              class=\"glyphicon glyphicon-chevron-left\"></span>{{\n" +
    "            BENTO_MODERN_TRANSFER_BOX_BTN_TEXT | bentoTranslate:transferBtnText\n" +
    "            }}\n" +
    "          </button>\n" +
    "          <div class=\"transferbox-header-info pull-right\" ng-show=\"currentInfo.boxTwoInfoShown\">\n" +
    "            <h5 class=\"transferbox-header-title\">{{\n" +
    "              currentInfo.selectedTitle\n" +
    "              }}</h5>\n" +
    "\n" +
    "            <!-- INFO TEXT TWO -->\n" +
    "            <div class=\"transferbox-select-info pull-right\">{{\n" +
    "              currentInfo.selectedAssignedItems.length > 0 ?\n" +
    "              (BENTO_MODERN_TRANSFER_BOX_INFO_TEXT\n" +
    "              | bentoTranslate:infoText\n" +
    "              | bentoStringReplace:'_SELECTED_':currentInfo.selectedAssignedItems.length\n" +
    "              | bentoStringReplace:'_TOTAL_':currentInfo.totalAssignedItems)\n" +
    "              :\n" +
    "              currentInfo.totalAssignedItems\n" +
    "              }}\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"datatable-container\">\n" +
    "          <table bento-datatable\n" +
    "                 datatable-options=\"tableOptions\"\n" +
    "                 column-definitions=\"currentInfo.columnDefinitions\"\n" +
    "                 item-source=\"currentInfo.assignedData\"\n" +
    "                 is-row-editable=false\n" +
    "                 selected-items=\"currentInfo.selectedAssignedItems\"\n" +
    "                 unique-key=\"{{currentInfo.uniqueKey}}\"\n" +
    "                 page=\"currentInfo.assignedItemsPage\"\n" +
    "                 search-term=\"currentInfo.assignedSearchTerm\"\n" +
    "                 total-items=\"currentInfo.totalAssignedItems\"\n" +
    "                 items-per-page=\"currentInfo.numItemsAssigned\"\n" +
    "                 server-side-data=\"false\"\n" +
    "                 table-created=\"onTableCreated2(dataTableAPI)\"\n" +
    "                 table-drawn=\"onTableDrawn()\"\n" +
    "                 class=\"box2\"\n" +
    "                 checkbox-clicked=\"onCheckBoxClicked()\"\n" +
    "                 header-checkbox-click-state=\"currentInfo.boxTwoClickState\"\n" +
    "                 column-filter-definitions=\"currentInfo.columnFilterDefinitions\"\n" +
    "                 column-filter-toggle=\"currentInfo.columnFilterToggle\"\n" +
    "                 transferbox=\"true\">\n" +
    "          </table>\n" +
    "          <div bento-pagination\n" +
    "               total-items=\"currentInfo.totalAssignedItems\"\n" +
    "               page=\"currentInfo.assignedItemsPage\"\n" +
    "               boundary-links=\"false\"\n" +
    "               direction-links=\"true\"\n" +
    "               items-array=\"selectItems\"\n" +
    "               items-per-page=\"currentInfo.numItemsAssigned\"\n" +
    "               lang=\"language\"\n" +
    "               info-text=\"{{currentInfo.paginationInfoText}}\"\n" +
    "               info-page-text=\"{{currentInfo.paginationInfoPageText}}\"\n" +
    "               go-text=\"{{currentInfo.paginationGoText}}\"\n" +
    "               hide-go=\"true\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </section>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("../templates/tree/bento-tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/tree/bento-tree.html",
    "<div class=\"bento-tree-branch\">\n" +
    "  <ul>\n" +
    "    <li ng-repeat=\"node in treeModel\" class=\"bento-tree-node {{node.disabled? 'bento-tree-disabled':''}}\">\n" +
    "      <div class=\"expand-button-compiled\"\n" +
    "           ng-if=\"node[nodeChildren].length > 0\"\n" +
    "           ng-click=\"toggleSelect(node)\">\n" +
    "        <div ng-class=\"{'bento-icon-caret-down':!node.collapsed,'bento-icon-caret-right':node.collapsed}\"></div>\n" +
    "      </div>\n" +
    "      <i ng-class=\"node[treeIcon]\" ng-if=\"!!node[treeIcon]\" ng-click=\"toggleSelect(node)\"></i>\n" +
    "      <input type=\"checkbox\"\n" +
    "             id=\"{{node._bentoTreeId}}\"\n" +
    "             class=\"bento-tree-check-box\"\n" +
    "             ng-if=\"useCheckbox && !node.hideCheckbox\"\n" +
    "             ng-model=\"node[checkboxModel]\"\n" +
    "             ng-click=\"checkboxClick(node)\"\n" +
    "             ng-disabled=\"node.disabled || treeDisabled\"\n" +
    "        />\n" +
    "      <i class=\"{{node[secondTreeIcon]}} second-tree-icon\"\n" +
    "         ng-if=\"!!node[secondTreeIcon]\"\n" +
    "         ng-click=\"toggleSelect(node)\"\n" +
    "          ></i>\n" +
    "      <span ng-class=\"getNodeSelectionClass(node)\"\n" +
    "            ng-bind-html=\"node[treeLabel]\"\n" +
    "            ng-click=\"labelSelect(node)\"></span>\n" +
    "      <div bento-tree\n" +
    "           ng-if=\"node[nodeChildren].length > 0\"\n" +
    "           tree-icon=\"{{treeIcon}}\"\n" +
    "           tree-model=\"node[nodeChildren]\"\n" +
    "           tree-collapsed=\"treeCollapsed\"\n" +
    "           collapse=\"node.collapsed\"\n" +
    "           tree-label=\"{{treeLabel}}\"\n" +
    "           node-children=\"{{nodeChildren}}\"\n" +
    "           collapsing-callback=\"collapsingCallback\"\n" +
    "           expanding-callback=\"expandingCallback\"\n" +
    "           select-callback=\"selectCallback\"\n" +
    "           multi-select=\"multiSelect\"\n" +
    "           use-checkbox=\"useCheckbox\"\n" +
    "           checkbox-model=\"{{checkboxModel}}\"\n" +
    "           select-model=\"{{selectModel}}\"\n" +
    "           selectable-model=\"{{selectableModel}}\"\n" +
    "           second-tree-icon=\"{{secondTreeIcon}}\"\n" +
    "           on-checkbox-change=\"onCheckboxChange\"\n" +
    "           select-as-check=\"selectAsCheck\"\n" +
    "           tree-selection-helper=\"treeSelectionHelper\"\n" +
    "           expand-only-model=\"{{expandOnlyModel}}\"\n" +
    "           tree-disabled=\"node.disabled || treeDisabled\"\n" +
    "        >\n" +
    "      </div>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>");
}]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\" ng-class=\"{open: isOpen}\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a href=\"javascript:void(0)\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\">\n" +
    "      	<i ng-class=\"isOpen === true ? 'bento-icon-minus-plain' : 'bento-icon-plus-plain'\" ></i>\n" +
    "      	<span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span>\n" +
    "      </a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-collapse collapse\" collapse=\"!isOpen\">\n" +
    "	  <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}<span ng-hide=\"!count\" class=\"badge\">{{count}}</span></a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div class=\"bento-tabset\">\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

(function(angular){

  'use strict';

  angular.module('bento.cookie',[])
    .provider('$bentoCookie', function(){

      this.getCookie = _getCookie;

      this.$get = [function(){
        return {
          getCookie : _getCookie
        };
      }];

      function _getCookie(cookieName, defaultValue){
        var cookie = (document.cookie.match('(^|; )' + cookieName + '=([^;]*)') || 0)[2];

        if((cookie === null || cookie === '' || typeof cookie === 'undefined') && !!defaultValue){
          cookie = defaultValue;
        }

        return cookie;
      }
    });

})(window.angular);

/* jshint -W044 */
(function (angular) {

  'use strict';

  // This greatly helps finding out the current JS file / Bento Frameworks location
  // and a possible solution to bundling issues with the i18n files
  var jsScripts = document.getElementsByTagName("script");
  var currentJSFileSrc = jsScripts[jsScripts.length - 1].src;

  /**
   * Bento Service Module
   */
  angular.module('bento.services', [])
  /**
   * Config the whole framework
   */
    .config([
      function () {
        // This is redundant but we'll use it for the time been
        var msTouchEnabled = window.navigator.msMaxTouchPoints;
        var generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if (msTouchEnabled || generalTouchEnabled) {
          angular.element(document.getElementsByTagName('body')).addClass('touch');
        }

        var os = getOS();

        angular.element(document.getElementsByTagName('body')).addClass(os);

        var browser = getBrowser();

        angular.element(document.getElementsByTagName('body')).addClass(browser.browser);
        angular.element(document.getElementsByTagName('body')).addClass(browser.browserVersion);
      }
    ]
  )
  /**
   * FILTER: Highlight a substring that matches the value and return it with <strong></strong>
   */
    .filter('highlight', function () {

      /**
       * @param str - input string
       * @param value - search string
       * @param bypass - bypass highlighting
       */
      return function (_str, value, bypass) {

        if (value === '' || typeof value === 'undefined' || bypass) {
          return _str;
        }

        var str = _str || '';
        var newStr;
        var re = new RegExp('(' + value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + ')', 'gi');
        newStr = str.replace(re, '<span class="matching-text-highlight">$&</span>');

        return newStr;
      };
    })
  /**
   * Find and replace a subString within a string
   */
    .filter('bentoStringReplace', function () {
      return function (str, find, replace) {
        return str.replace(find, replace);
      }
    })
  /**
   * BentoService Factory to provide various services and utilities
   */
    .factory('$bentoServices', [
      '$window',
      '$timeout',
      function ($window, $timeout) {
        return {
          // Returns current IE version
          getIEVersion      : getIEVersion,
          // rAF for animation
          rAF               : RAFProvider,
          // Detect retina displays
          retina            : $window.devicePixelRatio > 1,
          // Check if the device is touch supported
          isTouchSupported  : isTouchSupported,
          // Generate a numeric uniqueID
          generateUID       : generateUID,
          // Fire scope.$apply safely
          safeApply         : safeApply,
          // Check if a keyCode is printable
          isPrintableKeyCode: isPrintableKeyCode,
          // Check if desktop
          isDesktop         : isDesktop
        };
        /**
         * isDesktop
         * @returns {boolean}
         *
         * Check if current device is desktop
         *
         */
        function isDesktop() {
          var os = getOS();
          if (os != 'android' && os != 'ios') {
            return true;
          } else {
            return false;
          }
        }

        /**
         * isTouchSupported
         * @returns {boolean}
         *
         * Check of the current device is touch friendly
         *
         */
        function isTouchSupported() {
          var msTouchEnabled = window.navigator.msMaxTouchPoints;
          var generalTouchEnabled = "ontouchstart" in document.createElement("div");

          return msTouchEnabled || generalTouchEnabled;
        };

        /**
         * safeApply a function on a scope
         * @param scope
         * @param fn
         *
         */
        function safeApply(scope, fn) {
          var phase = scope.$root.$$phase;
          if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
              fn();
            }
          } else {
            scope.$apply(fn);
          }
        };

        /**
         * getIEVersion
         * @returns {number}
         *
         * Returns the version of Internet Explorer or a -1
         * (indicating the use of another browser).
         */
        function getIEVersion() {
          var rv = -1; // Return value assumes failure.
          var ua;
          var re;
          if (navigator.appName === 'Microsoft Internet Explorer') {

            ua = navigator.userAgent;
            re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
              rv = parseFloat(RegExp.$1);
            }
          } else if (navigator.appName === 'Netscape') {
            ua = navigator.userAgent;
            re = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) !== null) {
              rv = parseFloat(RegExp.$1);
            }
          }

          return rv;
        };

        /**
         * Generate an unique numeric ID
         */
        function generateUID() {
          return Math.round(Math.random() * 10000000).toString() + Math.round(Math.random() * 10000000).toString();
        }

        /**
         * This is a port to angularJS v1.2.11 and up $$rAF for temporary use
         * @param callBackFunc
         * @returns {Function}
         * @constructor
         */
        function RAFProvider(callBackFunc) {

          var requestAnimationFrame = $window.requestAnimationFrame ||
            $window.webkitRequestAnimationFrame ||
            $window.mozRequestAnimationFrame;

          var cancelAnimationFrame = $window.cancelAnimationFrame ||
            $window.webkitCancelAnimationFrame ||
            $window.mozCancelAnimationFrame ||
            $window.webkitCancelRequestAnimationFrame;

          var rafSupported = !!requestAnimationFrame;
          if (rafSupported) {
            var id = requestAnimationFrame(callBackFunc);
            return function () {
              cancelAnimationFrame(id);
            };
          } else {
            var timer = $timeout(callBackFunc, 16.66, false); // 1000 / 60 = 16.666
            return function () {
              $timeout.cancel(timer);
            };
          }
        }

        /**
         * Check if a keyCode is printable
         * @param keyCode
         * @returns {boolean}
         */
        function isPrintableKeyCode(keyCode) {
          return (keyCode > 47 && keyCode < 58) || // number keys
            keyCode === 32 || keyCode === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
            (keyCode > 64 && keyCode < 91) || // letter keys
            (keyCode > 95 && keyCode < 112) || // numpad keys
            (keyCode > 185 && keyCode < 193) || // ;=,-./` (in order)
            (keyCode > 218 && keyCode < 223);   // [\]' (in order)
        }
      }])
  /**
   * Help directive recursions without running into stack overflow on string replace
   */
    .factory('$recursionHelper', ['$compile', function ($compile) {
      return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function (element, link) {
          // Normalize the link parameter
          if (angular.isFunction(link)) {
            link = {post: link};
          }

          // Break the recursion loop by removing the contents
          var contents = element.contents().remove();
          var compiledContents;
          return {
            pre : (link && link.pre) ? link.pre : null,
            /**
             * Compiles and re-adds the contents
             */
            post: function (scope, element) {
              // Compile the contents
              if (!compiledContents) {
                compiledContents = $compile(contents);
              }
              // Re-add the compiled contents to the element
              compiledContents(scope, function (clone) {
                element.append(clone);
              });

              // Call the post-linking function, if any
              if (link && link.post) {
                link.post.apply(null, arguments);
              }
            }
          };
        }
      };
    }])
  /**
   * Provider: Provide Bento JS Root
   */
    .provider('$bentoJSRoot', function () {
      var bentoJSRootLink;
      var _this = this;

      /**
       * configAngularTranslateProvider
       * @param componentName
       * @param $translateProvider
       * @param $bentoTranslateLoaderProvider
       * @param defaultLanguage
       *
       * Configures $translateProvider for multilingual support
       */
      this.configAngularTranslateProvider = function (componentName, $translateProvider, $bentoTranslateLoaderProvider, defaultLanguage) {
        //Setup Bento Translate Loader
        //
        // Concert Example:
        //
        // $bentoTranslateLoaderProvider.addURLPattern('components/languages/lang-{lang}.js');
        //
        $bentoTranslateLoaderProvider.addURLPattern(_this.getBentoJSRoot(componentName) + 'i18n/' + componentName + '-{lang}.json');

        // Use Bento Translate Loader
        $translateProvider.useLoader('$bentoTranslateLoader');

        // Default all languages to en_us for the time been
        if (!!defaultLanguage) {
          $translateProvider.preferredLanguage(defaultLanguage.replace('-', '_').toLowerCase());
        } else {
          $translateProvider.preferredLanguage('en');
        }

        $translateProvider.translationNotFoundIndicatorLeft('!');
        $translateProvider.translationNotFoundIndicatorRight('!');

        $translateProvider.fallbackLanguage(defaultLanguage);
      };

      /**
       * getBentoJSRoot
       * @param elementName
       * @returns {string}
       */
      this.getBentoJSRoot = getBentoJSRoot;

      function getBentoJSRoot(elementName) {
        var bentoLinks = document.querySelectorAll('script[src]');  //document.querySelector('script[src~="/bento-"');
        var index = -1;
        for (var i = 0; i < bentoLinks.length; i++) {

          if (bentoLinks[i].attributes['src'].value.search('/' + elementName) != -1) {
            index = i;
            break;
          } else if (bentoLinks[i].attributes['src'].value.search('components/bento-modern.') != -1) {
            index = i;
            break;
          }
        }

        // currentJSFileSrc is a Global variable to this JS file
        // Check if bento-modern is loaded individually
        var bentoLinkTemp = (index === -1) ?
          // Death start approach
          currentJSFileSrc.split('/') :
          // Found it!
          bentoLinks[index].src.split('/');
        bentoLinkTemp.pop();
        bentoJSRootLink = bentoLinkTemp.join('/') + '/';

        return bentoJSRootLink;
      };

      /**
       * Turn on or of Full Console Error reporting where Chrome omits most of the outputs
       * @param bool
       */
      this.turnOnFullErrorReporting = function (bool) {
        if (bool) {
          //Chrome passes the error object (5th param) which we must use since it now truncates the Msg (1st param).
          window.onerror = function (errorMsg, url, lineNumber, columnNumber, errorObject) {
            var errMsg;
            //check the errorObject as IE and FF don't pass it through (yet)
            if (errorObject && errorObject !== undefined) {
              errMsg = errorObject.message;
            }
            else {
              errMsg = errorMsg;
            }
            window.console.log('Full Error: ' + errMsg);
          };
        } else {
          window.onerror = null;
        }
      };

      this.$get = [function () {
        if (typeof bentoJSRootLink === 'undefined') {
          getBentoJSRoot(currentJSFileSrc);
        }
        return bentoJSRootLink;
      }];
    });

  function getOS() {
    // Adding os name to body
    var OSName = navigator.appVersion;
    var os = 'unknown-os';
    if (OSName.indexOf("Win") !== -1) {
      os = 'win';
    } else if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
      os = 'ios';
    } else if (OSName.indexOf("Mac") !== -1) {
      os = 'mac';
    } else if (navigator.userAgent.toLowerCase().indexOf("android") > -1) {
      os = 'android';
    } else if (OSName.indexOf("X11") !== -1) {
      os = 'unix';
    } else if (OSName.indexOf("Linux") !== -1) {
      os = 'linux';
    } else if (OSName.indexOf("SunOS") !== -1) {
      os = 'solaris';
    }
    return os;
  }

  function getBrowser() {
    // Adding brower name and version to body
    var isOpera = !!window.opera || (navigator && navigator.userAgent.indexOf(' OPR/') >= 0);
    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var isMobileSafari = (navigator.userAgent && (navigator.userAgent.search("Mobile") > -1) && (navigator.userAgent.search("Safari") > -1));
    var isiOSChrome = navigator.userAgent.match('CriOS');
    var isChrome = !!window.chrome && !isOpera;
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    var browser = 'unknown-browser';
    var browserVersion = 'unknown-browser-version';

    // console.log(navigator.userAgent);

    if(isiOSChrome){
      browser = 'ios_chrome';
      browserVersion = browser + navigator.userAgent.match(/CriOS\/(\d+)/i)[1];
    }else
    if (isMobileSafari) {
      browser = 'mobile_safari';
      browserVersion = browser + navigator.userAgent.match(/version\/(\d+)/i)[1];
    } else if (isOpera) {
      browser = 'opera';
      browserVersion = browser + (window.opera? window.opera.version(): navigator.userAgent.match(/opr\/(\d+)/i)[1]);
    } else if (isFirefox && navigator.userAgent) {
      browser = 'firefox';
      browserVersion = browser + navigator.userAgent.match(/firefox\/(\d+)/i)[1];
    } else if (isSafari && navigator.userAgent.search('version') !== -1) {
      browser = 'safari';
      browserVersion = browser + navigator.userAgent.match(/version\/(\d+)/i)[1];
    } else if (isChrome && navigator.userAgent) {
      browser = 'chrome';
      browserVersion = browser + navigator.userAgent.match(/chrome\/(\d+)/i)[1];
    } else if (isIE && navigator.userAgent) {
      browser = 'ie';
      if (navigator.userAgent.search('like Gecko') !== -1) {
        browserVersion = browser + '11';
      } else {
        browserVersion = browser + navigator.userAgent.match(/msie\ (\d+)/i)[1];
      }
    } else if (isOpera) {
      browser = 'opera';
      if (window.opera) {
        browserVersion = browser + window.opera.version();
      } else {
        browserVersion = browser + navigator.userAgent.match(/ OPR\/(\d+)/i)[1];
      }
    }
    return {
      browser       : browser,
      browserVersion: browserVersion
    }
  }

})(window.angular);

(function (angular, window, undefined) {

  'use strict';

  angular.module('bento.inputblur', [])
    // Supporting directive for input fields
    .directive('input',directiveFunction)
    // Supporting directive for textarea fields
    .directive('textarea',directiveFunction);

  directiveFunction.$inject = ['$bentoServices'];

  /**
   * Input Blur and Textarea blur directive definition
   * @param $bentoServices
   * @returns {{restrict: string, require: string, link: Function}}
   */
  function directiveFunction($bentoServices) {
    return {
      restrict: 'E',
      require : '?ngModel',
      link    : function (scope, element, attr, control) {
        if (!control) {
          return;
        }

        element.on('focus', function () {
          // Using safe apply to comply bug [CXUI-289]
          $bentoServices.safeApply(scope,function () {
            element.addClass('has-focus');
            control.hasFocus = true;
          });
        });

        element.on('blur', function () {
          // Using safe apply to comply bug [CXUI-289]
          $bentoServices.safeApply(scope,function () {
            element.removeClass('has-focus');
            element.addClass('has-visited');
            control.hasFocus = false;
            control.hasVisited = true;
          });
        });

        // extend $setPristine()
        if (!!control.$setPristine) {
          control.$setPristineUsedByBentoInputBlur = control.$setPristine;

          control.$setPristine = function () {
            // called Super function
            control.$setPristineUsedByBentoInputBlur();
            // Resetting hasVisited flag

            $bentoServices.safeApply(scope,function () {
              element.removeClass('has-visited');
              control.hasVisited = false;
            });
          };
        }
      }
    };
  }
})(window.angular, window);
/* jshint -W016 */
(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.busyloader', ['bento.services'])
  /**
   * Config to add $http interceptions
   */
    .config([
      '$provide',
      '$httpProvider',
      function ($provide, $httpProvider) {

        /**
         * Register a new interceptor for Busy Loader for auto show and hide
         */
        $provide.factory('bentoBusyLoaderHttpInterceptor', [
          '$q',
          '$log',
          function ($q, $log) {

            /**
             * Get a BentoBusyLoader from the config file, undefined otherwise
             * @param config
             * @returns {*}
             */
            var getBusyLoader = function (config) {
              // There is nothing assigned to config
              if (typeof config === 'undefined') {
                return undefined;
              }

              // Make sure busyLoader is assigned as part of the config object
              // And the object is a `BentoBusyLoader` instance
              if (!!config.busyLoader) {
                return config.busyLoader;
              } else {
                return undefined;
              }
            };

            /**
             * Show the Busy Loader referenced from the config object
             * @param config
             */
            var showBusyLoader = function (config) {
              var busyLoader = getBusyLoader(config);

              if (!!busyLoader) {
                busyLoader.show();
              }
            };

            /**
             * Hides the Busy Loader referenced from the config object
             * @param config
             */
            var hideBusyLoader = function (config) {
              var busyLoader = getBusyLoader(config);

              if (!!busyLoader) {
                busyLoader.hide();
              }
            };

            /**
             * Return all $http interception results
             */
            return {
              // optional method
              'request': function (config) {
                // do something on success
                showBusyLoader(config);
                return config;
              },

              // optional method
              'requestError': function (rejection) {
                // do something on error
                //hideBusyLoader(rejection.config);

                return $q.reject(rejection);
              },

              // optional method
              'response': function (response) {
                // do something on success
                hideBusyLoader(response.config);
                return response;
              },

              // optional method
              'responseError': function (rejection) {
                // do something on error
                // hideBusyLoader(rejection.config);

                return $q.reject(rejection);
              }
            };

          }]);

        // Push the interceptor to $httpProvider.interceptor stack
        $httpProvider.interceptors.push('bentoBusyLoaderHttpInterceptor');

      }
    ])
  /**
   * Provides Busy Loader services
   */
    .factory('$bentoBusyLoader', [
      '$timeout',
      '$log',
      '$q',
      '$bentoServices',
      function ($timeout, $log, $q, $bentoServices) {

        // Busy Loader Object
        function BentoBusyLoader(_dom, _size) {
          // Normalize DOM type
          var id = Math.round(Math.random() * 10000000000);
          var dom = typeof _dom === 'string' ? document.querySelector(_dom) : _dom;
          var bgSize = '';
          var canvasSize;
          var loaderSize;
          var isPositionedStatic = false;
          var showTimeoutID, hideTimeoutID;

          // Now we can set the size of the spinner animation
          switch (_size) {
            case 'small' :
              loaderSize = canvasSize = 24;

              break;
            case 'large':
              loaderSize = canvasSize = 75;
              break;
            default:
              loaderSize = canvasSize = 50;
          }

          // We double the canvas density for retina displays
          loaderSize *= 2;

          // Create loader dom elements
          var loader  = angular.element('<div ' +
                'id="bento-busyloader-' + id + '" ' +
                'class="bento-busyloader-blocker hide ' + bgSize + '">' +
                '<div class="bento-busyloader-wrapper"><div class="bento-busyloader-inner">' +
                '<canvas id="bento-busyloader-spinner-' + id + '" ' +
                'class="bento-busyloader-canvas" ' +
                'style="width: ' + canvasSize + 'px; height: ' + canvasSize + 'px;"></canvas>' +
                '</div></div>' +
                '</div>'),

              // Insert loader HTML code into the DOM
              mainDom = angular.element(dom),
              mainDomPosition
            ;

          // Adding loader
          mainDom.append(loader);

          this.show = function (delay) {
            var deferred = $q.defer();
            var _delay = (typeof delay === 'undefined') ? 0 : parseInt(delay, 10);

            // Clear any previous $timeout IDs
            $timeout.cancel(hideTimeoutID);

            showTimeoutID = $timeout(function () {
              loader.removeClass('hide');

              // Clear any previous $timeout IDs
              $timeout.cancel(showTimeoutID);

              // Make parent container 'relative' when it is static
              mainDomPosition = window.getComputedStyle(mainDom[0]).position.trim();

              // Check and assign `relative` position where it is at default, `static`
              if (mainDomPosition.length === 0 || mainDomPosition === 'static') {
                mainDom[0].style.position = 'relative';
                isPositionedStatic = true;
              }

              // canvas render disabled
              startAnimate();

              deferred.resolve('Busy Loader is now bocking content');
            }, _delay);

            return deferred.promise;
          };

          this.hide = function (delay) {
            var _delay = (typeof delay === 'undefined') ? 0 : parseInt(delay, 10);
            var deferred = $q.defer();

            // Clear any previous $timeout IDs
            $timeout.cancel(hideTimeoutID);

            hideTimeoutID = $timeout(function () {
              loader.addClass('hide');

              // Clear any previous $timeout IDs
              $timeout.cancel(showTimeoutID);

              // Put static positioning back
              if (isPositionedStatic) {
                mainDom[0].style.position = null;
              }
              isAnimating = false;

              deferred.resolve('Busy Loader is now hidden');
            }, _delay);

            return deferred.promise;

          };

          // Canvas spinner animation code
          // rFA is used for animation part to minimize CPU load
          var canvas,
              context,
              radius           = loaderSize * 0.4,
              duration         = 2000,
              transition       = 200,
              transitionOut    = 200,
              counterClockwise = false,
              x, y,
              color1           = 0x3d3f45,
              color2           = 0xff8000,
              color1R          = 0x60,
              color1G          = 0x60,
              color1B          = 0x60,
              color2R          = 0xfe,
              color2G          = 0xa5,
              color2B          = 0x20,
              dColorR          = color2R - color1R,
              dColorG          = color2G - color1G,
              dColorB          = color2B - color1B,
              colorStepR       = dColorR / transition,
              colorStepG       = dColorG / transition,
              colorStepB       = dColorB / transition,
              colorStepROut    = dColorR / transitionOut,
              colorStepGOut    = dColorG / transitionOut,
              colorStepBOut    = dColorB / transitionOut,
              startTime,
              isAnimating      = false,
              segments         = 5,
              keyTime          = duration / segments,
              gap              = 0.1,
              startAngle       = (-0.5 + gap * 0.5) * Math.PI,
              step             = 2 / segments;

          function startAnimate() {
            isAnimating = true;
            startTime = (new Date()).getTime();
            render();
          }

          function initSpinner() {
            canvas = document.getElementById('bento-busyloader-spinner-' + id);
            context = canvas.getContext('2d');
            canvas.width = loaderSize;
            canvas.height = loaderSize;
            context.lineWidth = loaderSize * 0.2;
            x = canvas.width / 2;
            y = canvas.height / 2;
          }

          function render() {
            // Context is not ready when render is called by apps
            if (!context) {
              return;
            }
            var dTime = ((new Date()).getTime() - startTime) % duration;
            context.clearRect(0, 0, 200, 200);

            for (var i = 0; i < segments; i++) {
              renderSegment(i, dTime);
            }

            if (isAnimating) {
              $bentoServices.rAF(renderAsync);
            }
          }

          function renderAsync() {
            setTimeout(function () {
              render();
            }, 1);
          }

          function renderSegment(index, dTime) {
            var newColorR,
                newColorG,
                newColorB,
                newColor,
                inTime  = Math.round(index * keyTime),
                outTime = Math.round(inTime + keyTime);

            if (dTime >= inTime && dTime <= inTime + transition) {
              var inDTime = dTime - inTime;
              newColorR = color1R + Math.floor(colorStepR * inDTime);
              newColorG = color1G + Math.floor(colorStepG * inDTime);
              newColorB = color1B + Math.floor(colorStepB * inDTime);

              newColor = (newColorR << 16 | newColorG << 8 | newColorB);
            } else if ((dTime >= outTime && dTime <= outTime + transitionOut) ||
              (dTime <= transitionOut && index === segments - 1 )) {
              var outDTime = transitionOut - dTime - outTime;
              //outTime = outDTime < 0 ? dTime : outTime;
              newColorR = color1R + Math.floor(colorStepROut * outDTime);
              newColorG = color1G + Math.floor(colorStepGOut * outDTime);
              newColorB = color1B + Math.floor(colorStepBOut * outDTime);
              newColor = (newColorR << 16 | newColorG << 8 | newColorB);
            } else if (dTime > inTime + transition && dTime < outTime) {
              newColor = color2;
            } else {
              newColor = color1;
            }

            context.beginPath();
            context.arc(
              x,
              y,
              radius,
              startAngle + index * step * Math.PI,
              startAngle + ((index + 1) * step - gap) * Math.PI,
              counterClockwise);

            // line color
            context.strokeStyle = '#' + newColor.toString(16);
            context.stroke();

          }

          $timeout(initSpinner);
        }

        var getNewLoader = function (dom, size) {
          return new BentoBusyLoader(dom, size);
        };

        // Finally return the actual loader
        return {
          getNewLoader: getNewLoader
        };
      }])
    .directive('busyLoader', [
      '$bentoBusyLoader',
      '$log',
      function ($bentoBusyLoader, $log) {

        return {
          scope: {
            busyLoader    : '=',  //get Busy Loader state
            busyLoaderSize: '@' //define the size of BL
          },
          link : function (scope, element, attr) {

            var busyLoader = $bentoBusyLoader.getNewLoader(element, scope.busyLoaderSize);

            // Watch loader variable
            scope.$watch('busyLoader', function (newVal) {
              if (newVal) {
                busyLoader.show();
              } else {
                busyLoader.hide();
              }
            });
          } // end of link
        };
      }
    ]);
})(window, window.angular);

(function () {
  'use strict';

  angular.module('bento.carousel', ['bento.services'])
  /**
   * Main Bento Carousel Directive
   */
    .directive('bentoCarousel', [
      function () {
        return {
          scope     : false,
          restrict  : 'EA',
          controller: 'bentoCarouselController',
          link      : bentoCarouselLink
        }
      }
    ])
    .controller('bentoCarouselController', bentoCarouselMainController)
  /**
   * Bento Carousel Card Directive
   * Defines card class and as a parent of card templates
   */
    .directive('bentoCarouselCard',
    function () {
      return {
        //require: '^bentoCarousel',
        restrict: 'EA',
        scope   : false,
        link    : bentoCarouselCardLink
      }
    }
  );

  /**
   * Bento Carousel Card Directive Main Link
   * @param scope
   * @param element
   * @param attrs
   * @param ctrl
   */
  function bentoCarouselCardLink(scope, element, attrs, ctrl) {
    attrs.$addClass('bento-carousel-card');
    //attrs.$set('tabindex', '0');
    attrs.$set('role', 'card');
  }

  /**
   * bentoCarouselMainController for main directive
   */
  bentoCarouselMainController.$inject = [
    '$scope',
    '$element',
    '$timeout',
    '$rootScope',
    '$compile',
    '$attrs',
    '$bentoServices'];
  function bentoCarouselMainController($scope, $element, $timeout, $rootScope, $compile, $attrs, $bentoServices) {
    // init variables
    var ctrl = this;
    var slideshowTimeout = 5000;
    var slideshowTimeoutID;
    var cardHeightStyle = document.createElement('STYLE');
    ctrl.localScope = $rootScope.$new();
    ctrl.localScope.dots = ['active'];

    if($attrs.slideshow){
      $timeout(autoChangeSlides);
    }

    var scrollXTimeout = 0;
    var cardMargin = 20;
    var currentPage = 0;
    ctrl.dom = {};
    ctrl.dom.mainContainer = angular.element($element[0].querySelector('ul'));

    // Dom change after all scopes are linked
    $timeout(function () {
      ctrl.dom.mainContainer.wrap('<div class="bento-carousel-container"></div>');
    });

    ctrl.dom.leftArrow = angular.element(
      '<div class="bento-carousel-left-arrow bento-carousel-arrow" ' +
      'ng-show="showLeftArrow && !hideArrows" ' +
      'ng-click="onLeftArrowClick()">' +
      '<i class="bento-icon-chevron-left"></i>' +
      '</div>');
    ctrl.dom.rightArrow = angular.element(
      '<div class="bento-carousel-right-arrow bento-carousel-arrow" ' +
      'ng-show="showRightArrow  && !hideArrows" ' +
      'ng-click="onRightArrowClick();">' +
      '<i class="bento-icon-chevron-right"></i>' +
      '</div>');
    ctrl.dom.dots = angular.element(
      '<div class="bento-carousel-dots">' +
      '<button class="bento-carousel-dot {{dot}}" ' +
      'ng-click="onDotClick($index)" ' +
      'ng-repeat="dot in dots track by $index">' +
      '</button></div>');

    ctrl.localScope.onLeftArrowClick = function () {
      var dX = ctrl.dom.mainContainer.children()[0].offsetWidth * 0.5;
      scrollTo(ctrl.dom.mainContainer[0].scrollLeft - dX);

      if($attrs.slideshow){
        clearTimeout(slideshowTimeoutID);
        slideshowTimeoutID = setTimeout(autoChangeSlides, slideshowTimeout + 1000);
      }
    };

    ctrl.localScope.onRightArrowClick = function (isAuto) {
      var dX = ctrl.dom.mainContainer.children()[0].offsetWidth * 1.5;
      scrollTo(ctrl.dom.mainContainer[0].scrollLeft + dX);

      if($attrs.slideshow && !isAuto){
        clearTimeout(slideshowTimeoutID);
        slideshowTimeoutID = setTimeout(autoChangeSlides, slideshowTimeout + 1000);
      }
    };

    ctrl.localScope.onDotClick = function (page) {
      //reset all dots
      for (var i = 0; i < ctrl.localScope.dots.length; i++) {
        ctrl.localScope.dots[i] = '';
      }
      // activate the current page dot
      ctrl.localScope.dots[page] = 'active';

      // scroll to the new page
      scrollTo(ctrl.dom.mainContainer[0].offsetWidth * page);
    };

    $compile(ctrl.dom.leftArrow)(ctrl.localScope);
    $compile(ctrl.dom.rightArrow)(ctrl.localScope);
    $element.append(ctrl.dom.leftArrow);
    $element.append(ctrl.dom.rightArrow);

    $compile(ctrl.dom.dots)(ctrl.localScope);
    $element.append(ctrl.dom.dots);

    // inject card height with variable binding
    $element.before(cardHeightStyle);

    // Watch children size to refresh rendering for dots
    $scope.$watch(function () {
      return ctrl.dom.mainContainer.children().length
    }, function (numChildren) {
      // Always make sure that AngularJS has finished rendering the children
      $timeout(function () {
        updateDotsAndArrows();
      });
    });

    // Watch children heights
    $scope.$watch(function(){
      var children = ctrl.dom.mainContainer.children();
      var maxHeight = 0;
      var h;
      for(var i=0; i<children.length; i++){
        h = children[i].firstElementChild.offsetHeight;
        if(h > maxHeight){
          maxHeight = h;
        }
      }
      return maxHeight;
    }, function(newHeight){
      cardHeightStyle.innerHTML = '.bento-carousel-card{ height:'+newHeight+'px}';
    });

    // Watch windows resize
    var timeoutID = 0;
    angular.element(window).on('resize', onWindowResize);

    // Function to fire on window resize
    function onWindowResize(){
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        updateDotsAndArrows();
        $bentoServices.safeApply(ctrl.localScope);
      }, 500);
    }

    ctrl.dom.mainContainer.on('scroll', function () {
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function () {
        updateDotsAndArrows();
        $bentoServices.safeApply(ctrl.localScope);
      }, 100);
    });

    // Listen to mouseenter and mouseleave to enable and disable slideshow
    ctrl.dom.mainContainer.on('mouseenter', function(event){
      if($attrs.slideshow){
        clearTimeout(slideshowTimeoutID);
      }
    });

    ctrl.dom.mainContainer.on('mouseleave', function(event){
      if($attrs.slideshow){
        slideshowTimeoutID = setTimeout(autoChangeSlides, slideshowTimeout);
      }
    });

    // Function for slideshow
    function autoChangeSlides(){
      var container = ctrl.dom.mainContainer[0];
      var safeNumX = container.scrollWidth - container.offsetWidth;
      clearTimeout(slideshowTimeoutID);

      if(container.scrollLeft  === safeNumX){
        scrollTo(0);
      }else{
        ctrl.localScope.onRightArrowClick(true);
      }


      slideshowTimeoutID = setTimeout(autoChangeSlides, slideshowTimeout);
    }

    // Animate scrolling
    function scrollTo(numX) {
      clearTimeout(scrollXTimeout);
      if (numX < 0) {
        numX = 0;
      }
      var container = ctrl.dom.mainContainer[0];
      // Prevent from over scroll effect
      var safeNumX = container.scrollWidth - container.offsetWidth;
      // last page
      if (safeNumX < numX) {
        numX = safeNumX;
      }
      // snap to a cell
      else if (numX !== 0) {
        // find and align with card
        var cardIndexToShow = 0;
        var cards = ctrl.dom.mainContainer.children();
        for (var i = 0; i < cards.length; i++) {
          if (cards[i].offsetLeft > numX) {
            cardIndexToShow = i - 1;
            break;
          }
        }
        numX = cards[cardIndexToShow].offsetLeft - cardMargin * 0.5;
      }
      // animate scrolling
      scrollToAnimate(numX, 500, container);
    }

    // using RAF with (x-1)^3+1 curve easing
    function scrollToAnimate(scrollX, duration, container, originalTime, originalX, dX) {
      if(typeof originalTime === 'undefined'){
        originalTime = new Date();
        originalX = container.scrollLeft;
        dX = scrollX-originalX;
      }

      var currentTime = new Date();
      var dTimeRatio = Math.pow((currentTime.getTime() - originalTime.getTime()) / duration -1, 3) + 1; // (x-1)^3 + 1
      var distanceByRatio = dTimeRatio * dX;

      if (Math.abs(dX - distanceByRatio) < 1) {
        container.scrollLeft = scrollX;
      } else {
        container.scrollLeft = originalX + distanceByRatio;
        $bentoServices.rAF(function(){
          scrollToAnimate(scrollX, duration, container, originalTime, originalX, dX);
        });
      }
    }

    function updateDotsAndArrows() {
      var container = ctrl.dom.mainContainer[0];

      if (container.scrollWidth === container.offsetWidth) {
        ctrl.localScope.dots = ['active'];
        currentPage = 0;
      } else {
        var newDots = [];
        var numPages = Math.ceil(container.scrollWidth / container.offsetWidth);
        currentPage = Math.ceil(container.scrollLeft / container.offsetWidth);
        for (var i = 0; i < numPages; i++) {
          newDots.push('');
        }
        newDots[currentPage] = 'active';
        ctrl.localScope.dots = newDots;
      }

      // Show hide arrows
      ctrl.localScope.showLeftArrow = (container.scrollLeft > 0);
      ctrl.localScope.showRightArrow = (container.scrollLeft + container.offsetWidth < container.scrollWidth);

    }

    // on $destroy cleanup
    $element.on('$destroy',function(){
      // remove window resize listener and its timeout
      clearTimeout(timeoutID);
      angular.element(window).off('resize', onWindowResize);
    });
  }

  /**
   * Bento Carousel driective link function
   * @param scope
   * @param element
   * @param attrs
   * @param ctrl
   */
  function bentoCarouselLink(scope, element, attrs, ctrl) {
    attrs.$addClass('bento-carousel');
    // Determine if need to hide arrows
    ctrl.localScope.hideArrows = !!attrs.hideArrows && attrs.hideArrows.toLowerCase() === 'true';
    ctrl.localScope.arrowOffset = !!attrs.arrowOffset ? attrs.arrowOffset : '0';

    // Update arrow offset
    ctrl.dom.leftArrow[0].style.left = '-'+ctrl.localScope.arrowOffset;
    ctrl.dom.rightArrow[0].style.right = '-'+ctrl.localScope.arrowOffset;

    // Adding gutter size override
    var customStyling;

    // Adjust gutter size
    if (!!attrs.gutterSize) {
      customStyling = '.bento-carousel-container>ul>li{' +
      'margin-right:' + attrs.gutterSize +
      '}';
    }
    // Change indicator color
    if (!!attrs.indicatorColor) {
      customStyling += '.bento-carousel-dots .bento-carousel-dot{' +
      'border:1px solid ' + attrs.indicatorColor +
      '}';
      customStyling += '.bento-carousel-dots .bento-carousel-dot.active{' +
      'background:' + attrs.indicatorColor +
      '}';
    }

    element.before('<style>' + customStyling + '</style>');
  }

})();
(function(){
  'use strict';

  angular.module('bento.carousel')
    .directive('bentoCarouselCardTplDefault', function(){
      return{
        scope: {
          imageUrl: '=',
          text: '='
        },
        template: '<div tabindex="0" class="bento-carousel-card-default">' +
        '<img ng-src="{{imageUrl}}" />' +
        '<span>{{text}}</span>' +
        '</div>',

      }
    })
})();

(function (angular, undefined) {

  "use strict";

  var comboboxApp = angular.module('bento.combobox', ['ngSanitize', 'bento.services']);

  comboboxApp
  /**
   * CONSTANTS
   */
    .constant('COMBOBOX_PAGE_UP', -1)  // Page up direction
    .constant('COMBOBOX_PAGE_DOWN', 1) // page down direction
  /**
   * DIRECTIVE: bentoCombobox
   */
    .
    directive('bentoCombobox', [
      '$document',
      '$timeout',
      '$parse',
      '$bentoServices',
      function ($document, $timeout, $parse, $bentoServices) {
        return {
          require: 'ngModel',
          scope  : {
            getData                : '&',
            headers                : '=',     // headers TODO: Breaking Change
            ignoreInputClick       : '=',     // To ignore click even for the input field
            inputLabel             : '=?inputText',
            labelName              : '@',
            minSearchCharacterCount: '=?',    // Determines minimum character count to trigger server search
            ngDisabled             : '=',
            ngHide                 : '=',     // Track ng-hide
            ngModel                : '=',
            ngShow                 : '=',     // Track ng-show
            onChange               : '&',
            placeholder            : '@',
            readonly               : '=',     // Make this component readonly
            resetListOnSelect      : '&',     // Flag to determine whether to reset the list when a selection is made
            rowTemplate            : '=',     // Custom row template for this Combobox
            searchable             : '=',     // Check if this is searchable
            searchKeydownTimeout   : '=',     // Expose local `searchKeydownTimeout` to let dev to control the delay
            type                   : '&',     // Table or normal
            useServer              : '=',
            controller             : '=?'     // controller to trigger internal instructions
            // before the search starts
          },

          templateUrl: '../templates/combobox/bento-combobox.html',
          replace    : true,
          link       : /**
           * Main Link function for Bento Combobox
           * @param scope
           * @param element
           * @param attrs
           * @param controller
           * @param transclude
           */
            function comboboxMainLink(scope, element, attrs, controller, transclude) {

            // Initialize scope variables
            scope.data = [];
            scope.selectedIndex = -1;
            scope.containerCtrl;
            scope.minSearchCharacterCount = scope.minSearchCharacterCount || 1;

            // Set ng-form element state flags
            controller.$setUntouched();
            controller.$setPristine();

            // local variabled
            var $input     = angular.element(element[0].querySelector('input')),
                getLabel   = $parse(scope.labelName),
                blurTimeout,
                baseData,
                // `useServer` variabled
                focused    = false,
                isFullData = false,
                page       = 0,
                initLoad   = true;
            ;

            // Kick off initial data retrieval
            getData();

            // Add element event listener
            element.on('focusin', onInputFocus);
            element.on('focusout blur', onInputBlur);
            $input.on('click touchend', onInputClick);

            // Add destroy listener to Scope to make sure that the listeners are cleaned properly
            element.on('$destroy',function(){
              element.off('focusin', onInputFocus);
              element.off('focusout blur', onInputBlur);
              $input.off('click touchend', onInputClick);
              $input = null;
              scope.$destroy();
            });

            // Watch ngModel to update the inputLabel accordingly
            scope.$watch('ngModel', function (object) {
              // update Label
              var label = getLabel(object);
              if (Array.isArray(label)) {
                label = label[0];
              }

              scope.inputLabel = label;
              inputLabelWatchIgnoreOnce = true;
            });

            // initialize controller object
            scope.controller = {};
            scope.controller.reload = function () {
              // Reset all internal references
              isFullData = false;
              baseData = null;
              autoSelectCatchUp = false;
              page = 0;
              scope.selectedIndex = -1;
              scope.data = [];
              scope.loadingData = false;
              controller.$setUntouched();
              getData();
            };

            /**
             * When the Dropdown button is clicked
             * @param event
             */
            scope.onButtonClick = function (event) {
              // Clear timeouts
              $timeout.cancel(blurTimeout);

              // Toggle container visibility
              showContainer(!scope.isContainerVisible);

              if (scope.isContainerVisible) {
                $input[0].select();
                if (scope.inputLabel) {
                  $input[0].setSelectionRange(scope.inputLabel.length, scope.inputLabel.length);
                }
              }

              // Safe apply the change to the scope
              $bentoServices.safeApply(scope);
            };

            /**
             * Callback function when an item is clicked
             * @param index
             */
            scope.onItemClick = function (index, ignoreFocus) {

              if (!ignoreFocus) {
                $timeout.cancel(blurTimeout);
                $input[0].focus();
              }

              // update Label
              var label = getLabel(scope.data[index]);

              controller.$setDirty();

              if (Array.isArray(label)) {
                label = label[0];
              }

              scope.inputLabel = label;
              // Skip watch & search
              inputLabelWatchIgnoreOnce = true;

              // Hide container
              showContainer(false);

              // Make no changes and fire no callbacks
              if (angular.equals(scope.ngModel, scope.data[index])) {
                return;
              }

              // update model
              scope.ngModel = scope.data[index];

              // Fire onChange event
              scope.onChange({item: scope.data[index]});

              // Reset server searches
              if (scope.useServer && currentSearchTerm && currentSearchTerm.length > 0) {
                isFullData = false;
                page = 0;
                // Reset input field dirty flag
                scope.isDirty = false;
                getData('');

              } else if (!scope.useServer) {
                if (baseData) {
                  scope.data = baseData;
                  baseData = null;
                }
                scope.selectedIndex = scope.data.indexOf(scope.ngModel);
              }
            };

            /**
             * When the expand Carat is clicked
             * @param $event
             */
            function onInputClick($event) {
              // Clear timeouts
              $timeout.cancel(blurTimeout);

              $input[0].select();

              // ignore input click
              if (scope.ignoreInputClick) {
                return;
              }

              // Toggle container visibility
              showContainer(!scope.isContainerVisible);

              // Safe apply the change to the scope
              $bentoServices.safeApply(scope);
            }

            var inputLabelWatchIgnoreOnce = false;
            scope.$watch('inputLabel', inputLabelWatch);

            function inputLabelWatch(str) {
              if (!str || str.length === 0) {
                scope.selectedIndex = -1;
                str = '';
              }

              if (!initLoad && !inputLabelWatchIgnoreOnce) {
                scope.isDirty = true;
                search(str);
              } else {
                initLoad = false;
                inputLabelWatchIgnoreOnce = false;
              }

              if (attrs.required && str.length === 0) {
                controller.$setValidity('required', false);
              } else {
                controller.$setValidity('required', true);
              }
            }

            /**
             * When a key is pressed on the Input Field
             * @param $event
             */
            scope.onInputKeypress = function ($event) {
              // FF fires Keypress on all keys including un-printable characters...
              // 9 : Tab
              if($event.keyCode !== 9) {
                scope.isDirty = true;
              }
            };

            /**
             * When a key is down on the Input Field
             * @param $event
             */
            scope.onInputKeyDown = function ($event) {
              // An user interaction is recorded
              controller.$setDirty();

              // bypass all instructions
              if (scope.readonly) {
                return;
              }

              var keyCode = $event.keyCode;

              switch (keyCode) {
                // Key down
                case 40:
                  if (
                    scope.data.length > 0 &&
                    (!scope.useServer ||
                      (scope.useServer && isFullData) ||
                      (scope.useServer && scope.selectedIndex < scope.data.length - 1)
                    )
                  ) {
                    scope.selectedIndex = (scope.selectedIndex + 1) % scope.data.length;
                  }
                  showContainer(true);
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                // Key Up
                case 38:
                  if (scope.data.length > 0) {
                    scope.selectedIndex = scope.selectedIndex < 0 ? 0 : scope.selectedIndex;
                    scope.selectedIndex = (scope.selectedIndex - 1 + scope.data.length) % scope.data.length;
                  }
                  showContainer(true);
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                // Home
                case 36:
                  if (scope.data.length > 0) {
                    scope.selectedIndex = 0;
                  }
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                // End
                case 35:
                  if (scope.data.length > 0) {
                    scope.selectedIndex = scope.data.length - 1;
                  }
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                // Page up
                case 33:
                  if (scope.data.length > 0) {
                    scope.selectedIndex -= 8;
                    scope.selectedIndex = scope.selectedIndex < 0 ? 0 : scope.selectedIndex;
                  }
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                //Page Down
                case 34:
                  if (scope.data.length > 0) {
                    scope.selectedIndex += 8;
                    scope.selectedIndex = scope.selectedIndex >= scope.data.length ? scope.data.length - 1 : scope.selectedIndex;
                  }
                  scope.isDirty = true;
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
              }
            };

            /**
             * When a key is released from the keyboard
             * @param $event
             */
            scope.onInputKeyup = function ($event) {
              // bypass all instructions
              if (scope.readonly) {
                return;
              }

              var keyCode = $event.keyCode;
              switch (keyCode) {
                // Enter Key
                case 13:
                  scope.onItemClick(scope.selectedIndex);
                  $event.stopPropagation();
                  $event.preventDefault();
                  break;
                // Tab Key
                case 9:
                  break;
              }
            };

            /**
             * When focused out from this Combobox
             * @param $event
             */
            var autoSelectCatchUp;

            function onInputBlur($event) {
              focused = false;
              // bypass all instructions
              if (scope.readonly) {
                return;
              }

              blurTimeout = $timeout(function () {
                if (scope.isDirty) {
                  if (scope.selectedIndex > -1) {
                    if (scope.loadingData) {
                      autoSelectCatchUp = true;
                    } else {
                      scope.onItemClick(scope.selectedIndex, true);
                    }
                  } else {
                    scope.ngModel = undefined;
                  }
                  // Reset the internal dirty flag until next user keypress
                  scope.isDirty = false;
                }

                showContainer(false);
                scope.selectedIndex = -1;
                controller.$setTouched();

              }, 100);

              $event.preventDefault();
              $event.stopPropagation();
            }

            /**
             * When focused in to this Combobox
             * @param $event
             */
            function onInputFocus($event) {
              $timeout.cancel(blurTimeout);

              focused = true;
            }

            /**
             * Callback function when the list is at the end of scroll
             */
            scope.onEndOfScroll = function () {
              // Only applies to server enabled environement
              // This instance must be idle
              if (scope.useServer && !scope.loadingData) {
                getData(currentSearchTerm);
              }
            };

            /**
             * Get data from callback
             * @param page
             * @param search
             */
            var missedSearchTerm; // use a stack
            var currentSearchTerm = '';
            var currentGetDataID;

            function getData(search) {

              currentSearchTerm = search || '';

              // Need to ignore getData until the preivous getData request is finished
              if (scope.loadingData) {
                missedSearchTerm = currentSearchTerm;
                return;
              } else if (isFullData) {
                return;
              }

              // Generate UID for this get data
              var getDataID = $bentoServices.generateUID();
              // For promise validation
              currentGetDataID = getDataID;

              missedSearchTerm = null;

              var dataObj = scope.getData({
                page  : page || 0,
                search: search || ''
              });

              scope.loadingData = true;

              // Check if the returned data is an array or not
              if (Array.isArray(dataObj)) {
                if (page === 0) {
                  scope.data = dataObj;
                } else {
                  // Directly assign
                  scope.data = scope.data.concat(dataObj);
                }
                scope.loadingData = false;

                if (autoSelectCatchUp) {
                  scope.selectedIndex = 0;
                  scope.onItemClick(0, true);
                  autoSelectCatchUp = false;
                }

                // In case it's a lazyload
                if (dataObj.length > 0) {
                  page++;
                } else {
                  isFullData = true;
                }
              }
              // This is promise
              else if (dataObj && dataObj.then) {

                dataObj.then(
                  function (data) {
                    // This dataset is no longer valid
                    if (getDataID !== currentGetDataID) {
                      return;
                    }

                    scope.loadingData = false;
                    if (page === 0) {
                      scope.data = [];
                      $timeout(function () {
                        scope.containerCtrl.scrollToTop();
                      }, 100);
                    }
                    scope.data = scope.data.concat(data);

                    // There is a pending getData (mostly a new search)
                    if (missedSearchTerm) {
                      page = 0;
                      isFullData = false;
                      getData(missedSearchTerm);
                      return;
                    } else
                    // There is data
                    if (data.length > 0) {
                      // prepare for the next request
                      page++;

                      if (autoSelectCatchUp) {
                        scope.selectedIndex = 0;
                        scope.onItemClick(0, true);
                        autoSelectCatchUp = false;
                      }
                    } else
                    // Empty result and there is no need to load more data and select
                    {
                      scope.selectedIndex = -1;
                      isFullData = true;
                      autoSelectCatchUp = false;
                    }

                  },
                  function (message) {
                    scope.loadingData = false;
                    isFullData = true;

                    // Reset data array if there is no result on page 0
                    if (page === 0) {
                      scope.data = [];
                    }
                  }
                );
              } else {
                // None qualitfied data is returned.
                // We stop loading here
                isFullData = true;
                scope.loadingData = false;

                // Reset data array if there is no result on page 0
                if (page === 0) {
                  scope.data = [];
                }
              }
              $bentoServices.safeApply(scope);
            }

            /**
             * Show/Hide the container
             * @param bool
             */
            function showContainer(bool) {
              // Ignore if bool is not changed
              if (scope.isContainerVisible === bool || scope.ngDisabled || scope.readonly) {
                return;
              }

              // Align header if there is any
              if (scope.containerCtrl) {
                scope.containerCtrl.align();
              }
              // Set show/hide flag variable
              scope.isContainerVisible = bool;
              scope.$emit("append_to_parent_show_list", scope.isContainerVisible);
            }

            /**
             * Search through data labels and list result
             */
            var keyEntryDelayTimeoutId = 0;

            function search(str) {

              if (scope.searchable &&
                (scope.minSearchCharacterCount <= str.length || str.length === 0)
              ) {
                showContainer(true);

                if (!scope.useServer) {
                  if (!baseData) {
                    baseData = scope.data;
                  }

                  var newArray = [],
                      i, j, iLen, jLen, row, rowLabel
                    ;

                  // No entry
                  // INGORE THE RESET
                  if (!str || str.trim().length === 0) {
                    scope.selectedIndex = -1;
                    scope.data = baseData;
                    return;
                  }

                  str = str.toLowerCase();

                  // Reset `selectedIndex` to auto select only if the input field is not empty
                  scope.selectedIndex = 0;

                  for (i = 0, iLen = baseData.length; i < iLen; i++) {
                    row = baseData[i];
                    rowLabel = row[scope.labelName];

                    // Search column if there are some
                    if (Array.isArray(rowLabel)) {

                      for (j = 0, jLen = rowLabel.length; j < jLen; j++) {
                        if (rowLabel[j].toLowerCase().search(str) > -1) {
                          newArray.push(row);
                          break;
                        }
                      }
                    } else if (rowLabel.toLowerCase().search(str) > -1) {
                      newArray.push(row);
                    }
                  }

                  // Feed new Array
                  scope.data = newArray;
                  showContainer(true);
                }
                // Server search
                else {
                  $timeout.cancel(keyEntryDelayTimeoutId);
                  keyEntryDelayTimeoutId = $timeout(function () {
                    page = 0;
                    isFullData = false;
                    // Auto select when there is a string in the input field
                    if (str.length > 0) {
                      scope.selectedIndex = 0;
                    }
                    // Empty string gets no selection
                    else {
                      scope.selectedIndex = -1;
                    }

                    // Because of the 200 mil delay we need to find out if the search is done after blur
                    if (str.length > 0 && !focused) {
                      autoSelectCatchUp = true;
                    }
                    getData(str || '');

                  }, scope.searchKeydownTimeout || 200);
                }
              }
            }

          }
        };
      }]);

  /**
   * Bento Combobox Container Directive
   * For Combobox 1.x
   */
  comboboxApp.directive('bentoComboboxContainer', [
    function () {
      return {
        replace    : true,
        scope      : {
          selectedIndex: '=',
          headers      : '=',
          data         : '=',
          isTable      : '=',
          labelName    : '=',
          onItemClick  : '&',
          controller   : '=',
          onEndOfScroll: '&',
          rowTemplate  : '='
        },
        templateUrl: '../templates/combobox/bento-combobox-container.html',
        link       : function bentoComboboxContainerListLink(scope, element, attrs, controller, transclude) {
          scope.selectedIndex = typeof scope.selectedIndex === 'undefined' ? -1 : scope.selectedIndex;
          var container = element[0].querySelector('.bento-combobox-container-body');

          container.addEventListener('wheel', function (event) {
            var initScrollTop = container.scrollTop;
            container.scrollTop += Math.ceil(event.deltaY);

            event.stopPropagation();
            event.preventDefault();
          });

          // Listen to scrolling for lazy loading
          container.addEventListener('scroll', function (event) {
            // fire end of scroll event
            if (container.scrollTop + container.offsetHeight === container.scrollHeight) {
              scope.onEndOfScroll();
            }
          });

          scope.selectItem = function (index) {
            scope.selectedIndex = index;
            scope.onItemClick({index: index});
          };

          scope.$watch('selectedIndex', function (value) {
            if (value < 0 || !scope.data) {
              return;
            } else if (value > -1 && container && scope.data.length > 0) {
              var item = element[0].querySelector('[rel="row-' + value + '"]');

              // Make sure the selected item/row is in view
              if (item.offsetTop < container.scrollTop) {
                container.scrollTop = item.offsetTop;
              } else if (item.offsetTop + item.offsetHeight > container.scrollTop + container.offsetHeight) {
                container.scrollTop = item.offsetTop + item.offsetHeight - container.offsetHeight;
                if (value === scope.data.length - 1) {
                  scope.onEndOfScroll();
                }
              }
            }
          });

          // Create a controller for the parent directive to access
          scope.controller = {};
          scope.controller.scrollToTop = function () {
            container.scrollTop = 0;
          };
          // Align the header and columns
          scope.controller.align = function () {
            if (!scope.data || scope.data.length === 0) {
              return;
            } else {
              var rowObj = element[0].querySelector('.bento-combobox-container-item');
              var header = element[0].querySelector('.bento-combobox-container-header');
              if (!rowObj || !header) {
                return;
              }
              var row = rowObj.children;
              var headers = header.children;
              header.style.paddingRight = (container.offsetWidth - container.clientWidth) + 'px';
              for (var i = 0, len = row.length; i < len; i++) {
                headers[i].style.width = row[i].offsetWidth + 'px';
              }
            }
          };
        }
      }
    }
  ]);

  /**
   * Bento Combobox Row Template Directive
   * For Combobox 1.x
   */
  comboboxApp.directive('bentoComboboxRowTemplate', [
    '$compile',
    function ($compile) {
      return {
        replace    : true,
        templateUrl: '../templates/combobox/bento-combobox-row-template.html',
        scope      : {
          rowTemplate: '=',     // Custom row template
          $item      : '=',     // item object
          $labelName : '=',     // variable name used to display row
          $index     : '='      // an index of this item
        },
        link       : function (scope, element, attrs) {
          var defaultRowTemplate  = angular.element('<span>{{$item[$labelName]}}</span>'),
              defaultGridTemplate = angular.element('<span ng-repeat="cell in $item[$labelName]">{{cell}}</span>'),
              template            = !!scope.rowTemplate ?
                angular.element(scope.rowTemplate)
                :
                Array.isArray(scope.$item[scope.$labelName]) ? defaultGridTemplate : defaultRowTemplate;

          $compile(template)(scope);
          element.append(template);

        }
      };
    }
  ])

})(window.angular);
(function(angular, undefined) {
    'use strict';

    angular.module('bento.datatable', [])
        .directive('bentoDatatable', [
            '$timeout',
            '$log',
            '$compile',
            '$window',
            function($timeout, $log, $compile, $window) {
                return {
                    restrict: 'A',
                    scope: {
                        itemSource: '=',
                        columnDefinitions: '=',
                        selectedItems: '=',
                        multiSelectedItems: '=',
                        rowClicked: '&',
                        rowDblclicked: '&',
                        headerClicked: '&',
                        actionClicked: '&',
                        checkboxClicked: '&',
                        headerCheckboxClickState: '=',
                        tableCreated: '&',
                        page: '=',
                        itemsPerPage: '=',
                        searchTerm: '=',
                        totalItems: '=',
                        columnFilterDefinitions: '=',
                        columnFilterToggle: '=',
                        tableDrawn: '&',
                        rowDetailsTemplate: '=',
                        getExternalScopes: '&?externalScopes' //optional functionwrapper around any needed external scope instances
                    },
                    template: '<div><table></table></div>',
                    replace: true,
                    link: function(scope, element, attrs) {
                        //sort neutral datables plugin
                        //http://datatables.net/plug-ins/api/fnSortNeutral
                        jQuery.fn.dataTableExt.oApi.fnSortNeutral = function(oSettings) {
                            oSettings.aaSorting = [];
                            oSettings.aiDisplay.sort(function(x, y) {
                                return x - y;
                            });
                            oSettings.aiDisplayMaster.sort(function(x, y) {
                                return x - y;
                            });
                            oSettings.oApi._fnReDraw(oSettings);
                        };


                        // Default the grid editability to false.
                        var isEditable = false;
                        var isServerSide = true;
                        var currentPage = 1;
                        var hasMultiSelect = (attrs.multiSelectedItems !== undefined && attrs.multiSelectedItems.length > 0) ? true : false;
                        // If the directive specifies edit mode, then capture this.
                        if (attrs.isRowEditable) {
                            isEditable = scope.$eval(attrs.isRowEditable);
                        }

                        if (attrs.serverSideData) {
                            isServerSide = attrs.serverSideData;
                        }
                        scope.$on("$destroy",onDestroy);
                        element.on("$destroy",onDestroy);

                        // Store the DataTable options in the scope, use defaults if none specified by user
                        scope.dataTableOptions = {};

                        // Check the table attributes and apply any column definitions found.
                        if (attrs.datatableOptions !== undefined && attrs.datatableOptions.length > 0) {
                            scope.dataTableOptions = scope.$parent.$eval(attrs.datatableOptions);
                        } else {
                            scope.dataTableOptions = {
                                'autoWidth': false,
                                'stateSave': false,
                                'paginate': false,
                                'deferRender': true,
                                'filter': false,
                                'destroy': false,
                                'processing': true,
                                'ordering': false,
                                'order': [
                                    [0, 'asc']
                                ],
                                'dom': '<"top">rt<"bottom"f><"clear">SR'
                            };
                        }


                        function onDestroy(){
                            if (scope.dataTableOptions.scrollY) {
                                angular.element($window).unbind('resize', onWindowResize);
                            }
                            //remove all on events attached to element
                            element.off();
                        }
                        /**
                         * Check if scrollY option is turned on
                         * If so, watch width when window resize
                         */
                        if (scope.dataTableOptions.scrollY) {
                            scope.$watch(
                                function() {
                                    return element.width();
                                },
                                function(newValue, oldValue) {
                                    if (newValue !== oldValue) {
                                        resizeColumnHeaders();
                                    }
                                }
                            );

                            angular.element($window).bind('resize', onWindowResize);
                        }
                        function onWindowResize(){
                                scope.$apply();
                        }
                        /**
                         * Check if rowCallback option exists and add method to function
                         * to compile individual row when created
                         */
                        scope.dataTableOptions.rowCallback = (function() {
                            var cached_function = scope.dataTableOptions.rowCallback;
                            return function(row, data) {
                                if (cached_function) {
                                    //if function exists, call it first
                                    cached_function(row, data);
                                }
                                //compile row to scope for ng-clicks 
                                //and any other directives like tooltips
                                var rowEl = angular.element(row);
                                if (!rowEl.hasClass('compiled')) {
                                    rowEl.addClass('compiled');
                                    $compile(row)(scope);
                                }
                            }
                        }());

                        var startSortColumn = scope.dataTableOptions.order[0] ? (scope.dataTableOptions.order[0][0] ? scope.dataTableOptions.order[0][0] : -1) : -1,
                            selectedColumnIndex,
                            isColumnClicked = false,
                            isColumnInitialized = false,
                            isTableCreated = false;
                        // Check for any declared columns and apply any found.
                        var declarativeColumns = [];
                        // Look for columns defined with th elements.
                        // TODO: This doesn't appear to work. No TH elements are found.
                        // Apparently, because of the presence of the full jquery library the directive is returning
                        // the function that returns the table in the element. Not the table itself. Investigation pending.
                        element.find('th').each(function(index, elem) {
                            declarativeColumns.push($(elem).text());
                        });

                        // If any TH elements were found, store them in the aoColumns property of the DataTable.
                        if (declarativeColumns.length > 0) {
                            scope.dataTableOptions.columns = declarativeColumns;
                            // Otherwise, check for columns declared in the aoColumns attribute and apply them.
                        }
                        // else if (scope.columnDefinitions) {
                        //     scope.dataTableOptions.columns = scope.columnDefinitions;
                        // }

                        //if not server side, listen to page and itemsPerPage
                        if (isServerSide === 'false') {
                            scope.$watch('page', function(pg) {
                                if (scope.DataTable) {
                                    currentPage = pg - 1;
                                    scope.DataTable.page(currentPage).draw(false);
                                    checkForSelectedItems(true);
                                }
                            });

                            scope.$watch('itemsPerPage', function(d) {
                                if (scope.DataTable) {
                                    scope.DataTable.page.len(d).draw();
                                    checkForSelectedItems(true);
                                }
                            });

                            scope.$watch('searchTerm', function(term) {
                                if (scope.DataTable) {
                                    var termStr = String(term);
                                    scope.dataTable.api().search(termStr).draw();
                                    checkForSelectedItems(true);
                                }
                            });
                        }

                        if (attrs.headerCheckboxClickState) {
                            scope.$watch('headerCheckboxClickState', function(state) {
                                if (state === true) {
                                    selectAllItems();
                                } else if (state === false) {
                                    deselectAllItems();
                                }
                            });
                        }

                        if (attrs.columnDefinitions !== undefined) {
                            scope.$watch('columnDefinitions', function() {
                                    updateColumns();
                                },
                                true);
                        }
                        /**
                         * watch selected items
                         */
                        scope.$watchCollection('selectedItems', function() {
                            if (scope.selectedItems !== undefined) {
                                checkForSelectedItems(true);
                            }
                        });
                        // Click Handler Function.
                        scope.editClickHandler = function(el) {
                            var $tr = $(el).closest('tr');
                            // Retrieve the data context for the edited row.
                            var dataContext = scope.DataTable.row($tr).data();
                            // Apply the editing template to the newly selected row.
                            applyEditTemplate($tr, dataContext);
                            // Store the current row as the selected row.
                            scope.editRow = $tr;
                        };

                        scope.saveClickHandler = function(el) {
                            //$log.debug('save');
                        };

                        scope.actionsClickHandler = function(el) {
                            var $tr = el.closest('tr'),
                                action = el.data('action'),
                                dataContext = scope.DataTable.row($tr).data();
                            scope.actionClicked({
                                action: action,
                                rowElement: $tr,
                                rowObj: {
                                    element: $tr
                                },
                                rowData: dataContext
                            });
                        };

                        //show Row Details
                        //http://www.datatables.net/examples/api/row_details.html
                        scope.showRowDetails = function(el) {
                            if (!attrs.rowDetailsTemplate) {
                                return;
                            }
                            var $tr = el.closest('tr'),
                                row = scope.DataTable.row($tr);

                            if (row.child.isShown()) {
                                row.child.hide();
                                $tr.removeClass('shown');
                            } else {
                                row.child(scope.rowDetailsTemplate(row.data())).show();
                                $tr.addClass('shown');
                            }
                        };
                        scope.headerCheckboxHandler = function(el) {
                            if (el[0].checked) {
                                selectAllItems();
                            } else {
                                deselectAllItems();
                            }
                        };
                        scope.checkboxHandler = function(el, changeEvent) {
                            //deselect header checkbox by default
                            $('thead tr input:checkbox', element).prop('checked', false);
                            if (attrs.headerCheckboxClickState) {
                                scope.headerCheckboxClickState = 'indeterminate';
                            }

                            //if no unique column specified, exit
                            if (!attrs.uniqueKey) {
                                return;
                            }
                            //if selectedItems not defined, create as array
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            //get row element reference and checked status
                            var $tr = el.closest('tr'),
                                isChecked = el[0].checked;

                            var dataContext = scope.DataTable.row($tr).data();

                            //get unique value from source
                            var uniqueID = getUniqueID($tr);
                            //get index of unique value in selected items array, if any
                            var itemIndex = scope.selectedItems.indexOf(uniqueID);

                            //if item exists and checkbox is deselected, remove item from array
                            if (itemIndex > -1 && !isChecked) {
                                scope.selectedItems.splice(itemIndex, 1);
                            }
                            //if item doesn't exist in array and checkbox selected, add item to array
                            else if (itemIndex < 0 && isChecked) {
                                scope.selectedItems.push(uniqueID);
                            }

                            if (attrs.checkboxClicked) {
                                scope.checkboxClicked({
                                    rowData: dataContext,
                                    rowElement: $tr,
                                    rowObj: {
                                        element:$tr
                                    },
                                    isChecked: isChecked,
                                    changeEvent: changeEvent,
                                });
                            }

                        };
                        scope.rowClickHandler = function(row, clickEvent) {
                            // Retrieve the index of the clicked Row.
                            var dataContext = scope.DataTable.row(row).data();
                            // Do not attempt to apply edit mode to the header row.
                            if ($(row).parent('thead').length > 0) {
                                return;
                            }

                            var isSelected = $(row).hasClass('selected');

                            if (hasMultiSelect) {


                                //get unique value from source
                                var uniqueID = getUniqueID(row);
                                //get index of unique value in selected items array, if any
                                var itemIndex = scope.multiSelectedItems.indexOf(uniqueID);
                                //if item exists and checkbox is deselected, remove item from array
                                if (itemIndex > -1) {
                                    scope.multiSelectedItems.splice(itemIndex, 1);
                                    $(row).removeClass('selected');
                                }
                                //if item doesn't exist in array and checkbox selected, add item to array
                                else if (itemIndex < 0) {
                                    scope.multiSelectedItems.push(uniqueID);
                                    $(row).addClass('selected');
                                }
                            } else {
                                if (isSelected) {
                                    //Might not need to remove Class until the an another row is selected
                                    //$(row).removeClass('selected');
                                } else {
                                    $('tr.selected', element).removeClass('selected');
                                    $(row).addClass('selected');
                                }
                            }
                            // Call the specified controller function.
                            // Convert the rowParameter to the actual row context.

                            //var dataContext = scope.itemSource[rowIndex];

                            if (attrs.rowClicked) {
                                scope.rowClicked({
                                    rowElement: row,
                                    rowObj: {
                                        element:row
                                    },
                                    rowParameter: row,
                                    rowData: dataContext,
                                    clickEvent: clickEvent
                                });
                            }

                            // Edit Code. Do not allow editing the header row.
                            if (isEditable === true) {
                                // If a row was already being edited, then remove edit template and selection class.
                                if (scope.editRow) {

                                    // Do not attempt to apply the edit template on the same row that is being edited.
                                    if (row.index() === scope.editRow.index()) {
                                        return;
                                    }

                                    // Retrieve the data context for the edited row.
                                    var editedDataContext = scope.DataTable.row(scope.editRow).data();

                                    // Validate the row.
                                    if (validateRowChanges(row, dataContext)) {
                                        return;
                                    }

                                    // Convert the row back to read only.
                                    commitRowChanges(scope.editRow, editedDataContext);

                                    // Save the row.
                                    updateRowDataContext(scope.editRow, editedDataContext);

                                    // Remove the selected row styling.
                                    scope.editRow.removeClass('row_selected');
                                }

                                // Apply the selection class to the newly selected row.
                                row.addClass('row_selected');

                                // Retrieve the data context for the edited row.
                                dataContext = scope.DataTable.row(row).data();

                                // Apply the editing template to the newly selected row.
                                applyEditTemplate(row, dataContext);

                                // Store the current row as the selected row.
                                scope.editRow = row;
                            }
                        };

                        // DoubleClick Handler Function.
                        scope.rowDoubleClickHandler = function(row, clickEvent) {
                            var dataContext = scope.DataTable.row(row).data();
                            scope.rowDblclicked({
                                rowElement:row,
                                rowObj: {
                                    element:row
                                },
                                rowParameter: row,
                                rowData: dataContext,
                                clickEvent: clickEvent
                            });
                        };

                        scope.theadClickHandler = function(column, clickEvent) {
                            if ($(column[0]).hasClass('sorting_disabled')) {
                                return;
                            }
                            selectedColumnIndex = column.index();

                            //if data is server side, clear first
                            if (isServerSide !== 'false' && selectedColumnIndex >= startSortColumn) {
                                scope.DataTable.clear().draw();
                                showEmptyTableText();
                            }

                            isColumnClicked = true;
                            var direction = 'asc';

                            if ($(column[0]).hasClass('sorting_desc')) {
                                direction = 'asc';
                            }
                            if ($(column[0]).hasClass('sorting_asc')) {
                                direction = 'desc';
                            }
                            scope.headerClicked({
                                column: column[0].innerHTML,
                                columnObject: scope.columnDefinitions[selectedColumnIndex],
                                sortDirection: direction,
                                clickEvent: clickEvent
                            });
                        };

                        scope.onTableDraw = function() {
                            //deselect header checkbox by default
                            $('thead tr input:checkbox', element).prop('checked', false);
                            //compile again after dynamic content updated, such as tooltip
                            //checkRowGrouping();
                            if (scope.totalItems !== undefined) {
                                scope.totalItems = scope.DataTable.page.info().recordsDisplay;
                            }

                            scope.tableDrawn();

                            if (scope.dataTableOptions.scrollY) {
                                resizeColumnHeaders();
                            }

                            //$compile(element.contents())(scope);
                        };

                        /**** Directive Methods ***/
                        function addClickEvents() {
                            // Add the click handler to each TR element.
                            element.on('click', 'tr', function(event) {
                                var _this = this;
                                $timeout(function() {
                                    scope.rowClickHandler(_this, event);
                                });
                            });

                            // Add the double click handler to each TR element.
                            element.on('dblclick', 'tr', function(event) {
                                scope.rowDoubleClickHandler(this, event);
                            });

                            // Add the click event to the thead area.
                            // $("thead td").click(function() {} );
                            //$(scope.dataTable).on("click", "thead td", function(event){

                            element.on('click', 'thead th', function(event) {
                                scope.theadClickHandler($(this), event);
                            });

                            // ADD edit and save click handler
                            // $(scope.dataTable).on("click", "tr .edit", function(event){
                            //     scope.editClickHandler($(this));
                            // });
                            // $(scope.dataTable).on("click", "tr .save", function(event){
                            //     scope.saveClickHandler($(this));
                            // });
                            element.on('click', 'tr [data-action]', function(event) {
                                event.stopPropagation();
                                scope.actionsClickHandler($(this, event));
                            });
                            element.on('click', 'tr [data-show-row-details]', function() {
                                scope.showRowDetails($(this));
                            });
                            element.on('change', 'tbody tr input:checkbox', function(event) {
                                var _this = this;
                                scope.$apply(function() {
                                    scope.checkboxHandler($(_this), event);
                                });
                            });
                            element.on('click', 'tbody tr input:checkbox', function(event) {
                                event.stopPropagation();
                            });
                            element.on('change', 'thead:eq(0) tr input:checkbox', function() {
                                var _this = this;
                                $timeout(function() {
                                    scope.headerCheckboxHandler($(_this));
                                });
                            });

                            element.on('draw.dt', function() {
                                scope.onTableDraw();
                            });

                            element.on('order.dt', function() {
                                //if filter events, change page number
                                if (!!scope.page) {
                                    $timeout(function() {
                                        scope.page = scope.DataTable.page.info().page + 1;
                                    });
                                } else {
                                    $log.warn('Bento DataTable - `page` is not defined');
                                }
                                //$log.debug(scope.DataTable.page.info())
                            });
                        }

                        /**
                         * Add in column group header if needed
                         */
                        function addColumnGroupHeader() {
                            if (attrs.columnGrouping === 'true' && attrs.columnDefinitions) {

                                var groupTitle = '';
                                var colSpan = 1;
                                //get column head
                                element.find('thead tr').before('<tr role="row"></tr>');
                                var theadRow = element.find('thead tr:eq(0)');
                                var originalTheadRow = element.find('thead tr:eq(1)');
                                var appendCount = 0;
                                //iterate through all the columns
                                for (var i = 0, total = scope.columnDefinitions.length; i < total; i++) {
                                    var $col = originalTheadRow.children().eq(i - appendCount);

                                    if (scope.columnDefinitions[i].groupTitle === null || scope.columnDefinitions[i].groupTitle === undefined) {

                                        $col.appendTo(theadRow);

                                        if (i > 0 && scope.columnDefinitions[i - 1].groupTitle !== null && scope.columnDefinitions[i - 1].groupTitle !== undefined) {
                                            $col.addClass('group');
                                        }
                                        $col.attr('rowspan', 2);
                                        appendCount += 1;

                                    } else if (scope.columnDefinitions[i].groupTitle !== groupTitle) {

                                        groupTitle = scope.columnDefinitions[i].groupTitle;
                                        colSpan = 1;
                                        theadRow.append('<th colspan="' + colSpan + '" class="group">' + groupTitle + '</th>');
                                        $col.addClass('group');

                                    } else {

                                        colSpan += 1;
                                        $('th:last-child', theadRow).remove();
                                        theadRow.append('<th colspan="' + colSpan + '" class="column-group group">' + groupTitle + '</th>');
                                    }

                                }
                            }
                        }
                        /**
                         * Add in column filter if needed
                         * https://datatables.net/examples/api/multi_filter.html
                         */
                        function addColumnFilters() {
                            if (scope.columnFilterDefinitions && scope.columnFilterDefinitions.length > 0) {
                                //Add another thead after original thead
                                var thead = element.find('thead:eq(0)');
                                var tHeadHTML = '<thead class="column-filter-row"><tr></tr></thead>';
                                $(thead).after(tHeadHTML);
                                var $columnFilterRow = element.find('.column-filter-row tr');

                                //Iterate throught column filter definitions
                                for (var i = 0, total = scope.columnFilterDefinitions.length; i < total; i++) {
                                    var filterObj = scope.columnFilterDefinitions[i];
                                    //var randomName = Math.round(Math.random()*100000);
                                    var modelName = 'cf_model_' + i;

                                    //If filter is input type, create input field and bind keyup and change event to it
                                    if (filterObj.type && filterObj.type === 'input') {
                                        $columnFilterRow.append('<th><input ng-model="' + modelName + '" ng-change="filterColumn(' + i + ', ' + modelName + ',' + filterObj.exactMatch + ',' + filterObj.stripHTML + ')" type="text" /></th>');
                                    }
                                    //Else if filter is select type, create select field and bind select event to it
                                    else if (filterObj.type && filterObj.type === 'select') {
                                        // var selectHTML = '<th><select ng-model="' + modelName + '" ng-change="filterColumn('+ i +', '+ modelName +')" '
                                        //                + 'ng-options="option.value as option.name for option in columnFilterDefinitions[' + i + '].options"' 
                                        //                + '></select></th>';

                                        var selectHTML = '<th><select ng-model="' + modelName + '" ng-change="filterColumn(' + i + ', ' + modelName + ',' + filterObj.exactMatch + ',' + filterObj.stripHTML + ')">';
                                        for (var j = 0, ttl = filterObj.options.length; j < ttl; j++) {
                                            selectHTML += '<option value="' + filterObj.options[j].value + '">' + filterObj.options[j].name + '</option>';
                                        }
                                        selectHTML += '</select></th>';
                                        $columnFilterRow.append(selectHTML);
                                    }
                                    //Else add empty cell
                                    else {
                                        $columnFilterRow.append('<th></th>');
                                    }
                                }

                                scope.$watch('columnFilterToggle', function(showOrHide) {
                                    $('.column-filter-row', element).toggle(showOrHide);
                                });

                                //column header element compiled on table created

                            }
                        }

                        function updateColumns() {
                            var columns = scope.columnDefinitions;
                            if (columns && columns.length > 0 && scope.DataTable) {
                                // column visibility and column grouping aren't playing
                                // nice together so kill this feature for datatables
                                // that have column groups
                                if (attrs.columnGrouping === "true") {
                                    return;
                                }
                                columns.forEach(function(col, i) {
                                    // set each columns visibility
                                    scope.DataTable.column(i).visible(col.visible);
                                    // ensure we have column filters before trying to hide them
                                    if (typeof scope.columnFilterDefinitions !== 'undefined') {
                                        // set each filters visiblity
                                        var css = (col.visible === false) ? "none" : "table-cell";
                                        var fauxIndex = i + 1;
                                        var el = element[0].querySelector('.column-filter-row th:nth-of-type(' + fauxIndex + ')');
                                        // set the display property to show/hide filters    
                                        if (el) {
                                            el.style.display = css;
                                        }
                                    }

                                });
                            }
                        }

                        function resizeColumnHeaders() {
                            if (scope.DataTable) {
                                scope.DataTable.columns.adjust();
                            }
                        }
                        /**
                         * @desc adds back sort arrows when using server-side data
                         * and client-side sorting is disabled
                         * @param index
                         */
                        function displaySortColumn(index) {
                            if (!isTableCreated || (isColumnInitialized && !isColumnClicked)) {
                                return;
                            }

                            isColumnClicked = false;
                            isColumnInitialized = true;


                            var tmp = $('thead th', element),
                                tmpLength = tmp.length;

                            for (var i = 0; i < tmpLength; i = i + 1) {
                                var columnDef = scope.columnDefinitions[i];
                                if (columnDef && (columnDef.bSortable === false || columnDef.sortable === false)) {
                                    continue;
                                }
                                var addClassName = 'sorting';
                                if (index === i) {
                                    if (tmp[i].className === 'sorting_desc') {
                                        addClassName = 'sorting_asc';
                                    } else if (tmp[i].className === 'sorting_asc') {
                                        addClassName = 'sorting_desc';
                                    } else {
                                        if (tmp[i].className === 'sorting_disabled') {
                                            if (scope.dataTableOptions.order[0][1] === 'asc') {
                                                addClassName = 'sorting_asc';
                                            } else {
                                                addClassName = 'sorting_desc';
                                            }
                                        } else {
                                            addClassName = 'sorting_asc';
                                        }
                                    }
                                }
                                $(tmp[i]).attr('aria-controls', element.attr('id'));
                                $(tmp[i]).removeClass();
                                $(tmp[i]).addClass(addClassName);
                                if (addClassName === 'sorting_asc') {
                                    $(tmp[i]).attr('area-sort', 'ascending');
                                } else if (addClassName === 'sorting_desc') {
                                    $(tmp[i]).attr('area-sort', 'descending');
                                } else if (addClassName === 'sorting') {
                                    $(tmp[i]).removeAttr('area-sort');
                                }
                            }
                        }

                        function applyEditTemplate(row, rowDataContext) {

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);
                            var editCells = [];

                            // Insert a text box in each row using the data context as the value source.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {

                                var columnDef = scope.columnDefinitions[cellCounter];
                                var cellDataContext = null;

                                if (columnDef.mData) {
                                    cellDataContext = rowDataContext[columnDef.mData];
                                } else {
                                    cellDataContext = rowDataContext[cellCounter];
                                }

                                editCells[cellCounter] = '<td><div class="control-group"><input type="text" value="' + cellDataContext + '"></div></td>';
                            }

                            // Apply the edit cell Html.
                            $(row).html(editCells);

                            //MH note: sorting causes targeting issues and generally makes everything more complicated so clear sorting filters
                            //scope.dataTable.fnSort([]);

                            // Redraw the table.
                            scope.DataTable.sort().draw();
                        }

                        function commitRowChanges(row, dataContext) {

                            //var rowIndex = row.index();

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);

                            // Extract all the inputs
                            //var textControls = $('input', row);

                            // Update each cell in the DataTable row to commit the change to the table and restore the row template.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                                //scope.dataTable.fnUpdate(textControls[cellCounter].value, rowIndex, cellCounter, false);
                            }
                        }

                        function updateRowDataContext(row, dataContext) {

                            // Extract all the cells from the row.
                            var rowCells = $('>td', row);

                            // Update each property in the data context from it's cell.
                            for (var cellCounter = 0; cellCounter < rowCells.length; cellCounter++) {
                                //dataContext[cellCounter] = scope.dataTable.fnGetData(rowCells[cellCounter]);
                            }
                        }

                        function validateRowChanges(row, dataContext) {
                            var errors = false;
                            //var rowIndex = row.index();


                            // Extract all the cells from the row.
                            //var rowCells = $('>td', row);

                            // Extract all the inputs
                            var textControls = $('input', row);

                            angular.forEach(textControls, function(textControl) {
                                if (textControl.value === '') {
                                    errors = true;
                                    $(textControl).parent().addClass('error');
                                } else {
                                    $(textControl).parent().removeClass('error');
                                }
                            });

                            return errors;
                        }

                        function selectAllItems() {
                            if (!scope.DataTable) {
                                return;
                            }
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            $('tbody tr', element).each(function() {
                                //get unique id from row, attrs.uniqueKey is the keyname of the column
                                var uniqueID = getUniqueID(this);
                                //check if unique id does not exist in array of selected items
                                if (scope.selectedItems.indexOf(uniqueID) < 0) {
                                    //select the checkbox
                                    //add to list
                                    var $checkbox = $('input:checkbox', this);
                                    if ($checkbox.length) {
                                        $checkbox.prop('checked', true);
                                        scope.selectedItems.push(uniqueID);
                                    }
                                }
                            });
                        }

                        function deselectAllItems() {
                            if (!scope.DataTable) {
                                return;
                            }
                            if (scope.selectedItems === undefined) {
                                scope.selectedItems = [];
                            }
                            $('tbody tr', element).each(function() {
                                //get unique id from row, attrs.uniqueKey is the keyname of the column
                                var uniqueID = getUniqueID(this);
                                //check if unique id does not exist in array of selected items
                                var itemIndex = scope.selectedItems.indexOf(uniqueID);
                                if (itemIndex > -1) {
                                    //deselect the checkbox
                                    //remove from list
                                    var $checkbox = $('input:checkbox', this);
                                    if ($checkbox.length) {
                                        $checkbox.prop('checked', false);
                                        scope.selectedItems.splice(itemIndex, 1);
                                    }
                                }
                            });
                        }

                        function checkForSelectedItems(force) {
                            //Multi-Select: check to see if any items are selected when data is updated
                            //if there are items in the array
                            if (scope.selectedItems.length > 0 || force === true) {
                                //iterate through all the row item source and check if unique id is in selected array
                                $('tbody tr', element).each(function() {
                                    //get unique id from row, attrs.uniqueKey is the keyname of the column
                                    var uniqueID = getUniqueID(this);
                                    //check if unique id exists in array of selected items
                                    if (scope.selectedItems.indexOf(uniqueID) > -1) {
                                        //select the checkbox
                                        $('input:checkbox', this).prop('checked', true);
                                    } else {
                                        $('input:checkbox', this).prop('checked', false);
                                        $('input:checkbox', 'thead tr').prop('checked', false);
                                    }
                                });
                            }
                        }

                        function checkForMultiSelectedItems() {
                            //Multi-Select: check to see if any items are selected when data is updated
                            //if there are items in the array
                            if (scope.multiSelectedItems.length > 0) {
                                //iterate through all the row item source and check if unique id is in selected array
                                $('tbody tr', element).each(function() {
                                    //get unique id from row, attrs.uniqueKey is the keyname of the column
                                    var uniqueID = getUniqueID(this);
                                    //check if unique id exists in array of selected items
                                    if (scope.multiSelectedItems.indexOf(uniqueID) > -1) {
                                        //select the checkbox
                                        //$('input:checkbox', this).prop("checked", true);
                                    }
                                });
                            }
                        }

                        function getUniqueID(row) {
                            var dataContext = scope.DataTable.row(row).data();
                            if (dataContext) {
                                return JSON.stringify(dataContext[attrs.uniqueKey]);
                            } else {
                                return -1;
                            }
                        }

                        function checkRowGrouping() {
                            if (attrs.groupByColumn !== undefined && isServerSide === 'false' && scope.DataTable) {
                                var col = Number(attrs.groupByColumn);
                                scope.dataTable.rowGrouping({
                                    iGroupingColumnIndex: col,
                                    bExpandableGrouping: true,
                                    asExpandedGroups: [],
                                    fnOnGrouped: function() {}
                                });
                            }
                        }

                        function showEmptyTableText() {
                            //scope.dataTable.fnSettings().oLanguage.sEmptyTable = '';
                            //scope.dataTable.fnSettings().oLanguage.sZeroRecords = '';
                        }

                        //http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
                        function escapeRegExp(str) {
                            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                        }

                        function sanitizeHTML(str){
                            return str.replace(/<(?:.|\n)*?>/gm, '');
                        }

                        scope.filterColumn = function(index, value, isSelect,stripHTML) {
                            if (isSelect && stripHTML) {
                                var val = sanitizeHTML(value);
                                val = escapeRegExp(val);
                                
                                scope.DataTable
                                    .column(index)
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            } else if(isSelect){
                                var val = escapeRegExp(value);
                                scope.DataTable
                                    .column(index)
                                    .search(val ? '^' + val + '$' : '', true, false)
                                    .draw();
                            }else {
                                scope.DataTable
                                    .column(index)
                                    .search(value)
                                    .draw();
                            }
                        };

                        /**** Directive Watches ***/

                        // Set a watch on the DataTable's data element and rebuild the table if it changes.
                        scope.$watchCollection('itemSource', function(newValue, oldValue) {
                            if (scope.columnDefinitions === undefined || scope.columnDefinitions.length === 0) {
                                return;
                            }

                            // If the Data Table has not already been created..
                            if (typeof scope.DataTable === 'undefined') {
                                // Examine the data to see if it has any content. If it doesn't,
                                // then the watch is in it's start up execution.

                                // Retrieve the column information defined in the datatable declaration.
                                // This data should now be present if it was delivered in the data call.

                                //if client side data
                                if (isServerSide === 'false') {
                                    currentPage = scope.page - 1;
                                    scope.dataTableOptions.paginate = true;
                                    scope.dataTableOptions.ordering = true;
                                    scope.dataTableOptions.displayLength = scope.itemsPerPage;
                                    scope.dataTableOptions.displayStart = currentPage * scope.itemsPerPage;
                                }

                                if (attrs.columnDefinitions === undefined || (Array.isArray(scope.columnDefinitions) && scope.columnDefinitions.length === 0)) {
                                    scope.dataTableOptions.columns = [];
                                    angular.forEach(newValue, function(value, key) {
                                        scope.dataTableOptions.columns.push({
                                            'data': key,
                                            'title': key,
                                        });
                                    });
                                } else {
                                    scope.dataTableOptions.columns = scope.columnDefinitions;
                                }

                                // Apply the DataTable plugin to the specified element and pass the various options
                                // captured above in as the options parameter..

                                //jQuery Object reference
                                //TODO: switch to using DataTables 1.10 API
                                //DataTables API instance
                                scope.dataTable = $('table:eq(0)', element).dataTable(scope.dataTableOptions);
                                scope.DataTable = scope.dataTable.api();

                                // Add the newly delivered data to the table.
                                if (newValue.length === 0) {
                                    scope.DataTable.clear().draw();
                                    showEmptyTableText();
                                } else {
                                    scope.DataTable.rows.add(newValue).draw();
                                }
                                //add in group column header if needed
                                addColumnGroupHeader();

                                //Add Column Filters
                                addColumnFilters();

                                //Add Click Event Handlers
                                addClickEvents();

                                //Update Column Headers
                                updateColumns();

                                //row grouping
                                if (attrs.groupByColumn !== undefined) {
                                    checkRowGrouping();
                                    //scope.DataTable.draw();
                                }

                                //option to expose dataTable object after it is created
                                scope.tableCreated({
                                    dataTableAPI: scope.DataTable
                                });
                                isTableCreated = true;


                                //compile column headers
                                $compile($('thead', element))(scope);

                                //$compile(element.contents())(scope);

                            } else {
                                // Otherwise, refresh the datatable with the new data.
                                var val = newValue || null;

                                // Remove the current data from the table.
                                scope.DataTable.clear().draw();

                                if (val && val.length > 0) {

                                    if (scope.editRow) {
                                        scope.editRow = undefined;
                                    }

                                    // Add the newly delivered data to the table.
                                    //scope.dataTable.fnAddData(newValue);
                                    scope.DataTable.rows.add(newValue).draw();

                                    //$log.debug('Render time = ' + (endTime - startTime) + 'ms');
                                } else {
                                    showEmptyTableText();
                                }
                            }

                            //if client sort turned off and aoColumns available
                            //add sort arrows manually
                            if (!scope.dataTableOptions.ordering && scope.dataTableOptions.aoColumns && isServerSide !== 'false') {
                                //if column was not clicked, start sort with original sort column
                                if (!selectedColumnIndex) {
                                    selectedColumnIndex = startSortColumn;
                                }
                                if (selectedColumnIndex >= 0) {
                                    displaySortColumn(selectedColumnIndex);
                                } else {
                                    startSortColumn = 0;
                                }
                            }
                            //Multi-Select: check to see if any items are selected when data is updated
                            //check if attribute exists for array of selected items
                            if (scope.selectedItems !== undefined &&
                                scope.selectedItems.length > 0 &&
                                attrs.uniqueKey !== undefined && !!scope.itemSource &&
                                scope.itemSource.length > 0
                            ) {
                                checkForSelectedItems();
                            }
                            //Multi-Select: check to see if any items are selected when data is updated
                            //check if attribute exists for array of selected items
                            if (scope.multiSelectedItems !== undefined &&
                                scope.multiSelectedItems.length > 0 &&
                                attrs.uniqueKey !== undefined && !!scope.itemSource &&
                                scope.itemSource.length > 0
                            ) {
                                checkForMultiSelectedItems();
                            }

                        });

                    }
                };
            }
        ]);
})(window.angular);
(function (angular, window, undefined) {

  'use strict';

  angular.module('bento.fileselector', ['bento.busyloader', 'bento.services'])
    .directive('fileSelector', [
      function () {
        return {
          controller : 'fileSelectorController',
          replace    : true,
          scope      : {
            fileType         : '@',    // Limit the type of file that needs to be selected
            onFileSelect     : '&',    // Callback when a file is selected
            onFileRemove     : '&',    // Callback when the selected file's reference is removed from this directive
            multiple         : '=',    // (Boolean) for multiple file selections
            appendOnSelection: '=',    // (Boolean) append new files onto the existing list
            showSelected     : '=',    // Show selected files in the view
            shoeFileSize     : '='     // Show file size info
          },
          templateUrl: '../templates/file_selector/bento-file-selector.html'
        };
      }
    ])
    .filter('bentoFileSizeFilter', function () {
      return function (value) {
        var output = '0 Byte';
        if (value < 1000) {
          output = value + 'B';
        } else if (value < 100000) {
          output = Math.round(value / 100) / 10 + 'KB';
        } else if (value < 1000000) {
          output = Math.round(value / 1000) + 'KB';
        } else if (value < 100000000) {
          output = Math.round(value / 100000) / 10 + 'MB';
        } else if (value < 1000000000) {
          output = Math.round(value / 1000000) + 'MB';
        } else if (value < 100000000000) {
          output = Math.round(value / 100000000) / 10 + 'GB';
        } else if (value < 1000000000000) {
          output = Math.round(value / 1000000000) + 'GB';
        } else if (value < 100000000000000) {
          output = Math.round(value / 100000000000) / 10 + 'TB';
        } else if (value < 1000000000000000) {
          output = Math.round(value / 1000000000000) + 'TB';
        }

        return output;
      }
    })
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

          var originalFiles = (scope.multiple) ? files : [files[0]]; //1 element when `mutiple` is NOT `true`

          var selectedFiles = [];
          for (var i = 0; i < originalFiles.length; i++) {
            var file = originalFiles[i];
            if (isValidFileType(file, fileType)) {
              selectedFiles.push(file);
            }
          }

          // Determine if it needs to append to the existing file array or not
          if (scope.appendOnSelection && Array.isArray(scope.selectedFiles) && scope.multiple) {
            scope.selectedFiles = scope.selectedFiles.concat(selectedFiles);
          } else {
            // Add a file reference to scope
            scope.selectedFiles = selectedFiles;
          }

          // Since this is a single file uploader for this version
          // Only the first element will be included into the callback function
          if (!!callback) {
            callback({
              files:  scope.selectedFiles
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
          if ($bentoServices.getIEVersion() !== -1) {
            // Using the native dispatcher on click for the file selector
            var clickEvent = document.createEvent('Event');
            clickEvent.initEvent('click', true, true);
            fileInput[0].dispatchEvent(clickEvent);
          } else {
            // Otherwise simple
            fileInput[0].click();
          }

          if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
          }
        };

        // Watch Selected files count when removing
        $scope.$watch(function () {
            return !!$scope.selectedFiles ? $scope.selectedFiles.length : 0;
          },
          function (newVal, oldVal) {
            if (newVal < oldVal) {
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

        function onFileInputChange(event) {
          $fileSelectorServices.parseFiles(
            $scope,
            event.target.files,
            $scope.onFileSelect,
            $scope.fileType);
        }
      }
    ])
  ;

})(window.angular, window);

(function (window, angular) {
  /* Directive */
  angular.module('bento.megamenu',[])
    .directive('megamenu', function () {
      return {
        restrict: 'AC',
        scope   : false,
        link    : megamenuLinkFunc
      }
    });

  /**
   * Megamenu Main link function
   * @param scope
   * @param element
   * @param attrs
   * @param controller
   */
  function megamenuLinkFunc(scope, element, attrs, controller) {

    var isMemberOfToolbar = false,
        toolbar,
        currentItem,
        submenu
      ;

    // make sure this directive has the right class name for CSS to kick in
    element.addClass('megamenu');

    // Check if this is an `takeover` element
    if(attrs.takeover && attrs.takeover.trim() === 'true'){
      // check if this megamenu is part of a toolbar
      var tmpEl = element[0];

      // Walk up the DOM tree to find out if this `takeover` is part of a navbar
      do {
        if(tmpEl.className.search('global-subnav') > -1){
          // Bingo
          // This `takeover` is a Nav (Tool)Bar member
          isMemberOfToolbar = true;
          toolbar = tmpEl;
        }
        tmpEl = tmpEl.parentNode;
      } while(tmpEl.tagName !== 'BODY' && !isMemberOfToolbar);
      element.addClass('megamenu-takeover');
    }else{
      // no need to proceed as megamenu leaves on CSS natively
      return;
    }

    // Only a Nav (Tool)Bar member can become the actual `takeover` directive.
    // Otherwise, nothing is executed below.
    if(isMemberOfToolbar) {
      element.css('width',toolbar.offsetWidth + 'px');

      angular.element(window).on('resize',onWindowResize);

      // Window resize callback
      function onWindowResize(){
        element.css('width',toolbar.offsetWidth + 'px');

        if(currentItem){
          onHeaderHover(currentItem);
        }
      }

      // Make sure the window listner is removed on $destroy
      element.on('$destroy',function(){
        angular.element(window).off('resize',onWindowResize);
      });

      // Check if this dropdow is expanded or not
      scope.$watch(function(){
        return element.hasClass('open');
      }, function(isOpen){
        // clean columns when closed
        if(!isOpen){
          cleanColumns();

          // Clean global var `submenu`
          if(submenu){
            submenu.removeAttr('style');
          }

          // Remove active state to the current `submenu` item
          if(currentItem){
            angular.element(currentItem).removeClass('active');
          }
        }
      });

      // Restructure the menu as a `takeover` element
      restructureMenu(element);
    }

    /**
     * Cleans all the columns except for the submenu header column
     * 'megamenu-takeover-header'
     */
    function cleanColumns(){
      var columnsToRemove = element[0].querySelectorAll('.column.submenu');

      for(i=0,len=columnsToRemove.length; i<len; i++){
        column = columnsToRemove[i];
        column.parentNode.removeChild(column);
      }
    }

    /**
     * Event Handler when a submenu header is click or hovered
     * @param event
     * @param el
     * @param submenu
     */
    function onHeaderHover(currentTarget){
      // clean the previous columns if there is any
      var columns = [],
          links = currentTarget.links,
          i, len, column;

      // Clean before preceeding
      cleanColumns();

      // Clean `megamenu-takeover-header`
      submenu.removeAttr('style');

      // create new column(s)
      var currentColumn;
      for(i=0,len=links.length; i<len; i++){
        if(!currentColumn){
          currentColumn = angular.element('<li class="column submenu"></li>');
          element.append(currentColumn);
          columns.push(currentColumn);
        }

        currentColumn.append(links[i]);

        // Make new column if content overflows
        if(currentColumn[0].offsetHeight > submenu[0].offsetHeight){
          currentColumn = angular.element('<li class="column submenu"></li>');
          element.append(currentColumn);

          columns.push(currentColumn);
          currentColumn.append(links[i]);
        }

        // This column is overflowing to the next row.
        // It needs to be removed and to be rendered differently
        if(currentColumn[0].offsetTop > submenu[0].offsetTop){
          columns.pop();
          currentColumn[0].parentElement.removeChild(currentColumn[0]);
          // New render
          renderOnlyIntoGivenColumns(columns, links);
          break;
        }
      }
    }

    /**
     * Re-render the submenu items into give columns
     * @param columns
     * @param links
     * @param submenu
     */
    function renderOnlyIntoGivenColumns(columns, links){
      var columnItemCount = Math.ceil(links.length / columns.length);
      var currentColumnIndex = 0;

      // Start to put links into the current column that is indexed
      for(var i= 0,len=links.length; i<len; i++){
        if(i >= columnItemCount * (currentColumnIndex+1)){
          currentColumnIndex++;
        }
        columns[currentColumnIndex].append(links[i]);

        // Need to redo the rearranging with less columns
        if(columns[currentColumnIndex][0].offsetTop > submenu[0].offsetTop){
          columns.pop();
          renderOnlyIntoGivenColumns(columns, links);
          break;
        }
      }

      submenu.css('height', columns[0][0].offsetHeight+'px');
    }

    /**
     * Restructuring the current Menu
     * @param element
     */
    function restructureMenu(element){
      var linkCollection = [], links, link;
      var liEls = element.find('li[class="column"]');
      var $liEls = angular.element(liEls);
      var $liEl;
      var lastActive;

      // Generate a new DOM structure for this `Takeover` megamenu
      submenu = angular.element('<li class="column"><ul></ul></li>');
      element.prepend(submenu);
      submenu.find('ul').append(liEls);
      $liEls.removeClass('column');
      $liEls.addClass('megamenu-takeover-header');

      // Remove all categorized links into memory/`links` variable
      for(var i=0,len=liEls.length; i<len; i++){
        links = liEls[i].querySelectorAll('a');
        linkCollection.push(links);

        // Create a reference for its submenu links
        liEls[i].links = links;

        // Remove all the links and to use later
        for(var j=0,lenJ=links.length; j<lenJ; j++){
          link = links[j];
          link.parentNode.removeChild(link);
        }

        // Remove all H tags
        $liEl = angular.element(liEls[i]);
        $liEl.html($liEl.text().trim());
        $liEl.attr('tabindex',0);
        $liEl.append('<i class="bento-icon-chevron-right"></i>');

        // Support `hover` `click` and `touch` so that there is no delay
        $liEl.on('click mouseover touchstart focus', function(e){
          // Just execute this even listener once without
          // any additional clicking interference
          e.stopPropagation();
          e.preventDefault();

          // Reset the previous `active` category menu header
          if(lastActive){
            lastActive.removeClass('active');
          }

          lastActive = angular.element(e.currentTarget);
          lastActive.addClass('active');

          // Update global var
          currentItem = e.currentTarget;

          // Fire the actual code for submenu header hover event handler
          onHeaderHover(currentItem,element);
        });
      }
    }
  }





})(window, angular);
(function (angular, window) {
  'use strict';
  angular.module('bento.multiselectoverlay', ['bento.services', 'bento.translate'])
    .directive('bentoMultiselectOverlay', [
      function () {
        return {
          require    : 'ngModel',
          scope      : {
            ngModel            : '=', // in Array
            selectedItems      : '=?', // in Array
            ngChange           : '&', // Callback function
            side               : '@', // Side where the overlay shows ['left : 'right']
            doneButtonText     : '@', // Text for Done button
            selectAllText      : '@', // Text for Select All checkbox
            showAllText        : '@', // Text for Show All tab
            showSelectedText   : '@', // Text for Show Selected tab
            selectButtonText   : '@', // Text for select
            editButtonText     : '@', // Text for Edit
            selectedInfoText   : '@', // Text for Info text next to the Edit button
            allSelectedInfoText: '@'  // Text Pattern for Info text when all items are selected

          },
          templateUrl: '../templates/multiselect_overlay/bento-multiselect-overlay.html',
          link       : function (scope) {
            scope.selectedItemCount = 0;
            scope.firstItemName = (scope.selectedItemCount > 0)? scope.selectedItems[0].name : '';
            scope.onDoneClick = function(){
              scope.selectedItemCount = scope.selectedItems.length;
            }

            // Init selectedItems when not defined or assigned
            if (typeof scope.selectedItems === 'undefined') {
              scope.selectedItems = [];
            }

          }
        };
      }])

  /**
   * Sub Directive
   * Bento Side Overlay and elements
   */
    .directive('bentoSideOverlay', [
      '$timeout',
      function ($timeout) {
        return {
          scope   : false,
          restrict: 'A',
          link    : function (scope, element, attrs, controller) {
            // properties and pointer to do the geo calculations
            var overlayMargin = 20;
            var side = attrs.side ? attrs.side.trim() : 'right';
            var $toggleButton = angular.element(element[0].querySelector('.bento-side-overlay-toggle'));
            var $overlayContainer = angular.element(element[0].querySelector('.bento-side-overlay-container'));
            var $overlayFooter = angular.element(element[0].querySelector('.bento-side-overlay-container-footer'));
            var overlayInnerFill = $overlayContainer[0].querySelector('.fill');
            var overlayHeight = 0;
            var $doneButton = angular.element(element[0].querySelector('.bento-side-overlay-container-footer-done'));
            var scrollableParent = getScrollableParent(element[0].parentElement);

            // Init directive CSS classes
            element.addClass('bento-side-overlay');
            element.addClass((side === 'right') ? 'bento-side-overlay-right' : 'bento-side-overlay-left');

            // Toggle button listener
            $toggleButton.on('click touch', function ($event) {
              if (!element.hasClass('open')) {
                element.addClass('open');
                renderOverlay();
                $timeout(function () {
                  // `click` should not be used since the items clicked in the overlay could disappear before
                  // the window recieves its event
                  window.addEventListener('mousedown', onWindowClick);
                  window.addEventListener('touchstart', onWindowClick);
                });

                // disable the parent scroll from double scrolling
                scrollableParent.style.overflowY = 'hidden';
              } else {
                onDoneClick($event);
              }
            });

            // Done button listener and function
            $doneButton.on('click touch', onDoneClick);

            // jQuery event Listener
            function onDoneClick($event) {
              element.removeClass('open');
              window.removeEventListener('click', onWindowClick);
              scrollableParent.style.overflowY = 'auto';

              if (!!attrs.onDone) {
                var funcName = attrs.onDone.replace('()', '').trim();

                // fire callback function
                if (!!scope[funcName]) {
                  scope[funcName]();
                  // notify NG digest
                  scope.$apply();
                }
              }
            }

            // Window (aka Done) click listener function
            function onWindowClick($event) {
              if (!element[0].contains($event.target)) {
                onDoneClick($event);
              }
            }

            // Watch and assign overlay height
            if (!!attrs.overlayHeight) {
              scope.$watch(function () {
                return scope[attrs.overlayHeight.trim()];
              }, function (newHeight) {
                overlayHeight = newHeight;
              });
            }

            // Watch and adjust footer height when switching `force-desktop` class
            scope.$watch(function () {
              return $overlayFooter[0].offsetHeight;
            }, function (newHeight) {
              $overlayContainer.css('padding-bottom', newHeight + 'px');
            });

            // Get the parent where there is scrolling or <body>
            function getScrollableParent(el) {

              if (el === null) {
                return;
              }

              var overflowY = window.getComputedStyle(el).getPropertyValue('overflow-y');
              var overflow = window.getComputedStyle(el).getPropertyValue('overflow');

              if (overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll') {
                return el;
              } else if (el.nodeName === 'BODY') {
                return el;
              } else {
                return getScrollableParent(el.parentElement);
              }
            }

            // Find out how far the toggle is away from it's scrolling parent
            function getElementOffsetFrom(element, parentElement) {
              var parentRect = parentElement.getBoundingClientRect();
              var toggleRect = element.getBoundingClientRect();

              // Return the relative RECT of the toggle button to the given parent
              return {
                left  : toggleRect.left - parentRect.left,
                right : parentRect.right - toggleRect.right,
                top   : toggleRect.top - parentRect.top,
                bottom: parentRect.bottom - toggleRect.bottom,
                width : toggleRect.width,
                height: toggleRect.height
              };
            }

            // Render and position overlay
            function renderOverlay() {
              var maxOverlayHeight = scrollableParent.offsetHeight - overlayMargin * 2;
              var overlayInnerHeight = !!attrs.overlayHeight ? scope[attrs.overlayHeight] : -1;
              var toggleOffset = getElementOffsetFrom($toggleButton[0], scrollableParent);
              var toggleOffsetTop = toggleOffset.top -
                ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop);
              var toggleCenterOffsetTop = toggleOffsetTop + $toggleButton[0].offsetHeight * 0.5;

              // Set default height
              $overlayContainer.css('height', (overlayInnerHeight + $overlayFooter[0].offsetHeight) + 'px');

              // check toggle button location and realign if needed
              // for better layout spacing
              var allowedTopSpacing = overlayMargin + 25;
              var overlayHeight = $overlayContainer[0].offsetHeight;
              var targetOverlayTop;

              // adjust overlay height based on the scrollable container or body
              if (overlayInnerHeight > 0) {
                // overlayHeight is bigger than max-height
                if (overlayInnerHeight > maxOverlayHeight - $overlayFooter[0].offsetHeight) {
                  $overlayContainer.css('max-height', maxOverlayHeight + 'px');
                } else {
                  $overlayContainer.css('max-height', (overlayInnerHeight + $overlayFooter[0].offsetHeight) + 'px');
                }
              } else {
                $overlayContainer.css('max-height', maxOverlayHeight + 'px');
              }

              //when the scrollable is <BODY>
              if (scrollableParent.tagName === 'BODY') {

                // We need to scroll up a little bit
                if (toggleCenterOffsetTop < allowedTopSpacing) {
                  // IE
                  if (document.documentElement) {
                    document.documentElement.scrollTop = toggleOffset.top - allowedTopSpacing;
                  }
                  // Other browsers
                  else {
                    scrollableParent.scrollTop = toggleOffset.top - allowedTopSpacing;
                  }
                  toggleCenterOffsetTop = allowedTopSpacing + $toggleButton[0].offsetHeight * 0.5;
                } else
                // We need to scroll down a little
                if (toggleCenterOffsetTop > scrollableParent.offsetHeight - allowedTopSpacing) {
                  // IE
                  if (document.documentElement) {
                    document.documentElement.scrollTop = (toggleOffset.top + $toggleButton[0].offsetHeight) -
                      scrollableParent.offsetHeight +
                      allowedTopSpacing;
                  }
                  // Other Broswers
                  else {
                    scrollableParent.scrollTop = (toggleOffset.top + $toggleButton[0].offsetHeight) -
                      scrollableParent.offsetHeight +
                      allowedTopSpacing;
                  }
                  toggleCenterOffsetTop = scrollableParent.offsetHeight - allowedTopSpacing -
                    $toggleButton[0].offsetHeight * 0.5;
                }

                // Set default
                targetOverlayTop = -overlayHeight * 0.5

                // Make sure the overlay is not overflowing the top
                if (-targetOverlayTop > toggleCenterOffsetTop - overlayMargin) {
                  targetOverlayTop = -(toggleCenterOffsetTop - overlayMargin + $toggleButton[0].offsetHeight * 0.25);
                } else
                // Make sure the overlay is not overflowing the bottom
                if (-targetOverlayTop > scrollableParent.offsetHeight - toggleCenterOffsetTop - overlayMargin) {
                  targetOverlayTop = scrollableParent.offsetHeight - toggleCenterOffsetTop - overlayMargin - overlayHeight - $toggleButton[0].offsetHeight * 0.25;
                }
              }
              // Scrollable is other
              else {
                // We need to scroll up a little bit
                if (toggleOffset.bottom < allowedTopSpacing) {
                  scrollableParent.scrollTop += allowedTopSpacing - toggleOffset.bottom;
                }
                // We need to scroll down a little
                else if (toggleOffset.top < allowedTopSpacing) {
                  scrollableParent.scrollTop -= allowedTopSpacing - toggleOffset.top;
                }

                var overlayLocalRect = getElementOffsetFrom($overlayContainer[0], scrollableParent);

                // set default
                targetOverlayTop = $overlayContainer[0].offsetTop;

                // Make sure the overlay is not overflowing the top
                if (overlayLocalRect.top < overlayMargin) {
                  targetOverlayTop = $overlayContainer[0].offsetTop - overlayLocalRect.top + overlayMargin;
                } else
                // Make sure the overlay is not overflowing the bottom
                if (overlayLocalRect.bottom < overlayMargin) {
                  targetOverlayTop = $overlayContainer[0].offsetTop + overlayLocalRect.bottom - overlayMargin;
                }
              }

              $overlayContainer.css('top', targetOverlayTop + 'px');
            }
          }
        };
      }
    ])
    // THe actual toggle button
    .directive('bentoSideOverlayToggle', [
      function () {
        return {
          restrict: 'A',
          scope   : false,
          link    : function (scope, element, attrs) {
            // only add class
            element.addClass('bento-side-overlay-toggle noselect');
          }
        };

      }
    ])
    // Redering to the actual toggle
    // Might need templateUrl later
    .directive('bentoSideOverlayContent', [
      '$compile',
      '$timeout',
      function ($compile, $timeout) {
        return {
          restrict: 'A',
          scope   : false,
          link    : function (scope, element) {
            element.addClass('bento-side-overlay-container');
            element.wrap('<div class="bento-side-overlay-container-wrapper"></div>');

            // Add arrows
            var leftArrow = '<div class="bento-side-overlay-left-arrow">' +
              '<svg height="35" width="20">' +
              '<polygon points="21,0 0.5,17.5 21,35" class="bento-side-overlay-triangle" />' +
              '</svg>' +
              '</div>';
            var rightArrow = '<div class="bento-side-overlay-right-arrow">' +
              '<svg height="35" width="20">' +
              '<polygon points="-1,0 19.5,17.5 -1,35" class="bento-side-overlay-triangle" />' +
              '</svg>' +
              '</div>';
            element.after(leftArrow);
            element.after(rightArrow);

            // Add footer
            var footer = angular.element('<div class="bento-side-overlay-container-footer">' +
              '<button class="btn btn-default bento-side-overlay-container-footer-done" ng-click="">{{' +
              '"BENTO_MODERN_MULTISELECT_OVERLAY_DONE" | bentoTranslate:doneButtonText' +
              '}}</button>' +
              '</div>');

            $compile(footer)(scope);
            element.append(footer);
          }
        };
      }
    ])

  /**
   * Sub Directive
   * Bento MultiSelect List
   */

    /*
     * Show only the selected item base on the flag
     */
    .filter('multiselectShowSelected', function () {
      return function (itemArray, flag) {
        if (flag) {
          var arr = [];
          for (var i = 0; i < itemArray.length; i++) {
            var item = itemArray[i];
            if (item.__bsoChecked) {
              arr.push(item);
            }
          }
          return arr;
        }

        return itemArray;
      };
    })
    .directive('bentoMultiselectList', [
      '$timeout',
      '$bentoServices',
      function ($timeout, $bentoServices) {
        return {
          require    : 'ngModel',
          templateUrl: '../templates/multiselect_list/bento-multiselect-list.html',
          scope      : {
            ngModel         : '=',
            ngChange        : '&',
            selectedItems   : '=?',
            side            : '@',
            selectAllText   : '@',
            showAllText     : '@',
            showSelectedText: '@',
            maxAllowedHeight: '=?' // Get the total height of the scrolling for external use
          },
          link       : function (scope, element, attrs) {
            var firstLoad = true;

            if (typeof scope.selectedItems === 'undefined') {
              scope.selectedItems = [];
            }
            scope.searchTerm = {name: ''};
            scope.$watchCollection('selectedItems', function (newArray, oldArray) {

              for (var i = 0; i < oldArray.length; i++) {
                oldArray[i].__bsoChecked = false;
              }

              for (var i = 0; i < newArray.length; i++) {
                newArray[i].__bsoChecked = true;
              }

              // Check whether to show the check to "Select All" checkbox
              if (newArray.length === scope.ngModel.length) {
                scope.selectAll = true;
              } else {
                scope.selectAll = false;
              }

              // Fire a callback
              if (!firstLoad) {
                scope.ngChange();
              } else {
                firstLoad = false;
              }
            });

            var searchBar = element[0].querySelector('.bento-multiselect-search');
            var scrollPane = element[0].querySelector('.bento-multiselect-list-scroll-pane');

            element.addClass('bento-multiselect-list-wrapper');

            //Watch the top offset of `.bento-multiselect-list-scroll-pane`
            scope.$watch(function () {
              return searchBar.offsetHeight;
            }, function (newHeight) {
              scrollPane.style.top = newHeight + 'px';

              // Update maxAllowedHeight
              scope.maxAllowedHeight = searchBar.offsetHeight + scrollPane.scrollHeight;
            });

            /**
             * Triggers select and deselect all items
             */
            scope.onSelectAllClick = function () {
              scope.selectAll = !scope.selectAll;

              if (scope.selectAll) {
                scope.selectedItems = [];
                for (var i = 0; i < scope.ngModel.length; i++) {
                  var item = scope.ngModel[i];
                  scope.selectedItems.push(item);
                }
              } else {
                scope.selectedItems = [];
              }
            };

            /**
             * Update checked status when an item is clicked
             * @param item
             */
            scope.onItemClick = function (item) {
              var selectItemIndex = scope.selectedItems.indexOf(item);

              if (selectItemIndex === -1) {
                scope.selectedItems.push(item);
              } else {
                scope.selectedItems.splice(selectItemIndex, 1);
              }
            };

            /**
             * Like htmlentities in PHP, it change special characters such as (>) into their encoded values (&lt;)
             */
            scope.htmlEntities = function (str) {
              return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
            };

            // Get Max height
            $timeout(function () {
              scope.maxAllowedHeight = searchBar.offsetHeight + scrollPane.scrollHeight;
            });
          }
        };
      }]);
})
(window.angular, window);
(function(angular) {
    'use strict';

    //Define bentoUI App object
    angular
        .module('bento.nav.toolbar', ['bento.translate', 'bento.services', 'bento.reset', 'bento.cookie'])
        .constant('bentoNavToolbarConfig', {
            addAccessibilityToMenu: function(menuItem) {
                if (!menuItem) return;
                menuItem.setAttribute('role', 'menu');
                var menuChildren = angular.element(menuItem).children();
                //set ARIA roles for 'more' buttons
                for (var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];
                    if (el) {
                        this.addAccessibilityToListElements(el);

                        el.setAttribute('role', 'menuitem');
                        if (angular.element(el).hasClass('divider')) {
                            el.setAttribute('role', 'separator');
                        }
                    }
                }
            },
            addAccessibilityToListElements: function(listItem) {
                if (!listItem) return;
                var anchorButton = listItem.getElementsByTagName('a')[0];
                var listElement = angular.element(listItem);

                if (anchorButton) {
                    anchorButton.setAttribute('role', 'button');
                }

                if (listElement.hasClass('active')) {
                    anchorButton.setAttribute('aria-checked', 'true');
                }
                if (listElement.hasClass('disabled') || (listItem.attributes['disabled'] && listItem.attributes['disabled'].value === 'disabled')) {
                    anchorButton.setAttribute('aria-disabled', 'true');
                }
            },
            disableMenuButtons: function(menuItem) {
                if (!menuItem) {
                    return;
                }
                var menuChildren = angular.element(menuItem).children();
                for (var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];
                    if (el) {
                        el.setAttribute('tabindex', '-1');
                        var anchorButton = el.getElementsByTagName('a')[0];
                        if (anchorButton) {
                            anchorButton.setAttribute('tabindex', '-1');
                        }
                    }
                }
            },
            enableMenuButtons: function(menuItem) {
                if (!menuItem) {
                    return;
                }
                var menuChildren = angular.element(menuItem).children();
                for (var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];
                    if (el) {
                        el.removeAttribute('tabindex');
                        var anchorButton = el.getElementsByTagName('a')[0];
                        if (anchorButton) {
                            anchorButton.removeAttribute('tabindex');
                        }
                    }
                }
            },

        })
        .controller('bentoNavToolbarController', ['$scope',
            function($scope) {

            }
        ])
        .directive('toolbarDropdown', ['$parse', '$window', '$timeout', '$compile', 'bentoNavToolbarConfig',
            function($parse, $window, $timeout, $compile, config) {
                return {
                    restrict: 'C',
                    scope: false,
                    link: function(scope, element) {
                        var isToggledOpen = false;
                        var toolbarMenu = element[0].querySelector('ul.toolbar-dropdown-menu');
                        var toggleElement = element[0].querySelector('a.toolbar-dropdown-toggle');

                        element.addClass('toolbar-dropdown-close');
                        element.removeClass('toolbar-dropdown-open');

                        toggleElement.setAttribute('aria-expanded', 'false');

                        config.disableMenuButtons(toolbarMenu);
                        scope.$on('$destroy',onDestroy);
                        element.on('$destroy',onDestroy);

                        function closeMenu(el) {
                            element.addClass('toolbar-dropdown-close');
                            element.removeClass('toolbar-dropdown-open');
                            el.setAttribute('aria-expanded', 'false');
                            config.disableMenuButtons(toolbarMenu);
                        }
                        angular.element(toggleElement).bind('click', function() {
                            //if element has attribute disabled, do not toggle open
                            if (toggleElement.attributes['disabled'] && toggleElement.attributes['disabled'].value === 'disabled') {
                                return;
                            } else if (toggleElement.parentNode.attributes['disabled'] && toggleElement.parentNode.attributes['disabled'].value === 'disabled') {
                                return;
                            }
                            if (isToggledOpen) {
                                closeMenu(this);
                            } else {
                                element.addClass('toolbar-dropdown-open');
                                element.removeClass('toolbar-dropdown-close');
                                toggleElement.setAttribute('aria-expanded', 'true');
                                config.enableMenuButtons(toolbarMenu);
                            }
                            isToggledOpen = !isToggledOpen;
                        });

                        //watch if dropdown toggle or toggle parent (list item) has attribute disabled
                        if (toggleElement.attributes['ng-disabled']) {
                            scope.$watch(function() {
                                return toggleElement.attributes['disabled'];
                            }, disableToggle);
                        } else if (toggleElement.parentNode.attributes['ng-disabled']) {
                            scope.$watch(function() {
                                return toggleElement.parentNode.attributes['disabled']
                            }, disableToggle);
                        }

                        function onDestroy() {
                            angular.element(toggleElement).unbind('click');
                        };
                        //ARIA
                        config.addAccessibilityToMenu(toolbarMenu);

                        function disableToggle(newValue) {
                            if (newValue && newValue.value === 'disabled') {
                                closeMenu(toggleElement);
                                isToggledOpen = false;
                                return;
                            }
                        }
                    }
                };
            }
        ])
        .directive('bentoNgRepeatComplete',['$timeout',function($timeout){
            return{
                restrict: 'A',
                require: '^bentoNavToolbar',
                link: function (scope, element, attr, ctrl) {
                    if (scope.$last === true) {
                        $timeout(function () {
                            ctrl.onRepeatComplete();
                            // scope.$emit('bentoNgRepeatComplete');
                        });
                    }
                }
            }
        }])
        .directive('bentoNavToolbar', ['$parse', '$window', '$timeout', '$compile', 'bentoNavToolbarConfig',
            function($parse, $window, $timeout, $compile, config) {
                return {
                    restrict: 'EA',
                    scope: {
                        control:'=?'
                    },
                    controller: 'bentoNavToolbarController',
                    link: function(scope, element, attrs, ctrl) {
                        // localization
                        var moreLabel = '{{ "BENTO_MODERN_NAV_TOOLBAR_MORE" | bentoTranslate }}';
                        // if more button is explicit, use the attribute's value
                        if (attrs.moreButtonLabel !== undefined) {
                            moreLabel = attrs.moreButtonLabel;
                        }

                        //http://stackoverflow.com/questions/16881478/how-to-call-a-method-defined-in-an-angularjs-directive
                        scope.internalControl = scope.control || {};
                       
                        scope.internalControl.refresh = function(){
                            onRefresh();
                        }
                        scope.$on('$destroy', onDestroy);
                        element.on('$destroy', onDestroy);
                        // scope.$on('bentoNgRepeatComplete',onRepeatComplete);
                        scope.$on('bentoToolbarRefresh',onRefresh)
                        ctrl.onRepeatComplete = onRepeatComplete;
                        //template for "more" dropdown
                        var moreTemplate = '<li class="dropdown" data-more-buttons="true" dropdown>' +
                            '    <a href="" class="dropdown-toggle" role="button" dropdown-toggle>' + moreLabel + '</a>' +
                            '    <ul role="menu" class="more-dropdown-menu dropdown-menu" ng-click="$event.stopPropagation()">' +
                            '    </ul>' +
                            '</li>';

                        var menuList,
                            moreButton,
                            moreWidth,
                            mainContainer,
                            rightContainer,
                            buttonArray,
                            moreContainer,
                            moreIndex,
                            children,
                            dropdownButtons,
                            initTimeout;

                        function setUpVars() {
                            //get main '<ul>' element and append "more" dropdown
                            menuList = element[0].querySelector('ul.nav.navbar-nav');
                            if (!element[0].querySelector('[data-more-buttons]')) {
                                menuList.insertAdjacentHTML('beforeend', moreTemplate);
                                var moreElement = menuList.lastChild;
                                $compile(moreElement)(scope);
                            }
                            //set up initial vars
                            moreButton = element[0].querySelector('[data-more-buttons]'); //more button
                            moreWidth = moreButton ? moreButton.offsetWidth : 0; //width of more button
                            mainContainer = angular.element(menuList); //main '<ul>' element as angular object
                            rightContainer = element[0].querySelector('.navbar-right'); //search container
                            buttonArray = []; //array of buttons
                            moreContainer = moreButton.querySelector('ul.dropdown-menu'); //'<ul>' element of 'more' dropdown
                            //children of main '<ul>' element
                            children = mainContainer.children();
                            //array of all dropdowns that are not 'more' button
                            dropdownButtons = [];
                        }
                        setUpVars();
                        //init buttons, determine initial widths
                        
                        function initButtons() {
                            setUpVars();

                            if (!element[0].hasAttribute('role')) {
                                element[0].setAttribute('role', 'toolbar');
                            }

                            var buttonElement, originalElement;

                            menuList.setAttribute('role', 'menu');


                            //determine initial order and widths of buttons
                            for (var i = 0, total = children.length; i < total; i++) {
                                var el = children[i];
                                var innerEl = el.children[0];

                                var width = getTotalWidth(el) + 5;

                                //set data attributes with order and widths
                                el.setAttribute('data-button-id', i);
                                el.setAttribute('data-button-width', width);

                                //clean up ng-repeats and ng-attr-dropdown, if any
                                el.removeAttribute('ng-repeat');
                                el.removeAttribute('ng-attr-dropdown');



                                //ARIA
                                config.addAccessibilityToListElements(el);

                                buttonArray[i] = el;

                                //if element is a dropdown, clone it for use in the 'more' dropdown as
                                //a nested dropdown with different behavior
                                var $el = angular.element(el);

                                if (!el.hasAttribute('dropdown')) {
                                    $el.removeClass('dropdown');
                                } else if ($el.hasClass('dropdown') && !el.hasAttribute('data-more-buttons') && !$el.hasClass('static-item')) {
                                    buttonElement = $el.clone()[0];
                                    originalElement = el;


                                    var obj = {
                                        'buttonElement': buttonElement,
                                        'originalElement': originalElement
                                    };
                                    dropdownButtons.push(obj);

                                    //ARIA
                                    var dropElement = el.querySelector('.dropdown-menu');
                                    config.addAccessibilityToMenu(dropElement);
                                }
                            }

                            //iterate through the cloned dropdowns and append to dom
                            for (var i = 0, total = dropdownButtons.length; i < total; i++) {
                                buttonElement = dropdownButtons[i].buttonElement;
                                originalElement = dropdownButtons[i].originalElement;
                                //append it to DOM
                                originalElement.parentNode.insertBefore(buttonElement, originalElement);

                                var origScope = angular.element(originalElement).scope();


                                //get the order id
                                var id = buttonElement.getAttribute('data-button-id');
                                //remove the data attribute for button-id
                                buttonElement.removeAttribute('data-button-id');
                                //set new data attribute with same order id, will be used later
                                //in adjustButtons() to determine placement in "more" dropdown
                                buttonElement.setAttribute('data-dropdown-id', id);
                                //set width data attribute to 0, just in case
                                buttonElement.setAttribute('data-button-width', 0);
                                //hide it until later when it's displayed in the 'more' dropdown
                                buttonElement.style.display = 'none';

                                //alter the class names so it doesn't get compiled as regular dropdown
                                //it will compile as new toolbar-dropdown directive instead
                                buttonElement = angular.element(buttonElement);

                                var hasDropdown = buttonElement.hasClass('dropdown');
                                if (hasDropdown) {
                                    buttonElement.removeClass('dropdown');
                                    buttonElement.removeAttr('dropdown');
                                    buttonElement.addClass('toolbar-dropdown');
                                    //remove ng-repeat before recompiling
                                    buttonElement.removeAttr('ng-repeat');

                                    var dropdownMenu = buttonElement[0].querySelector('ul.dropdown-menu');
                                    var origDropDownMenu = originalElement.querySelector('ul.dropdown-menu');
                                    var dropdownMenuChildren = dropdownMenu.children;
                                    var origDropDownMenuChildren = origDropDownMenu.children;

                                    //Clean up any ng-repeats before it get's compiled again
                                    for (var j = 0, len = dropdownMenuChildren.length; j < len; j++) {
                                        var ddChild = dropdownMenuChildren[j];
                                        var ddChildElement = angular.element(ddChild);
                                        ddChildElement.removeAttr('ng-repeat');
                                        var oScope = angular.element(origDropDownMenuChildren[j]).scope();
                                        $compile(ddChild)(oScope);
                                        //find ng-click and remove before compiling again
                                        var ddChildClick = ddChild.querySelector('[ng-click]');
                                        angular.element(ddChildClick).removeAttr('ng-click');                                        
                                    }

                                    //rename dropdown menu and dropdown toggle to custom class, and remove ng-if before recompiling
                                    angular.element(dropdownMenu).removeClass('dropdown-menu').addClass('toolbar-dropdown-menu').removeAttr('ng-if');
                                    var dropdownToggle = buttonElement[0].querySelector('a[dropdown-toggle]');
                                    angular.element(dropdownToggle).removeAttr('dropdown-toggle').addClass('toolbar-dropdown-toggle').removeClass('dropdown-toggle').removeAttr('ng-if');

                                }
                                $compile(buttonElement)(origScope);
                                //compile the toolbar-dropdown directive
                                //$compile(buttonElement)(origScope);
                            }

                            //after all the index of buttons are set, cache the index of more button
                            moreIndex = moreButton.getAttribute('data-button-id');

                            //window resize listener
                            angular.element($window).bind('resize', onWindowResize);
                            scope.$watch(getElementWidth, onWindowResize);
                        }

                        function getElementWidth() {
                            return element[0].offsetWidth;
                        }

                        function getTotalWidth(el) {
                            var style = el.currentStyle || window.getComputedStyle(el);
                            
                            var width = el.offsetWidth +
                                parseFloat(style.paddingLeft) +
                                parseFloat(style.paddingRight) +
                                parseFloat(style.marginLeft != "auto" ? style.marginLeft : 0) +
                                parseFloat(style.marginRight != "auto" ? style.marginRight : 0);
                            return width;
                        }


                        //shifts buttons between main container and more container on window resize
                        function adjustButtons(reset) {
                            var containerWidth = reset ? 100000 : element[0].offsetWidth,
                                childrenWidth = moreWidth,
                                rightWidth = rightContainer ? getTotalWidth(rightContainer) : 0,
                                diffWidth = containerWidth - rightWidth - 20,
                                mainButtonArray = [],
                                moreButtonArray = [];

                            moreWidth = moreButton ? moreButton.offsetWidth : 0;

                            //if there are no right container, pull-right dropdown-menu

                            var moreDropdownMenu = element[0].querySelector('.more-dropdown-menu');

                            if (moreDropdownMenu) {
                                if (rightWidth === 0) {
                                    angular.element(moreDropdownMenu).parent().addClass("dropdown-menu-right");
                                } else {
                                    angular.element(moreDropdownMenu).parent().removeClass("dropdown-menu-right");
                                }
                            }

                            //iterate through all the buttons
                            for (var index = 0, total = buttonArray.length; index < total; index++) {
                                var el = buttonArray[index];
                                if (el.getAttribute('data-more-buttons') !== 'true') {
                                    var buttonWidth = Number(el.getAttribute('data-button-width'));
                                    // buttonWidth = buttonWidth ? buttonWidth : el.offsetWidth;
                                    childrenWidth += buttonWidth;
                                    var buttonItem = buttonArray[index];
                                    var buttonElement = angular.element(buttonItem);
                                    var dropdownItem;

                                    //if sum of all button widths is greater than window
                                    //shift them into 'more' dropdown
                                    if (!angular.element(el).hasClass('static-item')) {
                                        if (childrenWidth > diffWidth && !angular.element(el).hasClass('display-text')) {
                                            buttonItem.setAttribute('role', 'menuitem');
                                            moreButtonArray.push(buttonItem);

                                            //switch dropdowns
                                            if (buttonElement.hasClass('dropdown')) {
                                                //get related toolbar-dropdown component
                                                var id = buttonItem.getAttribute('data-button-id');
                                                id = '[data-dropdown-id="' + id + '"]';
                                                dropdownItem = element[0].querySelector(id);
                                                buttonItem.style.display = 'none';
                                                dropdownItem.style.display = 'block';
                                                moreButtonArray.push(dropdownItem);
                                            }
                                        } else {
                                            //if window is wider then sum of all button widths combined
                                            //shift buttons out of 'more' dropdown and back into 'main' container
                                            buttonItem.removeAttribute('role');
                                            mainButtonArray.push(buttonItem);

                                            //switch dropdowns
                                            if (buttonElement.hasClass('dropdown')) {
                                                var id = buttonItem.getAttribute('data-button-id');
                                                id = '[data-dropdown-id="' + id + '"]';
                                                dropdownItem = element[0].querySelector(id);
                                                buttonItem.style.display = 'block';
                                                dropdownItem.style.display = 'none';
                                                mainButtonArray.push(dropdownItem);
                                            }
                                        }
                                    }
                                }
                            }

                            var moreButtonCount = moreButtonArray.length - 1;
                            //iterate through 'more' button array and add to DOM
                            while (moreButtonCount >= 0) {
                                moreContainer.insertBefore(moreButtonArray[moreButtonCount], moreContainer.firstChild);
                                moreButtonCount--;
                            }

                            //iterate through 'main' button array and add to DOM
                            for (var i = 0, total = mainButtonArray.length; i < total; i++) {
                                mainContainer.append(mainButtonArray[i]);
                                //shift more button to correct place
                                var buttonIndex = mainButtonArray[i].getAttribute('data-button-id');
                                if (moreIndex > buttonIndex) {
                                    mainContainer.append(moreButton);
                                }
                            }
                            //make sure more button is last child
                            mainContainer.append(moreButton);

                            //display or hide 'more' button
                            if (!angular.element(moreContainer).children().length) {
                                moreButton.style.display = 'none';
                            } else {
                                moreButton.style.display = 'block';
                            }

                        }

                        function onWindowResize() {
                            $timeout(function() {
                                adjustButtons();
                            });
                        }

                        function onDestroy() {
                            angular.element($window).unbind('resize', onWindowResize);
                            $timeout.cancel(initTimeout);
                        }
                        function onRefresh(){
                            initTimeout = $timeout(function(){
                                adjustButtons(true);
                                initButtons();
                                adjustButtons();
                            })
                        }
                        function onRepeatComplete(){
                            //initial set up
                            initTimeout = $timeout(function() {
                                initButtons();
                                adjustButtons();
                            });                            
                        }

                        if(!attrs.deferInit){
                            //initial set up
                            initTimeout = $timeout(function() {
                                initButtons();
                                adjustButtons();
                            });                            
                        }

                    }


                };
            }
        ]);
})(window.angular);
(function(window, angular, undefined) {
    'use strict';

    //Define bentoUI App object
    angular.module('bento.numberinput', ['bento.services'])
        .factory('$bentoNumberInputHelper', [

            function() {

                function alignButtons($element, _upButton, _downButton) {
                    var parentElement = $element[0].parentNode;
                    parentElement.style.width = $element[0].offsetWidth + 'px';
                    parentElement.style.height = $element[0].offsetHeight + 'px';
                }

                function updateModelWithStep(model, step, scope, max, min) {
                    var value = model;

                    if (typeof model === 'undefined') {
                        value = 0;
                    }

                    value = Math.round((Number(value) + step) * 1000000000000) / 1000000000000;

                    if (typeof max !== 'undefined' && value > max) {
                        value = max;
                    } else if (typeof min !== 'undefined' && value < min) {
                        value = min;
                    }

                    return value;
                }

                return {
                    alignButtons: alignButtons,
                    updateModelWithStep: updateModelWithStep
                };

            }
        ])
        .directive('bentoNumberInput', [
            '$bentoNumberInputHelper',
            '$bentoServices',
            '$timeout',
            function($bentoNumberInputHelper, $bentoServices, $timeout) {
                return {
                    restrict: 'A',
                    require: '?ngModel',
                    replace: false,
                    transclude: true,
                    link: function($scope, $element, $attrs, $controller) {

                        var uid = $bentoServices.generateUID();
                        var step = $attrs.step || 1;
                        var ngModel = $attrs.ngModel;
                        var _upButton = angular.element('<div ' +
                            'id="bento-number-input-button-up-' + uid + '" ' +
                            'class="bento-number-input-button bento-number-input-button-up">' +
                            '<i class="bento-icon-chevron-up"></i>' +
                            '</div>'
                        );
                        var _downButton = angular.element('<div ' +
                            'id="bento-number-input-button-up-' + uid + '" ' +
                            'class="bento-number-input-button bento-number-input-button-down">' +
                            '<i class="bento-icon-chevron-down"></i>' +
                            '</div>'
                        );

                        // Check max and min to block from additional input
                        $element.on('input', function(event) {
                            var value = event.currentTarget.value;
                            if ($attrs.max && value > parseInt($attrs.max)) {
                                value = value.slice(0, value.length - 1);
                            } else if ($attrs.min && value < parseInt($attrs.min)) {
                                value = value.slice(0, value.length - 1);
                            }

                            setModelValue(ngModel,parseFloat(value));

                            $bentoServices.safeApply($scope);
                        });

                        // IE treatment
                        // Since IE does not listen to keyup or key down
                        // OR type is not 'number' for HTML5
                        if ($bentoServices.getIEVersion() > -1 || $attrs.type !== 'number') {
                            $element.on('keydown', function(event) {
                                // 38 up
                                // 40 down
                                if (event.keyCode === 38) {
                                    var val= $bentoNumberInputHelper.updateModelWithStep(getModelValue(ngModel), step, $scope, $attrs.max, $attrs.min);
                                    setModelValue(ngModel,val);
                                } else if (event.keyCode === 40) {
                                    var val = $bentoNumberInputHelper.updateModelWithStep(getModelValue(ngModel), -step, $scope, $attrs.max, $attrs.min);
                                    setModelValue(ngModel,val);
                                }

                                $scope.$apply();
                            });
                        }

                        //Parse step into a number
                        step = Number(step);

                        var pointerDown = 'mousedown';
                        var pointerUp = 'mouseup';
                        var repeatDelayAmount = 125;
                        var direction;

                        if ($bentoServices.isTouchSupported()) {
                            pointerDown = 'touchstart';
                            pointerUp = 'touchend';
                        }

                        //On up arrow click
                        _upButton.on(pointerDown, function(e) {
                            // kill event for right click
                            if (e.which == 3) {
                                return false;
                            }
                            direction = step;

                            function onDownTimer() {
                                inputButtonRepeat();
                                $scope.timer = $timeout(onDownTimer, repeatDelayAmount);
                            }

                            if (!$element.context.disabled) {
                                onDownTimer();

                                angular.element(window).one(pointerUp, function() {
                                    $timeout.cancel($scope.timer);
                                });
                            }
                        });

                        //On down arrow click
                        _downButton.on(pointerDown, function(e) {
                            // kill event for right click
                            if (e.which == 3) {
                                return false;
                            }
                            direction = -step;

                            function onUpTimer() {
                                inputButtonRepeat();
                                $scope.timer = $timeout(onUpTimer, repeatDelayAmount);
                            }

                            if (!$element.context.disabled) {
                                onUpTimer();

                                angular.element(window).one(pointerUp, function() {
                                    $timeout.cancel($scope.timer);
                                });
                            }

                        });

                        function inputButtonRepeat() {
                            var val = $bentoNumberInputHelper.updateModelWithStep(getModelValue(ngModel), direction, $scope, $attrs.max, $attrs.min);
                            setModelValue(ngModel,val);
                            $element[0].value = getModelValue(ngModel);
                            $scope.$apply();
                        }

                        // Check how many digits that this input field will have
                        var maxDigits = !!$attrs.max ? $attrs.max.length : 6;
                        var digitClass = ' six-digit';


                        if (!!$attrs.min && $attrs.min.length > maxDigits) {
                            maxDigits = $attrs.min.length;
                        }

                        if (maxDigits <= 3) {
                            digitClass = ' two-digit';
                        }

                        // Determine if this directive follows bootstrap's `form-control` CSS
                        $element.wrap('<span class="bento-number-input-wrapper' +
                            ($element.hasClass('form-control') ? ' full-width' : '') +
                            digitClass +
                            '"></span>');

                        // We still need form-control styling
                        $element.addClass('form-control');
                        $element.after(_downButton);
                        $element.after(_upButton);

                        // When the DOM element is removed from the page cancel
                        // any possible pending triggers
                        $scope.$on(
                            "$destroy",
                            function(event) {
                                $timeout.cancel($scope.timer);
                            }
                        );



                        function setModelValue(model, value) {
                            var modelArray = model.split('.');
                            var object = $scope;
                            for (var i = 0, il = modelArray.length; i < il; i++) {
                                if (i === (il - 1)) {
                                    object[modelArray[i]] = value;
                                } else {
                                    object = object[modelArray[i]];
                                }
                            }
                        }
                        function getModelValue(model) {
                            var modelArray = model.split('.');
                            var object = $scope;
                            for (var i = 0; i < modelArray.length; i++) {
                                object = object[modelArray[i]];
                            }
                            return object;
                        }
                    }
                };
            }
        ]);

})(window, window.angular);
(function (window, angular, undefined) {
  'use strict';

//Define bentoUI App object
  angular.module('bento.off.canvas.menu', [])
  /**
   * Bento Off Canvas Menu Main Controller
   */
    .controller('bentoOffCanvasMenuController', [
      '$scope',
      '$element',
      function ($scope, $element) {

      }
    ])
  /**
   * Bento Off Canvas Menu Main Directive
   */
    .directive('bentoOffCanvasMenu', [
      '$parse',
      '$bentoServices',
      function ($parse, $bentoServices) {
        /**
         * Main Off Canvas Menu Directive
         */
        return {
          restrict  : 'AE',
          scope     : false,
          controller: 'bentoOffCanvasMenuController',
          link      : function (scope, element, attrs, controller) {
            // Getters
            var expandedLeftGetter, expandedRightGetter;
            var expandedLeftLocal, expandedRightLocal;

            element.addClass('bento-off-canvas-menu');

            if (!!attrs.type && attrs.type === 'push') {
              element.addClass('bento-off-canvas-menu push-over');
            } else {
              element.addClass('bento-off-canvas-menu default');
            }

            //Get menu object from DOM
            var $menu = angular.element(element[0].querySelector('.bento-off-canvas-menu-aside'));
            var $menuRight = angular.element(element[0].querySelector('.bento-off-canvas-menu-aside-right'));
            var $menuHeader, $menuHeaderRight;
            var $menuCloseButton, $menuRightCloseButton, $hambugerButton;

            //Get navbar object from DOM
            var $navbar = angular.element(element[0].querySelector('.bento-off-canvas-menu-topbar'));

            //Get content object from DOM
            var $content = angular.element(querySelector(element[0], '.bento-off-canvas-menu-content'));

            if ($navbar.length === 0) {
              $content.css('top', '0');
            } else {
              $hambugerButton = angular.element('<button class="bento-off-canvas-menu-button"><div class="bento-icon-hamburger-menu"></div></button>')
              $navbar.prepend($hambugerButton);
              $hambugerButton.on('click', onMenuClick);
            }

            //Add hamburger icon to navbar

            //Add Overlay
            var $overlay = angular.element('<div class="bento-off-canvas-menu-content-overlay"></div>');
            //Adding click actions to menuButton and .bento-off-canvas-menu-content
            $overlay.on('click', onContentClick);

            //Inject a fake background to the menu so it fully extends to the bottom of the page
            // Construct Memu DOM

            // LEFT
            element.append($overlay);
            if ($menu.length > 0) {
              $menu.after('<div class="bento-off-canvas-menu-aside-bg"></div>');
              $menuCloseButton = angular.element('<button class="bento-off-canvas-menu-close-button">&times;</button>');
              $menuHeader = angular.element('<div class="bento-off-canvas-menu-header"></div>');
              $menuHeader.append($menuCloseButton);
              $menuHeader.append(['<div class="bento-off-canvas-menu-header-title">', (!!attrs.menuTitle ? attrs.menuTitle : 'Menu'), '</div>'].join(''));
              $menu.prepend($menuHeader);
              $menu.on('click', function (event) {

                if ((event.target.nodeName === 'A' || event.target.nodeName === 'BUTTON' || isParentClickable(event.target))
                  && !event.target.parentNode.hasAttribute('disabled')
                  && !event.target.hasAttribute('bento-off-canvas-menu-aside')
                ) {
                  //auto collapse left aside menu
                  setLeftExpand(false);
                }
              });

              if (attrs.menuTitle) {
                attrs.$observe('menuTitle', function (newValue) {
                  $menuHeader[0].querySelector('.bento-off-canvas-menu-header-title').innerHTML = newValue;
                });
              }
            }

            //Helper function
            // Check if
            function isParentClickable(node){
              var n = node;
              console.log('nodeName',node.nodeName);
              while(n.className.search('bento-off-canvas-menu-aside') === -1 && typeof n !== 'undefined'){
                if(n.nodeName === 'A' || n.nodeName === 'BODY'){
                  return true;
                }
                n = n.parentNode;
              }
              return false;
            }

            // RIGHT
            if ($menuRight.length > 0) {
              $menuRightCloseButton = angular.element('<button class="bento-off-canvas-menu-close-button">&times;</button>');
              $menuHeaderRight = angular.element('<div class="bento-off-canvas-menu-header"></div>');
              $menuHeaderRight.append($menuRightCloseButton);
              $menuRight.prepend($menuHeaderRight);
              $menuRight.after('<div class="bento-off-canvas-menu-aside-bg-right"></div>');
              $menuRightCloseButton.on('click', function (event) {
                setRightExpand(false);
              })
            }

            // Add watchers for expand and collapse
            if (attrs.isExpanded) {
              expandedLeftGetter = $parse(attrs.isExpanded);
            }
            scope.$watch(function () {
                return expandedLeftGetter ? expandedLeftGetter(scope) : expandedLeftLocal;
              },
              function (exp) {
                toggleLeftMenu(exp);
              });

            if (attrs.isExpandedRight) {
              expandedRightGetter = $parse(attrs.isExpandedRight);
            }
            scope.$watch(function () {
                return expandedRightGetter ? expandedRightGetter(scope) : expandedRightLocal;
              },
              function (exp) {
                toggleRightMenu(exp);
              });

            /**
             * Toggle Left Menu
             * @param expanded
             */
            function toggleLeftMenu(expanded) {
              if (expanded) {
                setRightExpand(false);
                element.addClass('expanded');
                element[0].scrollTop = 0;

                if ($menu.length > 0) {
                  $menu[0].scrollTop = 0;
                }

              } else {
                element.removeClass('expanded');
              }
            }

            /**
             * Toggle Right Menu
             * @param expanded
             */
            function toggleRightMenu(expanded) {
              if (expanded) {
                setLeftExpand(false);
                element.addClass('expanded-right');

                if ($menuRight.length > 0) {
                  $menuRight[0].scrollTop = 0;
                }
              } else {
                element.removeClass('expanded-right');
              }

            }

            //When the hamburger menu is clicked
            function onMenuClick() {
              setLeftExpand(!expandedLeftLocal);
            }

            //Fires when the content is clicked
            //Check and retract the Off Canvas Menu
            function onContentClick() {
              setLeftExpand(false);
              setRightExpand(false);
            }

            /**
             * Set left menu expand state
             * @param b (bool)
             */
            function setLeftExpand(b) {
              if (expandedLeftGetter) {
                expandedLeftGetter.assign(scope, b);
              }
              expandedLeftLocal = b;

              $bentoServices.safeApply(scope);
            }

            /**
             * Set right menu expand state
             * @param b
             */
            function setRightExpand(b) {
              if (expandedRightGetter) {
                expandedRightGetter.assign(scope, b);
              }
              expandedRightLocal = b;

              $bentoServices.safeApply(scope);
            }
          }
        };
      }])
  /**
   * Bento Off Canvas Menu Aside Directive
   */
    .directive('bentoOffCanvasMenuAside', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element) {
          element.addClass('bento-off-canvas-menu-aside');
        }
      };
    })
  /**
   * Bento Off Canvas Menu Aside Right Directive
   */
    .directive('bentoOffCanvasMenuAsideRight', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element) {
          element.addClass('bento-off-canvas-menu-aside-right');
        }
      };
    })
  /**
   * Bento Off Canvas Menu Top Navbar
   */
    .directive('bentoOffCanvasMenuTopbar', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element, attrs, controller) {
          element.addClass('bento-off-canvas-menu-topbar');
        }
      };
    })
  /**
   * Bento Off Canvas Menu Main Content
   */
    .directive('bentoOffCanvasMenuContent', function () {
      return {
        scope  : false,
        require: '^bentoOffCanvasMenu',
        link   : function (scope, element, attrs, controller) {
          element.addClass('bento-off-canvas-menu-content');
        }
      };
    });

  /*** Helper Function ***/
  function querySelector(element, queryString) {
    var obj = element.querySelector(queryString);

    // Return if obj is not null
    if (typeof obj !== 'undefined' && obj) {
      return obj;
    } else {
      obj = element.querySelector(queryString.replace('div[', 'div[data-'));
      return obj;
    }

  }
})(window, window.angular);
(function(angular, window) {
    'use strict';
    //Define bentoUI App object
    var bentoPaginageApp = angular.module('bento.pagination', ['bento.services', 'bento.select', 'bento.cookie', 'bento.translate']);
    //Directive
    bentoPaginageApp
        .directive('bentoPagination', ['$parse', '$q',
            function($parse, $q) {
                return {
                    restrict: 'EA',
                    scope: {
                        currentPage: '=page',
                        totalItems: '=',
                        itemsPerPage: '=?',
                        infoText: '@', // String
                        infoPageText: '@', // String
                        goToText: '@', // String
                        directionLinks: '&',
                        boundaryLinks: '&',
                        itemsArray: '=?',
                        onChange: '&',
                        onChangeSize: '&',
                        eventTracking: '&',
                        onSelectPage: '&'
                    },
                    templateUrl: '../templates/pagination/bento-pagination.html',
                    replace: true,
                    link: function(scope, el, attrs) {
                        // Link Math lib to template
                        scope.Math = Math;
                        

                        var trackedEvent = {
                            eventName: 'default',
                            value: '-1'
                        };
                        var onChangeEvent = {
                            page: 1
                        };
                        var sizeChangeEvent = {
                            size: -1
                        };
                        scope.VM = {
                            currentPage: 1,
                            tgtPage: 1,
                            maxPage: 1,
                            itemsPerPage: 10,
                            itemsPerPageHistory: 10,
                            itemsArray: [{
                                value: 10,
                                label: 10
                            }, {
                                value: 25,
                                label: 25
                            }, {
                                value: 50,
                                label: 50
                            }, {
                                value: 100,
                                label: 100
                            }],
                            boundaryLinks: true,
                            directionLinks: true
                        };

                        Object.keys(scope.VM).forEach(function(el, i) { //ignores interpolated attributes
                            attrs[el] = (typeof(attrs[el]) == 'undefined') ? scope.VM[el] : attrs[el];
                            // scope[el] = (typeof(scope[el]) == "undefined") ? scope.VM[el] : scope[el];
                        });

                        scope.VM.itemsPerPageHistory = scope.itemsPerPage;
                        scope.VM.maxPage = Math.ceil(scope.totalItems / scope.itemsPerPage);
                        
                        //set default itemsArray if needed
                        scope.itemsArray = scope.itemsArray ? scope.itemsArray : scope.VM.itemsArray;

                        var renderComponent = function() {
                            scope.VM.tgtPage = scope.currentPage;
                            scope.VM.maxPage = Math.ceil(scope.totalItems / scope.itemsPerPage);
                            scope.eventTracking(trackedEvent);
                            if(scope.currentPage != onChangeEvent.page){
                                onChangeEvent.page = scope.currentPage;
                                scope.onChange(onChangeEvent);
                            }
                        };
                        scope.renderComponent = renderComponent; //used only to test this function.
                        
                        scope.$on('$destroy',onDestroy);

                        scope.$watch('itemsPerPage', function(newValue, oldValue) {
                            // Yes, this happens on $watch()...
                            if(newValue === oldValue){
                                return;
                            }
                            trackedEvent.eventName = "items per page changed";
                            trackedEvent.value = scope.itemsPerPage;
                            sizeChangeEvent.size = scope.itemsPerPage;
                            scope.onChangeSize(sizeChangeEvent);

                            // No change when the current page is 1
                            if(scope.currentPage === 1){
                                renderComponent();
                            }else{
                                scope.currentPage = 1;
                            }
                        });

                        scope.$watch('currentPage', function() {
                            renderComponent();
                        });

                        scope.$watch('totalItems', function() {
                            trackedEvent.eventName = "total items changed";
                            trackedEvent.value = scope.totalItems;
                            renderComponent();
                        });

                        attrs.$observe('infoPageText',function(value){
                            if(value){
                                renderComponent();
                            }
                        });
                        attrs.$observe('infoText',function(value){
                            if(value){
                                renderComponent();                            
                            }
                        });
                        attrs.$observe('goToText',function(value){
                            if(value){
                                renderComponent();                            
                            }
                        });
                        scope.keySelectPage = function(ev, page) {
                            ev = (ev) ? ev : window.event;
                            if (ev.which === 13) {
                                scope.goToPage(page);
                            }
                        };

                        scope.goToPage = function(n) {
                            if (n === "max") {
                                scope.currentPage = scope.VM.maxPage;
                            } else {
                                scope.currentPage = (!isNaN(parseInt(n)) && n > 0 && n <= scope.VM.maxPage) ? parseInt(n) : scope.currentPage;
                            }
                            trackedEvent.eventName = "current page value modification";
                            trackedEvent.value = "input value => " + n + " value@ " + scope.currentPage;
                        };

                        function onDestroy(){
                            //nothing to unbind
                        }

                    }
                };
            }
        ]);
})(window.angular, window);

(function (window, angular, undefined) {
  'use strict';

// Define bentoUI App object
  angular.module('bento.reset', [])

  /**
   * Main Bento Reset factory
   */
    .factory('$bentoResetFactory', [
      function () {

        /**
         * Align the clear button to the input field
         * @param inputElement
         * @param clearButton
         */
        var alignClearButton = function (inputElement, clearButton) {

          // set left
          clearButton.css('left',
              (inputElement[0].offsetWidth - clearButton[0].offsetWidth + inputElement[0].offsetLeft) + 'px'
          );

          // set top
          clearButton.css('top',
              (inputElement[0].offsetTop + (inputElement[0].offsetHeight - clearButton[0].offsetHeight) * 0.5) + 'px'
          );

        };

        /**
         * Show and hide clear button and adjust input fields right padding
         * @param inputElement
         * @param clearButton
         * @param value
         */
        var showAndHideButton = function (inputElement, clearButton, value) {

          // Hide clearButton where is the input field is empty
          // or it is not focused
          if (typeof value === 'undefined' || value.length === 0 || document.activeElement !== inputElement[0]) {
            clearButton.addClass('hide');
            inputElement.removeClass('bento-reset-dirty');

            window.removeEventListener('resize', windowResizeEventHandler);
          } else if (clearButton.hasClass('hide')) {

            clearButton.removeClass('hide');
            inputElement.addClass('bento-reset-dirty');
            // Realign clear button is there is any change
            alignClearButton(inputElement, clearButton);

            window.addEventListener('resize', windowResizeEventHandler);
          }

          // Private event handler
          // Check clear button location when window is resizing
          function windowResizeEventHandler(event) {
            alignClearButton(inputElement, clearButton);
          }

        };

        // Return all services
        return {
          alignClearButton: alignClearButton,
          showAndHideButton: showAndHideButton
        };

      }])
  /**
   * Directive: Bento Reset
   */
    .directive('bentoReset', [
      '$window', '$timeout', '$bentoResetFactory', '$parse',
      function ($window, $timeout, $bentoResetFactory, $parse) {

        return {
          restrict: 'A',
          require: 'ngModel',
          replace: false,
          scope: false,
          link: function(scope, element,attrs,controller){
            var iconName = (!!scope.glyphicon) ? attrs.glyphicon : 'remove_2';
            var clearButton = angular.element('<div class="bento-reset-close-button hide bento-icon-close-x ' +
                                              iconName +
                                              '" tabindex="-1"></div>');

            var getter = $parse(attrs.ngModel);
            var setter = getter.assign;

            // Add class
            element.addClass('bento-reset');

            scope.$watch(attrs.ngModel, function (newVal) {
              $bentoResetFactory.showAndHideButton(element, clearButton, newVal);
            });

            // Listen to input field `change` and `focus` and show / hide clear button
            element.on('keyup focus', function () {
              $bentoResetFactory.showAndHideButton(element, clearButton, getter(scope));
            });

            // Listen to input field blur
            // update: `event.relatedTarget` is not available on `blur` use `focusout` instead with IE9
            element.on('focusout', function (event) {
              if(event.relatedTarget !== clearButton[0]){
                // We need to use timeout to make sure clearBottom is clicked
                // even `event.relatedTarget` is NULL <-- FF security
                setTimeout(function(){
                  clearButton.addClass('hide');
                },10);
              }
            });

            // On clear button click
            // Clear input field
            clearButton.on('mousedown touchstart', function (event) {
              setter(scope,'');
              scope.$apply();
            });

            // Initialize the location of the clear button
            $timeout(function () {
              $bentoResetFactory.alignClearButton(element, clearButton);
            });

            // Add clearButton after the input field
            element.after(clearButton);
          }
        };
      }
    ]);

})(window, window.angular);

(function (window, angular, undefined) {
  'use strict';

//Define bentoUI App object
  angular.module('bento.select', ['ui.bootstrap'])
    .directive('bentoSelect', function () {
      return {
        restrict  : 'A',
        scope     : false,
        link      : function(scope, element, attrs, controller){
          element.addClass('bento-select');

          // Add IE and Firefox version for better UI look and feel
          if (window.navigator.userAgent.search(/MSIE 9/gi) !== -1) {
            element.addClass('ie9');
          } else if (window.navigator.userAgent.search(/MSIE 10/gi) !== -1) {
            element.addClass('ie10');
          } else if (window.navigator.userAgent.search(/Firefox/gi) !== -1) {
            element.addClass('firefox');
            element.append('<div class="bento-select-border"></div>');
          }

          // Add button decoration
          element.append('<div class="btn"><span class="bento-icon-caret-down"></span></div>');
        }
      };
    });

})(window, window.angular);





(function (window, angular, undefined) {

  'use strict';

  var bentSplitterGroupApp = angular.module('bento.splittergroup', ['bento.services']);

  bentSplitterGroupApp
  /**
   * A notification factory to let the controllers in the left, middle and right panels to
   * communicate with each other
   *
   * This also helps with Left and Right panel collapses and expansions
   */
    .factory('splitterGroupNotification', function () {
      var notificationStack = [];
      /**
       * Add a splitter group notification
       * @param nName - Notification name
       * @param func - Notification function
       * @param uid - (Optional) unique ID
       */
      var addNotification = function (nName, func, uid) {
        // Check if notification with `nName` exists or create a new `nName` stack
        if (typeof notificationStack[nName] === 'undefined') {
          notificationStack[nName] = [];
        }

        notificationStack[nName].push(
          {
            func: func,
            uid : uid
          }
        );
      };

      /**
       * Remove a splitter group notification
       * @param nName - Notification name
       * @param func - Notification function
       * @param uid - (Optional) unique ID
       */
      var removeNotification = function (nName, func, uid) {
        // If `nName` notification does not exist
        // Do nothing.
        if (typeof notificationStack[nName] === 'undefined') {
          return;
        }

        var nNameStack = notificationStack[nName];

        var index = 0;
        var notification;
        // Remove the matching notification
        while (index < nNameStack.length) {
          notification = nNameStack[index];
          if (notification.func === func &&
            notification.uid === uid) {
            nNameStack.splice(index, 1);
          } else {
            index++;
          }
        }
      };

      /**
       * Notify through the notification center
       * @param nName - Notification name
       * @param uid - (Optional)
       * @param data - (Optional)
       */
      var notify = function (nName, uid, data) {
        // If `nName` notification does not exist
        // Do nothing.
        if (typeof notificationStack[nName] === 'undefined') {
          return;
        }

        var nNameStack = notificationStack[nName];

        for (var i = 0; i < nNameStack.length; i++) {
          var notification = nNameStack[i];
          if (typeof uid === 'undefined' ||
            uid === null ||
            notification.uid === uid
          ) {
            notification.func(data);
          }
        }
      };

      // Regiter notification functions to factory
      return {
        addNotification   : addNotification,
        removeNotification: removeNotification,
        notify            : notify
      };
    })
    .factory('splitterGroupMainHelper', ['$window', '$timeout', function ($window, $timeout) {

      /**
       * This is a port to angularJS v1.2.11 and up $$rAF for temporary use
       * @param callBackFunc
       * @returns {Function}
       * @constructor
       */
      var RAFProvider = function (callBackFunc) {

        var requestAnimationFrame = $window.requestAnimationFrame ||
          $window.webkitRequestAnimationFrame ||
          $window.mozRequestAnimationFrame;

        var cancelAnimationFrame = $window.cancelAnimationFrame ||
          $window.webkitCancelAnimationFrame ||
          $window.mozCancelAnimationFrame ||
          $window.webkitCancelRequestAnimationFrame;

        var rafSupported = !!requestAnimationFrame;
        if (rafSupported) {
          var id = requestAnimationFrame(callBackFunc);
          return function () {
            cancelAnimationFrame(id);
          };
        } else {
          var timer = $timeout(callBackFunc, 16.66, false); // 1000 / 60 = 16.666
          return function () {
            $timeout.cancel(timer);
          };
        }
      };

      /**
       * parse side bar width from a string
       * @param element
       * @param width
       * @returns number
       */
      var parseWidth = function (element, width) {
        if (typeof width === 'number') {
          return width;
        } else if (typeof width === 'undefined') {
          return -1;
        }

        var widthType = width.search('%') > -1 ? '%' : 'px';
        var widthInt = parseInt(width);

        if (widthType === '%') {
          return element[0].offsetWidth * widthInt / 100;
        }

        return widthInt;
      };

      return {
        rAF       : RAFProvider,
        parseWidth: parseWidth
      };
    }])
  /**
   * Main Controller to Splitter Group directive
   */
    .controller('mainController', [
      '$scope',
      '$element',
      '$window',
      'splitterGroupMainHelper',
      '$bentoServices',
      function ($scope, $element, $window, splitterGroupMainHelper, $bentoServices) {

        // Check if the browser is IE 9
        if ($bentoServices.getIEVersion() === 9) {
          $element.addClass('ie9');
        }

        $element.addClass('bento-splitter-group');

        // Add `no-collapse` class when this directive is not collapsable
        if (!!$scope.noCollapse()) {
          $element.addClass('no-collapse');
        }

        // Determine if user is clicking on the left handle or not

        /**
         * Excute mouse click
         * @param event
         */
        $scope.onHandleClick = function (event) {

          // Bypass click when this directive is not collapsable
          if (!!$scope.noCollapse()) {
            return;
          }

          if ($scope.actionOnLeft) {
            $element.toggleClass('opened-left');
          } else {
            $element.toggleClass('opened-right');
          }

          if ($element.hasClass('opened-left') && $scope.actionOnLeft) {

            $scope.splitterLeft.css('left', '0');
            $scope.splitterMain.css('left', $scope.leftWidth);
            $scope.splitHandleLeft.css('left', $scope.leftWidth);

          } else if ($element.hasClass('opened-right') && !$scope.actionOnLeft) {
            $scope.splitterRight.css('right', '0');
            $scope.splitterMain.css('right', $scope.rightWidth);
            $scope.splitHandleRight.css('right', $scope.rightWidth);

          } else {
            if ($scope.actionOnLeft) {
              $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
              $scope.splitterMain.css('left', '0');
              $scope.splitHandleLeft.css('left', '0');
            } else {
              $scope.splitterRight.css('right', '-' + $scope.rightWidth);
              $scope.splitterMain.css('right', '0');
              $scope.splitHandleRight.css('right', '0');
            }
          }

        };
        //Initialize window resize elements
        $scope.leftMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.leftMaxWidth);
        $scope.rightMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.rightMaxWidth);
        var $w = angular.element($window);

        // Adding resize listener if there is a maxDraggable variable assigned
        if ($scope.leftMaxWidthPx > -1 || $scope.rightMaxWidthPx > -1) {
          $w.on('resize', onWindowsResize);
          $element.on('$destroy', function () {
            $w.off('resize', onWindowsResize);
          });
        }

        /**
         * check the width of left and right panels to make sure they are not oversized based on the
         * max draggable settings
         * @param $event
         */
        function onWindowsResize($event) {
          $scope.leftMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.leftMaxWidth);
          $scope.rightMaxWidthPx = splitterGroupMainHelper.parseWidth($element, $scope.rightMaxWidth);

          if ($scope.leftMaxWidthPx > -1) {
            if (parseInt($scope.leftWidth) > $scope.leftMaxWidthPx) {
              $scope.leftWidth = $scope.leftMaxWidthPx + 'px';
              $scope.splitterLeft[0].style.width = $scope.leftWidth;
            }

            if ($scope.splitHandleLeft[0].offsetLeft > $scope.leftMaxWidthPx) {
              $scope.splitterMain[0].style.left =
                $scope.splitHandleLeft[0].style.left =
                  $scope.leftWidth;
            }
          }

          if ($scope.rightMaxWidthPx > -1) {
            if (parseInt($scope.rightWidth) > $scope.rightMaxWidthPx) {
              $scope.rightWidth = $scope.rightMaxWidthPx + 'px';
              $scope.splitterRight[0].style.width = $scope.rightWidth;
            }

            if ($element[0].offsetWidth - $scope.splitHandleRight[0].offsetLeft - $scope.splitHandleRight[0].offsetWidth > $scope.leftMaxWidthPx) {
              $scope.splitterMain[0].style.right =
                $scope.splitHandleRight[0].style.right =
                  $scope.rightWidth;
            }
          }
        }

        //Initialize dragging variables
        var draggingClassTimeout;
        var isDragging = false;
        var lastMouseX; // is used to track mose X movement
        var initialHandleX;
        var elementWidth;
        var handleWidth;

        /**
         * When the mouse is pressed down on the handle
         * @param event
         */
        $scope.onHandleDown = function (event) {
          $scope.actionOnLeft = event.currentTarget.className.search('handle-left') !== -1;
          elementWidth = $element[0].offsetWidth;
          handleWidth = (!!$scope.splitHandleLeft) ? $scope.splitHandleLeft[0].offsetWidth : $scope.splitHandleRight[0].offsetWidth;

          //Calculate lastMouseX
          lastMouseX = event.screenX;
          initialHandleX = ($scope.actionOnLeft) ?
            $scope.splitHandleLeft[0].offsetLeft :
          $scope.splitHandleRight[0].offsetLeft + $scope.splitHandleRight[0].offsetWidth;

          $element.addClass('unselectable');

          //start to track mouse move
          //touch devices are disabled for now.
          if (!!$scope.resizable() && event.type === 'mousedown') {
            $w.on(' touchmove mousemove', $scope.onHandleMove);

            // on Destroy just in case the splitter group is destroyed while moving
            $element.on('$destroy',function(){
              $w.off(' touchmove mousemove', $scope.onHandleMove);
            });

            draggingClassTimeout = setTimeout(function () {
              if ($scope.actionOnLeft) {
                $element.addClass('dragging-left');
              } else {
                $element.addClass('dragging-right');
              }
            }, 300);
          }
          //track mouse up
          $w.one('touchend mouseup', $scope.onHandleUp);
        };

        /**
         * When mouse is released within the window
         * @param event
         */
        $scope.onHandleUp = function (event) {
          clearTimeout(draggingClassTimeout);
          $element.removeClass('dragging-left');
          $element.removeClass('dragging-right');

          //If the user didn't drag mouse pointer and released it inside of the splitter
          //It would be treated as a click
          if (!isDragging && event.target.className.search('bento-splitter-handle') !== -1 && !$scope.noCollapse()) {
            $scope.onHandleClick(event);
            // Dispatch click tracking event
            $scope.eventTracking({
              eventName: 'splitter_group_click'
            });
          } else {
            //Normalize leftWidth
            if ($scope.actionOnLeft) {
              var left = $scope.splitHandleLeft[0].offsetLeft;
              left = (left < 50) ? 0 : left;
              // update left width

              $scope.leftWidth = (left < 50) ? $scope.leftWidth : left + 'px';

              // Close
              if (left === 0) {
                $element.removeClass('opened-left');
                $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
                $scope.splitterLeft.css('width', $scope.leftWidth);
                $scope.splitterMain.css('left', '0');
                $scope.splitHandleLeft.css('left', '0');
                handleTargetX = 0;
              } else {
                $element.addClass('opened-left');
              }
            } else {
              var right = elementWidth - $scope.splitHandleRight[0].offsetLeft - $scope.splitHandleRight[0].offsetWidth;
              right = (right < 50 + handleWidth) ? 0 : right;
              // update left width

              $scope.rightWidth = (right < 50) ? $scope.rightWidth : right + 'px';

              // Close
              if (right === 0) {
                $element.removeClass('opened-right');
                $scope.splitterRight.css('right', '-' + $scope.rightWidth);
                $scope.splitterRight.css('width', $scope.rightWidth);
                $scope.splitterMain.css('right', '0');
                $scope.splitHandleRight.css('right', '0');
                handleTargetX = 0;
              } else {
                $element.addClass('opened-right');
              }
            }
            // Dispatch drag tracking event
            $scope.eventTracking({
              eventName: 'splitter_group_drag'
            });
          }

          $element.removeClass('unselectable');
          //stop move
          $w.off('touchmove mousemove', $scope.onHandleMove);

          //turn on down
          if ($scope.actionOnLeft) {
            $scope.splitHandleLeft.one('touchstart mousedown', $scope.onHandleDown);
          } else {
            $scope.splitHandleRight.one('touchstart mousedown', $scope.onHandleDown);
          }

          //reset dragging flag
          isDragging = false;

          // Fire onResize Callback
          if (!!$scope.onResize) {
            $scope.onResize({
              side: ($scope.actionOnLeft) ? 'left' : 'right'
            });
          }
        };

        var handleTargetX;
        var lastHandleX = 0;
        var dX;

        //Animate dragging using window.requestAnimationFrame for optimal performance
        var animateDragging = function () {

          if (handleTargetX > 0 && dX !== 0) {

            if ($scope.actionOnLeft) {
              $scope.splitterMain[0].style.left =
                $scope.splitHandleLeft[0].style.left =
                  $scope.splitterLeft[0].style.width = handleTargetX + 'px';
            } else {
              $scope.splitterMain[0].style.right =
                $scope.splitHandleRight[0].style.right =
                  $scope.splitterRight[0].style.width = handleTargetX + 'px';
            }

            // Fire onResize Callback
            if (!!$scope.onResize) {
              $scope.onResize({
                side: ($scope.actionOnLeft) ? 'left' : 'right'
              });
            }
          }

          if (isDragging) {
            splitterGroupMainHelper.rAF(animateDragging);
          }
        };

        /**
         * Track on window mousemove
         * @param event
         */
        $scope.onHandleMove = function (event) {
          var currentMouseX = event.screenX;

          // Calculate dX for rendering
          dX = currentMouseX - lastHandleX;
          lastHandleX = currentMouseX;

          if (lastMouseX !== currentMouseX) {

            dX = currentMouseX - lastMouseX;
            handleTargetX = (initialHandleX + dX);
            handleTargetX = ($scope.actionOnLeft) ? handleTargetX : elementWidth - handleTargetX;
            handleTargetX = (handleTargetX < 0) ? 0 : handleTargetX;
            handleTargetX = (handleTargetX > elementWidth - handleWidth) ? elementWidth - handleWidth : handleTargetX;

            // Check draggable area
            if ($scope.actionOnLeft && !!$scope.splitterRight &&
              handleTargetX > $scope.splitHandleRight[0].offsetLeft - handleWidth) {

              handleTargetX = $scope.splitHandleRight[0].offsetLeft - handleWidth;

            } else if (!$scope.actionOnLeft && !!$scope.splitterLeft &&
              handleTargetX > elementWidth - $scope.splitHandleLeft[0].offsetLeft - handleWidth * 2) {

              handleTargetX = elementWidth - $scope.splitHandleLeft[0].offsetLeft - handleWidth * 2;
            }

            if (!isDragging) {
              splitterGroupMainHelper.rAF(animateDragging);
            }

            // Need to 'open' the splitter group when the handle is moved out
            if (handleTargetX > 0 && !$element.hasClass('opened-left') && $scope.actionOnLeft) {
              $element.addClass('opened-left');
              $scope.splitterLeft[0].style.left = '0';
            } else if (handleTargetX > 0 && !$element.hasClass('opened-right') && !$scope.actionOnLeft) {
              $element.addClass('opened-right');
              $scope.splitterRight[0].style.right = '0';
            }

            // Lock handleTargetX if there is a dragging limit here
            if ($scope.actionOnLeft && $scope.leftMaxWidthPx > -1 && handleTargetX > $scope.leftMaxWidthPx) {
              handleTargetX = $scope.leftMaxWidthPx;
            } else if (!$scope.actionOnLeft && $scope.rightMaxWidthPx > -1 && handleTargetX > $scope.rightMaxWidthPx) {
              handleTargetX = $scope.rightMaxWidthPx;
            }

            //flag isDragging
            isDragging = true;
          }
        };
      }])
  /**
   * Splitter Group directive declaration
   */
    .directive('bentoSplitterGroup', [
      '$timeout',
      '$log',
      'splitterGroupNotification',
      'splitterGroupMainHelper',
      function ($timeout, $log, splitterGroupNotification, splitterGroupMainHelper) {

        return {
          restrict  : 'A',
          replace   : false,
          scope     : {
            isLeftCollapsed : '&',  //Default to false if doesn't exist
            isRightCollapsed: '&',  //Default to false if doesn't exist
            resizable       : '&',  //This enables the dragging function to the handle bar
            noCollapse      : '&',  //Making the splitter group to be only resizable but not collapsable on Left
            _leftWidth      : '@leftWidth',  //Set the default width to the left pane
            _rightWidth     : '@rightWidth', //Set the default width to the right pane
            leftMaxWidth    : '@',  //Set max draggable width of the left panel
            rightMaxWidth   : '@',  //Set max draggable width of the right panel
            onResize        : '&',  // Callback for resize
            autoResize      : '&',  // Option to auto-resize the parent container with the content of this SG
            eventTracking   : '&'   // Dispatch external event handlers
          },
          controller: 'mainController',
          link      : function ($scope, $element, $attrs) {
            // Set default width to both left and right
            if (typeof $scope._leftWidth === 'undefined' || $scope._leftWidth === null) {
              $scope.leftWidth = '300px';
            } else {
              $scope.leftWidth = $scope._leftWidth;
            }

            if (typeof $scope._rightWidth === 'undefined' || $scope._rightWidth === null) {
              $scope.rightWidth = '300px';
            } else {
              $scope.rightWidth = $scope._rightWidth;
            }

            // Make sure the intial leftWidth doesn't exceed the leftMaxWidth
            if($scope.leftMaxWidthPx > -1 &&
              splitterGroupMainHelper.parseWidth($element, $scope.leftWidth) > $scope.leftMaxWidthPx){
              $scope.leftWidth = $scope.leftMaxWidthPx + 'px';
            }

            // Make sure the intial rightWidth doesn't exceed the rightMaxWidth
            if($scope.rightMaxWidthPx > -1 &&
              splitterGroupMainHelper.parseWidth($element, $scope.rightWidth) > $scope.rightMaxWidthPx){
              $scope.rightWidth = $scope.rightMaxWidthPx + 'px';
            }

            var mainPaneInner = $element[0].querySelector('.bento-splitter-group-main-inner');

            //Get the two children
            var children = $element.children();
            for (var i = 0; i < children.length; i++) {
              var child = angular.element(children[i]);
              if (child.hasClass('bento-splitter-group-left')) {
                $scope.splitterLeft = child;
              } else if (child.hasClass('bento-splitter-group-main')) {
                $scope.splitterMain = child;
              } else if (child.hasClass('bento-splitter-group-right')) {
                $scope.splitterRight = child;
              }
            }

            //Inject splitter buttons
            if (!!$scope.splitterLeft) {
              $scope.splitHandleLeft = angular.element('<div class="bento-splitter-handle bento-splitter-handle-left"></div>');
              $element.append($scope.splitHandleLeft);
              // Initialize left width
              $scope.splitterLeft.css('width', $scope.leftWidth);
              $scope.splitterLeft.css('left', '-' + $scope.leftWidth);
              // Initialize splitHandleLeft listener
              $scope.splitHandleLeft.one('touchstart mousedown', $scope.onHandleDown);
              mainPaneInner.className += ' has-left-pane';

              // Assign Notifications
              splitterGroupNotification.addNotification(
                'openLeft',
                function () {
                  if (!$element.hasClass('opened-left')) {
                    $scope.actionOnLeft = true;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

              splitterGroupNotification.addNotification(
                'closeLeft',
                function () {
                  if ($element.hasClass('opened-left')) {
                    $scope.actionOnLeft = true;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

            }

            if (!!$scope.splitterRight) {
              $scope.splitHandleRight = angular.element(
                '<div class="bento-splitter-handle bento-splitter-handle-right"></div>');
              $element.append($scope.splitHandleRight);
              // Initialize right width
              $scope.splitterRight.css('width', $scope.rightWidth);
              $scope.splitterRight.css('right', '-' + $scope.rightWidth);
              // Initialize splitHandleRight listener
              $scope.splitHandleRight.one('touchstart mousedown', $scope.onHandleDown);
              mainPaneInner.className += ' has-right-pane';

              // Assign Notifications
              splitterGroupNotification.addNotification(
                'openRight',
                function () {
                  if (!$element.hasClass('opened-right')) {
                    $scope.actionOnLeft = false;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );

              splitterGroupNotification.addNotification(
                'closeRight',
                function () {
                  if ($element.hasClass('opened-right')) {
                    $scope.actionOnLeft = false;
                    $scope.onHandleClick(null);
                  }
                },
                $attrs.id
              );
            }

            // Check Collapse
            if (!!$scope.splitterLeft) {
              // Left
              $element.addClass('opened-left');
              $scope.splitterLeft.css('left', '0');
              $scope.splitterMain.css('left', $scope.leftWidth);
              $scope.splitHandleLeft.css('left', $scope.leftWidth);
            }

            if (!!$scope.splitterRight) {
              $element.addClass('opened-right');
              $scope.splitterRight.css('right', '0');
              $scope.splitterMain.css('right', $scope.rightWidth);
              $scope.splitHandleRight.css('right', $scope.rightWidth);
            }

            if (typeof $scope.isLeftCollapsed !== 'undefined' && !!$scope.splitterLeft) {
              $scope.$watch('isLeftCollapsed()', function (newValue, oldValue) {
                if ((newValue && $element.hasClass('opened-left')) ||
                  (!newValue && !$element.hasClass('opened-left'))) {

                  $scope.actionOnLeft = true;
                  $scope.onHandleClick(null);
                }
              });
            }

            if (typeof $scope.isRightCollapsed !== 'undefined' && !!$scope.splitterRight) {
              $scope.$watch('isRightCollapsed()', function (newValue, oldValue) {
                if ((newValue && $element.hasClass('opened-right')) ||
                  (!newValue && !$element.hasClass('opened-right'))) {

                  $scope.actionOnLeft = false;
                  $scope.onHandleClick(null);
                }
              });
            }

            // Auto-resize the parent container
            if (!!$scope.autoResize()) {
              // Get DOM Reference
              var parentContainer = $element[0].parentNode;
              var leftContainer = $element[0].querySelector('.bento-splitter-group-left');
              var mainContainer = $element[0].querySelector('.bento-splitter-group-main-inner');
              var rightContainer = $element[0].querySelector('.bento-splitter-group-right');
              // Preserve the parent original height when this
              // directive shrinks too small
              parentContainer.style.minHeight = parentContainer.offsetHeight + 'px';

              // Adding padding to left, main and right containers
              // and set overflow-y to hidden width one parent class
              $element.addClass('auto-resize');

              // Adding three marker objects to determine where the last line is
              var markerLeft;
              var markerRight;
              var markerMain;

              if (!!leftContainer) {
                markerLeft = document.createElement('div');
                markerLeft.classNames = 'clearfix';
                leftContainer.appendChild(markerLeft);
              }

              markerMain = document.createElement('div');
              markerMain.classNames = 'clearfix';
              mainContainer.appendChild(markerMain);

              if (!!rightContainer) {
                markerRight = document.createElement('div');
                markerRight.classNames = 'clearfix';
                rightContainer.appendChild(markerRight);
              }

              // Watch the three containers and return the most height
              // and adjust their parent container
              $scope.$watch(
                function () {
                  var newHeight = Math.max(
                    !!markerLeft ? markerLeft.offsetTop : 0,
                    !!markerRight ? markerRight.offsetTop : 0,
                    !!markerMain ? markerMain.offsetTop : 0
                  );
                  return newHeight;
                },
                function (newValue) {
                  parentContainer.style.height = (newValue + 24) + 'px';
                });
            }

            //Add the transition class to the left and main pane
            //0.5second after the page is rendered
            //because IE renders the animation on the main pane when
            //the left pane is opened
            $timeout(function () {

              if (!!$scope.splitterLeft) {
                $scope.splitterLeft.addClass('animate');
              }

              $scope.splitterMain.addClass('animate');

              if (!!$scope.splitterRight) {
                $scope.splitterRight.addClass('animate');
              }
            }, 500);
          }
        };
      }
    ])
    .directive('bentoSplitterGroupLeft', function () {
      return {
        require : '^bentoSplitterGroup',
        restrict: 'A',
        scope   : false,
        link    : function ($scope, $element) {
          $element.addClass('bento-splitter-group-left');
        }
      };
    })
    .directive('bentoSplitterGroupRight', function () {
      return {
        require : '^bentoSplitterGroup',
        restrict: 'A',
        scope   : false,
        link    : function ($scope, $element) {
          $element.addClass('bento-splitter-group-right');
        }
      };
    })
    .directive('bentoSplitterGroupMain', function () {
      return {
        require   : '^bentoSplitterGroup',
        restrict  : 'A',
        replace   : true,
        transclude: true,
        template  : '<section class="bento-splitter-group-main">' +
        '  <div class="bento-splitter-group-main-inner" data-ng-transclude></div>' +
        '</section>',
        scope     : false,
        link      : function ($scope, $element) {
        }
      };
    });

})(window, window.angular);
(function (angular, window) {
  'use strict';

  var defaults = {
    minTagLength: 2,
    propertyName: 'name',
  };

  angular.module('bento.tagsinput', [])
  /**
   * Bento Tags Input Directive
   */
    .directive('bentoTagsInput', [
      '$timeout',
      function ($timeout) {
        return {
          scope      : {
            addOnComma                  : '=',  // Add a tag on comma key
            addOnEnter                  : '=',  // Add on enter key
            addOnSpace                  : '=',  // Add on space bar
            editable                    : '=',  // Flag to editable pills
            minTagLength                : '=?', // Minimum Tag length
            ngModel                     : '=',  // Tags in array
            onTagAdded                  : '&',  // Event handler - when a tag is added
            onTagEdited                 : '&',  // Event handler - when a tag is edited
            onTagRemoved                : '&',  // Event handler - when a tag is removed
            placeholder                 : '@',  // Placeholder for the input field
            replaceSpacesWithDashes     : '=',  // If the spaces are replaced with spaces
            replaceSpacesWithUnderscores: '=',  // If the spaces are replaced with underscores
            tagPropertyName             : '@?', // Property name of each pill
            ngDisabled                  : '='   // ngDisabled
          },
          require    : ['ngModel', 'bentoTagsInput'],
          replace    : true,
          templateUrl: '../templates/tags_input/bento-tags-input.html',
          controller : ['$scope', '$element',
            function ($scope, $element) {
              // Set default
              $scope.propertyName = typeof $scope.tagPropertyName === 'undefined' ?
                defaults.propertyName : $scope.tagPropertyName;
              $scope.minTagLength = typeof $scope.minTagLength === 'undefined' ?
                defaults.minTagLength : $scope.minTagLength;
              var self = this;

              self.setEditingMode = function (bool) {
                $scope.isPillEditing = bool;
                angular.element($element[0].querySelector('.bento-tags-input-text')).css('width', 60);
              };

              self.setActivePill = function (index) {
                $scope.activePill = index;
              };

              self.hasRedundancy = function (tag, ignoreTagIndex) {
                return $scope.ngModel.some(function (value, index, array) {
                  if (index === ignoreTagIndex) {
                    return false;
                  }

                  return value[$scope.propertyName] === tag.trim();
                });
              };

              self.isValidLength = function (tag) {
                return tag.trim().length >= $scope.minTagLength;
              }
            }
          ],
          link       : /**
           * Link funcion of bento-tags-input directive
           * @param scope
           * @param element
           * @param attrs
           * @param controllers
           */
            function (scope, element, attrs, controllers) {
            var ngModelController = controllers[0];
            var controller = controllers[1];
            var $input = angular.element(element[0].querySelector('.bento-tags-input-text'));
            var $hiddenInput = angular.element(element[0].querySelector('.bento-tags-input-text-hidden'));
            var goBlur = true;
            var t;
            var textBeforeKeypress;

            // init ngModel form element conditions
            ngModelController.$setPristine();
            ngModelController.$setUntouched();

            // Set Defaults
            scope.activePill = -1;
            scope.addOnComma = typeof scope.addOnComma === 'undefined' ? true : scope.addOnComma;
            scope.addOnEnter = typeof scope.addOnEnter === 'undefined' ? true : scope.addOnEnter;
            scope.ngModel = scope.ngModel ? scope.ngModel : [];

            scope.$watch(function () {
              return scope.ngModel.length;
            }, function (modelSize) {
              if (attrs.required) {
                if (modelSize === 0) {
                  ngModelController.$setValidity('required', false);
                } else {
                  ngModelController.$setValidity('required', true);
                }
              }
            });

            scope.$watch('editable', function () {
              if ($input) {
                $input.css('width', 60);
              }
            });

            /**
             * When a user focus out from this input
             **/
            element.on('focusout', function (event) {
              element.removeClass('bento-tags-input-focused');

              // Only goBlur is set to true
              // Workaround in order to work with various browsers
              if (goBlur) {
                ngModelController.$setTouched();

                t = scope.inputText ? scope.inputText : '';
                if (t.length === 0) {
                  return;
                }
                addTagToModel(t);
              }
            });

            /**
             * On a pillfocus
             * @param index
             */
            scope.onPillFocus = function (index) {
              scope.activePill = index;
              element.addClass('bento-tags-input-focused');
            };

            /**
             * Callback when entering pill edit mode
             * @param index
             */
            scope.onPillEdit = function (index) {
              element.addClass('bento-tags-input-focused');
            };

            /**
             * On a pillblur
             * @param index
             */
            scope.onPillBlur = function (index) {
              scope.activePill = -1;
              element.removeClass('bento-tags-input-focused');
            };

            /**
             * Callback when a pill demends to move selections to the left
             * @param index
             */
            scope.onPillMoveLeft = function (index) {
              $hiddenInput.focus();
            };

            /**
             * Callback when a pill demends to move selections to the left
             * @param index
             */
            scope.onPillMoveRight = function (index) {
              $hiddenInput.focus();
            };

            /**
             * Callback when a pill demends to move selections to the left
             * @param index
             * TODO: doesn't play well with ng-repeat
             */
            scope.onPillDeleteLeft = function (index) {
//              if (index > 0) {
//                scope.ngModel.splice(index - 1, 1);
//              }
            };

            /**
             * Callback when a pill demends to move selections to the left
             * @param index
             * TODO: doesn't play well with ng-repeat
             */
            scope.onPillDeleteRight = function (index) {
//              if (index === scope.ngModel.length - 1 && scope.inputText) {
//                scope.inputText = scope.inputText.substring(1);
//              } else {
//                scope.ngModel.splice(index+1,1);
//              }
            };

            /**
             * Return form element based default classes for NG
             * @returns {string}
             */
            scope.getClass = function () {
              return ''
            };

            /**
             * Get focus event
             */
            scope.onElementFocus = function () {
              goBlur = false;
              $input[0].focus();
              goBlur = true;
            };

            /**
             * Callback function to when a pill's content is changed
             * @param label
             * @param index
             */
            scope.onPillChange = function (index, label) {
              // This label is completely removed
              if (!label || label.length === 0) {
                var removedTag = scope.ngModel.splice(index, 1);

                // Fire callback
                scope.onTagRemoved({tag: removedTag});
              } else {
                scope.ngModel[index][scope.propertyName] = label;
                // Fire callback
                scope.onTagEdited({tag: scope.ngModel[index]});
              }
            };

            /**
             * Callback from pills redundancy report
             * @param index
             * @param isRedundant
             */
            scope.onPillRedundant = function (index, isRedundant) {
              if (isRedundant) {
                ngModelController.$setValidity('tags-input-redundant', false);
              } else {
                ngModelController.$setValidity('tags-input-redundant', true);
              }
            };

            /**
             * Callback from pills' length report
             * @param index
             * @param invalidLength
             */
            scope.onPillTagLength = function (index, isValidLength) {
              if (!isValidLength) {
                ngModelController.$setValidity('tags-input-invalid-length', false);
              } else {
                ngModelController.$setValidity('tags-input-invalid-length', true);
              }
            };

            /**
             * When a key is entered into the input field
             * Auto resize input field as user types
             * @param event
             */
            scope.onKeypress = function (event) {
              if (scope.isPillEditing) {
                return;
              }
              var width = (scope.inputText) ? (scope.inputText.length) * 9 : 60;
              $input.css('width', width + 'px');
            };

            /**
             * Callback when a key is up in the input field
             * @param event
             */
            scope.onKeyup = function (event) {
              if (textBeforeKeypress !== scope.inputText) {
                ngModelController.$setDirty();

                ngModelController.$setValidity('tags-input-length', true);
                ngModelController.$setValidity('tags-input-redundant', true);
                $input.removeClass('tags-input-invalid');
              }
            };

            /**
             * On keydown in the directive
             * @param event
             */
            scope.onKeydown = function (event) {
              textBeforeKeypress = scope.inputText;
              if (scope.isPillEditing) {
                return;
              }
              // Enter: 13
              // Left: 37
              // Right: 39
              // Delete: 46
              // Backspace: 8
              // Tab: 9
              // Comma: 188
              // Space: 32
              if (
                // Enter
              (scope.addOnEnter && event.keyCode === 13) ||
                // Space
              (scope.addOnSpace && event.keyCode === 32) ||
                // Comma
              (scope.addOnComma && event.keyCode === 188)) {
                if (scope.inputText) {
                  t = scope.inputText;
                  if (t.length === 0) {
                    return;
                  }

                  // unrelate to NG
                  setTimeout(function () {
                    goBlur = false;
                    $input[0].focus();
                    goBlur = true;
                  }, 10);

                  addTagToModel(t);

                  event.stopPropagation();
                  event.preventDefault();
                }
              } else if (event.keyCode === 37) {
                if ($input[0].selectionStart === 0) {
                  goBlur = false;
                  $hiddenInput[0].focus();
                  goBlur = true;

                  if (scope.activePill === -1) {
                    scope.activePill = scope.ngModel.length - 1;
                  } else if (scope.activePill > 0) {
                    scope.activePill--;
                  }
                  event.stopPropagation();
                  event.preventDefault();
                }

              } else if (event.keyCode === 39) {
                if (scope.activePill === scope.ngModel.length - 1) {
                  setTimeout(function () {
                    goBlur = false;
                    $input[0].focus();
                    goBlur = true;
                  }, 10);
                } else if (scope.activePill != -1) {
                  scope.activePill++
                }

                if (document.activeElement !== $input[0]) {
                  event.stopPropagation();
                  event.preventDefault();
                }

              } else if (event.keyCode == 46 || event.keyCode == 8) {
                if (scope.activePill != -1) {
                  scope.onPillClose(scope.activePill);

                  if (scope.activePill === scope.ngModel.length) {
                    scope.activePill = scope.ngModel.length - 1;
                  }

                  if (scope.activePill === -1) {
                    setTimeout(function () {
                      $input[0].focus()
                    }, 10);
                  }
                } else if (event.keyCode === 8 && $input[0].selectionStart === 0 && $input[0].selectionEnd === 0) {
                  scope.onPillClose(scope.ngModel.length - 1);
                } else {
                  $input.css('width', ((scope.inputText) ? scope.inputText.length * 9 : 0 ) + 'px')
                }
              } else if (
                // Tab
              event.keyCode === 9
              ) {
                if (scope.inputText) {
                  t = scope.inputText;
                  if (t.length === 0) {
                    return;
                  }
                  addTagToModel(t);
                }
                scope.activePill = -1;
              }
            };

            /**
             * Add a new Tag to the array
             * @param tag
             */
            function addTagToModel(tag) {
              var isValidTag = true;

              if (scope.replaceSpacesWithDashes) {
                tag = tag.replace(/ /g, "-");
              } else if (scope.replaceSpacesWithUnderscores) {
                tag = tag.replace(/ /g, "_");
              }

              // Check if the tag is too short
              // Or there is a repeated one
              if (!controller.isValidLength(tag)) {
                $input.addClass('tags-input-invalid');
                ngModelController.$setValidity('tags-input-length', false);
                isValidTag = false;
              }

              if (controller.hasRedundancy(tag)) {
                // error notification
                $input.addClass('tags-input-invalid');
                ngModelController.$setValidity('tags-input-redundant', false);
                isValidTag = false;
              }

              if (isValidTag) {
                var newTag = {};
                newTag[scope.propertyName] = tag;

                scope.ngModel.push(newTag);
                scope.inputText = '';
                $input.css('width', '0');

                // Fire tagAdded event handler
                scope.onTagAdded({tag: newTag});
              }
            }

            scope.onInputFocus = function () {
              scope.activePill = -1;
              element.addClass('bento-tags-input-focused');
            };

            scope.onHiddenInputFocus = function () {
              element.addClass('bento-tags-input-focused');
            };

            scope.onPillClose = function (index) {
              var tagRemoved = scope.ngModel.splice(index, 1)[0];

              $timeout(function () {
                if (scope.ngModel.length > 0) {
                  var pills = element[0].querySelectorAll('.bento-tags-input-pill:not(.ng-leave)');
                  var rect = pills[pills.length - 1].getBoundingClientRect();
                  calculateInputField(rect);
                } else {
                  calculateInputField(0);
                }

                // focus back to the text-field for additional user input
                $input[0].focus();

                // Fire callback
                scope.onTagRemoved({tag: tagRemoved});
              }, 100);

              // Set dirty
              ngModelController.$setDirty();
              ngModelController.$setTouched();

            };

            scope.resizeInput = function (rect) {
              if (rect) {
                calculateInputField(rect);
              } else {
                var pill = element[0].querySelector('.bento-tags-input-pill:last-of-type');
                calculateInputField(pill.getBoundingClientRect());
              }
            };

            function calculateInputField(rect) {
              var elRect = element[0].getBoundingClientRect();
              var targetWidth = elRect.width - ( rect.left - elRect.left) - rect.width - 30;
              targetWidth = targetWidth < 60 || rect === 0 ? '60px' : targetWidth + 'px';
              $input.css('width', targetWidth);
            }
          }
        }
      }
    ])
  /**
   * To accommodate multiple spaces in pills
   */
    .filter('bentoTagsInputPillFilter', function () {
      return function (input) {

        if (input) {
          // \u00A0 is the unicode for &nbsp;
          return input.replace(/ /g, '\u00A0');
        } else {
          return input;
        }
      }
    })
  /**
   * Bento Tags Input Pill Sub-Directive
   */
    .directive('bentoTagsInputPill', [
      '$timeout',
      function ($timeout) {
        return {
          scope      : {
            label         : '=',
            editable      : '=',
            index         : '=',
            isActive      : '=',
            length        : '=',
            onEdit        : '&',
            onClose       : '&',
            resizeCallback: '&',
            onPillChange  : '&',
            onMoveLeft    : '&',
            onMoveRight   : '&',
            onDeleteLeft  : '&',
            onDeleteRight : '&',
            onRedundantTag: '&',
            onTagLength   : '&'

          },
          templateUrl: '../templates/tags_input/bento-tags-input-pill.html',
          require    : '^bentoTagsInput',
          replace    : true,
          link       : /**
           * Link function of bento-tags-input-pill directive
           * @param scope
           * @param element
           * @param attr
           * @param controller
           */
            function (scope, element, attr, controller) {
            var $input,
                sizeRef = element[0].querySelector('.bento-tags-input-pill-size-ref'),
                isRedundant, isValidLength;

            scope.isEditing = false;

            /**
             * Watch the change of the label and make size adjustments
             */
            scope.$watch('editLabel', function (newLabel) {
              // Only adjust when it's in editing mode
              if (scope.isEditing && sizeRef && $input) {
                $input.css('width', sizeRef.offsetWidth + 2);
                scope.resizeCallback();
                isRedundant = controller.hasRedundancy(newLabel, scope.index);
                isValidLength = controller.isValidLength(newLabel);

                scope.onRedundantTag({index: scope.index, isRedundant: isRedundant});
                scope.onTagLength({index: scope.index, isValidLength: isValidLength});

                if (isRedundant || !isValidLength) {
                  element.addClass('bento-tags-input-pill-invalid');
                } else {
                  element.removeClass('bento-tags-input-pill-invalid');
                }

              }
            });

            /**
             * On pill edit keypress
             * @param event
             */
            scope.onKeypress = function (event) {

            };

            /**
             * On pill edit keydown
             * @param event
             */
            scope.onKeydown = function (event) {
              // Left key 37
              // Right key 39
              switch (event.keyCode) {
                case 37:
                  if ($input[0].selectionStart === 0 && $input[0].selectionEnd === 0) {
                    scope.onMoveLeft({index: scope.index, label: scope.label});
                  }
                  break;
                case 39:
                  if ($input[0].selectionStart === scope.label.length) {
                    scope.onMoveRight({index: scope.index, label: scope.label});
                  }
                  break;
                // Enter
                case 13:
                  $input.blur();
                  event.stopPropagation();
                  event.preventDefault();
                  break;
                // Backspace
                case 8:
                  if ($input[0].selectionStart === 0 && scope.index > 0) {
                    scope.onDeleteLeft({index: scope.index});
                  }
                  break;
                // Delete key
                case 46:
                  if ($input[0].selectionStart === scope.label.length) {
                    scope.onDeleteRight({index: scope.index});
                  }
                  break;
              }
            };

            /**
             * Returns a class for this component
             * @returns {*}
             */
            scope.getClass = function () {
              var c = '';

              if (scope.isActive) {
                c += 'active ';
              }

              if (!scope.isEditing) {
                c += 'btn btn-default ';
              }

              return c;
            };

            /**
             * Callback when the pill input is on focus
             * @param event
             */
            scope.onInputFocus = function(event){

            };

            /**
             * When user forcuses out from the edit input field
             * @param event
             */
            scope.onInputBlur = function (event) {
              // Turn off editing mode
              scope.isEditing = false;
              controller.setEditingMode(false);

              // To avoid jump in some browsers
              $input.addClass('ng-hide');

              // Reset error & label to previous state on blur
              if (isRedundant || !isValidLength) {
                isRedundant = false;
                isValidLength = true;
                scope.onRedundantTag({index: scope.index, isRedundant: isRedundant});
                scope.onTagLength({index: scope.index, isValidLength: isValidLength});
                element.removeClass('bento-tags-input-pill-invalid');
              }else {
                scope.label = scope.editLabel.trim();

                // Fire callback function
                scope.onPillChange({
                  label: scope.label,
                  index: scope.index
                });
              }

            };

            /**
             * On edit icon click
             * @param event
             */
            scope.onEditClick = function (event) {

              // ignore if this is not editable
              if(!scope.editable){
                return;
              }

              scope.isEditing = true;
              scope.editLabel = scope.label;

              $timeout(function () {
                $input = angular.element(element[0].querySelector('input'));
                $input.css('width', sizeRef.offsetWidth);

                // Wait a bit more for focus
                $timeout(function () {
                  $input.select();
                  controller.setEditingMode(true);
                  controller.setActivePill(scope.index);
                  scope.onEdit({index: scope.index});
                }, 100);

              });

              event.stopPropagation();
              event.preventDefault();
            };

            /**
             * On close button click
             * @param event
             */
            scope.onCloseClick = function (event) {
              event.preventDefault();
              event.stopPropagation();
              scope.onClose({index: scope.index});
            };
          }
        }
      }
    ])
  ;

})(angular, window);
(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.toggle', ['bento.services'])
  /**
   * Controller Declaration
   */
    .controller('bentoToggleController', [
      '$scope',
      '$element',
      '$bentoServices',
      function ($scope, $element, $bentoServices) {

        if (typeof $scope.ngModel === 'undefined' ) {
          $scope.ngModel = false;
        }

        /**
         * Swipe gestures
         */
        var startDragging = false;
        var startX = 0;
        var triggeringDX = $element[0].offsetWidth * 0.3; //trigering distance when mouse or touch is moved
        var pointerDown;
        var pointerMove;
        var pointerUp;
        $scope.isTouch = $bentoServices.isTouchSupported();

        pointerDown = 'touchstart mousedown';
        pointerMove = 'touchmove mousemove';
        pointerUp = 'touchend mouseup';


        $element.on(pointerDown, touchdown);
        $element.on('keydown', function(event){
          if(event.keyCode === 32) // Space
          {
            toggle(event);
          }
        });

        /**
         * Touchdown / Mousedown
         * @param event
         */

        function touchdown(event) {

          // ignore toggle event when this is locked
          if ($scope.isLocked()) {
            return;
          }

          // ignore user event if there is a one-way lock
          if (typeof $scope.lockToState !== 'undefined') {
            if (($scope.lockToState && $scope.ngModel) ||
                (!$scope.lockToState && !$scope.ngModel))
            {

              return;
            }
          }

          startDragging = true;
          startX = !!event.originalEvent && event.originalEvent.touches ?
            event.originalEvent.touches[0].pageX : event.pageX;

          $element.on(pointerMove, touchmove);
          $element.on(pointerUp, toggle);
          $element.off(pointerDown, touchdown);

          event.stopPropagation(); //disable mousedown on touch devices
        }

        /**
         * Turn ON or OFF based on mouse/touch `x` swipes
         * @param event
         */
        function touchmove(event) {
          var dX = !!event.originalEvent && event.originalEvent.touches ?
          event.originalEvent.touches[0].pageX - startX : event.pageX - startX;
          var absDX = Math.abs(dX);

          // Check deltaX to define ON or OFF
          if (absDX > triggeringDX) {
            if (dX > 0) {
              $scope.ngModel = true;
            } else {
              $scope.ngModel = false;
            }

            $element.off(pointerMove, touchmove);
            $element.off(pointerUp, $scope.toggle);
            $element.on(pointerDown, touchdown);

            // Fire external onChange callback function
            if (!!$scope.onChange) {
              $scope.onChange({value: $scope.ngModel});
            }

            $scope.$apply();
            event.stopPropagation(); //disable mousedown on touch devices

          }
          // <FALLBACK> Toggle on touch devices
          // incase draggable area is way too small for fat fingers
          else if ($scope.isTouch) {
            toggle(event);
          }
        }

        /**
         * Toggle this main directive
         */
        function toggle(event) {

          // ignore toggle event when this is locked
          if ($scope.isLocked()) {
            return;
          }

          // ignore user event if there is a one-way lock
          // double assurance
          if (typeof $scope.lockToState !== 'undefined') {
            if (($scope.lockToState && $scope.ngModel) ||
                (!$scope.lockToState && !$scope.ngModel)
            ) {

              return;
            }
          }

          $scope.ngModel = !$scope.ngModel;

          // Fire external onChange callback function
          if (!!$scope.onChange) {
            $scope.onChange({value: $scope.ngModel});
          }

          // update listeners
          $element.off(pointerMove, touchmove);
          $element.off(pointerUp, $scope.toggle);
          $element.on(pointerDown, touchdown);

          $scope.$apply();
          event.stopPropagation(); //disable mousedown on touch devices
          event.preventDefault();
        }

      }])
  /**
   * Directive declaration
   */
    .directive('bentoToggle', [function () {

      return {
        restrict   : 'A',
        replace    : true,
        require    : '^ngModel',
        scope      : {
          ngModel    : '=',
          onChange   : '&',
          lockToState: '=',
          isLocked   : '&'
        },
        controller : 'bentoToggleController',
        templateUrl: '../templates/toggle/bento-toggle.html'
      };
    }]);


})(window, window.angular);

(function(angular, undefined) {
    'use strict';

    //Define bentoUI App object
    angular
        .module('bento.toolbar', ['bento.translate', 'bento.reset'])
        //Directive
        .constant('bentoToolbarConfig', {
            "buttons": [

            ],
            // "moreText": "More",
            // "collapsedText": "Menu",
            // "searchText": "Search"
        })
        .controller('BentoToolbarController', ['bentoToolbarConfig', '$scope', '$attrs', '$parse', '$interpolate',
            function(config, $scope, $attrs, $parse, $interpolate) {
                $scope.searchInfo = {
                    term:""
                };
                this.getAttributeValue = function(attribute, defaultValue, interpolate) {
                    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
                };
                this.render = function() {
                    $scope.hasSearch = $attrs.onSearch || $attrs.onSearchEnter;
                    $scope.morebuttons = this.getMoreButtons();
                };
                $scope.$watch('searchInfo.term',function(){
                    if($scope.searchTerm!=undefined){
                        $scope.searchTerm = $scope.searchInfo.term;
                    }
                    $scope.onSearch({
                        term: $scope.searchInfo.term
                    })
                },true);
                $scope.keySelectPage = function(ev) {
                    if (ev.which == 13) {
                        $scope.onSearchEnter({
                            term: $scope.searchInfo.term
                        });
                    }
                };
                $scope.$watch('lang', function () {
                  if (!!$scope.lang) {
                    $translate.use($scope.lang.toLowerCase());
                  }
                });

            }
        ])
        .directive('bentoToolbar', ['$compile','$parse', '$window', '$timeout', 'bentoToolbarConfig',
            function($compile, $parse, $window, $timeout, config) {
                return {
                    restrict: 'EA',
                    scope: {
                        buttonConfig: "=",
                        moreButtonConfig: "=",
                        searchTerm: "=",
                        onSearchEnter: "&",
                        onSearch: "&"
                    },
                    controller: 'BentoToolbarController',
                    templateUrl: '../templates/toolbar/bento-toolbar.html',
                    replace: true,
                    link: function(scope, element, attrs, toolbarCtrl) {
                        var moreButtons = scope.moreButtonConfig
                            ;
                        scope.buttons = scope.buttonConfig;
                        scope.movedButtons = [];
                        toolbarCtrl.getMoreButtons = function() {
                            moreButtons = moreButtons ? moreButtons : [];
                            var allMoreButtons = scope.movedButtons.concat(moreButtons);
                            return allMoreButtons;
                        };
                        scope.$watch('buttonConfig', function(buttonData) {
                            scope.buttons = scope.buttonConfig;
                            toolbarCtrl.render();
                        }, true);

                        scope.$watch('moreButtonConfig', function(buttonData) {
                            moreButtons = scope.moreButtonConfig;
                            toolbarCtrl.render();
                        }, true);

                        $window.onresize = function() {
                            scope.$apply();
                        };

                        scope.$watch(function() {
                            return angular.element($window)[0].innerWidth;
                        }, function() {
                            toolbarCtrl.renderMoreButtons();
                        });

                        $timeout(function() {
                            toolbarCtrl.renderMoreButtons()
                        }, 10);
                        //calculate what to add to dropdown buttons
                        toolbarCtrl.renderMoreButtons = function() {
                            var containerWidth = element[0].offsetWidth,
                                childrenWidth = 0,
                                moreWidth = 0,
                                buttonContainer,
                                searchContainer,
                                moreContainer;

                            //get width of all div's in toolbar
                            for (var i = 0, total = element[0].children.length; i < total; i++) {
                                childrenWidth += element[0].children[i].offsetWidth;

                                //cache buttonContainer element
                                if (angular.element(element[0].children[i]).hasClass('button-actions')) {
                                    buttonContainer = element[0].children[i];
                                }
                                //cache search field element
                                if (angular.element(element[0].children[i]).hasClass('dataTables_filter')) {
                                    searchContainer = element[0].children[i];
                                }
                            }

                            //if there is a more button, calculate width of more button
                            moreContainer = angular.element(element[0].querySelector('.more-buttons'));
                            moreWidth = moreContainer ? angular.element(moreContainer[0]).width() : 0;

                            if (buttonContainer) {
                                var searchWidth = searchContainer ? searchContainer.offsetWidth : 0,
                                    remainderWidth = containerWidth - searchWidth - moreWidth,
                                    buttonWidths = 0;

                                scope.movedButtons = [];

                                //right or left align dropdown menu depending if search filter is displayed
                                //and width of toolbar
                                if (searchWidth == 0 && (remainderWidth - buttonContainer.offsetWidth) <= 0) {
                                    angular.element(element[0].querySelector('.dropdown-menu')).addClass('pull-right');
                                } else {
                                    angular.element(element[0].querySelector('.dropdown-menu')).removeClass('pull-right');
                                }
                                //decide whether to hide or display buttons
                                //iterate through buttons, add up button widths
                                //decide if accumulative button widths are larger than container
                                //push the extra buttons into an array
                                //that will be added to the more buttons array
                                for (var i = 0, total = buttonContainer.children.length; i < total; i++) {
                                    angular.element(buttonContainer.children[i]).show();
                                    buttonWidths += buttonContainer.children[i].offsetWidth;

                                    if (buttonWidths > remainderWidth) {
                                        if (angular.element(buttonContainer.children[i]).hasClass('more-buttons')) {

                                        } else {
                                            angular.element(buttonContainer.children[i]).hide();
                                        }
                                        if (scope.buttons[i]) {
                                            scope.movedButtons.push(scope.buttons[i]);
                                        }
                                    }
                                }

                                toolbarCtrl.render();
                            }
                        };
                    }
                };
            }
        ]);
})(window.angular);
(function(angular){

  'use strict';

  var translateApp = angular.module('bento.services');

  translateApp
    .provider('$bentoTranslateLoader',function(){
      var urlPatterns = [];

      // Pushing a new pattern onto the pattern stack for loading later
      this.addURLPattern = function(pattern){
        urlPatterns.push(pattern);
      };

      /**
       * Loader Factory
       * @type {*[]}
       */
      this.$get = ['$http', '$q', function($http, $q){
        // return loaderFn
        return function (options) {

          var deferred = $q.defer();
          var filePatternArray = urlPatterns.slice(0);
          var languageData = {};
          var counter = 0;

          loadLanguageFile();

          function loadLanguageFile(){
            // pop and get the top time from the stack
            var url = filePatternArray.pop().replace('{lang}',options.key);
            $http({method: 'GET', url: url}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                addAndCheckFile(data);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                addAndCheckFile();
              });
          }

          function addAndCheckFile(data){

            if(!!data) {
              for (var key in data) {
                if(!!data[key]) {
                  languageData[key] = data[key];
                  counter += 1;
                }
              }
            }

            if(filePatternArray.length > 0){
              loadLanguageFile();
            }else{
              if(counter > 0){
                deferred.resolve(languageData);
              }else{
                deferred.reject(options.key);
              }
            }
          }
          return deferred.promise;
        };
      }];
    });

})(window.angular);

(function () {

  /*
  DO NOT CHANGE!!
  This is Bento Moderns default translation variable.
  All new translations must be updated or overwritten with its API.

  See: http://modern.ui.int.thomsonreuters.com/#/components/translate
   */
  var BENTO_TRANSLATE_DEFAULT = {
    "BENTO_MODERN_MULTISELECT_OVERLAY_ALL_SELECTED_INFO": "All (NUMBER) selected",
    "BENTO_MODERN_MULTISELECT_OVERLAY_DONE": "Done",
    "BENTO_MODERN_MULTISELECT_OVERLAY_EDIT": "Edit",
    "BENTO_MODERN_MULTISELECT_OVERLAY_SELECT": "Select",
    "BENTO_MODERN_MULTISELECT_OVERLAY_SELECT_ALL": "Select All",
    "BENTO_MODERN_MULTISELECT_OVERLAY_SELECTED_INFO": "NUMBER selected",
    "BENTO_MODERN_MULTISELECT_OVERLAY_SHOW_ALL": "Show All",
    "BENTO_MODERN_MULTISELECT_OVERLAY_SHOW_SELECTED": "Show Selected",
    "BENTO_MODERN_NAV_TOOLBAR_MORE": "More",
    "BENTO_MODERN_PAGINATION_GO_BUTTON": "Go",
    "BENTO_MODERN_PAGINATION_INFO_PAGE_TEXT": "Page _PAGE_ of _PAGES_",
    "BENTO_MODERN_PAGINATION_INFO_TEXT": "_START_ to _END_ of _MAX_",
    "BENTO_MODERN_TRANSFER_BOX_BTN_TEXT": "Transfer",
    "BENTO_MODERN_TRANSFER_BOX_INFO_TEXT": "_SELECTED_ of _TOTAL_ Checked",
    "BENTO_MODERN_WIZARD_BUTTON_DONE": "Done",
    "BENTO_MODERN_WIZARD_BUTTON_NEXT": "Next",
    "BENTO_MODERN_WIZARD_BUTTON_PREVIOUS": "Previous"
  };

  angular.module('bento.translate', ['bento.services'])
  /**
   * Setting up the translate
   */
    .run([
      '$http',
      '$log',
      '$bentoTranslate',
      '$bentoJSRoot',
      '$timeout',
      function ($http, $log, $bentoTranslate) {

        $bentoTranslate.setTranslation(
          BENTO_TRANSLATE_DEFAULT,
          true // To avoid $apply in init cycle since the first cycle will be automatically applied.
        );

      }])
  /**
   * Bento Translate Main Filter
   */
    .filter('bentoTranslate', [
      '$bentoTranslate',
      function ($bentoTranslate) {

        function bentoTranslateFilter(label, override) {

          // Use override
          if (!!override && override.trim().length > 0) {
            return override;
          }

          return $bentoTranslate._translate(label);
        }

        bentoTranslateFilter.$stateful = true;

        return bentoTranslateFilter;
      }])
  /**
   * Factory to support various useful functions
   */
    .factory('$bentoTranslate', [
      '$http',
      '$bentoServices',
      '$rootScope',
      '$q',
      '$log',
      function ($http, $bentoServices, $rootScope, $q, $log) {
        var _data = {},
            isLoading = true,
            promiseStack = [];

        // Set custom data
        function set(data, bypassApply) {
          for(var key in data){
            _data[key] = data[key];
          }
          isLoading = false;

          // To avoid apply conflicts in init cycle
          if(!bypassApply) {
            $bentoServices.safeApply($rootScope);
          }
        }

        // Add translation key
        function add(key, translation) {
          if (hasData()) {
            _data[key] = translation;
          }
        }

        // Get custom data
        function get() {
          return _data;
        }

        // Load a new set of translation
        function load(url) {
          isLoading = true;
          $http.get(url)
            .success(function (data) {
              isLoading = false;
              set(data);
              resolvePromises(true);
              $bentoServices.safeApply($rootScope);
            })
            .error(function () {
              $log.error('Bento Translate: Unable to load ' + url);
              resolvePromises(false);
              isLoading = false;
            })
        }

        // Has translation in this factory/service
        function hasData() {
          return !!_data;
        }

        // Resolve all promises
        function resolvePromises(){
          var p;
          while(promiseStack.length > 0){
            p = promiseStack.pop();
            p.deferred.resolve(_translate(p.label));
          }
        }

        // Public API for translate
        function translate(label) {
          var deferred = $q.defer();

          // Still loading translation need to wait
          if(isLoading){
            promiseStack.push({label:label,deferred:deferred});
          }else{
            deferred.resolve(_translate(label));
          }

          return deferred.promise;
        }

        // Private API for translate
        // Offers instant possible translation
        // Not suitable for server loadings
        function _translate(label) {
          if (hasData()) {
            if (_data[label]) {
              return _data[label];
            } else {
              return label;
            }
          } else {
            return label;
          }
        }

        return {
          add                  : add,
          getTranslation       : get,
          hasTranslation       : hasData,
          load                 : load,
          setTranslation       : set,
          translate            : translate,
          //Private API
          _translate            : _translate
        };
      }
    ])
  ;

})();

(function(angular, undefined) {
    'use strict';

    angular.module('bento.transferbox', [
        'bento.cookie',
        'bento.translate'
    ])
        .controller('bentoTransferBoxController', [
            '$scope',
            function($scope) {
                /**** LOADER ***/
                var marginHeight = 260;
                var buttonPad = 0,
                    buttonPadSecond = 0;
                /**************************************** Tansferbox Initialization ***********************************/

                $scope.selectItems = [{
                    value: 25,
                    label: 25
                }, {
                    value: 50,
                    label: 50
                }, {
                    value: 100,
                    label: 100
                }];

                $scope.currentInfo = {
                    page: 1, //current page
                    gridData: [], //data array to display in table
                    assignedData: [],
                    selectedUsersArray: [], //if checkbox is selected, item's unique id
                    availableSearchTerm: '',
                    assignedSearchTerm: '',
                    selectedAvailableItems: [],
                    selectedAssignedItems: [],
                    totalAvailableItems: 0,
                    totalAssignedItems: 0,
                    availableItemsPage: 1,
                    assignedItemsPage: 1,
                    numItemsAvailable: 25, //number of rows to display
                    numItemsAssigned: 25,
                    transferBtnText: 'Transfer',
                    selectedTitle: 'Selected Users',
                    availableTitle: 'Available Users',
                    boxOneClickState: false,
                    boxTwoClickState: false,
                    dataTable1: undefined,
                    dataTable2: undefined,
                    infoText: '_SELECTED_ of _TOTAL_ Checked',
                    paginationInfoText: '_START_ to _END_ of _MAX_ Entries',
                    paginationGoText: 'Go',
                    paginationInfoPageText: 'Page _PAGE_ of _PAGES_',
                    boxOneInfoText: '',
                    boxTwoInfoText: '',
                    boxOneInfoShown: false,
                    boxTwoInfoShown: false,
                    columnDefinitions: undefined,
                    columnFilterDefinitions: undefined,
                    columnFilterToggle: false,
                    uniqueKey: ''
                };

                $scope.numItemsAvailable = 10;

                $scope.dataTable = undefined;
                $scope.buttons = [];
                $scope.tableOptions = {
                    'autoWidth': false,
                    'stateSave': false,
                    'paginate': true,
                    'deferRender': true,
                    'filter': true,
                    'destroy': false,
                    'processing': true,
                    'ordering': true,
                    'order': [],
                    'dom': '<"top">rt<"bottom"f><"clear">SR'
                };
                //set up column definitions
                $scope.tableOptions.scrollY = ($scope.height - marginHeight) + 'px';

            }
        ])
        .directive('bentoTransferbox', [
            '$timeout',
            function($timeout) {
                return {
                    restrict: 'AE',
                    scope: {
                        boxOneItemSource: '=',
                        boxTwoItemSource: '=',
                        boxOneSelectAll: '=',
                        boxTwoSelectAll: '=',
                        columnDefinitions: '=',
                        columnFilterDefinitions: '=',
                        boxOneTitle: '@',
                        boxTwoTitle: '@',
                        infoText: '@',
                        transferBtnText: '@',
                        height: '=',
                        onTransfer: '&',
                        uniqueKey: '@',
                        paginationInfoText: '@',
                        paginationGoText: '@',
                        paginationInfoPageText: '@'
                    },
                    controller: 'bentoTransferBoxController',
                    templateUrl: '../templates/transfer_box/bento-transferbox.html',
                    replace: true,
                    link: function(scope, element, attrs) {
                        var marginHeight = 260;
                        var buttonPad = 0,
                            buttonPadSecond = 0;

                        /**************************************** Transferbox Events **************************************************/

                        scope.transferItems = function(transferType) {

                            var selectedItems = scope.currentInfo.selectedAssignedItems;
                            var fromArray = scope.currentInfo.assignedData;
                            var toArray = scope.currentInfo.gridData;

                            if (transferType === "toAssigned") {
                                selectedItems = scope.currentInfo.selectedAvailableItems;
                                fromArray = scope.currentInfo.gridData;
                                toArray = scope.currentInfo.assignedData;
                            }

                            turnOffSort();
                            for (var i = selectedItems.length - 1; i >= 0; i--) {
                                for (var j = 0, ttl = fromArray.length; j < ttl; j++) {
                                    if (fromArray[j] && fromArray[j].id ===
                                        JSON.parse(selectedItems[i])) {
                                        toArray.unshift(
                                            fromArray.splice(j, 1)[0]
                                        );
                                    }
                                }
                            }
                            scope.currentInfo.selectedAssignedItems = [];
                            scope.currentInfo.selectedAvailableItems = [];
                            resizeBoxes();
                            resetTransferBox();
                            updateDataScope();

                        };

                        /**************************************** End of Transferbox Events **************************************************/

                        /**
                         * WATCHES
                         */

                        if (attrs.uniqueKey) {
                            scope.$watch('uniqueKey', function(key) {
                                scope.currentInfo.uniqueKey = key;
                            });
                        }
                        if (attrs.paginationInfoText) {
                            scope.$watch('paginationInfoText', function(text) {
                                scope.currentInfo.paginationInfoText = text;
                            });
                        }
                        if (attrs.paginationInfoPageText) {
                            scope.$watch('paginationInfoPageText', function(text) {
                                scope.currentInfo.paginationInfoPageText = text;
                            });
                        }
                        if (attrs.paginationGoText) {
                            scope.$watch('paginationGoText', function(text) {
                                scope.currentInfo.paginationGoText = text;
                            });
                        }
                        scope.$watch('boxOneSelectAll', function(val){
                            if(val === undefined){
                                return;
                            }
                            $('.bento-splitter-group-left thead [type="checkbox"]').trigger('click');
                        });
                        scope.$watch('boxTwoSelectAll', function(val){
                            if(val === undefined){
                                return;
                            }
                            $('.bento-splitter-group-main thead [type="checkbox"]').trigger('click');
                        });

                        scope.$watchCollection('boxOneItemSource', function(data) {
                            updateColumnDefinitions();
                            updateColumnFilterDefinitions();
                            if (data) {
                                scope.currentInfo.gridData = data;
                                scope.currentInfo.totalAvailableItems = data.length;
                            }

                            resizeBoxes();
                        });

                        scope.$watchCollection('boxTwoItemSource', function(data) {
                            updateColumnDefinitions();
                            updateColumnFilterDefinitions();
                            if (data) {
                                scope.currentInfo.assignedData = data;
                                scope.currentInfo.totalAssignedItems = data.length;
                            }
                            resizeBoxes();
                        });
                        scope.$watch('columnFilterDefinitions', function(definitions) {
                            updateColumnFilterDefinitions();
                        });
                        scope.$watch('columnDefinitions', function(definitions) {
                            updateColumnDefinitions();
                        });
                        scope.$watch('boxOneTitle', function(title) {
                            scope.currentInfo.availableTitle = title;
                        });
                        scope.$watch('boxTwoTitle', function(title) {
                            scope.currentInfo.selectedTitle = title;
                        });
                        scope.$watchCollection('currentInfo.selectedAvailableItems', function() {
                            updateInfoText();
                        });
                        scope.$watchCollection('currentInfo.selectedAssignedItems', function() {
                            updateInfoText();
                        });
                        scope.$watch('currentInfo.totalAssignedItems', function() {
                            updateInfoText();
                        });
                        scope.$watch('currentInfo.totalAvailableItems', function() {
                            updateInfoText();
                        });
                        
                        /**
                         * DataTables Events
                         */

                        scope.onTableCreatedRight = function(dataTableAPI) {
                            scope.currentInfo.dataTable2 = dataTableAPI;
                            resizeBoxes();
                        }
                        scope.onTableCreatedLeft = function(dataTableAPI) {
                            scope.currentInfo.dataTable1 = dataTableAPI;
                            resizeBoxes();
                        };
                        scope.onTableDrawn = function() {
                            resizeBoxes();
                            updateInfoText();
                        };

                        /**
                         * Splitter Evnents
                         */
                        scope.onSplitterResize = function() {
                            resizeBoxes();
                        };


                        /**
                         * Directive Methods
                         */

                        function turnOffSort() {
                            if (scope.currentInfo.dataTable1 && scope.currentInfo.dataTable2) {
                                //scope.currentInfo.dataTable1.fnSortNeutral();
                                //scope.currentInfo.dataTable2.fnSortNeutral();
                                scope.currentInfo.dataTable1
                                    .column(0)
                                    .data()
                                    .sort();
                                scope.currentInfo.dataTable2
                                    .column(0)
                                    .data()
                                    .sort();
                            }
                        }

                        function updateColumnDefinitions() {
                            if (attrs.columnDefinitions) {
                                scope.currentInfo.columnDefinitions = scope.columnDefinitions;
                            }

                        }

                        function updateColumnFilterDefinitions() {
                            if (attrs.columnFilterDefinitions) {
                                scope.currentInfo.columnFilterDefinitions = scope.columnFilterDefinitions;
                                scope.currentInfo.columnFilterToggle = true;
                            }
                        }

                        function updateInfoText() {
//                            scope.currentInfo.boxOneInfoText = scope.currentInfo.selectedAvailableItems.length > 0 ? scope.currentInfo.infoText.replace('_SELECTED_', scope.currentInfo.selectedAvailableItems.length).replace('_TOTAL_', scope.currentInfo.totalAvailableItems) : scope.currentInfo.totalAvailableItems;
//                            scope.currentInfo.boxTwoInfoText = scope.currentInfo.selectedAssignedItems.length > 0 ? scope.currentInfo.infoText.replace('_SELECTED_', scope.currentInfo.selectedAssignedItems.length).replace('_TOTAL_', scope.currentInfo.totalAssignedItems) : scope.currentInfo.totalAssignedItems;
                            buttonPad = element[0].getElementsByClassName('transferbox-btn')[0].offsetWidth + element[0].getElementsByClassName('transferbox-header-title')[0].offsetWidth;
                            buttonPadSecond = element[0].getElementsByClassName('transferbox-btn')[1].offsetWidth + element[0].getElementsByClassName('transferbox-header-title')[1].offsetWidth + 15;
                        }

                        function resetTransferBox() {
                            scope.currentInfo.boxOneClickState = false;
                            scope.currentInfo.boxTwoClickState = false;
                        }

                        function updateDataScope() {
                            scope.boxOneItemSource = scope.currentInfo.gridData;
                            scope.boxTwoItemSource = scope.currentInfo.assignedData;
                            scope.onTransfer({
                                gridDataOne: scope.currentInfo.gridData,
                                gridDataTwo: scope.currentInfo.assignedData
                            });
                        }

                        function resizeBoxes() {
                            var $tableOne = angular.element(element).find('table:eq(1)');
                            var $tableTwo = angular.element(element).find('table:eq(3)');
                            $tableOne.width('100%');
                            $tableTwo.width('100%');

                            var boxWidth = element[0].getElementsByClassName('transferbox-header')[0].offsetWidth - 50;
                            var boxWidthSecond = element[0].getElementsByClassName('transferbox-header')[1].offsetWidth - 40;
                            // Hide info text using ng-show if transfer button starts to overlap
                            $timeout(function() {
                                if (boxWidth < buttonPad) {
                                    scope.currentInfo.boxOneInfoShown = false;
                                } else {
                                    scope.currentInfo.boxOneInfoShown = true;
                                }
                                if (boxWidthSecond < buttonPadSecond) {
                                    scope.currentInfo.boxTwoInfoShown = false;
                                } else {
                                    scope.currentInfo.boxTwoInfoShown = true;
                                }
                            }, 0);

                        }
                    }
                };
            }
        ]);
}(window.angular));
(function (angular) {
  "use strict";

  // Provides lazy loading to enhance initial load time
  angular.module('bento.tree', ['bento.services'])
    // Bento Tree Directive
    .directive('bentoTree', [
      '$compile',
      '$timeout',
      'treeSelection',
      'treeHelper',
      '$recursionHelper',
      function ($compile, $timeout, treeSelection, treeHelper, $recursionHelper) {

        return {
          restrict   : 'A',
          scope      : {
            treeId             : '@',
            treeIcon           : '@',
            treeCollapsed      : '=',
            treeModel          : '=',
            treeLabel          : '@',
            nodeChildren       : '@',
            collapsingCallback : '=', // Two way binding is needed for direct function reference
            expandingCallback  : '=', // Two way binding is needed for direct function reference
            selectCallback     : '=', // Two way binding is needed for direct function reference
            multiSelect        : '=',
            useCheckbox        : '=',
            selectModel        : '@', // Selection Model
            checkboxModel      : '@',
            selectableModel    : '@', // Model to determine if the node is selectable or not
            expandOnlyModel    : '@', // Model to determine if the current node can only expand and collapse
            selectAsCheck      : '=',
            onCheckboxChange   : '=', // Two way binding is needed for direct function reference
            secondTreeIcon     : '@',
            treeSelectionHelper: '=?', // **Internal Use** forwarded TreeSelectionHelper
            treeDisabled       : '=' // Private API
          },
          templateUrl: '../templates/tree/bento-tree.html',
          replace    : true,
          compile    : function (element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return $recursionHelper.compile(element);
          },
          controller : 'mainTreeController'
        };
      }
    ])
    // Tree selection factory
    .factory('treeSelection', function () {

      var TreeSelectionHelper = function () {

        this.node = [];

        this.findElement = function (array, child, lable, id) {
          var flag = false;
          for (var i = array.length - 1; i >= 0; i--) {
            if ((array[i])[lable] === id) {
              this.clearNodes();
              flag = true;
              if (typeof array[i].collapsed === 'undefined') {
                array[i].collapsed = false;
              }
              array[i].selected = 'selected';
              this.updateSelection(array[i]);
              break;
            } else {
              if (angular.isArray((array[i])[child])) {
                flag = this.findElement((array[i])[child], child, lable, id);
                if (flag) {
                  if (typeof array[i].collapsed === 'undefined') {
                    array[i].collapsed = false;
                  }
                  break;
                }
              }
            }
          }
          return flag;
        };

        this.updateSelection = function (_node) {
          if (this.node.indexOf(_node) === -1) {
            this.node.push(_node);
          }
        };

        this.getSelection = function () {
          return this.node;
        };

        this.removeSelection = function (_node) {
          var index = this.node.indexOf(_node);
          this.node.splice(index, 1);
        };

        this.clearNodes = function () {
          this.node = [];
        };

        this.findSelectElement = function (node, child, lable, id) {
          return this.getSelection();
        };

      };

      var getHelper = function () {
        return new TreeSelectionHelper();
      };

      return {
        getHelper: getHelper
      };
    })

    // Tree Helper factory
    .factory('treeHelper', function () {

      /**
       * Adjust Tree Minimum width
       * @param $element
       *
       * This function will find the widest element and set the minimum width
       * to the root element
       */
      function adjustMinWidth($element) {
        var spanVariables = $element[0].getElementsByTagName('span');
        var widest = 0;
        var padding = 10;

        for (var i = 0; i < spanVariables.length; i++) {
          var span = spanVariables[i];
          var totalWidth = getOffsetUntilRoot(span, $element[0]) + span.offsetWidth;

          if (totalWidth > widest) {
            widest = totalWidth;
          }
        }

        $element.css('min-width', (widest + padding) + 'px');
      }

      /**
       * Get the Boolean from a node selection
       * @param scope
       * @param node
       */
      function getSelectModelValue(scope, node) {
        if (typeof scope.selectModel === 'undefined' ||
          (typeof scope.selectModel === 'string' && scope.selectModel === '')) {
          return node._selected;
        }
        return node[scope.selectModel];
      }

      /**
       * Set the Selection Boolean to a node
       * @param scope
       * @param node
       */
      function setSelectModelValue(scope, node, value) {
        if (typeof scope.selectModel === 'undefined' ||
          (typeof scope.selectModel === 'string' && scope.selectModel === '')) {
          node._selected = value;
        } else {
          node[scope.selectModel] = value;
        }
      }

      /**
       * Check / Uncheck offspring of a node based on its status
       * @param node
       * @param nodeChildrenName
       * @param checkboxModelName
       * @param checked
       */
      function checkOffspring(node, nodeChildrenName, checkboxModelName, checked) {
        // Node is disabled don't check it's offspring
        if(node.disabled){
          return;
        }

        if (typeof checked !== 'undefined') {
          if(!node.hideCheckbox) {
            node[checkboxModelName] = checked;
            node._indeterminate = false;
            document.getElementById(node._bentoTreeId).indeterminate = false;
          }
        }

        // recursively check/uncheck the offspring of node
        if (!!node[nodeChildrenName] && node[nodeChildrenName].length > 0) {
          var hasCheckedChildren = false;
          for (var i = 0; i < node[nodeChildrenName].length; i++) {
            hasCheckedChildren = checkOffspring(
              node[nodeChildrenName][i],
              nodeChildrenName,
              checkboxModelName,
              node[checkboxModelName]) || hasCheckedChildren;
          }

          //indeterminate the current checkbox
          if (hasCheckedChildren && !node[checkboxModelName]) {
            node._indeterminate = true;
            var treeEl = document.getElementById(node._bentoTreeId);
            if(treeEl) {
              treeEl.indeterminate = true;
            }
          }
        }

        return node[checkboxModelName] || node._indeterminate;
      }

      /**
       * Help to check / uncheck / indeterminate check boxes on one root branch
       * @param node
       * @param nodeChildrenName
       * @param checkboxModelName
       */
      function indeterminateRoot(node, nodeChildrenName, checkboxModelName) {
        var parentNode = node._parent;

        if (!!parentNode) {
          //check siblings and see if checked
          var siblings = parentNode[nodeChildrenName];
          var hasChecked = false;
          var hasUnchecked = false;
          var hasIndeterminate = false;
          for (var i = 0; i < siblings.length; i++) {
            var _node = siblings[i];

            // Ignore .hideCheckbox nodes
            if(_node.hideCheckbox){
              continue;
            }

            if (_node._indeterminate) {
              hasIndeterminate = true;
            } else if (!_node[checkboxModelName]) {
              hasUnchecked = true;
            } else {
              hasChecked = true;
            }
          }

          // There are three conditions
          // 1. All siblings are checked without indeterminate
          // 2. None of the siblings are checked without indeterminate
          // 3. Some siblings are checked with indeterminate
          var checkbox = document.getElementById(parentNode._bentoTreeId);

          // Case 1:
          if (!hasUnchecked && hasChecked && !hasIndeterminate) {
            parentNode[checkboxModelName] = true;
            checkbox.indeterminate = false;
            parentNode._indeterminate = false;
          } else
          // Case 2:
          if (hasUnchecked && !hasChecked && !hasIndeterminate) {
            parentNode[checkboxModelName] = false;
            checkbox.indeterminate = false;
            parentNode._indeterminate = false;
          } else
          // Case 3:
          if ((hasUnchecked && hasChecked) || hasIndeterminate) {
            parentNode[checkboxModelName] = false;
            parentNode._indeterminate = true;
            checkbox.indeterminate = true;
          }

          // recursive
          indeterminateRoot(parentNode, nodeChildrenName, checkboxModelName);
        }
      }

      /**
       * Add parent child node relationships and assign IDs
       * @param node
       * @param childrenVariableName
       */
      function formatNodeBranch(node, childrenVariableName) {
        // node is already formated
        if (typeof node._bentoTreeId === 'undefined') {
          node._bentoTreeId = 'bento-tree-node-checkbox-' + Math.round(Math.random() * 1000000000000);
        }

        var children = node[childrenVariableName];

        if (!!children && children.length > 0) {
          for (var i = 0; i < children.length; i++) {
            var childNode = children[i];

            if (typeof childNode._parent === 'undefined') {
              childNode._parent = node;
            }

            formatNodeBranch(childNode, childrenVariableName);
          }
        }
      }

      //Private
      function getOffsetUntilRoot(node, rootNode) {

        if (node.parentNode.parentNode === rootNode) {
          return node.offsetLeft - rootNode.offsetLeft;
        } else {
          return node.offsetLeft + getOffsetUntilRoot(node.parentNode, rootNode);
        }

      }

      return {
        adjustMinWidth     : adjustMinWidth,
        formatNodeBranch   : formatNodeBranch,
        indeterminateRoot  : indeterminateRoot,
        checkOffspring     : checkOffspring,
        getSelectModelValue: getSelectModelValue,
        setSelectModelValue: setSelectModelValue
      };
    })
    // Main Tree Controller
    .controller('mainTreeController', [
      '$scope',
      '$element',
      'treeSelection',
      'treeHelper',
      '$timeout',
      function ($scope, $element, treeSelection, treeHelper, $timeout) {

        // treeId defines the root of this tree
        if (typeof $scope.treeSelectionHelper === 'undefined') {
          $scope.treeSelectionHelper = treeSelection.getHelper();

          // Add a root class
          $element.addClass('bento-tree-root');

          // Watch main data object to re-adjust the width
          $scope.$watchCollection('treeModel', function (newTreeModel) {
            // Tree model is not ready
            if(typeof newTreeModel === 'undefined'){
              return;
            }

            //  Format every node is there is change
            for (var i = 0; i < $scope.treeModel.length; i++) {
              treeHelper.formatNodeBranch($scope.treeModel[i], $scope.nodeChildren);
            }

            $timeout(function () {
              treeHelper.adjustMinWidth($element);
              // Update checks
              for (var j = 0; j < $scope.treeModel.length; j++) {
                treeHelper.checkOffspring($scope.treeModel[j], $scope.nodeChildren, $scope.checkboxModel);
              }
            });


            processTree(newTreeModel)
          });
        }

        function processTree(treeModel) {

          //check to see if we need to collapse by default
          if (treeModel.length > 0) {
            var children = treeModel;
            if (typeof $scope.treeCollapsed === 'undefined') {
              for (var j = 0; j < children.length; j++) {
                if (typeof children[j].collapsed === 'undefined') {
                  children[j].collapsed = false;
                }
              }
            } else {
              for (var k = 0; k < children.length; k++) {
                if (typeof children[k].collapsed === 'undefined') {
                  children[k].collapsed = $scope.treeCollapsed;
                }
              }
            }
          }

          /*performs the necessary action if the data model contains the value for selected*/
          $timeout(function () {
            for (var i = 0; i < treeModel.length; i++) {
              var nodeModel = treeModel[i];
              if (!!treeHelper.getSelectModelValue($scope, nodeModel)) {
                $scope.labelSelect(nodeModel);
              }
            }
          });
        }

        /**
         * On check box change
         *
         * We need to use `ng-click` instead of `ng-chage` due to odd behaviors on IE browsers
         * where `indeterminate` state click does not count as a "change state"
         *
         * Because `ng-click` fires before the model changes it's variable, we need to update the
         * tree models when rendering is done
         *
         */
        $scope.checkboxClick = function (_node) {
          // Bypass if this node and branch is disabled
          if($scope.treeModel.disabled || $scope.treeDisabled){
            return;
          }

          var node = _node || this.node;
          // remove indeterminate
          node._indeterminate = false;
          document.getElementById(node._bentoTreeId).indeterminate = false;

          // setting timeout here to make sure that all models are updated
          $timeout(function () {
            // check all children
            treeHelper.checkOffspring(node, $scope.nodeChildren, $scope.checkboxModel);

            // indeterminate the whole branch to check / uncheck / indeterminate checkboxes
            treeHelper.indeterminateRoot(node, $scope.nodeChildren, $scope.checkboxModel);

            // Fire callback
            if (!!$scope.onCheckboxChange) {
              $scope.onCheckboxChange(node);
            }
          });
        };

        /**
         * Select and de-select a node based on `multiSelect` flag
         */
        $scope.labelSelect = function (node) {
          // Bypass if this node and branch is disabled
          if($scope.treeModel.disabled || $scope.treeDisabled){
            return;
          }

          var elementNode = typeof(node) === "undefined" ? this.node : node;

          if (typeof $scope.selectableModel !== 'undefined' &&
            typeof node[$scope.selectableModel] === 'boolean' && !node[$scope.selectableModel]
          ) {
            return;
          }

          // Forward click action to the checkbox when doing select as check
          if (!!$scope.selectAsCheck) {
            elementNode[$scope.checkboxModel] = !elementNode[$scope.checkboxModel];
            $scope.checkboxClick(elementNode);
            return;
          } else
          // Forward a label select as tree toggle
          if (!!$scope.expandOnlyModel && elementNode[$scope.expandOnlyModel]) {
            $scope.toggleSelect(elementNode);
            return;
          }

          //here where we would set multi select
          var currentNode = $scope.treeSelectionHelper.getSelection();
          if (!$scope.multiSelect) {
            angular.forEach(currentNode, function (node) {
              treeHelper.setSelectModelValue($scope, node, false);
            });
            $scope.treeSelectionHelper.removeSelection(elementNode);
            treeHelper.setSelectModelValue($scope, elementNode, true);
            $scope.treeSelectionHelper.updateSelection(elementNode);
          } else {
            var nodeArray = currentNode.filter(function (node) {
              if (node === elementNode) {
                treeHelper.setSelectModelValue($scope, node, false);
                return true;
              }
              return false;
            });
            if (nodeArray.length > 0) {
              treeHelper.setSelectModelValue($scope, nodeArray[0], false);
              $scope.treeSelectionHelper.removeSelection(elementNode);
            } else {
              treeHelper.setSelectModelValue($scope, elementNode, true);
              $scope.treeSelectionHelper.updateSelection(elementNode);
            }
          }

          // Fire select callback
          if (!!$scope.selectCallback) {
            $scope.selectCallback(elementNode);
          }

        };

        /**
         * This method is used by the Template to get node CSS class
         * @param node
         */
        $scope.getNodeSelectionClass = function (node) {
          var css = '';

          // See if this node is selected
          if (treeHelper.getSelectModelValue($scope, node)) {
            css = 'selected';
          } else {
            css = '';
          }

          // If this node is selectable
          if (typeof $scope.selectableModel === 'undefined' ||
            typeof node[$scope.selectableModel] === 'undefined' ||
            (typeof node[$scope.selectableModel] === 'boolean' && node[$scope.selectableModel])) {
            css += ' bento-selectable';
          }

          return css;
        };

        /**
         * Expand or Collapse a branch
         */
        $scope.toggleSelect = function (node) {

          node.collapsed = !node.collapsed;

          if (!node.collapsed) {
            // Make sure if the callback exists
            if (typeof $scope.expandingCallback !== 'undefined' && $scope.expandingCallback) {
              $scope.expandingCallback(node);
            }
          } else {
            // Make sure if the callback exists
            if (typeof $scope.collapsingCallback !== 'undefined' && $scope.collapsingCallback) {
              $scope.collapsingCallback(node);
            }
          }
        };

        /**
         * not used at the moment
         */
        $scope.loadMore = function () {
          $scope.limitAmount += 20;
          treeHelper.adjustMinWidth($element);
        };

        /**
         * Clean memory
         */
        $scope.$on('$destroy', function (event) {
          $scope.treeSelectionHelper.clearNodes();
          treeHelper.adjustMinWidth($element);
        });
      }
    ])

  /**
   * Directive for lazy loading
   */
    .directive('lastWatch', [
      '$timeout',
      function ($timeout) {
        return {
          restrict: 'A',
          link    : function (scope) {
            scope.$watch('$last', function (value) {
              if (value) {
                $timeout(function () {
                  scope.$parent.loadMore();
                });
              }
            });
          }
        };
      }
    ]);
}(window.angular));

(function (window, angular, undefined) {
  'use strict';

  /**
   * @ngdoc directive
   * @name bentoWizrd
   * @description
   *
   * # bentoWizrd
   *
   * The `bentoWizrd` directive provides directive objects to mimic off canvas menue behavior.
   *
   *   */

  // Global setting variables

  var GAP = 37;  // in pixels
  var WINDOW_RESIZE_DELAY = 300; // in milliseconds
  var MAX_STEP_BOX_WIDTH = 350; // in pixels
  var STEP_PADDING = 0;  // in pixels

// Define bentoUI App object
  angular.module('bento.wizard', ['ui.bootstrap', 'bento.services', 'bento.cookie', 'bento.translate'])
    .controller('wizardMainController', ['$scope', '$rootScope', '$element',
      '$attrs', '$transclude', '$timeout', '$window', '$log',
      function ($scope, $rootScope, $element, $attrs, $transclude, $timeout, $window, $log) {
        // initialize variables
        $scope.isLeftArrowDisabled = true;
        $scope.isRightArrowDisabled = true;

        $element.addClass('bento-wizard');

        // For a controller to control to assign the current step
        // to this wizard directive
        if (typeof $scope.currentStep === 'undefined') {
          // Default current step to 0
          $scope.currentStep = 0;
        }
        $scope.previousStep = 0;

        // Set side-arrows true by default
        $scope._useSideArrows = !!(typeof $scope.useSideArrows === 'undefined' || $scope.useSideArrows === 'true');

        // Left and Right Arrow clicks
        $scope.onLeftArrowClick = function () {
          if ($scope.leftIndex >= $scope.displayCount) {
            $scope.$ul.css('margin-left', ($scope.$ul[0].offsetLeft + $element[0].offsetWidth - GAP * 2 + STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.leftIndex - $scope.displayCount;
          } else {
            $scope.$ul.css('margin-left', '0px');
            $scope.leftIndex = 0;
          }

          $scope.updateLeftRightArrows();
        };

        $scope.onRightArrowClick = function () {
          if (($scope.numSteps - $scope.leftIndex - $scope.displayCount) >= $scope.displayCount) {

            $scope.$ul.css('margin-left', ($scope.$ul[0].offsetLeft - $element[0].offsetWidth + GAP * 2 - STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.leftIndex + $scope.displayCount;
          } else {
            $scope.$ul.css('margin-left', (-$scope.$ul[0].offsetWidth + $element[0].offsetWidth - GAP * 2 + STEP_PADDING) + 'px');
            $scope.leftIndex = $scope.numSteps - $scope.displayCount;
          }

          $scope.updateLeftRightArrows();
        };

        // Previous and Next button clicks
        $scope.onPreviousClick = function () {
          if ($scope.currentStep === 0) {
            return;
          }

          $scope.isUserAction = true;
          $scope.currentStep = parseInt($scope.currentStep, 10) - 1;
        };

        $scope.onNextClick = function () {
          if ($scope.currentStep === $scope.stepList.length - 1) {
            return;
          }

          $scope.isUserAction = true;
          $scope.currentStep = parseInt($scope.currentStep, 10) + 1;
        };

        // Done button click
        $scope.onDoneClick = function () {
          $scope.isUserAction = true;
          $scope.onFinish();
        };

        // A step is clicked on the top step nav
        $scope.onStepClick = function (step) {

          // ignore the step that is already selected
          if (step === $scope.currentStep) {
            return;
          }

          $scope.isUserAction = true;
          $scope.currentStep = step;
        };

      }])
    .directive('bentoWizard', [
      '$compile',
      '$timeout',
      '$window',
      '$log',
      function ($compile, $timeout, $window, $log) {
        return {
          restrict  : 'AEC',
          replace   : false,
          scope     : {
            onChange            : '&', // Fire onChange() when a wizard step is changed.
            onFinish            : '&', // Fire onFinish() when the whole wizard is finished
            useSideArrows       : '@', // Check if we need to use arrows
            currentStep         : '=?', // Listen to step value change
            demoMode            : '@', // A mode to disable focus
            isDoneButtonDisabled: '=', // Expose showButtonDone
            hideDefaultButtons  : '=', // Hide "Previous", "Next" and "Done" buttons
            hidePreviousButton  : '=', // Hide "Previous" button
            hideNextButton      : '=', // Hide "Next" button
            hideDoneButton      : '='  // Hide "Done" button
          },
          controller: 'wizardMainController',
          link      : function (scope, element, attrs) {
            // This flag is used when a use dynamically change the currentStep and return false onChange()
            // So that the updateStep() doesn't fire in the watch
            var isCurrentSetpReset = false;
            scope.isUserAction = false;

            element.addClass('ng-hide');

            // Render wizard when all rendering is done
            $timeout(function () {

              // Basic rendering
              // update the step layouts the first time
              $timeout(renderStepWidth, 1);
              // need to re-render the second path in case the scroll bar showed/hided
              $timeout(renderStepWidth, 2);

              // Watch element width and render it's width
              var resizeTimeout = 0;
              angular.element($window).on('resize', onWindowResize);

              // localization
              var nextButtonLabel = "{{ 'BENTO_MODERN_WIZARD_BUTTON_NEXT' | bentoTranslate }}";
              var previousButtonLabel = "{{ 'BENTO_MODERN_WIZARD_BUTTON_PREVIOUS' | bentoTranslate }}";
              var doneButtonLabel = "{{ 'BENTO_MODERN_WIZARD_BUTTON_DONE' | bentoTranslate }}";

              // Content pointers
              scope.content = angular.element(element[0].querySelector('.contents'));
              scope.contents = scope.content.children();

              // Add previous and next buttons
              var buttonNext = angular.element(
                '<button role="button" class="btn btn-primary btn-action pull-right" ' +
                'role="button" aria-label="' + nextButtonLabel + '" ' +
                'ng-show="showButtonNext" ng-click="onNextClick()"' +
                'ng-if="!hideDefaultButtons && !hideNextButton">' +
                nextButtonLabel +
                ' <i class="bento-icon-chevron-right"></i></button>'
              );
              var buttonPrevious = angular.element(
                '<button role="button" class="btn btn-default pull-left" ' +
                'role="button" aria-label="' + previousButtonLabel + '" ' +
                'ng-show="showButtonPrevious" ng-click="onPreviousClick()"' +
                'ng-if="!hideDefaultButtons && !hidePreviousButton">' +
                '<i class="bento-icon-chevron-left"></i> ' +
                previousButtonLabel +
                '</button>'
              );
              var buttonDone = angular.element(
                '<button class="btn btn-primary btn-action pull-right" ' +
                'role="button" aria-label="' + doneButtonLabel + '"' +
                'ng-disabled="isDoneButtonDisabled"' +
                'ng-show="showButtonDone" ng-click="onDoneClick()"' +
                'ng-if="!hideDefaultButtons && !hideDoneButton">' +
                doneButtonLabel +
                '</button>'
              );
              scope.$buttonNext = buttonNext;
              scope.$buttonPrevious = buttonPrevious;
              scope.$buttonDone = buttonDone;

              // Add top left and right arrows
              var arrowLeft = angular.element(
                '<button class="wizard-arrow arrow-left"' +
                ' role="button" aria-label="Left Arrow"' +
                ' alt="Show previous step headers"' +
                ' ng-disabled="isLeftArrowDisabled"' +
                ' ng-click="onLeftArrowClick()">' +
                ' <i class="bento-icon-chevron-large-left"></i>' +
                '</button>'
              );
              var arrowRight = angular.element(
                '<button class="wizard-arrow arrow-right"' +
                ' role="button" aria-label="Right Arrow"' +
                ' alt="Show next step headers"' +
                ' ng-disabled="isRightArrowDisabled"' +
                ' ng-click="onRightArrowClick()">' +
                ' <i class="bento-icon-chevron-large-right"></i>' +
                '</button>'
              );

              scope.$arrowLeft = arrowLeft;
              scope.$arrowRight = arrowRight;


              // Compile ng-clicks
              $compile(buttonDone)(scope);
              $compile(buttonNext)(scope);
              $compile(buttonPrevious)(scope);
              $compile(arrowLeft)(scope);
              $compile(arrowRight)(scope);

              // POST DOM injection
              // Update model reference to be used in controller
              scope.$ul = angular.element(element[0].querySelector('.steps'));
              scope.stepList = scope.$ul.children();


              // Add the two buttons to content
              scope.content.after(buttonDone);
              scope.content.after(buttonNext);
              scope.content.after(buttonPrevious);
              scope.$ul.after(arrowLeft);
              scope.$ul.after(arrowRight);

              // Add CSS class to the main container
              element.addClass('bento-wizard');

              // Assign Step Class Name with bento-wizard name spage
              // $ul.addClass('bento-wizard-steps');
              scope.$ul.wrap('<div class="bento-wizard-steps" />');

              processSteps();

              // Add click event listeners to steps
              //scope.stepList.on('click', onStepClick);

              // init buttons
              scope.showButtonNext = (scope.stepList.length !== 1);
              scope.showButtonPrevious = false;
              scope.showButtonDone = (scope.stepList.length === 1);

              // setup content
              scope.content.attr('tabindex', -1);

              // Start to watch the currentStep variable change and
              // update wizards GUI
              scope.$watch('currentStep', function (newValue, oldValue) {
                scope.previousStep = oldValue;
                if(!isCurrentSetpReset) {
                  updateStep();
                }else{
                  isCurrentSetpReset = false;
                }
              });

              // Watch the count to the steps to see if there is anything changed
              var ulChildren = scope.$ul.children();
              scope.$watch(function () {
                  // As reported on HUB issue #1
                  // https://thehub.thomsonreuters.com/thread/127898?sr=stream&ru=1145180
                  // New algorithm is implemented to relove this issue when dynamic array had the same size
                  // when changing
                  var newUlChildren = scope.$ul.children(),
                      i, len;

                  if (ulChildren.length !== newUlChildren.length) {
                    ulChildren = newUlChildren;
                  } else {
                    for (i = 0, len = ulChildren.length; i < len; i++) {
                      if (ulChildren[i] !== newUlChildren[i]) {
                        ulChildren = newUlChildren;
                        break;
                      }
                    }
                  }

                  return ulChildren;
                }
                ,
                function (newVal, oldVal) {
                  // Update Step List
                  updateStep();

                  // Add event listeners and classes to newly restored steps
                  processSteps();

                  // Need to re-render the width of the steps when adding or removing a step
                  renderStepWidth();
                }
              )
              ;

              // Skin steps
              function processSteps() {
                // insert prefix number to a step <li> where it's not initialized
                for (var i = 0; i < scope.stepList.length; i++) {
                  var $li = angular.element(scope.stepList[i]);
                  if (!$li.hasClass('bento-wizard-step')) {
                    $li.addClass('bento-wizard-step');
                    $li.append(
                      '<div class="arrow-bg"></div>' +
                      '<div class="arrow-line arrow-line-top"></div>' +
                      '<div class="arrow-line arrow-line-bottom"></div>'
                    );

                    // Add click event handler
                    $li.on('click', onStepClick);
                  }
                }
              }

              // Click function
              function onStepClick(event) {
                var index = 0;
                for (var i = 0; i < scope.stepList.length; i++) {
                  if (scope.stepList[i] === event.currentTarget) {
                    index = i;
                    break;
                  }
                }

                scope.onStepClick(index);
                scope.$apply();

              }

              // Show the whole module
              element.removeClass('ng-hide');
            }); // End of $timeout

            // Private function
            function updateStep() {
              var step = parseInt(scope.currentStep, 10);

              // Make sure the new step is a number
              step = isNaN(step) ? 0 : step;

              // Update the step and content references
              scope.stepList = scope.$ul.children();
              scope.contents = scope.content.children();

              // Reset currentStep if it is out of range
              if (scope.currentStep >= scope.stepList.length) {
                scope.currentStep = scope.stepList.length - 1;
              }

              // Fire event and forward step variable over
              if (typeof scope.onChange !== 'undefined' && scope.isUserAction) {
                if (scope.onChange({step: step}) === false) {
                  // Bypassed wizard update by user
                  step = scope.currentStep = scope.previousStep;
                  isCurrentSetpReset = true;
                }

                scope.isUserAction = false;
              }

              var previous$li;
              for (var i = 0; i < scope.stepList.length; i++) {
                var $li = angular.element(scope.stepList[i]);
                $li.removeClass('previous');
                if (i === step) {
                  $li.addClass('selected');
                  if (typeof previous$li !== 'undefined') {
                    previous$li.addClass('previous');
                  }
                } else {
                  $li.removeClass('selected');
                }

                previous$li = $li;
              }

              previous$li = null;

              // show & hide buttons
              scope.showButtonNext = !!((scope.stepList.length > 1) && (step < scope.stepList.length - 1));
              scope.showButtonPrevious = !!((scope.stepList.length > 1) && (step > 0));
              scope.showButtonDone = !!((scope.stepList.length === 1) || (step === scope.stepList.length - 1));

              // show & hide contents
              for (var j = 0; j < scope.contents.length; j++) {
                var $content = angular.element(scope.contents[j]);
                if (j === step) {
                  $content.removeClass('ng-hide');
                } else {
                  $content.addClass('ng-hide');
                }
              }

              // Focus on the panel after rendering
              if (typeof scope.demoMode === 'undefined' || scope.demoMode === false || scope.demoMode === 'false') {
                $timeout(function () {
                  scope.content[0].focus();
                });
              }

              updateStepContainerOffset();
            }

            // Update step location
            function updateStepContainerOffset() {
              scope.currentStep = parseInt(scope.currentStep, 10);

              if (isNaN(scope.currentStep)) {
                $log.warn('Wizard: `current-step` is not an integer ');
                scope.currentStep = 0;
              }

              // Variables to be used for calculation
              var offsetWidth = (element.hasClass('side-arrows')) ?
              element[0].offsetWidth - GAP * 2 : element[0].offsetWidth;
              var stepArray = scope.stepList;
              var previousObj = (scope.currentStep === 0) ?
                null :
                stepArray[scope.currentStep - 1];
              var currentStepObj = stepArray[scope.currentStep];
              var nextObj = (scope.currentStep === stepArray.length - 1) ?
                null :
                stepArray[scope.currentStep + 1];
              var containerLeft = currentStepObj.offsetLeft - scope.$ul[0].offsetLeft;
              var left = (typeof previousObj !== 'undefined' && previousObj !== null) ?
                previousObj.offsetLeft :
                0;
              var right = (typeof nextObj !== 'undefined' && nextObj !== null) ?
              offsetWidth - nextObj.offsetLeft - nextObj.offsetWidth :
                0;
              var currentLeft = currentStepObj.offsetLeft;
              var currentRight = offsetWidth - currentStepObj.offsetLeft - currentStepObj.offsetWidth;
              var marginLeft;

              // find the left index
              scope.leftIndex = 0;
              for (var i = 0; i < stepArray.length; i++) {
                var step = stepArray[i];
                if (step.offsetLeft <= 0 && step.offsetLeft + step.offsetWidth > 0) {
                  scope.leftIndex = i;
                  break;
                }
              }

              // Store leftIndex to model for left and right arrows to use

              // Snap the container to grid from the left
              // Need to start with the second step object
              if (scope.leftIndex > 0) {
                marginLeft = -stepArray[scope.leftIndex].offsetLeft + scope.$ul[0].offsetLeft;
              } else {
                marginLeft = 0;
              }

              // Better UX
              // Check if the next or the previous step object is out side of the OL
              // Bring it bring if not
              if (left < 0) {
                marginLeft = -previousObj.offsetLeft + scope.$ul[0].offsetLeft;
                scope.leftIndex = scope.currentStep - 1;
              } else if (right < 0) {
                marginLeft = -nextObj.offsetLeft + scope.$ul[0].offsetLeft - nextObj.offsetWidth + offsetWidth;
                scope.leftIndex = scope.currentStep + 2 - scope.displayCount;
              }

              // Again double check if the current object is in the container viewport or not
              // If not, bring it in.
              if (currentLeft < 0 && scope.leftIndex > 0) {
                marginLeft = -containerLeft;
                scope.leftIndex--;

              } else if (currentRight < 0) {
                marginLeft = -(containerLeft + currentStepObj.offsetWidth - offsetWidth);
                scope.leftIndex = scope.currentStep - scope.displayCount + 1;
              }

              // Eliminate right empty spaces
              if (scope.leftIndex + scope.displayCount > scope.numSteps &&
                scope.displayCount <= scope.numSteps) {
                marginLeft = -scope.$ul[0].offsetWidth + element[0].offsetWidth + STEP_PADDING;
                marginLeft = (element.hasClass('side-arrows')) ? marginLeft - GAP * 2 : marginLeft;
                scope.leftIndex = scope.numSteps - scope.displayCount;
              }

              scope.$ul.css('margin-left', marginLeft + 'px');

              scope.updateLeftRightArrows();
            }

            // Render boxes' width
            function renderStepWidth() {
              var width = element[0].offsetWidth;

              // Set the total step object to be displayed
              // in wizard viewport based on its width
              var numSteps = scope.stepList.length;
              var displayCount = (numSteps > 4) ? 4 : numSteps; // Default step count

              // Refine displayCount based on the width and numSteps
              if (width < 720 && displayCount > 2) {
                displayCount = 2;
              } else if (width < 960 && displayCount > 3) {
                displayCount = 3;
              } else if (MAX_STEP_BOX_WIDTH * displayCount + (displayCount - 1 ) * STEP_PADDING < width &&
                numSteps > displayCount) {
                displayCount = Math.ceil(width / MAX_STEP_BOX_WIDTH);
              }

              // Update displayCount for controller to use
              scope.displayCount = displayCount;
              // Add numSteps for controller to use
              scope.numSteps = numSteps;

              if (scope._useSideArrows) {
                if (displayCount < numSteps) {
                  element.addClass('side-arrows');
                  width = element[0].offsetWidth - GAP * 2;
                } else {
                  element.removeClass('side-arrows');
                }
              }

              // Set list container width based on the total step count
              // and their widths
              var boxWidth = (width - (displayCount - 1) * STEP_PADDING) / displayCount;
              scope.stepList = scope.$ul.children();

              //Cap the step box width
              boxWidth = (boxWidth > MAX_STEP_BOX_WIDTH) ? MAX_STEP_BOX_WIDTH : boxWidth;

              scope.$ul.css('width', (scope.stepList.length * (boxWidth + STEP_PADDING)) + "px");
              scope.stepList.css('width', boxWidth + 'px');

              //Reset all height classes
              //angular.element(scope.stepList).removeClass('flat');
              angular.element(scope.stepList).removeClass('narrow');
              //scope.$arrowLeft.removeClass('flat');
              //scope.$arrowRight.removeClass('flat');

              //if (boxWidth > 310) {
              angular.element(scope.stepList).addClass('flat');
              scope.$arrowLeft.addClass('flat');
              scope.$arrowRight.addClass('flat');
              //} else if (boxWidth < 220) {
              // angular.element(scope.stepList).addClass('narrow');
              //}

              updateStepContainerOffset();
            }

            // Enable and Disable left and right arrows based on current
            // step position
            scope.updateLeftRightArrows = function () {

              if (typeof scope.displayCount === 'undefined') {
                return;
              }

              if (scope.leftIndex === 0) {
                scope.$arrowLeft.attr('disabled', 'disabled');
              } else {
                scope.$arrowLeft.removeAttr('disabled');
              }

              if (scope.leftIndex + scope.displayCount >= scope.numSteps) {
                scope.$arrowRight.attr('disabled', 'disabled');
              } else {
                scope.$arrowRight.removeAttr('disabled');
              }

              angular.element(scope.stepList).removeClass('most-right');

              if (element[0].offsetWidth <= scope.displayCount * MAX_STEP_BOX_WIDTH) {
                angular.element(scope.stepList[scope.leftIndex + scope.displayCount - 1]).addClass('most-right');
              }
            };

            // Window resize function
            function onWindowResize(e){
              // Set a timeout to minimize performance issue
              clearTimeout(resizeTimeout);
              resizeTimeout = setTimeout(renderStepWidth, WINDOW_RESIZE_DELAY);
            }

            // Destroy with garbage collection
            scope.$on('$destroy',function(){
              //remove window listener
              angular.element($window).off('resize', onWindowResize);
            });

          }
        };
      }]);
})(window, window.angular);



(function(angular, undefined) {
    'use strict';

    angular
        .module('bento.progressbar', [
           'bento.services',
        ])
        .controller('BentoProgressbarController', ['$scope',
            function($scope) {
                $scope.$watch('value',function(val){
                    $scope.dynamic = val;
                },true)
                $scope.$watch('type',function(val){
                    $scope.barType = val;
                },true)
            }
        ])
        .directive('bentoProgressbar', [ 
            function() {
                return {
                    restrict: 'EA',
                    scope: {
                        value: '=',
                        animate: '=',
                        type: '='
                    },
                    templateUrl: '../templates/progressbar/bento-progressbar.html',
                    controller: 'BentoProgressbarController',
                    link: function(scope, element, attrs) {
                    }
                };
            }
        ])
})(window.angular);

(function (window, angular, undefined) {

  "use strict";

  angular.module('bento.append.to.parent', [])
  .
  directive('bentoAppendToParent', ['$log', '$bentoServices', function ($log, $bentoServices) {
    return {
      link: function(scope, element, attrs, ctrl) {

        /*
        * flag to make sure its not appended to the parent element more than once
        */
        var elementAttached = false;

        /*
        * The element where 'append-to-parent' is added
        */
        var thisElement = element[0];

        /*
        * Patch for IE 9 - If the appendToContainer's position is static, need to make it relative.
        */
        var oldAppendToContainerPosition = "";

        var appendTo = attrs.bentoAppendToParent;
        if(appendTo.length <= 0) { //default it to body
          appendTo = "body";
        }

        var appendToContainer = document.querySelector(appendTo);
        if(!appendToContainer) { //to make it work between site and dev
          appendTo = "body";
          appendToContainer = document.querySelector(appendTo);
        }

        /*
        * This element holds/contains the list element (ul/ol)
        */ 
        var listContainerElement = element[0].querySelector('.bento-append-to-parent');
        if(!listContainerElement || listContainerElement === undefined) {
          $log.warn('bento-append-to-parent: Container class does not have "bento-append-to-parent" class');
          return;
        }else{
          //reset it since it could be a directive with "replace=true;"
          listContainerElement = null;
        }

        /*
        * Directive along with its used will emit 'append_to_parent_show_list' event when the list needs to be shown or hidden
        */
        scope.$on("append_to_parent_show_list", function (e, flag) {
          if(typeof flag !== 'boolean') {
            $log.warn('bento-append-to-parent: "append_to_parent_show_list" flag needs to be boolean');
            return;
          }

          if(flag) { //list is visible
            updateContainerPosition();
          }
          else { //list is hidden
            resetContainerPosition();
          }
        });

        window.addEventListener('resize', function (event) {
          if(listContainerElement && listContainerElement.style.zIndex === 10) {
            updateContainerPosition();
          }
        }); // resize - event listener

        /*
        * 1. Append list container element to its parent (specified by append-to-parent)
        * 2. Calculate list container element's placement position when it needs to be shown
        */
        function updateContainerPosition() {
          var rect = thisElement.getBoundingClientRect();
          var appendToContainerRect = appendToContainer.getBoundingClientRect();

          if(!listContainerElement){
            listContainerElement = element[0].querySelector('.bento-append-to-parent');
          }


          listContainerElement.style.top = ((rect.top+rect.height-appendToContainerRect.top)-2)+'px';
          listContainerElement.style.left = rect.left-appendToContainerRect.left+'px';
          listContainerElement.style.right = 'auto';
          listContainerElement.style.minWidth = rect.width+'px';
          listContainerElement.style.zIndex = 10;

          // Dropdown menu alignments
          if(element.hasClass('dropdown-menu-left')) {
            angular.element(listContainerElement).addClass('dropdown-menu-left');
          }else if(element.hasClass('dropdown-menu-right')) {
            angular.element(listContainerElement).addClass('dropdown-menu-right');
            listContainerElement.style.left = 'auto';
            listContainerElement.style.right = appendToContainerRect.right-rect.right+'px';
          }

          if(!elementAttached) { //logic to attach only once

            // Check if the browser is IE 9
            if ($bentoServices.getIEVersion() === 9) {
              var style = window.getComputedStyle(appendToContainer, null);

              if(style.position.length <= 0 || style.position === 'static') {
                oldAppendToContainerPosition = style.position;
                appendToContainer.style.position = 'relative';
              }
            }

            appendToContainer.appendChild(listContainerElement);
            elementAttached = true;
          }
        }

        /*
        * reset all style
        */
        function resetContainerPosition() {

          // Skip this function when `listContainerElement` is not ready
          if(typeof listContainerElement === 'undefined'){
            return;
          }

          listContainerElement.style.top = "-6999px";
          listContainerElement.style.left = "-6999px";
          listContainerElement.style.width = "";
          listContainerElement.style.zIndex = -999;
        }

        /*
        * Remove the child when the directive is destroyed. 
        * Otherwise if attached to 'body', duplicate children (zombies) will
        * be seen when the body element is inspected.
        */
        scope.$on('$destroy', function() {
          if(elementAttached && appendToContainer) {
            appendToContainer.removeChild(listContainerElement);

            // Check if the browser is IE 9
            if ($bentoServices.getIEVersion() === 9) {
              appendToContainer.style.position = oldAppendToContainerPosition;
            }
          }
        });

      } //link 
    }; //return
  
  }]); //bentoAppendToBody directive
})(window, window.angular);
(function (window, angular, undefined) {

  'use strict';

  angular.module('bento.dropdown.append.to.parent', [])


   /**
   * Directive declaration
   */
    .directive('bentoDropdownAppendToParent', [
    function () {
      return {
        require: '^dropdown',
        link: function (scope, element, attrs, dropdownCtrl) {

          var listContainerElement = element.find('.dropdown-menu');
          if(listContainerElement) {
            listContainerElement.addClass('bento-append-to-parent');
          }

          scope.$watch(dropdownCtrl.isOpen, function(isOpen) {

            if(typeof isOpen === 'boolean') {
              scope.$emit("append_to_parent_show_list", isOpen);
              if (isOpen){
                listContainerElement.addClass('show');
              }else{
                listContainerElement.removeClass('show');
              }
            }
          });

          // Garbage collection
          element.on('$destroy',function(){
            if(listContainerElement){
              var el = listContainerElement[0];
              if(el.parentNode){
                el.parentNode.removeChild(el);
                listContainerElement = null;
              }
            }
          });
        }
    };
  }]);
})(window, window.angular);

(function (window, angular) {
  'use strict';

  angular.module('bento.alert', [])

    .controller('BentoAlertController', [
      '$scope',
      '$element',
      function ($scope, $element) {
        $scope.closeBentoAlert = function (index) {

          var a = $element[0].querySelector('div[rel="bento-alert-'+index+'"]');

          // A timeout event has already dismissed this alert
          // We skip everything...
          if(a && a.style){
            a.style.height = a.offsetHeight + 'px';
            $scope.bentoAlertObject.splice(index, 1);
          }
        };

        // Access through controller
        this.closeBentoAlert = function (alert) {
          $scope.closeBentoAlert($scope.bentoAlertObject.indexOf(alert));
        }
      }
    ])

    .directive('bentoAlert', [
      '$compile',
      '$timeout',

      function ($compile, $timeout) {
        return {
          restrict   : 'EA',
          controller : 'BentoAlertController',
          templateUrl: '../templates/alerts/bento_alert.html',
          scope      : {
            bentoAlertObject: '=',
            align           : '@'
          }, //scope
          link       : function (scope, element, attrs) {
            var parentEl = element[0].parentElement;
            var container = element[0].querySelector('.alert-container');

            getFirstScrollableParent();

            scope.$watch('align', function () {
              if (!!scope.align) {
                if (scope.align === 'right') {
                  container.className = 'alert-container right';
                } else if (scope.align === 'left') {
                  container.className = 'alert-container left';
                } else {
                  container.className = 'alert-container';
                }
              }
            });

            // Find the first parent that scrolls
            function getFirstScrollableParent(domEl) {
              var style = window.getComputedStyle(document.querySelector('html'));
            }

            // Update body scrolling position
            function updateScrollingPosition(event) {
              var targetTop = 20;
              var scroll = getScroll();
              if (scroll.top < 90) {
                targetTop = 90 - scroll.top;
              }

              if (targetTop < 20) {
                targetTop = '20';
              }
              container.style.top = targetTop + 'px';
            }

          }
        }; //return
      } //function compile, timeout
    ])

    .directive('bentoAlertTimeoutWithObject', ['$timeout', function ($timeout) {
      return {
        require: '^bentoAlert',
        scope  : {
          bentoAlertTimeoutWithObject: '=',
        },
        link   : function (scope, element, attrs, alertCtrl) {
          var alertTimeout = Number(scope.bentoAlertTimeoutWithObject.timeout);

          // There is no timeout
          if (typeof scope.bentoAlertTimeoutWithObject.timeout === 'undefined') {
            return;
          }
          // Fire the timeout
          $timeout(function () {
            alertCtrl.closeBentoAlert(scope.bentoAlertTimeoutWithObject);
          }, alertTimeout); //timeout
        } //link function
      }; //return
    }]);

  // helper class to get document scrolling
  function getScroll() {
    var doc = document.documentElement;
    var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    return {top: top, left: left};
  }

})(window, window.angular);

function BentoScrollable(dom) {
  var s = this;
  s.SCROLL_WIDTH = 10;
  s.dom = dom;
  s.init = init;
  s.onScroll = onScrollListener;
  s.render = render;
  s.height = height;
  s.callbackStack = [];


  // Private variables
  s._scrollTop = 0;
  s._scrollLeft = 0;
  s._domSize = {};
  s._scrollableSize = {};
  s.offsetTop = 0;

  s.init();

  /**
   * setScrollable Height
   * @param containerHeight
   */
  function height(containerHeight){
    if(typeof containerHeight !== 'undefined'){
      s.dom.style.height = [containerHeight, 'px'].join('');
    }else{
      return s.dom.offsetHeight;
    }
  }

  /**
   * Render scrollable pane and scrollbar when layouts change
   * @param width
   * @param height
   */
  function render(width, height, top) {
    s.offsetTop = top || s.offsetTop;
    s._scrollableSize.width = width;
    s._scrollableSize.height = height;
    s.hScrollRange = width - s.dom.offsetWidth;
    s.vScrollRange = height - s.dom.offsetHeight + top + s.SCROLL_WIDTH;

    var domClassArray = s.dom.className.split(' ');

    // check if the content is smaller than scrollable
    s.hScrollRange = s.hScrollRange > 1? s.hScrollRange : 0;
    s.vScrollRange = s.vScrollRange > 1? s.vScrollRange : 0;

    // Horizontal
    if (s.hScrollRange <= 0) {
      if (domClassArray.indexOf('bento-scrollable-no-h') === -1) {
        domClassArray.push('bento-scrollable-no-h')
      }
      s.sbH.dom.style.display = 'none';
      s.dom.style.height = '100%';
      s.hScrollRange = width - s.dom.offsetWidth;
    } else {
      var index = domClassArray.indexOf('bento-scrollable-no-h');
      if (index > -1) {
        domClassArray.splice(index, 1);
      }
      s.dom.style.height = 'calc(100% - ' + s.SCROLL_WIDTH + 'px)';
      s.sbH.dom.style.display = 'block';
    }

    // Vertical
    if (s.vScrollRange <= 0) {
      if (domClassArray.indexOf('bento-scrollable-no-v') === -1) {
        domClassArray.push('bento-scrollable-no-v')
      }
      s.sbV.dom.style.display = 'none';
      s.dom.style.width = '100%';
      s.vScrollRange = height - s.dom.offsetHeight + s.offsetTop + s.SCROLL_WIDTH;
    } else {
      var index = domClassArray.indexOf('bento-scrollable-no-v');
      if (index > -1) {
        domClassArray.splice(index, 1);
      }
      s.sbV.dom.style.display = 'block';
      s.dom.style.width = 'calc(100% - ' + s.SCROLL_WIDTH + 'px)';
      s.vScrollRange = height - s.dom.offsetHeight + s.offsetTop;
    }

    // check if the content is smaller than scrollable
    s.hScrollRange = s.hScrollRange > 1? s.hScrollRange : 0;
    s.vScrollRange = s.vScrollRange > 1? s.vScrollRange : 0;

    s.dom.className = domClassArray.join(' ');

    // Making scroll bars full length when the other doesn't present
    if (s.sbV.dom.style.display == 'none' && s.sbH.dom.style.display) {
      if (s.sbH.dom.className.search(' full') === -1) {
        s.sbH.dom.className += ' full';
      }
    } else {
      s.sbH.dom.className = s.sbH.dom.className.replace(' full', '');
    }

    if (s.sbH.dom.style.display == 'none' && s.sbV.dom.style.display) {
      if (s.sbV.dom.className.search(' full') === -1) {
        s.sbV.dom.className += ' full';
      }
    } else {
      s.sbV.dom.className = s.sbV.dom.className.replace(' full', '');
    }

    // Check if there is an content size change
    // In this case there might be over scrolling so we need to correct it
    s._scrollLeft = s._scrollLeft > s.hScrollRange? s.hScrollRange : s._scrollLeft;
    s._scrollTop = s._scrollTop > s.vScrollRange? s.vScrollRange : s._scrollTop;


    // update scroll bar sizes
    s.sbH.setScrollableRange(s.dom, width);
    s.sbV.setScrollableRange(s.dom, height);
    s.sbH.setScrollRatio(s._scrollLeft / s.hScrollRange);
    s.sbV.setScrollRatio(s._scrollTop / s.vScrollRange);

    // Fire scrolling event to notify scrolling change
    var e = {
      scrollLeft       : s._scrollLeft,
      scrollTop        : s._scrollTop,
      scrollHeightRange: s.vScrollRange,
      scrollWidthRange : s.hScrollRange
    };

    // Callback functions first
    fireCallbacks(e);
  }

  function onScrollListener(objectWithOnScroll) {
    s.callbackStack.push(objectWithOnScroll);
  }

  /**
   * Regular scroll
   * @param event
   * @private
   */
  function _onScroll(event) {
    var nScrolls = normalizeScrolls(s._scrollTop + event.deltaY, s._scrollLeft + event.deltaX);
    var tRatio = s._scrollTop / s.vScrollRange,
        lRatio = s._scrollLeft / s.hScrollRange;

    event.scrollLeft = nScrolls.scrollLeft;
    event.scrollTop = nScrolls.scrollTop;
    event.scrollHeightRange = s.vScrollRange;
    event.scrollWidthRange = s.hScrollRange;

    // Callback functions first
    fireCallbacks(event);

    // Render the scrolling
    s._scrollTop = nScrolls.scrollTop;
    s._scrollLeft = nScrolls.scrollLeft;

    s.sbH.setScrollRatio(lRatio);
    s.sbV.setScrollRatio(tRatio);


    if((event.deltaY !== 0 && s.sbV.dom.style.display !== 'none') ||
      (event.deltaX !== 0 && s.sbH.dom.style.display !== 'none')
    ){
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * listener for horizontal scroll
   * @param event
   */
  function onHorizontalScroll(event) {
    var nScrolls = normalizeScrolls(s._scrollTop, s.hScrollRange * event.scrollRatio);
    event.scrollLeft = nScrolls.scrollLeft;
    event.scrollTop = nScrolls.scrollTop;
    // Callback functions first
    fireCallbacks(event);
    s._scrollLeft = nScrolls.scrollLeft;
  }

  /**
   * Listener for vertical scroll
   * @param event
   */
  function onVerticalScroll(event) {
    var nScrolls = normalizeScrolls(s.vScrollRange * event.scrollRatio, s._scrollLeft);
    event.scrollLeft = nScrolls.scrollLeft;
    event.scrollTop = nScrolls.scrollTop;
    event.scrollHeightRange = s.vScrollRange;
    event.scrollWidthRange = s.hScrollRange;
    // Callback functions first
    fireCallbacks(event);
    s._scrollTop = nScrolls.scrollTop;
  }

  /**
   * Touch Event when dragging starts
   * @param event
   */
  var oTouchX, oTouchY, oTouchTop, oTouchLeft;

  function onDomTouchStart(event) {
    window.addEventListener('touchmove', onDomTouchMove);
    window.addEventListener('touchend', onDomTouchEnd);

    oTouchX = event.pageX;
    oTouchY = event.pageY;
    oTouchTop = s._scrollTop;
    oTouchLeft = s._scrollLeft;
  }

  /**
   * Touch Event when dragging
   * @param event
   */
  function onDomTouchMove(event) {
    var dX = event.pageX - oTouchX;
    var dY = event.pageY - oTouchY;

    var nScrolls = normalizeScrolls(oTouchTop - dY, oTouchLeft - dX);
    event.scrollLeft = nScrolls.scrollLeft;
    event.scrollTop = nScrolls.scrollTop;
    event.scrollHeightRange = s.vScrollRange;
    event.scrollWidthRange = s.hScrollRange;

    // Callback functions first
    fireCallbacks(event);

    // Render scrolling
    s._scrollTop = nScrolls.scrollTop;
    s._scrollLeft = nScrolls.scrollLeft;

    s.sbH.setScrollRatio(nScrolls.scrollLeft / s.hScrollRange);
    s.sbV.setScrollRatio(nScrolls.scrollTop / s.vScrollRange);
  }

  /**
   * Touch Event when dragging ends
   * @param event
   */
  function onDomTouchEnd(event) {
    window.removeEventListener('touchmove', onDomTouchMove);
    window.removeEventListener('touchend', onDomTouchEnd);
  }

  /**
   * batch fire callback functions
   * @param event
   */
  function fireCallbacks(event) {
    if (s.sbH.dom.style.display === 'none') {
      event.scrollLeft = 0;
    }

    if (s.sbV.dom.style.display === 'none') {
      event.scrollTop = 0;
    }

    for (var i = 0; i < s.callbackStack.length; i++) {
      s.callbackStack[i](event);
    }
  }

  /**
   * Normalize scrollTop and scrollLeft based on the vertical and horizontal scrolling range
   * @param scrollTop
   * @param scrollLeft
   * @returns {{scrollTop: *, scrollLeft: *}}
   */
  function normalizeScrolls(scrollTop, scrollLeft) {
    // Normalize scrollTop and scrollLeft
    if (scrollTop < 0 || isNaN(scrollTop)) {
      scrollTop = 0;
    } else if (scrollTop > s.vScrollRange) {
      scrollTop = s.vScrollRange;
    }
    if (scrollLeft < 0) {
      scrollLeft = 0;
    } else if (scrollLeft > s.hScrollRange) {
      scrollLeft = s.hScrollRange;
    }
    return {scrollTop: scrollTop, scrollLeft: scrollLeft};
  }

  /**
   * Initialize scrollable
   */
  function init() {
    document.addEventListener('touchmove', function (event) {
      event.preventDefault();
    });

    s.sbH = new BentoScrollBar('bottom', s.SCROLL_WIDTH);
    s.sbV = new BentoScrollBar('right', s.SCROLL_WIDTH);

    s._domSize.width = s.dom.offsetWidth;
    s._domSize.height = s.dom.offsetHeight;

    //s.dom.style.width = s.dom.style.height = 'calc(100% - ' + s.SCROLL_WIDTH + 'px)';

    // After()
    s.dom.parentNode.insertBefore(s.sbH.dom, s.dom.nextSibling);
    s.dom.parentNode.insertBefore(s.sbV.dom, s.dom.nextSibling);

    s.sbH.onScroll(onHorizontalScroll);
    s.sbV.onScroll(onVerticalScroll);

    s.dom.className += ' bento-scrollable';
    // Add wheel or scroll events
    s.dom.addEventListener('wheel', _onScroll);

    // Touch Swipes
    s.dom.addEventListener('touchstart', onDomTouchStart);

    // Window resize
    window.addEventListener('resize', function (event) {
      // No need to resize since the scrollable is not even visible
      // no need to render
      if (s.dom.offsetWidth === 0 || s.dom.offsetHeight === 0) {
        return;
      }

      if (s._domSize.width !== s.dom.offsetWidth || s._domSize.height !== s.dom.offsetHeight) {
        s._domSize.width = s.dom.offsetWidth;
        s._domSize.height = s.dom.offsetHeight;

        render(s._scrollableSize.width, s._scrollableSize.height);

        // Fire both scrolling even to re-render
        var nScrolls = normalizeScrolls(s.vScrollRange * s.sbV.ratio, s.hScrollRange * s.sbH.ratio);
        nScrolls.scrollHeightRange = s.vScrollRange;
        nScrolls.scrollWidthRange = s.hScrollRange;
        // Callback functions first
        fireCallbacks(nScrolls);
        s._scrollTop = nScrolls.scrollTop;
        s._scrollLeft = nScrolls.scrollLeft;
      }
    });
  }
}


function BentoScrollBar(position, width) {
  var sb = this;
  var callbackStack = [];
  var sbVNobSize,
      sbHNobSize,
      sbVSize,
      sbHSize,
      sbVRange,
      sbHRange;
  var _width = !!width ? width : 15;
  sb.dom = document.createElement('DIV');
  sb.nob = document.createElement('DIV');
  sb.bg = document.createElement('DIV');
  sb.setScrollRatio = setScrollRatio;
  sb.onScroll = addScrollCallbacks;
  sb.setScrollableRange = setScrollableRange;
  sb.init = init;
  sb.ratio = 0;
  sb.init();

  /**
   * Set scroll with ratio
   * @param ratio
   */
  function setScrollRatio(ratio){
    sb.ratio = ratio > 1? 1:ratio;
    if(position === 'right'){
      sb.nob.style.top = sbVRange*sb.ratio + 'px';
    }else
    if(position === 'bottom'){
      sb.nob.style.left = sbHRange*sb.ratio + 'px';
    }
  }

  /**
   * Add Callback functions to callback stack
   * @param callback
   */
  function addScrollCallbacks(callback){
    callbackStack.push(callback);
  }

  /**
   * Adjust Scrollable Range based on the dom inner and outer size
   * @param dom
   */
  function setScrollableRange(dom, size) {
    var ratio, newSize;
    if (position === 'right') {
      sbVSize = sb.dom.offsetHeight;
      ratio = dom.offsetHeight / size;
      newSize = sbVSize * ratio;
      newSize = (newSize < _width) ? _width : newSize;
      newSize = (newSize > sbVSize - _width)? sbVSize - _width : newSize;
      sb.nob.style.height = newSize + 'px';
      sbVNobSize = sb.nob.offsetHeight;
      sbVRange = sbVSize - sbVNobSize;
      if(sb.nob.offsetTop > sbVRange){
        sb.nob.style.top = sbVRange + 'px';
      }


    } else if (position === 'bottom') {
      sbHSize = sb.dom.offsetWidth;
      ratio = dom.offsetWidth / size;
      newSize = sbHSize * ratio;
      newSize = (newSize < _width) ? _width : newSize;
      newSize = (newSize > sbHSize - _width)?sbHSize - _width : newSize;
      sb.nob.style.width = newSize + 'px';
      sbHNobSize = sb.nob.offsetWidth;
      sbHRange = sbHSize - sbHNobSize;
      if(sb.nob.offsetLeft > sbHRange){
        sb.nob.style.left = sbHRange + 'px';
      }
    }
  }

  /**
   * Listener for Mouse Down and Touch Down
   * @param event
   */
  var oSVal,
  oSNobVal;

  function onMouseDown(event) {
    if (position === 'bottom') {
      window.addEventListener('touchmove', onMouseMoveH);
      window.addEventListener('mousemove', onMouseMoveH);
      oSVal = event.pageX;
      oSNobVal = sb.nob.offsetLeft;
    } else if (position === 'right') {
      window.addEventListener('touchmove', onMouseMoveV);
      window.addEventListener('mousemove', onMouseMoveV);
      oSVal = event.pageY;
      oSNobVal = sb.nob.offsetTop;
    }

    window.addEventListener('touchend', onMouseUp);
    window.addEventListener('mouseup', onMouseUp);

    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Listner for Mouse Move & Touch Move in Vertical Direction
   * @param event
   */
  function onMouseMoveV(event) {
    var sVal = event.pageY;
    var ratio = processScrollerMoveEvent(oSVal, sVal, oSNobVal, 'Top', sbVNobSize, sbVSize, sbVRange);
    fireCallbacks(event, ratio);
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Listener for Mouse Move & Touch Move in Horizontal Direction
   * @param event
   */
  function onMouseMoveH(event) {
    var sVal = event.pageX;
    var ratio = processScrollerMoveEvent(oSVal, sVal, oSNobVal, 'Left', sbHNobSize, sbHSize, sbHRange);
    fireCallbacks(event, ratio);
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Process the Nob location and return scroll ratio [0.0 ~ 1.0]
   * @param oVal
   * @param sVal
   * @param cssPos
   * @param nobSize
   * @param barSize
   * @param range
   * @returns {number} - A ratio of how much that is needed to scroll
   */
  function processScrollerMoveEvent(oVal, sVal, oSNobOffsetVal, cssPos, nobSize, barSize, range) {
    //get dX
    var dX = sVal - oVal;
    var targetX;

    if (oSNobOffsetVal + dX < 0) {
      targetX = 0;
    } else if (oSNobOffsetVal + dX > range) {
      targetX = range;
    }else{
      targetX = oSNobOffsetVal + dX;
    }


    sb.nob.style[cssPos.toLowerCase()] = targetX + 'px';
    return targetX / range;
  }

  /**
   * Listener for Mouse Up & Touch End
   * @param event
   */
  function onMouseUp(event) {

    // Remove motion listeners to keep window listener stack clean
    window.removeEventListener('touchmove', onMouseMoveH);
    window.removeEventListener('mousemove', onMouseMoveH);
    window.removeEventListener('touchmove', onMouseMoveV);
    window.removeEventListener('mousemove', onMouseMoveV);
    window.removeEventListener('touchend', onMouseUp);
    window.removeEventListener('mouseup', onMouseUp);

    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Adjust nob position when BG is clicked
   * @param event
   */
  function onBGMouseDown(event) {
    var ratio,
        sVal,
        oSVal,
        oSNobVal;

    if (position === 'bottom') {
      sVal = event.pageX;
      oSNobVal = sb.nob.offsetLeft;
      oSVal = oSNobVal + sbHNobSize * 0.5;
      ratio = processScrollerMoveEvent(oSVal, sVal, oSNobVal, 'Left', sbHNobSize, sbHSize, sbHRange);
    } else if (position === 'right') {
      sVal = event.pageY;
      oSNobVal = sb.nob.offsetTop;
      oSVal = oSNobVal + sbVNobSize * 0.5;
      ratio = processScrollerMoveEvent(oSVal, sVal, oSNobVal, 'Top', sbVNobSize, sbVSize, sbVRange);
    }

    fireCallbacks(event, ratio);
    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Fire callback functions from the callback stack and pass the scrolling ratio
   * @param event
   * @param ratio
   */
  function fireCallbacks(event, ratio){
    // No scroll change
    if(sb.ratio === ratio){
      return;
    }
    sb.ratio = event.scrollRatio = ratio;
    for(var i=0; i<callbackStack.length; i++){
      callbackStack[i](event);
    }
  }

  /**
   * Initialization
   */
  function init() {
    sb.dom.className = 'bento-scrollbar';
    sb.nob.className = 'bento-scrollbar-nob';
    sb.bg.className = 'bento-scrollbar-bg';
    sb.dom.appendChild(sb.bg);
    sb.dom.appendChild(sb.nob);

    if (position === 'right') {
      sb.dom.className += ' vertical';
      sb.nob.style.width =
        sb.dom.style.width = _width + 'px';
    } else if (position === 'bottom') {
      sb.dom.className += ' horizontal';
      sb.nob.style.height =
        sb.dom.style.height = _width + 'px';
    }

    // Add eventlistener to nob
    sb.nob.addEventListener('touchstart', onMouseDown);
    sb.nob.addEventListener('mousedown', onMouseDown);
    sb.bg.addEventListener('touchstart', onBGMouseDown);
    sb.bg.addEventListener('mousedown', onBGMouseDown);

  }
}
function BentoTableCell(parent, isHeader) {
  var cell = this;
  cell.dom = document.createElement('DIV');
  cell.dom.className = 'bento-table-cell';
  cell.parent = parent;
  cell.dom.cell = this;
  cell.html = setHtml;
  cell.setTop = setTop;
  cell.setBottom = setBottom;
  cell.setLeft = setLeft;
  cell.setRight = setRight;
  cell.getWidth = getWidth;
  cell.setWidth = setWidth;
  cell.destroy = destroy;
  cell.setIndex = setIndex;
  cell.addClass = addClass;
  cell.removeClass = removeClass;
  cell.hasClass = hasClass;
  cell.setType = setType;
  cell.getType = getType;
  cell.setData = setData;
  cell.getData = getData;

  // Private
  var headerPlate;
  var headerContent;
  var type;
  var data;

  init();

  // Private
  var _classes = [cell.dom.className];

  function setData(d) {
    data = d;
  }

  function getData() {
    return data;
  }

  function setType(t) {
    if (type) {
      cell.removeClass(type);
    }
    type = t;
    cell.addClass(type);
  }

  function getType() {
    return type;
  }

  function addClass(className) {
    if (_classes.indexOf(className) < 0) {
      _classes.push(className);
      cell.dom.className = _classes.join(' ');
    }
  }

  function hasClass(className) {
    return _classes.indexOf(className) > -1
  }

  function removeClass(className) {
    var index = _classes.indexOf(className);
    if (index > -1) {
      _classes.splice(index, 1);
      cell.dom.className = _classes.join(' ');
    }
  }


  function setHtml(html) {
    if (isHeader) {
      if (typeof html === 'string' || typeof html === 'number') {
        headerContent.innerHTML = html;
      } else {
        headerContent.innerHTML = '';
        headerContent.appendChild(html);
      }
    } else if (typeof html !== 'undefined') {
      if (typeof html === 'string' || typeof html === 'number') {
        cell.dom.innerHTML = html;
      } else {
        cell.dom.innerHTML = '';
        cell.dom.appendChild(html);
      }
    } else{
      cell.dom.innerHTML = '';
    }
  }

  function setIndex(col, row) {
    cell.col = col;
    cell.row = row;
  }

  function setTop(topCell) {
    cell.top = topCell;
  }

  function setBottom(bottomCell) {
    cell.bottom = bottomCell;
  }

  function setLeft(leftCell) {
    cell.left = leftCell;
  }

  function setRight(rightCell) {
    cell.right = rightCell;
  }

  function getWidth() {
    return cell.dom.offsetWidth;
  }

  function setWidth(width) {
    cell.dom.style.width = width + 'px';
  }

  function destroy() {
    delete cell.dom;
    cell.top = null;
    cell.bottom = null;
    cell.left = null;
    cell.right = null;
    cell.parent = null;

    //AngularJS code
    if(data && data.scope){
      // Destroy NG code to prevent NG related memory leak
      data.scope.$destroy();
    }

    data = null;
  }

  function init() {
    if (isHeader) {
      headerPlate = document.createElement('DIV');
      headerPlate.className = 'bt-header-cell-plate';
      headerContent = document.createElement('DIV');
      cell.dom.appendChild(headerContent);
      cell.dom.appendChild(headerPlate);
    }
  }
}
var BentoTableCore;

(function () {
  BentoTableCore = _BentoTableCore;
  _BentoTableCore.prototype.addColumn = addColumn;
  _BentoTableCore.prototype.addNewColumn = addNewColumn;
  _BentoTableCore.prototype.addRow = addRow;
  _BentoTableCore.prototype.calcGridColSizeArray = calcGridColSizeArray;
  _BentoTableCore.prototype.calcGridRowSizeArray = calcGridRowSizeArray;
  _BentoTableCore.prototype.fastForwardCol = fastForwardCol;
  _BentoTableCore.prototype.fastForwardRow = fastForwardRow;
  _BentoTableCore.prototype.fireCellRenderRequestCallbackWithArray = fireCellRenderRequestCallbackWithArray;
  _BentoTableCore.prototype.getColSizes = getColSizes;
  _BentoTableCore.prototype.getFirstRow = getFirstRow;
  _BentoTableCore.prototype.getLastRow = getLastRow;
  _BentoTableCore.prototype.getNumRows = getNumRows;
  _BentoTableCore.prototype.getRowSizes = getRowSizes;
  _BentoTableCore.prototype.getTableHeight = getTableHeight;
  _BentoTableCore.prototype.getTableWidth = getTableWidth;
  _BentoTableCore.prototype.init = init;
  _BentoTableCore.prototype.linkRows = linkRows;
  _BentoTableCore.prototype.onHeaderClick = onHeaderClick; // event
  _BentoTableCore.prototype.onRowClick = onRowClick; // event
  _BentoTableCore.prototype.onScrollAtBottom = onScrollAtBottom; // event
  _BentoTableCore.prototype.pushRow = pushRow;
  _BentoTableCore.prototype.refreshScrollBars = refreshScrollBars;
  _BentoTableCore.prototype.removeColumn = removeColumn;
  _BentoTableCore.prototype.removeLastColumn = removeLastColumn;
  _BentoTableCore.prototype.removeLastRow = removeLastRow;
  _BentoTableCore.prototype.removeRow = removeRow;
  _BentoTableCore.prototype.render = render;
  _BentoTableCore.prototype.requestCellContent = requestCellContent;
  _BentoTableCore.prototype.requestHeaderContent = requestHeaderContent;
  _BentoTableCore.prototype.requestFrozenCellContent = requestFrozenCellContent;
  _BentoTableCore.prototype.rewindCol = rewindCol;
  _BentoTableCore.prototype.reset = reset;
  _BentoTableCore.prototype.rewindRow = rewindRow;
  _BentoTableCore.prototype.selectRow = selectRow; // number
  _BentoTableCore.prototype.selectFrozenRow = selectFrozenRow; // number
  _BentoTableCore.prototype.setColSizes = setColSizes;
  _BentoTableCore.prototype.setColumnWidth = setColumnWidth; // number
  _BentoTableCore.prototype.setGridSize = setGridSize;
  _BentoTableCore.prototype.setRowHeight = setRowHeight; // number
  _BentoTableCore.prototype.setRowSizes = setRowSizes;
  _BentoTableCore.prototype.toggleRow = toggleRow; // number
  _BentoTableCore.prototype.toggleFrozenRow = toggleFrozenRow; // number
  _BentoTableCore.prototype.deselectRow = deselectRow; // number
  _BentoTableCore.prototype.deselectFrozenRow = deselectFrozenRow; // number
  _BentoTableCore.prototype.unshiftRow = unshiftRow;
  _BentoTableCore.prototype.updateRowWithIndex = updateRowWithIndex;
  _BentoTableCore.prototype.addFrozenRow = addFrozenRow;
  _BentoTableCore.prototype.removeFrozenRow = removeFrozenRow;
  _BentoTableCore.prototype.renderHeaderCell = renderHeaderCell;


  // Private
  _BentoTableCore.prototype._headerCellClick = _headerCellClick;
  _BentoTableCore.prototype._onHeaderColumnResize = _onHeaderColumnResize;
  _BentoTableCore.prototype._onRowClick = _onRowClick;
  _BentoTableCore.prototype._onScroll = _onScroll;

  /**
   * Constructore
   * @param dom
   * @param options
   * @private
   */
  function _BentoTableCore(dom, options) {
    var self = this;
    // API

    // row and column size reference array
    /* "this.rowSizes" is an array where each element is an array and represents the following
     * ----------------
     * 0. Row Height
     * 1. Total Height includeing this row
     * 2. (Bool) selected toggle
     *
     */

    this.rowSizes = [];
    this.frozenRowSizes = [];
    this.colSizes = [];
    this.ready = false;

    // Default values
    this.options = {
      rowHeight : options.rowHeight || 30,
      colWidth  : options.colWidth || 100,
      border    : options.border || 1,
      header    : options.header || {resize: false},
      autoHeight: options.autoHeight
    };

    // private variable declaration
    this._currentHIndex = 0;
    this._currentVIndex = 0;
    this._dom = dom;
    this._domWidth = 0.0;
    this._headerClickCallbackStack = [];
    this._headerHeight = 0;
    this._requestCellContentCallback = null;
    this._requestFrozenCellContentCallback = null;
    this._requestHeaderContentCallback = null;
    this._rowClickCallbackStack = [];
    this._rows = [];
    this._scrollLeft = 0.0;
    this._scrollTop = 0.0;

    // Creating sub components
    this.header = new BentoTableHeader(this.options.colWidth, this.options.rowHeight, this.options.header);
    this.scrollable = new BentoScrollable(this._dom);
    this.pane = document.createElement('DIV');
    this.pane.className = 'bento-table-inner';
    this._dom.appendChild(this.pane);
    this._dom.appendChild(this.header.dom);
    this.scrollable.onScroll(function (event) {
      self._onScroll(event);
    });
  }

  // Render Header Cell
  function renderHeaderCell(headerCell, colObj, scope, compile){
    this.header.renderCell(headerCell, colObj, scope, compile);
  }

  /**
   * Reset table content without distroying column definitions
   */
  function reset(){
    this.rowSizes=[];
    this.header.reset();
    for(var i= 0,len=this._rows.length;i<len;i++){
      this._rows[i].clear();
    }
  }

  /**
   * Add a frozen row object
   */
  function addFrozenRow() {
    if (this.header) {
      this.header.addFrozenRow();
    }
  }

  /**
   * Remove a frozen row object
   */
  function removeFrozenRow(index) {
    if (this.header) {
      this.header.removeFrozenRow(index);
    }
  }

  /**
   * Adding scroll at bottom callback
   * @param callback
   */
  function onScrollAtBottom(callback) {
    if (typeof this._scrollAtBottomCallbacks === 'undefined') {
      this._scrollAtBottomCallbacks = [];
    }

    // To avoid adding the same callback instance
    if (this._scrollAtBottomCallbacks.indexOf(callback) > -1) {
      return;
    }

    this._scrollAtBottomCallbacks.push(callback);
  }

  /**
   * Set Column width
   * @param col - Could be either integer to arary
   * @param width - Width to the given colIndex from `col` can be array
   */
  function setColumnWidth(colData, widthData) {
    var col, width, smallestCol = this.colSizes.length;

    if (!Array.isArray(colData)) {
      colData = [colData];
      widthData = [widthData];
    }

    for (var i = 0, len = colData.length; i < len; i++) {
      col = colData[i];
      width = widthData[i];

      if (col < smallestCol) {
        smallestCol = col;
      }

      if (this.colSizes[col]) {
        var cell = this.getFirstRow().getFirstCell();
        var fCCell = cell,
            fRCell;
        do {
          cell = cell.right;
          if (cell.col == col) {
            fRCell = cell;
            // Set width to all cell in the same column
            do {
              cell.dom.style.width = width + 'px';
              cell = cell.bottom;
            } while (cell !== fRCell);

            // update column width index
            this.colSizes[col][0] = width;
          }
        } while (cell !== fCCell)
      }
    }

    this.calcGridColSizeArray(smallestCol);
    this.render();
  }

  function updateCellCSS(cell) {
    if (cell.col === 0) {
      cell.addClass('bt-row-head');
    } else {
      cell.removeClass('bt-row-head');
    }
  }

  function setRowHeight(rowIndex, height) {
    if (this.rowSizes[rowIndex]) {
      this.rowSizes[rowIndex][0] = height;
      this.calcGridRowSizeArray(rowIndex);
      //Find the row and adjust its height if it's in viewport
      var row;
      for (var i = 0; i < this._rows; i++) {
        row = this._rows[i];
        if (row.row === row) {
          row.dom.style.height = height + 'px';
        }
      }
      this.render();
    }
  }

  function addColumn(col, count, width) {
    for (var i = 0; i < (count || 1); i++) {
      this.colSizes.splice(col, 0, [width || this.options.colWidth, 0]);
    }
    this.calcGridColSizeArray(col);
    this.render();
  }

  function addRow(row, count, height) {
    for (var i = 0; i < (count || 1); i++) {
      this.rowSizes.splice(row, 0, [height || this.options.rowHeight, 0]);
    }
    this.calcGridRowSizeArray(row);
    this.render();
  }

  function removeRow(row, count) {
    this.rowSizes.splice(row, count || 1);
    this.calcGridRowSizeArray(row);
    this.render();
  }

  function removeColumn(col, count) {
    this.colSizes.splice(col, count || 1);
    this.calcGridColSizeArray(col);
    this.render();
  }

  function calcGridRowSizeArray(index, isFrozen) {
    var array = isFrozen ? this.frozenRowSizes : this.rowSizes;
    var height = index === 0 ? 0 : array[index - 1][1];
    var size = array.length;
    for (var i = index; i < size; i++) {
      height += array[i][0];
      array[i][1] = height;
    }
  }

  function calcGridColSizeArray(index) {
    var width = index === 0 ? 0 : this.colSizes[index - 1][1];
    var size = this.colSizes.length;
    for (var i = index; i < size; i++) {
      width += this.colSizes[i][0];
      this.colSizes[i][1] = width;
    }
  }

  function requestCellContent(callback) {
    this._requestCellContentCallback = callback;
  }

  function requestHeaderContent(callback) {
    this._requestHeaderContentCallback = callback;
  }

  function requestFrozenCellContent(callback) {
    this._requestFrozenCellContentCallback = callback;
  }

  function getColSizes() {
    return this.colSizes;
  }

  function setColSizes(array) {
    this.colSizes = array;
  }

  function getRowSizes() {
    return this.rowSizes;
  }

  function setRowSizes(array) {
    this.rowSizes = array;
  }

  function _onScroll(event) {
    var index, vIndex, hIndex, fIndex;
    var dHIndex = 0,
        dVIndex = 0,
        cWidth = 0,
        i,
        j,
        len
      ;
    var renderStack = [],
        headerRenderStack = [],
        freezeRenderStack = []
      ;

    // Check if need to fire scroll at bottom or not
    if (this._scrollAtBottomCallbacks && event.scrollHeightRange - event.scrollTop < 500) {
      for (i = 0, len = this._scrollAtBottomCallbacks.length; i < len; i++) {
        this._scrollAtBottomCallbacks[i](event);
      }
    }

    // H Scroll
    if (this._scrollLeft !== event.scrollLeft) {
      this._scrollLeft = event.scrollLeft;
      index = bSearchIndexByScroll(this.colSizes, event.scrollLeft);
      this.header.dom.style.left =
        this.pane.style.marginLeft = (
        this.colSizes[index][1] - this.colSizes[index][0] - this._scrollLeft
        ) + 'px';
      dHIndex = index - this._currentHIndex;
      this._currentHIndex = index;
    }

    // V Scroll
    if (this._scrollTop !== event.scrollTop
      && this.rowSizes.length
    ) {
      this._scrollTop = event.scrollTop;
      index = bSearchIndexByScroll(this.rowSizes, event.scrollTop);
      this.pane.style.marginTop = (
      this.rowSizes[index][1] - this.rowSizes[index][0] - this._scrollTop
      ) + 'px';
      dVIndex = index - this._currentVIndex;
      this._currentVIndex = index;
    }

    var cSize = this.getFirstRow().getNumCells(),
        rSize = this.getNumRows(),
        cell, hCell, fCell;

    //Total this.render
    if (Math.abs(dHIndex) > cSize || Math.abs(dVIndex) > rSize) {
      hCell = this.header.row.getFirstCell();
      cell = this.getFirstRow().getFirstCell();
      for (i = 0; i < rSize; i++) {
        vIndex = this._currentVIndex + i;
        if (vIndex < this.rowSizes.length) {
          this.updateRowWithIndex(cell.parent, vIndex);
          for (j = 0; j < cSize; j++) {
            hIndex = this._currentHIndex + j;
            cWidth = this.colSizes[hIndex] ? [this.colSizes[hIndex][0], 'px'].join('') : '';
            if (hIndex < this.colSizes.length) {
              cell.setIndex(hIndex, vIndex);
              cell.dom.style.width = cWidth;
              renderStack.push(cell);
            }

            // Only execute once
            if (i === 0 && hIndex < this.colSizes.length) {
              hCell.setIndex(hIndex, 0);
              hCell.dom.style.width = cWidth;
              headerRenderStack.push(hCell);
              __getFreezeCellRenderStackFromHeader(freezeRenderStack, hCell, cWidth);
            }

            hCell = hCell.right;
            cell = cell.right;
          }
        }else{
          for (j = 0; j < cSize; j++) {
            cell.html('');
            cell = cell.right;
          }
        }
        cell = cell.bottom;
      }
    } else {
      // horizontal Scrolling
      //FF
      if (dHIndex > 0) {
        // Get first cell
        hCell = this.header.row.getFirstCell();
        cell = this.getFirstRow().getFirstCell();
        hIndex = this._currentHIndex + cSize - dHIndex;
        // Column
        for (i = 0; i < dHIndex; i++) {
          index = hIndex + i;
          cWidth = this.colSizes[index] ? [this.colSizes[index][0], 'px'].join('') : null;
          // Row
          for (j = 0; j < rSize; j++) {
            if (index < this.colSizes.length && cell.row < this.rowSizes.length) {
              cell.setIndex(index, cell.row);
              cell.dom.style.width = cWidth;
              renderStack.push(cell);
            } else {
              cell.html('');
            }
            cell = cell.bottom;
          }
          if (index < this.colSizes.length) {
            hCell.setIndex(index, 0);
            hCell.dom.style.width = cWidth;
            headerRenderStack.push(hCell);
            __getFreezeCellRenderStackFromHeader(freezeRenderStack, hCell, cWidth);
          }

          cell = cell.right;
          hCell = hCell.right;
          this.fastForwardCol();
        }
      } else
      //RW
      if (dHIndex < 0) {
        //get first row last Cell
        hCell = this.header.row.getLastCell();
        cell = this.getFirstRow().getLastCell();
        hIndex = this._currentHIndex - dHIndex;
        // Column
        for (i = -1; i >= dHIndex; i--) {
          index = hIndex + i;
          cWidth = this.colSizes[index][0] + 'px';
          // Row
          for (j = 0; j < rSize; j++) {
            if (cell.row < this.rowSizes.length) {
              cell.setIndex(index, cell.row);
              cell.dom.style.width = cWidth;
              renderStack.push(cell);
            }
            cell = cell.bottom;
          }
          hCell.setIndex(index, 0);
          hCell.dom.style.width = cWidth;
          headerRenderStack.push(hCell);
          __getFreezeCellRenderStackFromHeader(freezeRenderStack, hCell, cWidth);

          hCell = hCell.left;
          cell = cell.left;
          this.rewindCol();
        }
      }

      // Vertical Scrolling
      //FF
      if (dVIndex > 0) {
        // Get first cell
        cell = this.getFirstRow().getFirstCell();
        vIndex = this._currentVIndex + rSize - dVIndex;
        // Row
        for (i = 0; i < dVIndex; i++) {
          index = vIndex + i;
          if (index < this.rowSizes.length && cell.col < this.colSizes.length) {
            this.updateRowWithIndex(cell.parent, index);
            // Column
            for (j = 0; j < cSize; j++) {
              if (cell.col < this.colSizes.length) {
                cell.setIndex(cell.col, index);
                if (renderStack.indexOf(cell) === -1) {
                  renderStack.push(cell);
                }
              }
              cell = cell.right;
            }
            cell = cell.bottom;

          }
          this.fastForwardRow();
        }
      } else
      //RW
      if (dVIndex < 0) {
        //get first row last Cell
        cell = this.getLastRow().getFirstCell();
        vIndex = this._currentVIndex - dVIndex;
        // Row
        for (i = -1; i >= dVIndex; i--) {
          index = vIndex + i;
          this.updateRowWithIndex(cell.parent, index);
          // Column
          for (j = 0; j < cSize; j++) {
            if (cell.col < this.colSizes.length) {
              cell.setIndex(cell.col, index);
              if (renderStack.indexOf(cell) === -1) {
                renderStack.push(cell);
              }
            }
            cell = cell.right;

          }
          cell = cell.top;
          this.rewindRow();
        }
      }
    } // End of main if statement

    // callback for cell this.rendering
    this.fireCellRenderRequestCallbackWithArray(renderStack, headerRenderStack, freezeRenderStack);
    renderStack = null;
    headerRenderStack = null;
    freezeRenderStack = null;
  }

  /**
   * Get a render stack for frozen column using a header cell as a column reference
   * @param hCell
   * @param cWidth
   * @private
   */
  function __getFreezeCellRenderStackFromHeader(freezeRenderStack, hCell, cWidth) {
    if (hCell === hCell.top) {
      return;
    }

    var fIndex = 0,
        fCell
      ;

    fCell = hCell.bottom;
    while (fCell !== hCell) {
      fCell.setIndex(hCell.col, fIndex);
      fCell.dom.style.width = cWidth;
      freezeRenderStack.push(fCell);
      // next frozen cell in this column
      fCell = fCell.bottom;
      fIndex++;

    }
  }

  function updateRowWithIndex(row, index) {
    row.dom.style.height = this.rowSizes[index][0] + 'px';
    // set row index
    row.setRow(index);
  }

  function fireCellRenderRequestCallbackWithArray(arr, headerArr, frozenArr) {
    var i, len, cell;
    for (i = 0, len = arr.length; i < len; i++) {
      cell = arr[i];
      cell.parent.addClass('dirty');
      updateCellCSS(cell);
      this._requestCellContentCallback(arr[i]);
    }

    for (i = 0, len = headerArr.length; i < len; i++) {
      cell = headerArr[i];
      updateCellCSS(cell);
      this._requestHeaderContentCallback(headerArr[i]);
    }

    for (i = 0, len = frozenArr.length; i < len; i++) {
      cell = frozenArr[i];
      cell.parent.addClass('dirty');
      updateCellCSS(cell);
      this._requestFrozenCellContentCallback(frozenArr[i]);
    }
  }

  /**
   * Find the index of an array from its scroll
   * @param arr
   * @param scroll
   * @returns (int)
   */
  function bSearchIndexByScroll(arr, scroll) {
    if (scroll <= 0 || arr.length === 0) {
      return 0;
    }

    // Using three pivot points
    var lP = 0,
        rP = arr.length - 1,
        cR,
        notFound = true;

    while (notFound) {
      cR = Math.floor((lP + rP) * 0.5);
      //console.log(scroll,lP,cR,rP);
      //Compare cR
      if (arr[cR][1] > scroll) {
        if (arr[cR][1] - arr[cR][0] <= scroll) {
          notFound = false;
        } else {
          rP = cR;
        }
      } else {
        lP = cR;
      }
    }
    return cR
  }

  function setGridSize(row, col) {
    var height = this.rowSizes.length === 0 ? 0 : this.rowSizes[this.rowSizes.length - 1][1],
        width = this.colSizes.length === 0 ? 0 : this.colSizes[this.colSizes.length - 1][1],
        h = this.options.rowHeight,
        w = this.options.colWidth;

    // Add new row indexes
    if (row > this.rowSizes.length) {
      for (var i = this.rowSizes.length; i < row; i++) {
        height += h;
        this.rowSizes.push([h, height]);
      }
    } else
    // Slice the current array to match with the new row count
    if (row < this.rowSizes.length) {
      this.rowSizes = this.rowSizes.slice(0, row);
    }

    // Add new col indexes
    if (col > this.colSizes.length) {
      for (var j = this.colSizes.length; j < col; j++) {
        width += w;
        this.colSizes.push([w, width]);
      }
    } else
    // Slice the current array to match with the new col count
    if (col < this.colSizes.length) {
      this.colSizes = this.colSizes.slice(0, col);
    }
  }

  function refreshScrollBars() {

    this.scrollable.render(
      this.colSizes.length ? this.colSizes[this.colSizes.length - 1][1] : 0,
      this.rowSizes.length ? this.rowSizes[this.rowSizes.length - 1][1] : 0,
      this.header.dom.offsetHeight
    );
  }

  function render(deepRender) {
    var cSize = this.getFirstRow().getNumCells(),
        rSize = this.getNumRows(),
        cWidth,
        cell, hCell, fCell, hIndex, vIndex, fIndex, i, j, len,
        renderStack = [],
        headerRenderStack = [],
        freezeRenderStack = []
      ;

    if (deepRender) {
      this.calcGridRowSizeArray(0);
    }

    if (this.options.autoHeight) {
      if (rSize < this.rowSizes.length) {
        var newRow;
        for (i = 0, len = this.rowSizes.length - rSize; i < len; i++) {
          newRow = new BentoTableRow(cSize, this.options.colWidth, this.options.rowHeight);
          this.pushRow(newRow, true);
        }

        rSize = this.rowSizes.length;
      }

      // resize table

      var newHeight =  (this.rowSizes.length? this.rowSizes[this.rowSizes.length - 1][1] : 0)
        + this.header.dom.offsetHeight
        + this.scrollable.SCROLL_WIDTH;
      this._dom.style.height = newHeight + 'px';
      this.scrollable.height(newHeight);

      //need to set the parent height
      this._dom.parentElement.style.position = 'relative';
      this._dom.parentElement.style.height = newHeight + 'px';
    }

    this._domWidth = this._dom.offsetWidth;

    // Set header padding in the main area
    this._dom.style.paddingTop = this.header.dom.offsetHeight + 'px';

    //Total this.render
    cell = this.getFirstRow().getFirstCell();
    hCell = this.header.row.getFirstCell();

    for (i = 0; i < rSize; i++) {
      vIndex = this._currentVIndex + i;
      // out of boundary check
      if (vIndex < this.rowSizes.length) {
        this.updateRowWithIndex(cell.parent, vIndex);
        for (j = 0; j < cSize; j++) {
          // out of boundary check
          hIndex = this._currentHIndex + j;
          if (hIndex >= this.colSizes.length) {

          } else {
            cWidth = this.colSizes[hIndex][0] + 'px';
            cell.setIndex(hIndex, vIndex);
            cell.dom.style.width = cWidth;
            renderStack.push(cell);
          }
          cell = cell.right;

          // Only execute once
          if (i === 0 && hIndex < this.colSizes.length) {
            hCell.setIndex(hIndex, 0);
            hCell.dom.style.width = cWidth;
            headerRenderStack.push(hCell);
            __getFreezeCellRenderStackFromHeader(freezeRenderStack, hCell, cWidth);

            hCell = hCell.right;
          }
        }
      }else{
        // Erase the empty cells
        for (j = 0; j < cSize; j++) {
          if(j === 0){
            cell.parent.clearClasses();
          }

          cell.html('');
          cell = cell.right;
        }
      }
      cell = cell.bottom;
    }

    this.refreshScrollBars();
    this.fireCellRenderRequestCallbackWithArray(renderStack, headerRenderStack, freezeRenderStack);
    renderStack = null;
    headerRenderStack = null;
    freezeRenderStack = null;
  }

  function getTableWidth() {
    return this.colSizes.reduce(function (a, b) {
      return a + b
    });
  }

  function getTableHeight() {
    return this.rowSizes.reduce(function (a, b) {
      return a + b
    });
  }

  /**
   * Row and Column rotations
   */
  function fastForwardRow() {
    this.pushRow(this.getFirstRow());
  }

  function rewindRow() {
    this.unshiftRow(this.getLastRow());
  }

  function fastForwardCol() {
    var row, i, len, hCell, fCell;
    for (i = 0, len = this._rows.length; i < len; i++) {
      row = this._rows[i];
      row.push(row.getFirstCell());
    }

    // header
    hCell = this.header.row.getFirstCell();
    this.header.row.push(hCell);

    // Frozen rows
    fCell = hCell.bottom;
    while (fCell !== hCell) {
      fCell.parent.push(fCell);
      fCell = fCell.bottom;
    }
  }

  function rewindCol() {
    var row, i, len, hCell, fCell;
    for (i = 0, len = this._rows.length; i < len; i++) {
      row = this._rows[i];
      row.unshift(row.getLastCell());
    }

    //header
    hCell = this.header.row.getLastCell();
    this.header.row.unshift(hCell);

    // Frozen rows
    fCell = hCell.bottom;
    while (fCell !== hCell) {
      fCell.parent.unshift(fCell);
      fCell = fCell.bottom;
    }
  }

  function getFirstRow() {
    return this.pane.firstElementChild.row;
  }

  function getLastRow() {
    return this.pane.lastElementChild.row;
  }

  /**
   * Column and row operations
   */
  function pushRow(row, isNew) {
    if (isNew) {
      this.linkRows(row);
      var table = this;
      row.dom.addEventListener('click', function (event) {
        event.row = row;
        table._onRowClick(event);
      });
    }
    this.pane.appendChild(row.dom);
  }

  function unshiftRow(row, isNew) {
    if (isNew) {
      this.linkRows(row);
    }
    this.pane.insertBefore(row.dom, this.pane.firstChild);
  }

  function getNumRows() {
    return this._rows.length;
  }

  function removeLastRow() {
    var row = this.getLastRow();
    this.pane.removeChild(row.dom);
    this._rows.splice(this._rows.indexOf(row), 1);
    row.destroy();
  }

  function removeLastColumn() {
    for (var i = 0; i < this._rows; i++) {
      this._rows[i].removeLastCell();
    }
  }

  function addNewColumn() {
    var fCell, cell, lCell;
    for (var i = 0; i < this._rows.length; i++) {
      cell = new BentoTableCell(this._rows[i]);
      if (typeof fCell === 'undefined') {
        fCell = cell;
      }

      if (lCell) {
        lCell.setBottom(cell);
        cell.setTop(lCell);
      }
      this._rows[i].push(cell);
      lCell = cell;
    }

    fCell.setTop(cell);
    cell.setBottom(fCell);
  }

  function onHeaderClick(callback) {
    this._headerClickCallbackStack.push(callback);
  }

  function _headerCellClick(event) {
    event.cell = event.currentTarget.cell;
    for (var i = 0, len = this._headerClickCallbackStack.length; i < len; i++) {
      this._headerClickCallbackStack[i](event);
    }
  }

  function onRowClick(callback) {
    this.header.onRowClick(callback);
    this._rowClickCallbackStack.push(callback);
  }

  // Fire RowClick callback functions
  function _onRowClick(event) {
    this._rowClickCallbackStack.forEach(function (callback) {
      var row = event.currentTarget.row;
      event.rowIndex = row.row;
      event.row = row;
      callback(event);
    })
  }

  function deselectRow(rowIndex, isFrozen) {
    var rows = isFrozen ? this.header.frozenRows : this._rows;
    var rowSizes = isFrozen ? this.frozenRowSizes : this.rowSizes;
    if (rowIndex < rowSizes.length) {
      // update index
      // Find and update row is it presents in the viewport
      for (var i = 0, len = rows.length; i < len; i++) {
        if (rows[i].row === rowIndex) {
          rows[i].removeClass('bt-row-selected');
          break;
        }
      }
    }
  }

  function selectRow(rowIndex, isFrozen) {
    var rows = isFrozen ? this.header.frozenRows : this._rows;
    var rowSizes = isFrozen ? this.frozenRowSizes : this.rowSizes;
    if (rowIndex < rowSizes.length)
    // update index

    // Find and update row is it presents in the viewport
    for (var i = 0, len = rows.length; i < len; i++) {
      if (rows[i].row === rowIndex) {
        rows[i].addClass('bt-row-selected');
        break;
      }
    }

  }

  function toggleRow(rowIndex, isFrozen) {
    var rows = isFrozen ? this.header.frozenRows : this._rows;
    var rowSizes = isFrozen ? this.frozenRowSizes : this.rowSizes;

    if (rowIndex < rowSizes.length) {
      // Find and update row is it presents in the viewport
      for (var i = 0, len = rows.length; i < len; i++) {
        if (rows[i].row === rowIndex) {
          return rows[i].toggleClass('bt-row-selected');
          break;
        }
      }
    }
  }

  function deselectFrozenRow(rowDom) {
    rowDom.row.removeClass('bt-row-selected');
  }

  function selectFrozenRow(rowDom) {
    rowDom.row.addClass('bt-row-selected');
  }

  function toggleFrozenRow(rowDom) {
    rowDom.row.toggleClass('bt-row-selected');
  }

  // Resize column
  function _onHeaderColumnResize(event) {
    this.setColumnWidth(event.col, event.width);
  }

  /**
   * Link all cells in current row with other cells that are in the same column
   * @param row
   */
  function linkRows(row) {
    this._rows.push(row);
    if (this._rows.length > 1) {
      var fRow = this.getFirstRow();
      var lRow = this.getLastRow();
      var numCol = fRow.getNumCells();
      var cell,
          fCell,
          lCell;

      for (var i = 0; i < numCol; i++) {
        cell = row.getNthCell(i);
        fCell = fRow.getNthCell(i);
        lCell = lRow.getNthCell(i);

        fCell.setTop(cell);
        lCell.setBottom(cell);
        cell.setTop(lCell);
        cell.setBottom(fCell);
      }
    }
  }

  /**
   * Initialize Table
   */
  function init() {
    var table = this;
    var numRows = Math.ceil(this._dom.offsetHeight / this.options.rowHeight) + 5;
    var numCols = Math.ceil(this._dom.offsetWidth / this.options.colWidth) + 5;

    numRows = numRows === 0 ? 1 : numRows;
    numCols = numCols === 0 ? 1 : numCols;

    var t = this;

    var row;

    for (var i = 0; i < numRows; i++) {
      row = new BentoTableRow(numCols, this.options.colWidth, this.options.rowHeight);
      //row.setClassName(isOddRow? 'odd' : 'even');
      this.pushRow(row, true);
    }

    this.header.setNumColumns(numCols, function (e) {
      table._headerCellClick(e);
    });
    this.header.onColumnResize(function (e) {
      table._onHeaderColumnResize(e)
    });

    this.ready = true;
  }
})();




var BentoTableHelper;

(function () {
  'use strict';

  // Public API
  BentoTableHelper = _BentoTableHelper;
  BentoTableHelper.prototype.applyTableOptions = applyTableOptions;
  BentoTableHelper.prototype.concatData = concatData;
  BentoTableHelper.prototype.getDataForRender = getDataForRender;
  BentoTableHelper.prototype.freezeRow = freezeRow;
  BentoTableHelper.prototype.getCellByIndex = getCellByIndex;
  BentoTableHelper.prototype.getColumnByIndex = getColumnByIndex;
  BentoTableHelper.prototype.getDataColunmIndex = getDataColunmIndex;
  BentoTableHelper.prototype.getNumCols = getNumCols;
  BentoTableHelper.prototype.getNumRows = getNumRows;
  BentoTableHelper.prototype.getRowByIndex = getRowByIndex;
  BentoTableHelper.prototype.init = init;
  BentoTableHelper.prototype.parseColumnDefinitions = parseColumnDefinitions;
  BentoTableHelper.prototype.removeColumnIndex = removeColumnIndex;
  BentoTableHelper.prototype.removeFrozenRecords = removeFrozenRecords;
  BentoTableHelper.prototype.renderCell = renderCell;
  BentoTableHelper.prototype.renderCellDefault = renderCellDefault;
  BentoTableHelper.prototype.renderFrozenCell = renderFrozenCell;
  BentoTableHelper.prototype.reset = reset;
  BentoTableHelper.prototype.sort = sort;
  BentoTableHelper.prototype.onRowClick = onRowClick;
  BentoTableHelper.prototype.unfreezeRow = unfreezeRow;
  BentoTableHelper.prototype.updateObjectsForRender = updateObjectsForRender;
  BentoTableHelper.prototype.fireRowClickCallbacks = fireRowClickCallbacks;

  // Private API
  BentoTableHelper.prototype._prepSort = _prepSort;

  function _BentoTableHelper(data, bentoTable, options, scope, compile, attrs) {
    var helper = this;
    // Class variables
    this._columnIndexRefArray = null;
    this._sorter = new BentoTableSort(bentoTable);

    // local variables
    this._cColumn = null;
    this._scope = scope;
    this._options = options;
    this._compile = compile;
    this._attrs = attrs;
    this._cColumnTemplate = null;
    this._columnTemplateStack = [];
    this._columnTypeObjs = {
      number  : new BentoTableNumberColumn(),
      default : new BentoTableDefaultColumn(),
      checkbox: new BentoTableCheckBoxColumn()
    };

    this._table = bentoTable;
    this._cellObj = null;
    this._rowObj = null;
    this._data = data;
    this._frozenRows = [];

    this._colWidthArray = [];
    this._colIndexArray = [];

    this._rowClickCallbacks = [];

    this._table.onRowClick(function(event){
      helper.fireRowClickCallbacks(event);
    });
  }

  /**
   * Initialization
   */
  function init(colOffset) {
    this._colOffset = colOffset? colOffset : 0;
    this.parseColumnDefinitions(this._data.columns);
  }

  /**
   * Get ordered data for render
   * @returns {*}
   */
  function getDataForRender(){
    return this._data.data;
  }


   /**
   * Reset helper
   */
  function reset(){
    this._cellObj = null;
    this._frozenRows = [];
    this._rowObj = null;
  }

  /**
   * Public function to add table row clicks
   * @param callback
   */
  function onRowClick(callback){
    this._rowClickCallbacks.push(callback);
  }

  function fireRowClickCallbacks(event){
    for(var i= 0, len=this._rowClickCallbacks.length; i<len; i++){
      this._rowClickCallbacks[i](event);
    }
  }

  /**
   * Concat two data arrays then return the new array
   * @param mainData
   * @param newData
   */
  function concatData(mainData, newData){
    return this._data.data = mainData.concat(newData);
  }

  /**
   * Remove frozen records from sourceData
   * IMPORTANT: sourceData needs to be sourced by tableCol
   * @param sourceData (array)
   * @param tableCol (number)
   */
  function removeFrozenRecords(sourceData, tableCol, desc){
    var col = this._data.columns[this.getDataColunmIndex(tableCol)].name,
        fRow, dRow, index, val
      ;
    // find the approx index for the match
    for(var i=0,len=this._frozenRows.length; i<len; i++){
      fRow = this._frozenRows[i];
      val = fRow[col];
      // Find the index to be removed
      index = this._sorter.findIndex(
        sourceData,
        function(l,r){
          if(desc){
            return l[col] >= val && val >= r[col];
          }else{
            return l[col] <= val && val <= r[col];
          }
        },
        function(f,l){
          if(desc){
            return f[col] < val || val < l[col];
          }else{
            return l[col] < val || val < f[col];
          }
        },
        true
      );


      // search linearly for the exact matching data since there might be multiple rows with the same col value
      while((dRow = sourceData[index]) && fRow[col] === dRow[col]){
        //found matching

        if(isEqual(fRow, dRow)){
          fRow['__btDataIndex'] = index;
          sourceData.splice(index,1);
          break;
        }
        index++;
      }
    }

    return sourceData;
  }

  // Check if two arrays are equal based on numbered indexes
  function isEqual(a,b){
    var equal = true;
    for (var i= 0, len= a.length; i<len; i++) {
      if(a[i] !== b[i]){
        equal = false;
        break;
      }
    }

    return equal;
  }

  /**
   * Freeze a row
   * @param row - row data object
   * @param noRender - do not render
   * @param mainData - (Array optional)
   */
  function freezeRow(row, noRender, mainData) {
    if (this._frozenRows.indexOf(row) > -1) {
      console.warn('Bento Table: This row is already frozen.');
      return;
    }

    // Remove row from base data
    var dataArray = mainData || this._data.data,
        index = dataArray.indexOf(row)
      ;

    dataArray.splice(index, 1);

    // Add a bookmark as the position in Data
    row['__btDataIndex'] = index;

    // Add row to the frozen row
    this._frozenRows.push(row);
    this._table.addFrozenRow();

    // Remove and add row size from rowSizes to frozenRowSizes in BentoTable
    this._table.frozenRowSizes.push(this._table.rowSizes.splice(index, 1)[0]);

    // Calculate row size indexes
    this._table.calcGridRowSizeArray(0, true);
    this._table.calcGridRowSizeArray(index);

    // Will render
    if (!noRender) {
      // Sort if necessary before rendering
      if (typeof this._sortedDataColIndex !== 'undefined') {
        var col = this._sortedDataColIndex;
        var data;
        if (this._sortedDesc) {
          //frozen rows
          data = this._sorter.sort(this._frozenRows, this._table.frozenRowSizes, function (a, b) {
            return a[col] < b[col];
          });
        } else {
          //frozen rows
          data = this._sorter.sort(this._frozenRows, this._table.frozenRowSizes, function (a, b) {
            return a[col] > b[col];
          });
        }

        this._frozenRows = data.rows;
        this._table.frozenRowSizes = data.rowSizes;
      }

      this._table.render();
      this._table.refreshScrollBars();
    }
  }

  /**
   * Unfreeze a row
   * @param row - row data object
   * @param mainData - (Array optional)
   */
  function unfreezeRow(row, noRender, mainData) {
    // Remove frozen row
    var index,
        rowSize,
        dataArray = mainData || this._data.data;
    ;
    index = this._frozenRows.indexOf(row);

    // The row doesn't exit in the frozen area
    if (index < 0) {
      console.warn('Bento Table: This row is already unfrozen.');
      return;
    }

    this._frozenRows.splice(index, 1);
    this._table.removeFrozenRow(index);
    rowSize = this._table.frozenRowSizes.splice(index, 1)[0];

    // Add back to data
    // Condition 1: check if there is a sort -> use b-search to insert
    // Condition 2: No Sort

    //[Condition 1]
    if (typeof this._sortedDataColIndex !== 'undefined') {
      var col = this._sortedDataColIndex
        ;
      // Descending
      if (this._sortedDesc) {
        index = this._sorter.findIndex(dataArray, function (a, b) {
            return a[col] >= row[col] && row[col] >= b[col];
          },
          function (a, b) {
            // too small
            if (row[col] > a[col]) {
              return -1;
            } else
            // too big
            if (row[col] < b[col]) {
              return 1;
            } else {
              return 0
            }
          }
        );

      }
      // Ascending
      else {
        index = this._sorter.findIndex(dataArray, function (a, b) {
            return a[col] <= row[col] && row[col] <= b[col];
          },
          function (a, b) {
            // too small
            if (row[col] < a[col]) {
              return -1;
            } else
            // too big
            if (row[col] > b[col]) {
              return 1;
            } else {
              return 0
            }
          });
      }
    } else
    // [Condition 2]
    // insert the row back to its original location in the data array
    // no need to worry about the sorting for now because it'll be resorted
    if (typeof row['__btDataIndex'] !== 'undefined') {
      index = row['__btDataIndex'];
    } else {
      index = 0;
    }

    delete row['__btDataIndex'];
    // Insert the row back and update the rowSize
    dataArray.splice(index, 0, row);
    this._table.rowSizes.splice(index, 0, rowSize);

    // Calculate row size indexes
    this._table.calcGridRowSizeArray(0, true);
    this._table.calcGridRowSizeArray(index);

    if (!noRender) {
      this._table.render();
      this._table.refreshScrollBars();
    }
  }

  /**
   * Renders an object to BentoCell
   * @param cell - (BentoCell) cell to be rendered
   *
   * This will be overridden based on the type of the object
   */
  function renderCell(cell) {
    if(this.updateObjectsForRender(cell, false)) {
      this.renderCellDefault(cell);
      cell.parent.applyClasses();
    }
  }

  /**
   * Render a frozen cell from frozen row array
   * @param cell
   */
  function renderFrozenCell(cell) {
    if(this.updateObjectsForRender(cell, true)) {
      this.renderCellDefault(cell);
      cell.parent.applyClasses();
    }
  }

  /**
   * Most default cell dom rendering based on template and other column types
   * @param cell
   */
  function renderCellDefault(cell) {
    if (this._cColumn.type === 'template' && !!this._cColumn.template) {
      this._cColumnTemplate = this._columnTemplateStack[this._cColumn.template];
      // Create custom template the first time
      if (typeof this._cColumnTemplate === 'undefined') {
        this._cColumnTemplate = new BentoTableCellTemplateColumn(this._scope, this._compile, this._attrs.bentoTable);
        this._cColumnTemplate.setTemplate(document.getElementById(this._cColumn.template).textContent);
        this._columnTemplateStack[this._cColumn.template] = this._cColumnTemplate;
      }
      //use template to render
      this._cColumnTemplate.applyContentToCell(this._cellObj, cell, this._rowObj);
    } else if (!!this._cColumn.type && this._columnTypeObjs[this._cColumn.type]) {
      this._columnTypeObjs[this._cColumn.type].applyContentToCell(this._cellObj, cell);
    } else {
      this._columnTypeObjs.default.applyContentToCell(this._cellObj, cell);
    }
  }

  /**
   * Prepare objects for cell render
   * @param cell
   * @param isFrozen
   * @returns {boolean} - OK to render
   */
  function updateObjectsForRender(cell, isFrozen) {
    var col = cell.col;
    if(this._cColumn = this.getColumnByIndex(col)) {
      this._rowObj = this.getRowByIndex(cell.row, isFrozen);
      this._cellObj = this.getCellByIndex(cell.row, this._cColumn, isFrozen);
      return true;
    }else{
      return false;
    }
  }

  /**
   * Sort data based on the colIndex and order
   * @param colIndex (number)
   * @param desc (bool)
   * @param isInfiniteScroll (bool)
   */
  function sort(colName, desc, isInfiniteScroll) {
    var col = colName,
        data, frozenData
      ;
    this._prepSort(col, desc);
    // descending sort
    if (desc) {
      if(!isInfiniteScroll) {
        data = this._sorter.sort(this._data.data, this._table.rowSizes, function (a, b) {
          return a[col] < b[col];
        });
      }

      //frozen rows
      frozenData = this._sorter.sort(this._frozenRows, this._table.frozenRowSizes, function (a, b) {
        return a[col] < b[col];
      });
    }
    // ascending sort
    else {
      if(!isInfiniteScroll) {
        data = this._sorter.sort(this._data.data, this._table.rowSizes, function (a, b) {
          return a[col] > b[col];
        });
      }

      //frozen rows
      frozenData = this._sorter.sort(this._frozenRows, this._table.frozenRowSizes, function (a, b) {
        return a[col] > b[col];
      });
    }

    if(!isInfiniteScroll) {
      this._data.data = data.rows;
      this._table.rowSizes = data.rowSizes;
    }else{
      this._data.data = [];
      this._table.rowSizes = [];
    }

    this._frozenRows = frozenData.rows;
    this._table.frozenRowSizes = frozenData.rowSizes;
  }

  /**
   * Prepare for sorting
   * This function will store sorting config for later use this function needs to be called
   * everytime when a sort is fired, even it is an override function
   * Will be used by the follow functions:
   *  - unfreezeRow
   *
   * @param col
   * @param desc
   * @private
   */
  function _prepSort(col, desc) {
    this._sortedDataColIndex = col;
    this._sortedDesc = desc;
  }

  /**
   * Get a row data array by row index
   * @param rowIndex
   * @returns {*} - row data array
   */
  function getRowByIndex(rowIndex, isFrozen) {
    return isFrozen ? this._frozenRows[rowIndex] : this._data.data[rowIndex];
  }

  /**
   * Get Column object based on the table column index
   * @param colIndex
   * @returns {*}
   */
  function getColumnByIndex(colIndex) {
    return this._data.columns[this._columnIndexRefArray[colIndex]];
  }

  /**
   * Get a cell data object from Table row and column indexes
   * @param rowIndex
   * @param colIndex
   * @returns {*}
   */
  function getCellByIndex(rowIndex, columnObj, isFrozen) {
    return this.getRowByIndex(rowIndex, isFrozen)[columnObj.name];
  }

  /**
   * Get total rows for table to render
   * @returns {number}
   */
  function getNumRows() {
    return this._data.data.length;
  }

  /**
   * Gets the total number of columns that should be rendered
   * @returns {number}
   */
  function getNumCols() {
    return this._columnIndexRefArray.length;
  }

  /**
   * Remove Column index from reference
   * @param colIndex
   */
  function removeColumnIndex(colIndex) {
    var index = this._columnIndexRefArray.indexOf(colIndex);
    if (index > -1) {
      this._columnIndexRefArray.splice(index, 1);
    }
  }

  /**
   * Return an original column index from the table index
   * @param tableColumnIndex
   * @returns {number}
   */
  function getDataColunmIndex(tableColumnIndex) {
    return this._columnIndexRefArray[tableColumnIndex];
  }

  /**
   * Apply options to table
   */
  function applyTableOptions() {
    // Update initial column width
    this._table.setColumnWidth(this._colIndexArray, this._colWidthArray);

    this._colIndexArray = null;
    this._colWidthArray = null;

    delete this._colIndexArray;
    delete this._colWidthArray;
  }

  /**
   * Parse columns based on the `hide` prameters
   * @param columns
   */
  function parseColumnDefinitions(columns) {
    this._columnIndexRefArray = [];
    var colDef, i, len;
    var offsetColWidth = this._options.rowSelectColumnWidth? this._options.rowSelectColumnWidth : 40;


    if(this._colOffset > 0){
      for(i=0,len=this._colOffset; i<len; i++){
        this._colIndexArray.push(0); // spacer
        this._colWidthArray.push(offsetColWidth); // default
        this._columnIndexRefArray.push(0);
      }
    }


    for (i = 0, len = columns.length; i < len; i++) {
      colDef = columns[i];
      if (colDef.hide !== true) {

        if (colDef.width && colDef.width > 0) {
          this._colIndexArray.push(this._columnIndexRefArray.length);
          this._colWidthArray.push(colDef.width);
        }
        this._columnIndexRefArray.push(i);
      }
    }
  }
})();
var bentoTableApp = bentoTableApp;

(function(angular){

  bentoTableApp = bentoTableApp || angular.module('bento.table',[]);

  bentoTableApp
    .factory('tableFacotry', function(){
      return{
        /**
         * Build sort object for the controller to use
         * @param sortAttr
         * @param header
         *
         * sortAttr needs to be either a Boolean or an Object
         *
         * Boolean: decides if all the columns are sortable or not
         *
         * Object:
         *    -
         *
         */
        buildSortOptions : function(sortAttr, header){

          if(typeof header != 'undefined' && header) {

            var sortOptions = [];
            var noSortArray = [];
            var initSort = {
              column : -1,
              direction: 'asc'
            };


            //Get the noSort reference ready
            if(typeof sortAttr.noSort != 'undefined'){
              var noSortData = sortAttr.noSort.splice(',');
              for(var i = 0; i < noSortData.length; i++){
                noSortArray[parseInt(noSortData[i])] = true;
              }
            }

            //See if there is an initial sort value specified
            if(typeof sortAttr.initSort != 'undefined'){
              initSort.column = parseInt(sortAttr.initSort.column);
              initSort.direction = (sortAttr.initSort.direction == 'desc') ? 'desc' : 'asc';
            }

            //Construct the confuguration
            for(var i = 0; i < header.length; i++) {
              var option = {};

              if (typeof sortAttr == 'boolean') {
                option.sortable = sortAttr;
              } else if (typeof sortAttr == 'object') {
                option.sortable = (noSortArray[i] === true) ? false : true;
              } else {
                option.sortable = true;
              }

              sortOptionspush(option);

            }

            return {
              initSort : iniSort,
              options  : sortOptions
            };

          }
        }
      }

    });

})(window.angular);

/**
 * Constructor
 * @param data
 * @param bentoTable
 * @param options
 * @param scope
 * @param $compile
 * @param attrs
 * @private
 */
function BentoTableGroupingHelper(data, bentoTable, options, scope, $compile, attrs) {
  BentoTableHelper.apply(this, arguments);
  var helper = this;

  // Variables
  this._groupingArray = null; // Array to sort groups in group hierarchy
  this._rowRefArray = null; // Main reference to show what is in the table viewport in order
  this._groupColName = null;  // Column index that is actually grouping the whole table
  this._table = bentoTable; // table reference to (BentoTable) object
  this._dataSize = this._data.data.length;

  this._table.onRowClick(function (event) {
    helper._onRowClick(event)
  });

  // Private constant label variables
  var uid = [Math.round(Math.random()*100000),Math.round(Math.random()*100000)].join('');
  this._labelBTDataIndex = ['__btDataIndex',uid].join('');
  this._labelBTGroupParent = ['_btGroupParent',uid].join('');
  this._labelBTRowRefDataIndex = ['__btRowRefDataIndex',uid].join('');
  this._labelBTGroupMember = ['_btGroupMember',uid].join('');
}

(function () {
  'use strict';
  // Inherit from BentoTableHelper
  BentoTableGroupingHelper.prototype = Object.create(BentoTableHelper.prototype);
  BentoTableGroupingHelper.prototype.constructor = BentoTableGroupingHelper;

  //Method Overrides
  BentoTableGroupingHelper.prototype.getRowByIndex = getRowByIndex;
  BentoTableGroupingHelper.prototype.getCellByIndex = getCellByIndex;
  BentoTableGroupingHelper.prototype.getDataForRender = getDataForRender;
  BentoTableGroupingHelper.prototype.getNumRows = getNumRows;
  BentoTableGroupingHelper.prototype.renderCell = renderCell;
  BentoTableGroupingHelper.prototype.concatData = concatData;
  BentoTableGroupingHelper.prototype.sort = sort;
  BentoTableGroupingHelper.prototype.freezeRow = freezeRow;
  BentoTableGroupingHelper.prototype.unfreezeRow = unfreezeRow;
  BentoTableGroupingHelper.prototype.fireRowClickCallbacks = fireRowClickCallbacks;
  BentoTableGroupingHelper.prototype.getParentVariableName = getParentVariableName;

  //New Method
  BentoTableGroupingHelper.prototype.setGrouping = setGrouping;
  BentoTableGroupingHelper.prototype.expandRow = expandRow;
  BentoTableGroupingHelper.prototype.collapseRow = collapseRow;

  //Private Methods
  BentoTableGroupingHelper.prototype._buildRowRefArray = _buildRowRefArray;
  BentoTableGroupingHelper.prototype._onRowClick = _onRowClick;
  

  /**
   * Expose group parent variable for other helpers to use
   * @returns {string|*|BentoTableGroupingHelper._labelBTGroupParent}
   */
  function getParentVariableName(){
    return this._labelBTGroupParent;
  }
  
  /**
   * Freeze a row and it needs to be a group-member
   * @param row
   * @param noRender - do not render
   * @param mainData - (Array optional)
   */
  function freezeRow(row, noRender) {
    if (typeof row === 'object') {
      if (this._frozenRows.indexOf(row) > -1) {
        console.warn('Bento Table: This row is already frozen.');
        return;
      }

      this._frozenRows.push(row);

      // Remove row from base data
      var
        index
        ;

      if (row[this._labelBTGroupParent]) {
        row[this._labelBTDataIndex] = row[this._labelBTGroupParent].removeMember(row);
      } else {
        index = this._groupingArray.indexOf(row);
        this._groupingArray.splice(index, 1);
        row[this._labelBTDataIndex] = index;
        row[this._labelBTRowRefDataIndex] = this._rowRefArray.indexOf(row);
      }

      index = this._rowRefArray.indexOf(row);
      this._table.addFrozenRow();

      this._rowRefArray.splice(index, 1);
      this._table.removeRow(index, 1);

      // TODO: update the sizes

    } else {
      console.warn('Bento Table: Can not freeze a group.');
    }
  }

  /**
   * Unfreeze a row and put it back to the group
   * @param row
   */
  function unfreezeRow(row) {
    if(this._frozenRows.indexOf(row) === -1){
      console.warn('Bento Table: this row is not frozen.')
      return;
    }

    var index, col;
    // This row is part of a group
    if (row[this._labelBTGroupParent]) {

      var group = row[this._labelBTGroupParent];

      if(typeof this._sortedDataColIndex !== 'undefined'){
        col = this._sortedDataColIndex;
        if(this._sortedDesc){
          index = this._sorter.findIndex(
            group.members,
            function(a, b) {
              return a[col] >= row[col] && row[col] >= b[col];
            },
            function(a, b){
              if(a[col] < row[col]){
                return -1;
              }
              if(b[col] > row[col]){
                return 1;
              }
              return 0;
            }
          );
        }else{
          index = this._sorter.findIndex(
            group.members,
            function(a, b){
              return a[col] <= row[col] && row[col] <= b[col];
            },
            function(a, b){
              if(a[col] > row[col]){
                return -1;
              }
              if(b[col] < row[col]){
                return 1;
              }
              return 0;
            }
          );
        }
        group.addMember(row, index, this._labelBTGroupParent);
      }else{
        // not sorted
        group.addMember(row,row[this._labelBTDataIndex], this._labelBTGroupParent);
      }

      this._buildRowRefArray();

      if (group.isExpanded) {
        index = this._rowRefArray.indexOf(group);
        this._table.addRow(index==0 ? 0 :index-1, 1);
      }else{
        this._table.render();
      }
    }
    else {

      // This is an independent row
      if(typeof this._sortedDataColIndex !== 'undefined'){

        col = this._sortedDataColIndex;
        if(this._sortedDesc){
          index = this._sorter.findIndex(
            this._groupingArray,
            function(a, b) {
              if(a instanceof BentoTableGroupingRow){
                a = (a.row) ? a.row[col] : a.name;
              }else{
                a = a[col];
              }
              if(b instanceof BentoTableGroupingRow){
                b = (b.row) ? b.row[col] : b.name;
              }else{
                b = b[col]
              }
              return a >= row[col] && row[col] >= b;
            },
            function(a, b){
              if(a instanceof BentoTableGroupingRow){
                a = (a.row) ? a.row[col] : a.name;
              }else{
                a = a[col];
              }
              if(b instanceof BentoTableGroupingRow){
                b = (b.row) ? b.row[col] : b.name;
              }else{
                b = b[col]
              }

              if(a < row[col]){
                return -1;
              }
              if(b > row[col]){
                return 1;
              }
              return 0;
            }
          );
        }else{
          index = this._sorter.findIndex(
            this._groupingArray,
            function(a, b){
              if(a instanceof BentoTableGroupingRow){
                a = (a.row) ? a.row[col] : a.name;
              }else{
                a = a[col];
              }
              if(b instanceof BentoTableGroupingRow){
                b = (b.row) ? b.row[col] : b.name;
              }else{
                b = b[col]
              }
              return a <= row[col] && row[col] <= b;
            },
            function(a, b){
              if(a instanceof BentoTableGroupingRow){
                a = (a.row) ? a.row[col] : a.name;
              }else{
                a = a[col];
              }

              if(b instanceof BentoTableGroupingRow){
                b = (b.row) ? b.row[col] : b.name;
              }else{
                b = b[col]
              }

              if(a > row[col]){
                return -1;
              }
              if(b < row[col]){
                return 1;
              }
              return 0;
            }
          );
        }
        this._groupingArray.splice(index, 0, row);
      }else{
        // not sorted
        index = row[this._labelBTRowRefDataIndex]? row[this._labelBTRowRefDataIndex] : 0;
        this._groupingArray.splice(row[this._labelBTRowRefDataIndex], 0, row);
      }

      this._buildRowRefArray();
      // insert this row back to refArray
      this._table.addRow(index, 1);
    }

    delete row[this._labelBTDataIndex];
    delete row[this._labelBTRowRefDataIndex];

    this._frozenRows.splice(this._frozenRows.indexOf(row),1);
    this._table.removeFrozenRow();
    this._table.render();
    this._table.refreshScrollBars();
  }

  /**
   * Concat new data to the main data
   * @param data
   * @param newData
   * @returns {*}
   */
  function concatData(mainData, newData) {
    //We need to update _groupingArray and _rowRefArray with new rows
    // Grouping process
    this._data.data = mainData.concat(newData);
    this.setGrouping(this._data.data, this._options.group.by, this._options.group.expanded, this._options.group.referencingTo);
    return this._data.data;
  }

  /**
   * Fires row click
   * @param event
   * @private
   */
  function fireRowClickCallbacks(event) {
    // Find current col of clicked row

    // We do not fire row click even on group header rows
    var colIndex = __findColFromRowClick(event);
    if (colIndex === false || (event.row.hasClass('bt-group') && colIndex >= this._colOffset)) {
      return;
    }

    BentoTableHelper.prototype.fireRowClickCallbacks.call(this, event);
  }

  /**
   * Helper function to find the col index that is clicked on a row
   * @param event
   */
  function __findColFromRowClick(event){
    var obj = event.target;
    while(obj && typeof obj.cell === 'undefined'){
      obj = obj.parentElement;
    }

    return obj ? obj.cell.col: false;
  }

  /**
   * Returns a data array for render (override)
   * @returns {*}
   */
  function getDataForRender(){
    return this._rowRefArray;
  }

  /**
   * Handles events when a row is clicked
   * @param event
   */
  function _onRowClick(event) {
    // we do not expand or collapse row if clicked col is in the column offset indexes
    var colIndex = __findColFromRowClick(event);
    if(colIndex === false || (__findColFromRowClick(event) < this._colOffset)){
      return
    }

    var row = event.row;

    // This row needs to be a group header
    // AND the first column is clicked
    if (row.hasClass('bt-group')) {
      // Expand and Collapse Row for row grouping
      row.toggleClass('bt-group-expanded');
      if (row.hasClass('bt-group-expanded')) {
        this.expandRow(event.rowIndex);
      } else {
        this.collapseRow(event.rowIndex);
      }
    }

    event.preventDefault();
    event.stopPropagation();
  }

  /**
   * Renders an object to BentoCell
   * @param cell - (BentoCell) cell to be rendered
   *
   * This will be overridden based on the type of the object
   */
  function renderCell(cell) {
    this.updateObjectsForRender(cell, false);

    if (this._rowObj instanceof BentoTableGroupingRow) {
      // clear
      if (cell.col-this._colOffset === 0) {
        cell.parent.removeClass('bt-group-member',true);
        cell.parent.addClass('bt-group', true);

        cell.addClass('bt-group-row-head', true);
        if (this._rowObj.isExpanded) {
          cell.parent.addClass('bt-group-expanded', true);
        }
        if (this._rowObj.row) {
          cell.parent.addClass('bt-group-leader', true);
          this.renderCellDefault(cell);
        } else {
          cell.html(this._rowObj.name);
        }
      } else {

        cell.removeClass('bt-row-head', true);
        // only render for group leader row
        if (this._rowObj.row) {
          this.renderCellDefault(cell);
        }
      }
    } else {
      cell.parent.removeClass('bt-group', true);
      cell.parent.removeClass('bt-group-expanded', true);
      cell.parent.removeClass('bt-group-leader', true);
      try {
        if (this._rowObj[this._labelBTGroupMember]) {
          cell.parent.addClass('bt-group-member', true);
            if (cell.col-this._colOffset === 0) {
                cell.addClass('bt-group-row-head', true);
            }else{
                cell.removeClass('bt-group-row-head', true);
            }
        }else{
          if (cell.col-this._colOffset === 0) {
            cell.parent.removeClass('bt-group-member', true);
          }
        }
      }catch(e){
        console.error(e);
      }
      this.renderCellDefault(cell);
    }

    cell.parent.applyClasses();
  }

  /**
   * Sort the current grouped table
   * @param this._sorter - (BentoTableSort) object
   * @param colName - (number) column index that needs to be sorted
   * @param desc - (bool) Descending
   */
  function sort(colName, desc) {
    var cIndex = colName;
    var i, len, group;
    this._prepSort(colName, desc);
    // descending sort
    if (desc) {
      // sort grouping array
      this._groupingArray = this._sorter.sort(this._groupingArray, null, function (a, b) {

        if (a instanceof BentoTableGroupingRow) {
          a = (a.row) ? a.row[cIndex] : a.name;
        } else {
          a = a[cIndex]
        }

        if (b instanceof BentoTableGroupingRow) {
          b = (b.row) ? b.row[cIndex] : b.name;
        } else {
          b = b[cIndex]
        }

        return a < b;
      }).rows;

      // sort the members in each group
      for (i = 0, len = this._groupingArray.length; i < len; i++) {
        group = this._groupingArray[i];
        if (group instanceof BentoTableGroupingRow) {
          group.members = this._sorter.sort(group.members, null,function (a, b) {
            return a[cIndex] < b[cIndex];
          }).rows;
        }
      }

    }
    // ascending sort
    else {
      // sort grouping array
      this._groupingArray = this._sorter.sort(this._groupingArray, null,function (a, b) {

        if (a instanceof BentoTableGroupingRow) {
          a = (a.row) ? a.row[cIndex] : a.name;
        } else {
          a = a[cIndex]
        }

        if (b instanceof BentoTableGroupingRow) {
          b = (b.row) ? b.row[cIndex] : b.name;
        } else {
          b = b[cIndex]
        }

        return a > b;
      }).rows;

      // sort the members in each group
      for (i = 0, len = this._groupingArray.length; i < len; i++) {
        group = this._groupingArray[i];
        if (group instanceof BentoTableGroupingRow) {
          group.members = this._sorter.sort(group.members, null, function (a, b) {
            return a[cIndex] > b[cIndex];
          }).rows;
        }
      }
    }

    // Rebuild `rowRefArray` for redering
    this._buildRowRefArray();
  }

  /**
   * Get cell by given row and column indexes
   * @param col
   * @param rowIndex
   * @returns {BentoTableGroupingRow || cell || null}
   */
  function getCellByIndex(rowIndex, col, isFrozen) {
    var row = isFrozen ? this._frozenRows[rowIndex] : this._rowRefArray[rowIndex];

    if (row instanceof BentoTableGroupingRow) {
      if (row.row) {
        return row.row[col.name];
      } else {
        if (col === 0) {
          return row.name;
        } else {
          return null;
        }
      }
    } else {
      try {
        return row[col.name];
      } catch (e) {
        console.error(e);
      }
    }
  }

  /**
   * Expand a row
   * @param rowIndex
   *
   * rowIndex has to reference to a BentoTableGroupingRow
   */
  function expandRow(rowIndex) {
    var group = this._rowRefArray[rowIndex];
    if (group instanceof BentoTableGroupingRow && !group.isExpanded) {
      var i,
          length = group.members.length;
      group.isExpanded = true;

      for (i = 0; i < length; i++) {
        this._rowRefArray.splice(rowIndex + 1 + i, 0, group.members[i]);
      }

      this._table.addRow(rowIndex, length);
    }
  }

  /**
   * Collapse a row
   * @param rowIndex
   *
   * rowIndex has to reference to a BentoTableGroupingRow
   */
  function collapseRow(rowIndex) {
    var group = this._rowRefArray[rowIndex];
    if (group instanceof BentoTableGroupingRow && group.isExpanded) {
      var i,
          length = group.members.length;
      group.isExpanded = false;
      for (i = 0; i < length; i++) {
        this._rowRefArray.splice(rowIndex + 1, 1);
      }

      this._table.removeRow(rowIndex, length);
    }
  }

  /**
   * Setup grouping references and indexes
   * @param groupBy - (number) Column Index
   * @param isExpanded - (bool) Check if all groups are expanded or not
   * @param groupedByColumnContent - (bool) check if grouping is based on who column content is
   * @param groupFlag
   *
   * We do one group for now
   */
  function setGrouping(sourceData, groupBy, isExpanded, referencingTo) {
    var tempArray = [], groupByObj, type, i, length, row;
    this._groupColName = groupBy;

    this._groupingArray = [];

    // Grouping
    length = sourceData.length;

    // There is parent / child relationship
    if (typeof referencingTo !== 'undefined') {
      /*
       Logic: 3 step approach
       1. Create an array with all children rows categorized by parent referencingTo parameter
       2. Create an array with all isolated rows
       3. Combine the two array with parent-child relationship
       */
      var childrenArray = [];
      var childArray;
      // Separate children and parent-to-bes
      for (i = 0; i < length; i++) {
        row = sourceData[i];
        groupByObj = row[this._groupColName];
        type = typeof groupByObj;

        if ((type === 'number') || (type === 'string' && groupByObj.length > 0)) {
          childArray = childrenArray[groupByObj];
          if (typeof childArray === 'undefined') {
            childArray = [];
            childrenArray[groupByObj] = childArray;
          }
          // Mark this row as a member
          row[this._labelBTGroupMember] = true;
          childArray.push(row);
        } else {
          tempArray.push(row);
        }
      }

      // Combine the two arrays
      var childrenGroup;
      for (i = 0, length = tempArray.length; i < length; i++) {
        row = tempArray[i];
        if (childrenArray[row[referencingTo]]) {
          childrenGroup = childrenArray[row[referencingTo]];
          childrenGroup['_tempGroupLeader'] = true;
          childrenGroup['_leader'] = row;
          row['_btGroup'] = true;
          tempArray[i] = childrenGroup;
        }
      }
    }
    else {
      for (i = 0; i < length; i++) {
        row = sourceData[i];
        groupByObj = row[this._groupColName];
        if (typeof tempArray[groupByObj] === 'undefined') {
          tempArray[groupByObj] = [];
          tempArray[groupByObj]['_tempGroupLeader'] = true;
        }
        row[this._labelBTGroupMember] = true;
        tempArray[groupByObj].push(row);
      }
    }

    // Put Grouping to index
    var group, groupArr;
    for (var key in tempArray) {
      groupArr = tempArray[key];
      if (Array.isArray(groupArr) && groupArr['_tempGroupLeader']) {
        group = new BentoTableGroupingRow(key, isExpanded);
        group.addMembers(tempArray[key], this._labelBTGroupParent);
        if (groupArr['_leader']) {
          group.row = groupArr['_leader'];
        }
      } else {
        // There is no children
        group = groupArr;
      }
      // Using array since it's faster than Object referencing
      this._groupingArray.push(group);
    }

    // Build RefArray
    this._buildRowRefArray();

    // Remove column index that's been grouped by
    this.removeColumnIndex(groupBy);
  }

  /**
   * Get number of rows
   * @returns {number}
   */
  function getNumRows() {
    //check if row is changed
    if (this._dataSize !== this._data.data.length) {
      // update reference array

      this._dataSize = this._data.data.length;
    }

    return this._rowRefArray.length;
  }

  /**
   * Return row object from Data by new rowNumber
   * @param rowNum (number)
   */
  function getRowByIndex(rowIndex, isFrozen) {
    return isFrozen ? this._frozenRows[rowIndex] : this._rowRefArray[rowIndex];
  }

  // Private functions
  /**
   * Build this._rowRefArray for table rendering
   */
  function _buildRowRefArray() {
    this._rowRefArray = [];

    for (var i = 0, length = this._groupingArray.length, group; i < length; i++) {
      group = this._groupingArray[i];
      this._rowRefArray.push(group);
      if (group.isExpanded) {
        for (var j = 0, lengthJ = group.members.length; j < lengthJ; j++) {
          this._rowRefArray.push(group.members[j]);
        }
      }
    }
  }
})();

var BentoTableGroupingRow;

(function(){
  'use strict';

  BentoTableGroupingRow = b;
  b.prototype.addMember = addMember;
  b.prototype.addMembers = addMembers;
  b.prototype.removeMember = removeMember;

  /**
   * Constructor
   * @param name
   * @param isExpanded
   */
  function b(name, isExpanded) {
    this.name = name;
    this.members = [];
    this.isExpanded = isExpanded;
    this.row = null; // init row
  }

  /**
   * Removing a member from this group
   * @param member
   * @returns {boolean}
   */
  function removeMember(member) {
    var index = this.members.indexOf(member);

    if(index > -1){
      this.members.splice(index,1);
      return index;
    }else{
      return false;
    }
  }

  /**
   * Adding a member to this group
   * @param member (*)
   */
  function addMember(member, index, parentLabel) {
    member[parentLabel] = this;

    if(typeof index !== 'undefined'){
      // Put the member back to `index` position in this group
      this.members.splice(index,0,member);
    }else {
      this.members.push(member);
    }
  }

  /**
   * Adding multiple members to this group
   * @param members (array)
   */
  function addMembers(members, parentLabel) {
    for(var i= 0, len=members.length; i<len; i++){
      members[i][parentLabel] = this;
    }
    this.members = this.members.concat(members)
  }
})();



function BentoTableHeader(width, height, options) {
  'use strict';

  var h = this;

  // API
  h.setNumColumns = setNumColumns;
  h.reset = reset;
  h.renderCell = renderCell;
  h.onColumnResize = onColumnResize;
  h.removeFrozenRow = removeFrozenRow;
  h.addFrozenRow = addFrozenRow;
  h.onRowClick = onRowClick;
  h.frozenRows = [];
  this.options = options;

  init();

  var resizeBar;
  var _columnResizeCallbackStack = [];
  var _rowClickCallback = [];
  var isResizing = false;

  /**
   * Remove header classes and frozen rows
   */
  function reset(){
    this.frozenRows.forEach(function(row){
      row.remove();
    });
    h.row.removeClass('bt-row-selected');

    var fCell = h.row.getFirstCell();
    var tempCell = fCell;

    do{
      tempCell.top = tempCell.bottom = tempCell;
      tempCell = tempCell.right;
    }
    while(tempCell !== fCell)
  }

  /**
   * Append row click callback to stack
   * @param callback
   */
  function onRowClick(callback) {
    _rowClickCallback.push(callback);
  }

  function _onRowClick(event) {
    var i, len,
        rows = h.dom.querySelectorAll('.bt-frozen-row');
    ;
    event.isFrozen = true;

    for (i = 0, len = rows.length; i < len; i++) {
      if (rows.item(i) === event.currentTarget) {
        event.rowIndex = i;
        break;
      }
    }

    for (i = 0, len = _rowClickCallback.length; i < len; i++) {
      _rowClickCallback[i](event);
    }
  }

  /**
   * Render a header cell
   * @param headerCell
   * @param colOffset
   */
  function renderCell(headerCell, colObj,scope,compile) {

    headerCell.html(colObj.label);

    /* IE issue with the cache */
    /*if(typeof this._headerCellCache === 'undefined'){
      this._headerCellCache = [];
    }

    if(this._headerCellCache[headerCell.col]){
      console.log('doing cache', this._headerCellCache[headerCell.col]);
      headerCell.html(this._headerCellCache[headerCell.col][0]);
    }else{
      var cellDOM = angular.element(['<div>',colObj.label,'</div>'].join(''));
      compile(cellDOM)(scope);
      this._headerCellCache[headerCell.col] = cellDOM;
      headerCell.html(cellDOM[0]);
    }*/
  }

  /**
   * Remove a frozen row
   */
  function removeFrozenRow(index) {
    var index = index ? index : 0;
    // Remove only when there is at least one frozen row
    var rows = h.dom.querySelectorAll('.bt-frozen-row'),
        rowToRemove = rows[index];
    if (rowToRemove) {
      h.frozenRows.splice(index,1);
      rowToRemove.parentElement.removeChild(rowToRemove);
      rowToRemove.removeEventListener('click', _onRowClick);
      // According to BentoTableRow API
      // destroy() will relinke the top and bottom cells
      rowToRemove.row.destroy();

      for(var i=index,len= h.frozenRows.length; i<len; i++){
        h.frozenRows[i].row = i;
      }
    }
  }

  /**
   * Add a frozen row
   */
  function addFrozenRow() {
    var numCol = h.row.dom.childElementCount;
    var newRow = new BentoTableRow(numCol, width, height);
    newRow.addClass('bt-frozen-row');
    newRow.dom.addEventListener('click', _onRowClick);

    // Add row DOM
    h.dom.appendChild(newRow.dom);

    newRow.row = h.frozenRows.length;
    h.frozenRows.push(newRow);

    // Link row
    var headerCells = h.row.dom.children;
    var rowCells = newRow.dom.children;
    for (var i = 0, len = headerCells.length, hCell, rCell; i < len; i++) {
      hCell = headerCells[i].cell;
      rCell = rowCells[i].cell;
      hCell.top.bottom = rCell;
      rCell.top = hCell.top;
      hCell.top = rCell;
      rCell.bottom = hCell;
    }
  }

  /**
   * Set number of columns for this header
   * @param num
   * @param clickCallback
   */
  function setNumColumns(num, clickCallback) {
    if (typeof h.row === 'undefined') {
      h.row = new BentoTableRow(num, width, height, clickHijack(clickCallback), true); // start with one cell
      h.dom.appendChild(h.row.dom);

      // Add touch down events
      var cells = h.row.dom.children,
          cellDom;
      for (var i = 0; i < cells.length; i++) {
        cellDom = cells[i];
        cellDom.addEventListener('touchstart', onCellMouseDown);
        cellDom.addEventListener('mousedown', onCellMouseDown);
        cellDom.cell.top = cellDom.cell;
        cellDom.cell.bottom = cellDom.cell;
      }
    }
    else {
      var dCount = num - h.row.getNumCells();
      var cell;
      if (dCount > 0) {
        for (var i = 0; i < dCount; i++) {
          cell = new BentoTableCell(h.row, true);
          cell.dom.addEventListener('touchstart', onCellMouseDown);
          cell.dom.addEventListener('mousedown', onCellMouseDown);
          cell.top = cell;
          cell.bottom = cell;
          h.row.push(cell, true, clickHijack(clickCallback));
        }
      }
    }
  }

  /**
   * Hijack Header callbacks
   * @param callback
   * @returns {Function}
   */
  function clickHijack(callback) {
    if (callback) {
      return function (event) {
        // It was a resizing
        // no need to fire callback
        if (isResizing) {
          isResizing = false;
        } else {
          callback(event)
        }
      }
    }
  }

  function onColumnResize(callback) {
    _columnResizeCallbackStack.push(callback);
  }

  // Event Listeners
  var oldX, dX, localX, cellX;
  var cellBoundry, cellRightBound, resizingCol;

  function onCellMouseDown(event) {
    event.preventDefault();
    event.stopPropagation();
    resizingCol = event.currentTarget; // Type: Cell.dom
    cellBoundry = resizingCol.getBoundingClientRect();
    cellRightBound = cellBoundry.left + cellBoundry.width;

    //Check if user click the most right 8px of this header cell
    if (event.pageX > cellRightBound - 8 && event.pageX <= cellRightBound && h.options.resize) {
      window.addEventListener('touchmove', onHeaderMouseMouse);
      window.addEventListener('mousemove', onHeaderMouseMouse);
      window.addEventListener('touchend', onHeaderMouseUp);
      window.addEventListener('mouseup', onHeaderMouseUp);
      oldX = event.pageX;
      dX = true;
    }
  }

  function onHeaderMouseMouse(event) {
    cellX = event.pageX - cellBoundry.left;
    // not allowing the cell to be 50px or less wide
    if (cellX < 50) {
      return;
    }

    dX = event.pageX - oldX;
    oldX = event.pageX;
    //show bar
    if (resizeBar.style.display === 'none') {
      resizeBar.style.display = 'block';
      h.dom.setAttribute('data-resizing', '1');
    }

    localX = resizingCol.offsetLeft + cellX;
    resizeBar.style.left = localX;

    event.preventDefault();
    event.stopPropagation();
  }

  function onHeaderMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();

    // Fire resize callback
    if (typeof dX === 'number') {
      var width = resizeBar.offsetLeft - resizingCol.offsetLeft;

      resizingCol.style.width = width + 'px';

      _columnResizeCallbackStack.forEach(function (callback) {
        event.col = resizingCol.cell.col;
        event.width = width;
        callback(event);
      });
      isResizing = true;

      // Reset resizing flag in a moment
      setTimeout(function () {
        isResizing = false
      }, 100);
    }

    resizeBar.style.display = 'none';
    h.dom.removeAttribute('data-resizing');
    // Remove all listeners excpet mousedown & touchstart
    window.removeEventListener('touchmove', onHeaderMouseMouse);
    window.removeEventListener('mousemove', onHeaderMouseMouse);
    window.removeEventListener('touchend', onHeaderMouseUp);
    window.removeEventListener('mouseup', onHeaderMouseUp);
  }

  // initilization
  function init() {
    h.dom = document.createElement('DIV');
    h.dom.className = 'bento-table-header';

    if (h.options.resize) {
      resizeBar = document.createElement('DIV');
      resizeBar.className = 'bt-header-resize-bar';
      resizeBar.style.display = 'none';
      h.dom.appendChild(resizeBar);
      h.dom.className += ' bt-header-is-resizable';
    }
  }

}
(function () {

  var bentoTableApp = angular.module('bento.table', []);

  bentoTableApp
    .controller('bentoTableController', [
      '$scope',
      '$element',
      '$log',
      function ($scope, $element, $log) {
      }])
    .directive('bentoTable', [
      '$compile',
      '$log',
      '$timeout',
      function ($compile, $log, $timeout) {
        return {
          restrict  : 'A',
          scope     : false,
          replace   : true,//
          template  : [
            '<div class="bento-table">',
            ' <div class="bento-table-body">',
            ' </div>',
            '</div>'].join("\n"),
          controller: 'bentoTableController',
          link      : function (scope, element, attrs) {
            // Init
            var data = {data: []},
                body,
                table,
                tableHelper,
                tableRowSelectHelper,
                getSourceData,
                options,
                initialLoad = true,
                state = {},
                colOffset = 0;

            var localScope = scope.$new(false); // inherit from parent
            var control;

            localScope.freezeRow = freezeRow;
            localScope.unfreezeRow = unfreezeRow;

            if (typeof attrs.columnDefinitions === 'undefined') {
              $log.error('Bento Table: Parameter "column-definitions" is missing.')
              return;
            }

            data.columns = scope.$eval(attrs.columnDefinitions);

            // Pulic controls
            if (typeof attrs.bentoTableControl !== 'undefined') {
              control = scope.$eval(attrs.bentoTableControl);
              control.freezeRow = freezeRow;
              control.unfreezeRow = unfreezeRow;
              control.reloadTable = reloadTable;
            }

            // Check basic parameters
            if (typeof attrs.sourceDataCallback === 'undefined') {
              $log.error('Bento Table: Parameter of "source-data-callback" is missing.');
              return;
            }

            getSourceData = scope.$eval(attrs.sourceDataCallback);

            if (typeof getSourceData !== 'function') {
              $log.error('Bento Table: Type of parameter variable `' + attrs.sourceDataCallback + '` is incorrect. It needs to be `function(){return promise}`');
              return;
            }

            init();

            // Get first set of data
            getSourceData(state.currentPage, state.recordsPerPage, state.sortKey, state.sortDirection)
              .then(getDataSuccess, getDataFail);

            // Reload table
            function reloadTable(){
              data.data = [];
              tableHelper.reset();
              table.reset();
              if(tableRowSelectHelper){
                tableRowSelectHelper.clear();
              }
              getSourceData(state.currentPage, state.recordsPerPage, state.sortKey, state.sortDirection)
                .then(getDataSuccess, getDataFail);
            }

            // Freeze a row
            function freezeRow(row) {
              tableHelper.freezeRow(row);
            }

            // Unfreeze a row
            function unfreezeRow(row) {
              tableHelper.unfreezeRow(row);
            }

            function getDataSuccess(newData) {
              // Data is not ready
//              if (typeof newData === 'undefined' || newData.length === 0) {
//                $log.error('Bento Table: Provided source data is either undefined or empty.');
//                return;
//              }

              data.data = tableHelper.concatData(data.data, newData);

              if (table.ready) {
                prepareData();
              }

              // fire dataready callback
              if (!!attrs.sourceDataReadyCallback) {
                var cb = scope.$eval(attrs.sourceDataReadyCallback);
                if (cb) {
                  cb();
                }
              }
            }

            function prepareData() {
              var colOffset = 0;
              var numCols;

              numCols = tableHelper.getNumCols();

              table.setGridSize(tableHelper.getNumRows(), numCols);

              // Fire selected row getter
              if(tableRowSelectHelper){
                if(attrs.getSelectedRows){
                  var getSelectedRows = scope.$eval(attrs.getSelectedRows);
                  getSelectedRows().then(function(selectedRowsObj){

                    tableRowSelectHelper.preSelectRows(
                      table,
                      tableHelper.getDataForRender(),
                      selectedRowsObj.data,
                      selectedRowsObj.key);

                    table.render();
                    // fire selection callback
                    fireRowSelectCallback();
                  });
                }
              }

              if(!options.infiniteScroll && state.sortKey && state.sortDirection){
                tableHelper.sort(state.sortKey, state.sortDirection === 'desc', options.infiniteScroll);
                table.calcGridRowSizeArray(0);
              }

              table.render();


              if (initialLoad) {
                // This includes table.render();
                tableHelper.applyTableOptions();
                initialLoad = null;
              }
            }

            function getDataFail(message) {
              $log.warn(message);
            }

            /*Header*/

            var _col = 0;
            var colSort = [];
            var colObj;
            table.requestHeaderContent(function (headerCell) {
              if (tableRowSelectHelper && headerCell.col === 0) {
                tableRowSelectHelper.renderCell(headerCell);
              } else {
                renderHeader(headerCell);
              }
            });

            function renderHeader(headerCell) {
              _col = headerCell.col;
              colObj = tableHelper.getColumnByIndex(_col);

              if (colObj) {
                table.renderHeaderCell(headerCell, colObj, localScope, $compile);
                if (colSort[_col] === 1) {
                  headerCell.dom.setAttribute('data-sort', 'bt-sort-asc')
                } else if (colSort[_col] === 2) {
                  headerCell.dom.setAttribute('data-sort', 'bt-sort-desc')
                } else {
                  headerCell.dom.removeAttribute('data-sort');
                }
              } else {
                headerCell.dom.removeAttribute('data-sort');
                headerCell.dom.innerHTML = '';
              }
            }

            //header click and sorting
            table.onHeaderClick(function (event) {
              var cell = event.cell, // type: BentoCell in Header
                  col = cell.col,
                  column,
                  desc = false
                ;

              // Bypass
              if (tableRowSelectHelper && col === 0) {
                var row = cell.parent,
                    selectedClass = 'bt-row-selected'
                  ;
                row.toggleClass(selectedClass);

                if (row.hasClass(selectedClass)) {
                  tableRowSelectHelper.addRows(tableHelper.getDataForRender());
                } else {
                  tableRowSelectHelper.deselectAllRows(tableHelper.getDataForRender());
                }

                table.render();

                fireRowSelectCallback();

                return;
              }


              column = tableHelper.getColumnByIndex(col);

              // Check and sort the current clicked column
              if (column.sort ||
                typeof column.sort === 'undefined') {
                // Other normal sorting
                if (cell.dom.getAttribute('data-sort') === 'bt-sort-asc') {
                  removeSortingClass(cell);
                  cell.dom.setAttribute('data-sort', 'bt-sort-desc');
                  tableHelper.sort(column.name, true, options.infiniteScroll);
                  colSort = [];
                  colSort[col] = 2; //Desc
                  state.sortKey = column.name;
                  state.sortDirection = 'desc';
                  desc = true;
                } else {
                  removeSortingClass(cell);
                  cell.dom.setAttribute('data-sort', 'bt-sort-asc');
                  tableHelper.sort(column.name, false, options.infiniteScroll);
                  colSort = [];
                  colSort[col] = 1; //Asc
                  state.sortKey = column.name;
                  state.sortDirection = 'asc';
                }

                if (options.infiniteScroll) {
                  // Need to request a new set of data
                  data.data = [];
                  state.currentPage = 0;
                  getSourceData(state.currentPage, state.recordsPerPage, state.sortKey, state.sortDirection)
                    .then(function (data) {
                      //Find and remove record(s) that is(are) frozen
                      data = tableHelper.removeFrozenRecords(data, col, desc);
                      getDataSuccess(data)
                    }, getDataFail);
                } else {
                  // Render table (Deep Render Mode)
                  table.render(true);
                  scope.$apply();
                }
              }
            });

            // clean sorting class names
            function removeSortingClass(cell) {
              var fCell = cell;
              do {
                cell.dom.setAttribute('data-sort', '');
                cell = cell.right;
              } while (cell !== fCell)
            }

            /*
             Frozen Cell
             */
            table.requestFrozenCellContent(function (cell) {
              if (tableRowSelectHelper && cell.col === 0) {
                var row = tableHelper.getRowByIndex(cell.row, true);
                tableRowSelectHelper.renderCell(cell);
                if(row && row[tableRowSelectHelper._selectedLabel]){
                  cell.parent.addClass('bt-row-selected', true);
                }else{
                  cell.parent.removeClass('bt-row-selected', true);
                }
              } else {
                tableHelper.renderFrozenCell(cell);
              }
            });

            /*
             Cell
             */

            table.requestCellContent(function (cell) {
              if (tableRowSelectHelper && cell.col === 0) {
                var row = tableHelper.getRowByIndex(cell.row);
                tableRowSelectHelper.renderCell(cell);

                if(row[tableRowSelectHelper._selectedLabel]){
                  cell.parent.addClass('bt-row-selected', true);
                  cell.parent.removeClass('bt-row-indeterminate', true);
                }else if(row[tableRowSelectHelper._indeterminateLabel]){
                  cell.parent.removeClass('bt-row-selected', true);
                  cell.parent.addClass('bt-row-indeterminate', true);
                }else{
                  cell.parent.removeClass('bt-row-selected', true);
                  cell.parent.removeClass('bt-row-indeterminate', true);
                }
              } else {
                tableHelper.renderCell(cell);
              }
            });

            var onRowClickCallback = scope.$eval(attrs.rowClick);

            // On row click
            function onRowClick(event) {
              var row = tableHelper.getRowByIndex(event.rowIndex, event.isFrozen),
                  isSelected;

              if (tableRowSelectHelper && event.target.className === 'bt-check-box') {

                if (!tableRowSelectHelper.isRowSelected(row)) {
                  tableRowSelectHelper.add(row, true);
                } else {
                  tableRowSelectHelper.remove(row, true);
                  table.header.dom.querySelector('.bento-table-row').row.removeClass('bt-row-selected');
                }

                $timeout(function(){table.render()});


                fireRowSelectCallback();
              }

              /**
               * Fire callback and return the original row object or BentoTableRow object
               */
              if (onRowClickCallback) {
                onRowClickCallback(row);
              }
            }

            // Fire select row callback
            function fireRowSelectCallback() {
              if (attrs.sourceDataSelectCallback) {
                scope.$eval(attrs.sourceDataSelectCallback)(tableRowSelectHelper.getSelection());
              }
            }

            function init() {
              body = element[0].querySelector('.bento-table-body');
              options = (!!attrs.options) ? scope.$eval(attrs.options) : {rowHeight: 30, colWidth: 150};
              state.currentPage = 0;
              state.recordsPerPage = options.recordsPerPage || 50;

              table = new BentoTable(body, options);

              // initialize row selection
              if (options.rowSelect) {
                tableRowSelectHelper = new BentoTableRowSelectHelper(table);
                colOffset += tableRowSelectHelper.colOffset;
              }

              // Getting helper
              if (typeof tableHelper === 'undefined') {
                if (options.group) {
                  // Grouping table helper
                  tableHelper = new BentoTableGroupingHelper(data, table, options, localScope, $compile, attrs);
                } else {
                  // Default table helper
                  tableHelper = new BentoTableHelper(data, table, options, localScope, $compile, attrs);
                }
                tableHelper.init(colOffset);
                tableHelper.onRowClick(onRowClick);
              }

              if (options.rowSelect) {
                tableRowSelectHelper.addHelper(tableHelper);
              }

              // infinite scroll initialization
              if (options.infiniteScroll) {
                var promise;
                table.onScrollAtBottom(function (event) {

                  if (!promise) {
                    var newPage = state.currentPage + 1;
                    promise = getSourceData(newPage, state.recordsPerPage, state.sortKey, state.sortDirection);
                    promise.then(function (data) {
                      state.currentPage = newPage;
                      getDataSuccess(data);
                      promise = null;
                    }, getDataFail);
                  }
                });
              }

              // Make sure when the table is ready
              var tableInitWatch = scope.$watch(function () {
                  return {height: body.offsetHeight, width: body.offsetWidth};
                },
                function (size) {
                  if (size.height > 0 && size.width > 0) {
                    table.init();

                    if (data.data.length > 0) {
                      prepareData();
                    }
                    // release one time watch
                    tableInitWatch();
                  }
                }
                ,
                true // need to deepwatch this object
              )
            }
          }
        };
      }]);
})();

function BentoTableRowSelectHelper(table, tableHelper) {
  var uid = Math.round(Math.random() * 100000000);
  this.colOffset = 1;
  this._selection = [];
  this._table = table;
  this._selectedLabel = '_btSelectedRow' + uid;
  this._indeterminateLabel = '_btSelectIndeterminate' + uid;
  this._tableHelper = tableHelper;
}

(function () {
  BentoTableRowSelectHelper.prototype.renderCell = renderCell;
  BentoTableRowSelectHelper.prototype.add = add;
  BentoTableRowSelectHelper.prototype.addHelper = addHelper;
  BentoTableRowSelectHelper.prototype.remove = remove;
  BentoTableRowSelectHelper.prototype.clear = clear;
  BentoTableRowSelectHelper.prototype.addRows = addRows;
  BentoTableRowSelectHelper.prototype.getSelection = getSelection;
  BentoTableRowSelectHelper.prototype.isRowSelected = isRowSelected;
  BentoTableRowSelectHelper.prototype.deselectAllRows = deselectAllRows;
  BentoTableRowSelectHelper.prototype.preSelectRows = preSelectRows;

  /**
   * Help to check if a row is selected or not
   * @param row
   * @returns {*}
   */
  function isRowSelected(row) {
    return row[this._selectedLabel];
  }

  /**
   * Add a table helper to reference it's functions
   * @param tableHelper
   */
  function addHelper(tableHelper) {
    this._tableHelper = tableHelper;
  }

  /**
   *
   * @param table (BentoTable) - BentoTable instance for rendering
   * @param dataArray (array) - Original Data array
   * @param selectedDataArray (array) - Selected rows in array
   * @param keyToCompare (object) - Unique key to compare the arrays
   */
  function preSelectRows(table, dataArray, selectedDataArray, keyToCompare) {

    if (
      typeof selectedDataArray === 'undefined' ||
      typeof keyToCompare === 'undefined' || !Array.isArray(selectedDataArray)
    ) {
      console.warn(
        'BentoTable: Getter `getSelectedRows` mis-formed.',
        '{key: (string)|(number), data: (array)}');
      return;
    }

    // Find and add selected row(s)
    var key, i, j, iLen, jLen, row;
    for (i = 0, iLen = selectedDataArray.length; i < iLen; i++) {
      key = selectedDataArray[i][keyToCompare];

      for (j = 0, jLen = dataArray.length; j < jLen; j++) {
        row = dataArray[j];
        if (row[keyToCompare] == key) {
          this.add(dataArray[j]);

          // Update table rendering flag for row selections
          table.rowSizes[j][2] = true;
          break;
        }
      }
    }
  }

  /**
   * Get a copy of the current selection
   * @returns {Array}
   */
  function getSelection() {
    var newArr = [];
    for (var i = 0, len = this._selection.length; i < len; i++) {
      newArr.push(this._selection[i]);
    }
    return newArr;
  }

  /**
   * Select all rows in the table
   */
  function addRows(rows) {
    var i, len;

    var row;
    for (i = 0, len = rows.length; i < len; i++) {
      row = rows[i];
      this.add(row);
    }
  }

  /**
   * Deselect all row
   */
  function deselectAllRows(rows) {
    var i, len;
    for (i = 0, len = rows.length; i < len; i++) {
      this.remove(rows[i]);
    }

    this._selection = [];
  }

  /**
   * Add row to selection
   * @param row
   */
  function add(row, checkParent) {
    row[this._selectedLabel] = true;
    if (row instanceof BentoTableGroupingRow) {
      for (var i = 0, len = row.members.length; i < len; i++) {
        this.add(row.members[i]);
      }
      __checkGroupSelectionStates(row, this);
    } else {
      if (this._selection.indexOf(row) === -1) {
        this._selection.push(row);
      }

      if (checkParent && this._tableHelper instanceof BentoTableGroupingHelper) {
        __checkGroupSelectionStates(row[this._tableHelper.getParentVariableName()], this);
      }
    }
  }

  /**
   * Check if a group is fully checked or not
   * @param btGroup
   * @private
   */
  function __checkGroupSelectionStates(btGroup, self) {

    var allSelected = true;
    var noneSelected = true;
    btGroup.members.forEach(function (item, i) {
      if (item[self._selectedLabel]) {
        noneSelected = false;
      } else {
        allSelected = false;
      }
    });

    if (allSelected) {
      btGroup[self._selectedLabel] = true;
      delete btGroup[self._indeterminateLabel];
    } else if (noneSelected) {

      delete btGroup[self._indeterminateLabel];
      delete btGroup[self._selectedLabel];
    } else {
      delete btGroup[self._selectedLabel];
      btGroup[self._indeterminateLabel] = true;
    }
  }

  /**
   * Remove a row from selection
   * @param row
   */
  function remove(row, checkParent) {
    var index = this._selection.indexOf(row);

    delete row[this._selectedLabel];

    if (row instanceof BentoTableGroupingRow) {
      for (var i = 0, len = row.members.length; i < len; i++) {
        this.remove(row.members[i]);
      }
      __checkGroupSelectionStates(row, this);
    } else {
      if (index > -1) {
        this._selection.splice(this._selection.indexOf(row), 1);
      }

      // Check group selection states
      if (checkParent && this._tableHelper instanceof BentoTableGroupingHelper) {
        __checkGroupSelectionStates(row[this._tableHelper.getParentVariableName()], this);
      }
    }

  }

  /**
   * Remove all selection
   * @returns {Array}
   */
  function clear() {
    for (i = 0, len = this._selection.length; i < len; i++) {
      delete this._selection[i][this._selectedLabel];
    }
    return this._selection = [];
  }

  /**
   * Render selection cell
   * @param cell
   */
  function renderCell(cell) {
    cell.html('<div class="bt-check-box"></div>');
  }

})();
var BentoTableRow;

(function(){

  BentoTableRow = Row;
  Row.prototype.push = push;
  Row.prototype.unshift = unshift;
  Row.prototype.getFirstCell = getFirstCell;
  Row.prototype.getLastCell = getLastCell;
  Row.prototype.getNthCell = getNthCell;
  Row.prototype.getNumCells = getNumCells;
  Row.prototype.destroy = destroy;
  Row.prototype.setRow = setRowIndex;
  Row.prototype.remove = remove;
  Row.prototype.removeLastCell = removeLastCell;
  Row.prototype.addClass = addClass;
  Row.prototype.hasClass = hasClass;
  Row.prototype.removeClass = removeClass;
  Row.prototype.applyClasses = applyClasses;
  Row.prototype.clearClasses = clearClasses;
  Row.prototype.toggleClass = toggleClass;
  Row.prototype.setLinkages = setLinkages;
  Row.prototype.clear = clear;


  Object.defineProperty(Row.prototype, 'isFrozen',{get:isFrozen});


  // Private
  Row.prototype._init = init;

  /**
   * Constructer
   * @param initNumColumns
   * @param width
   * @param height
   * @param cellClickCallback
   * @param isHeader
   * @constructor
   */
  function Row(initNumColumns, width, height, cellClickCallback, isHeader) {

    this.dom = document.createElement('DIV');
    this.dom.row = this;

    // Private
    this._classes = [''];
    this._changed = false;
    this.initNumColumns = initNumColumns;
    this.width = width;
    this.height = height;
    this.cellClickCallback = cellClickCallback;
    this.isHeader = isHeader;

    this._init();
  }

  function clear(){
    this._classes = [];
    this.addClass('bento-table-row');
    var children = this.dom.children;
    for(var i= 0, len=children.length;i<len;i++){
      children[i].innerHTML = '';
    }
  }

  /**
   * Remove row from the parent element
   */
  function remove(){
    if(this.dom.parentElement) {
      this.dom.parentElement.removeChild(this.dom);
    }
  }

  /**
   * Check if this row is frozen or not
   * @returns {*}
   */
  function isFrozen(){
    return this.hasClass('bt-frozen-row');
  }

  /**
   * Toggles a class name on and off
   * @param className
   * @returns {boolean} to tell either the class is applied or not
   */
  function toggleClass(className){
    if(this.hasClass(className)){
      this.removeClass(className);
      return false;
    }else{
      this.addClass(className);
      return true;
    }
  }

  /**
   * Add a CSS Class to this row
   * @param className
   * @param doNotApply - do not apply the new class to the actual element
   */
  function addClass(className, doNotApply){

    if(this._classes.indexOf(className) < 0){
      this._classes.push(className);
      if(doNotApply){this._changed=true; return}
      this.dom.className = this._classes.join(' ');
    }
  }

  /**
   * Check if this row has a given class
   * @param className
   * @returns {boolean}
   */
  function hasClass(className){
    return this._classes.indexOf(className) > -1;
  }

  /**
   * Remove a CSS class from this row
   * @param className
   * @param doNotApply - do not apply the new class to the actual element
   */
  function removeClass(className, doNotApply){
    var index = this._classes.indexOf(className);
    if(index > -1){
      this._classes.splice(index,1);
      if(doNotApply){this._changed=true; return}
      this.dom.className = this._classes.join(' ');
    }
  }

  /**
   * Clear all CSS classes
   * @param doNotApply - do not apply the new class to the actual element
   */
  function clearClasses(doNotApply){
    this._classes = [this._classes[0]];

    if(doNotApply){this._changed=true; return}
    this.dom.className = this._classes[0];
  }

  /**
   * Apply all CSS classes to the element at once
   */
  function applyClasses(){
    if(this._changed) {
      this._changed = false;
      this.dom.className = this._classes.join(' ');
    }
  }

  /**
   * Push a cell to this row and link it
   * @param cell
   * @param isNew
   * @param callback
   */
  function push(cell, isNew, callback) {
    this.setLinkages(cell, isNew);
    this.dom.appendChild(cell.dom);

    if(callback){
      cell.dom.addEventListener('click',callback);
    }
  }

  /**
   * Set row index
   * @param index
   */
  function setRowIndex(index){
    this.row = index;
  }

  /**
   * Unshift a cell to this row
   * @param cell
   * @param isNew
   */
  function unshift(cell, isNew) {
    this.setLinkages(cell, isNew);
    this.dom.insertBefore(cell.dom, this.dom.firstChild);
  }

  /**
   * Gets the first DOM cell from the current row
   * @returns {BentoTableCell}
   */
  function getFirstCell() {
    return this.dom.firstElementChild.cell;
  }

  /**
   * Gets the last DOM cell from the current row
   * @returns (BentoTableCell)
   */
  function getLastCell() {
    return this.dom.lastElementChild.cell;
  }

  /**
   * Get's the (n)th cell from the current row
   * @param index
   * @returns {BentoTableCell}
   */
  function getNthCell(index) {
    return this.dom.children[index].cell;
  }

  /**
   * Get the total number of cells in this row
   * @returns {Number}
   */
  function getNumCells() {
    return this.dom.childElementCount;
  }

  /**
   * Destroy this row
   */
  function destroy() {
    var child;
    // delete children
    while (this.dom.childElementCount > 0) {
      child = this.dom.firstElementChild.cell;

      if(child.top) {
        child.top.setBottom(child.bottom);
      }

      if(child.bottom) {
        child.bottom.setTop(child.top);
      }
      this.dom.removeChild(child.dom);
      child.destroy();
    }
    child = null;
    delete this.dom;
  }

  function removeLastCell(){
    var cell = this.getLastCell();
    cell.removeEventListener(this.cellClickCallback);
    if(cell.left) {
      cell.left.setRight(cell.right);
    }

    if(cell.right){
      cell.right.setLeft(cell.left);
    }

    this.dom.removeChild(cell.dom);
    cell.destroy();
  }

  function init(){
    var cell, i, len;

    for (i = 0; i < this.initNumColumns; i++) {
      cell = new BentoTableCell(this, this.isHeader);
      if(this.width){
        cell.dom.style.width = this.width + 'px';
      }
      this.push(cell, true, this.cellClickCallback);
    }

    var children = this.dom.children;
    for (i = 0, len = children.length; i < len; i++) {
      cell = children[i].cell;
    }

    if(this.height){
      this.dom.style.height = this.height + 'px';
    }

    this._classes.pop();
    this.addClass('bento-table-row');
  }

  /**
   * Set linkages to all cells with a new cell
   * @param cell - Cell object
   * @param isNew - Tell is cell is a new object
   */
  function setLinkages(cell, isNew) {
    if (this.dom.childElementCount > 0 && isNew) {
      var fCell = this.getFirstCell();
      var lCell = this.getLastCell();

      fCell.setLeft(cell);
      lCell.setRight(cell);
      cell.setLeft(lCell);
      cell.setRight(fCell);
    }
  }
})();





function BentoTableSort(table) {
  var bh = this;
  var btRowArray;
  bh.sort = heapSort;
  bh.findIndex = findIndex;

  /**
   * Find the index of an object within a sorted array
   * @param arr
   * @param isBetween - (bool)
   * @param outOfBound - number of index when found otherwise false
   * @returns {*}
   */
  function findIndex(arr, isBetween, outOfBound, outOfBoundAsNotFound) {
    var left = 0,
        right = arr.length - 1,
        middle = Math.floor((left + right) * 0.5),
        bound = outOfBound(arr[left], arr[right]);
      ;

    if (outOfBoundAsNotFound && bound) {
      return -1;
    } else if (bound === -1 || bound === 1) {
      return bound > 0 ? arr.length : 0;
    }

    while (left !== middle) {
      if (isBetween(arr[left], arr[middle])) {
        right = middle;
      } else {
        left = middle;
      }
      middle = Math.floor((left + right) * 0.5);
    }
    return left + 1;
  }

  /**
   * Sort an array based a column (index : col)
   * @param arr
   * @param col
   *
   * Using BlockSort
   * http://en.wikipedia.org/wiki/Block_sort
   */

  /**
   * Finds the correct place of given element in given max heap.
   *
   * @private
   * @param {Array} array Array.
   * @param {Number} index Index of the element which palce in
   * the max heap should be found.
   * @param {Number} heapSize Size of the heap.
   * @param {function} cmp Comparison function.
   */
  function heapify(array, btRowArray, index, heapSize, cmp) {
    var left = 2 * index + 1;
    var right = 2 * index + 2;
    var largest = index;
    if (left < heapSize && cmp(array[left], array[index]) > 0) {
      largest = left;
    }
    if (right < heapSize && cmp(array[right], array[largest]) > 0) {
      largest = right;
    }
    if (largest !== index) {
      var temp = array[index];
      var temp2 = btRowArray[index];
      array[index] = array[largest];
      btRowArray[index] = btRowArray[largest];
      array[largest] = temp;
      btRowArray[largest] = temp2;
      heapify(array, btRowArray, largest, heapSize, cmp);
    }
  }

  /**
   * Builds max heap from given array.
   *
   * @private
   * @param {Array} array Array which should be turned into max heap.
   * @param {function} cmp Comparison function.
   * @return {Array} array Array turned into max heap.
   */
  function buildMaxHeap(array, btRowArray, cmp) {
    for (var i = Math.floor(array.length / 2); i >= 0; i -= 1) {
      heapify(array, btRowArray, i, array.length, cmp);
    }
    return array;
  }

  /**
   * Heapsort. Turns the input array into max
   * heap and after that sorts it.<br><br>
   * Time complexity: O(N log N).
   *
   * @example
   *
   * var sort = require('path-to-algorithms/src' +
   * '/sorting/heapsort').heapSort;
   * console.log(sort([2, 5, 1, 0, 4])); // [ 0, 1, 2, 4, 5 ]
   *
   * @public
   * @module sorting/heapsort
   * @param {Array} array Input array.
   * @param {Function} cmp Optional. A function that defines an
   * alternative sort order. The function should return a negative,
   * zero, or positive value, depending on the arguments.
   * @return {Object} Sorted array.
   */
  function heapSort(array, rowArray, cmp) {
    cmp = cmp || comparator;
    var size = array.length;
    var temp, temp2;
    btRowArray = rowArray? rowArray:[];

    buildMaxHeap(array, btRowArray, cmp);
    for (var i = array.length - 1; i > 0; i -= 1) {
      temp = array[0];
      temp2 = btRowArray[0];
      array[0] = array[i];
      btRowArray[0] = btRowArray[i];
      array[i] = temp;
      btRowArray[i] = temp2;
      size -= 1;
      heapify(array, btRowArray, 0, size, cmp);
    }

    return {rows: array, rowSizes: btRowArray};
  }

  function comparator(a, b) {
    return a - b;
  }

}
var BentoTable;

(function(){

  BentoTable = _BentoTable;
  _BentoTable.prototype = Object.create(BentoTableCore.prototype);
  _BentoTable.prototype.constructor = _BentoTable;

  function _BentoTable(dom, options){
    BentoTableCore.apply(this,arguments);
  }
})();



var BentoTableDefaultColumn;

(function(){

  'user strict';
  BentoTableDefaultColumn = _BentoTableDefaultColumn;
  BentoTableDefaultColumn.prototype.applyContentToCell = applyContentToCell;
  BentoTableDefaultColumn.prototype.applyContentToCellWithType = applyContentToCellWithType;

  // Constructor
  function _BentoTableDefaultColumn(){
  }

  /**
   * Apply HTML content to a BentoCell object
   * @param content
   * @param cell
   */
  function applyContentToCell(content, cell){
    applyContentToCellWithType(content, cell, 'bt-cell-default');
  }

  /**
   * Apply HTML content to a BentoCell object with a unique type
   * @param content
   * @param cell
   * @param type
   */
  function applyContentToCellWithType(content, cell, type){
    if(type){
      cell.setType(type);
    }
    cell.html(content);
  }
})();

var BentoTableCellTemplateColumn;

(function(){
  BentoTableCellTemplateColumn = btCellTemplate;
  btCellTemplate.prototype = Object.create(BentoTableDefaultColumn.prototype);
  btCellTemplate.prototype.constructor = btCellTemplate;

  // Override
  btCellTemplate.prototype.applyContentToCell = applyContentToCell;
  btCellTemplate.prototype.setTemplate = setTemplate;

  /**
   * Constructor
   * @param scope
   * @param compile
   * @param dataName
   */
  function btCellTemplate(scope, compile, dataName){
    BentoTableDefaultColumn.apply(this, arguments);
    this._scope = scope;
    this._compile = compile;
    this._dataName = dataName;
    this._template = null;
  }

  /**
   * Set Template of this column
   * @param tpl
   */
  function setTemplate(tpl){
    if(typeof tpl === 'string') {
      this._template = tpl;
    }else{
      var tmp = document.createElement("div");
      tmp.appendChild(tpl);
      this._template = tmp.innerHTML;
      tmp = null;
    }
  }

  /**
   * Override on Apply content to Cell
   * @param content
   * @param cell
   * @param item
   */
  function applyContentToCell(content, cell, row){
    var data;
    if(!!(data = cell.getData())){
      // Destroy old scope and render new
      data.element.remove(); // jqLite
      data.scope.$destroy();
    }
    data = {
      // Inherit from the parent scope
      scope: this._scope.$new()
    };

    // Using $item to define the row
    data.scope.$row = row;
    data.scope.$item = content;
    data.element = this._compile(this._template)(data.scope);

    // Only $digest locally
    if(!data.scope.$root.$$phase) {
      data.scope.$digest();
    }

    // Keep reference
    cell.setData(data);

    // Content has to be true or false
    this.applyContentToCellWithType(data.element[0],cell,'bt-cell-template');
  }

})();


var BentoTableCheckBoxColumn;

(function(){
  BentoTableCheckBoxColumn = _BTCheckBoxColumn;
  BentoTableCheckBoxColumn.prototype = Object.create(BentoTableDefaultColumn.prototype);
  BentoTableCheckBoxColumn.prototype.constructor = BentoTableCheckBoxColumn;
  // Methods
  BentoTableCheckBoxColumn.prototype.applyContentToCell = applyContentToCell;

  function _BTCheckBoxColumn(){
    BentoTableDefaultColumn.apply(this, arguments);

    var col = this;
    // Override
    col.applyContentToCell = applyContentToCell;
  }

  function applyContentToCell(content, cell){
    // Content has to be true or false
    this.applyContentToCellWithType(content,cell,'bt-checkbox-cell');
  }

})();
function BentoTableNumberColumn(){
  BentoTableNumberColumn.prototype = new BentoTableDefaultColumn();
  BentoTableDefaultColumn.apply(this, arguments);

  var col = this;
  // Override
  col.applyContentToCell = applyContentToCell;

  function applyContentToCell(content, cell){
    col.applyContentToCellWithType(content,cell,'bt-number-cell');
  }

}
(function() {
    'use strict';
    /**
     * Rome DatePicker Directive
     */

    angular.module('bento.datepicker.rome', [])
        .controller('RomeDatePickerController', romeController)
        .directive('bentoDatePicker', romeDirective);

    /**
     * [$inject]
     * @type {Array}
     */
    romeController.$inject = ['$scope', '$attrs', '$timeout'];
    /**
     * [romeController - controller for bentoDatePicker directive]
     * @param  {[object]} $scope
     * @param  {[object]} $attrs
     * @param  {[object]} $timeout
     * @return {[object]}          [controller object]
     */
    function romeController($scope, $attrs, $timeout) {
        var vm = this;


        //WATCHERS

        //watch directive's is-open attribute
        $scope.$watch('isOpen', function(newVal, oldVal) {
            var datepicker = $scope.control;

            if (datepicker === undefined || newVal == oldVal) return;
            if (newVal) {
                datepicker.show();
            } else {
                datepicker.hide();
            }
        });

        //watch directive's locale attribute
        $scope.$watch('locale', function(locale) {
            var datepicker = $scope.control;
            if (locale && datepicker) {
                //use moment locale config
                moment.locale(locale);
                var localeData = moment.localeData();
                var inputFormat;
                if (localeData && localeData._longDateFormat && localeData._longDateFormat.L) {
                    inputFormat = localeData._longDateFormat.L
                }

                if ($scope.options.time != false && localeData && localeData._longDateFormat && localeData._longDateFormat.LT) {
                    inputFormat += " " + localeData._longDateFormat.LT;
                }

                $timeout(function() {
                    //need to nullify these options to let 
                    //moment's locale config object to take over
                    $scope.options.inputFormat = inputFormat;
                    $scope.options.weekdayFormat = undefined;
                    $scope.options.weekStart = undefined;
                    //let scope options $watch kick in for the rest
                });
            }
        });

        /**
         * [validateAndUpdate validate and update model]
         * @return {[boolean]} [is date valid or not]
         */
        vm.validateAndUpdate = function() {
            var datepicker = $scope.control;
            //Use moment's date validation
            var isValid = moment($scope.ngModel, $scope.options.inputFormat, true).isValid();

            var formatID = undefined;
            if($scope.validFormats){

                for(var i = 0, il = $scope.validFormats.length;i<il;i++){
                    if(!isValid){
                        isValid = moment($scope.ngModel, $scope.validFormats[i], true).isValid();
                        if(isValid){
                            formatID = i;
                            break;
                        }
                    }
                }
            }

            if (isValid && datepicker && datepicker.getDateString()) {
                vm.update();
                return true;
            } else {
                return false;
            }
        }

        vm.update = function() {
            var datepicker = $scope.control;
            if (datepicker && datepicker.getDateString()) {
                // $scope.ngModel = datepicker.getDateString();
                vm.ngModelCtrl.$setViewValue(datepicker.getDateString());
                vm.ngModelCtrl.$modelValue = datepicker.getDate();
                vm.ngModelCtrl.$render();
                $scope.date = datepicker.getDate();
            }
        }
    }

    /**
     * [$inject description]
     * @type {Array}
     */
    romeDirective.$inject = ['$timeout'];
    /**
     * [romeDirective bentoDatePicker directive]
     * @param  {[object]} $timeout [description]
     * @return {[object]}          [directive object]
     */
    function romeDirective($timeout) {
        var directive = {
            restrict: 'EA',
            require: ['ngModel', 'bentoDatePicker'],
            scope: {
                options: '=',
                ngModel: '=',
                date: '=?',
                isOpen: '=?',
                control: '=?',
                locale: '=?',
                appendTo: '=?',
                validFormats: '=?'
            },
            controller: 'RomeDatePickerController',
            link: fnLink
        };

        /**
         * [fnLink directive link function]
         * @param  {[object]} scope   [description]
         * @param  {[object]} element [description]
         * @param  {[object]} attrs   [description]
         * @param  {[object]} ctrl    [description]
         * @param  {[object]} $parse  [description]
         * @return {[object]}         [description]
         */
        function fnLink(scope, element, attrs, ctrl, $parse) {

            //ctrl returns an array of ngModel's controller and directive's controller
            var ngModelCtrl = ctrl[0];
            var romeCtrl = ctrl[1];

            romeCtrl.ngModelCtrl = ngModelCtrl;

            //initialize datepicker
            var datepicker = rome(element[0], scope.options);
            //create header element
            var headerElement = createHeaderElement(scope, datepicker);
           // Key event mapper
            var keys = {
                9: 'tab',
                13: 'enter',
                32: 'space',
                33: 'pageup',
                34: 'pagedown',
                35: 'end',
                36: 'home',
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };
            //assign datepicker to control attribute (for use in app's controller if needed)
            scope.control = datepicker;
            //see if there are more than one month to display
            checkMonthsToDisplay(datepicker, scope.options);
            //assign keyDown function to rome controller
            romeCtrl.onKeydown = onKeydown;

            //BIND EVENTS
            //add keydown events to directive
            element.on('keydown', romeCtrl.onKeydown);
            //add blur event to directive
            element.on('blur', onBlur);
            //Destroy event
            scope.$on('$destroy', onDestroy);
            element.on('$destroy', onDestroy);
            //add event handling for datepicker events
            addDatePickerEvents(scope, datepicker, headerElement, romeCtrl, element);

            //WATCH EVENTS
            scope.$watchCollection('options', onOptionsChanged);


         
            //keydown handling (event added to element in link function)
            function onKeydown(evt) {
                var key = keys[evt.which];

                clearErrorMsg();

                if (!key || evt.shiftKey || evt.altKey) {
                    return;
                }

                if (key === 'enter' || key === 'tab') {
                    //check if date is valid
                    $timeout(function() {
                        var isValid = romeCtrl.validateAndUpdate();
                        if (isValid) {
                            element[0].blur();
                            datepicker.hide();
                            scope.isOpen = false;
                        } else {
                            showErrorMsg();
                        }

                    });
                } else {
                    handleKeyDown(key,evt);
                }
            };

            //blur handling
            function onBlur(evt) {
                $timeout(function() {
                    romeCtrl.update();
                });
            }

            function handleKeyDown (key, evt) {
                var date = datepicker.getDate();

                if(!date){
                    date = new Date;
                }

                var m = moment(date);
                
                if (key === 'left') {
                    m.subtract(1,'day');
                } else if (key === 'up') {
                    m.subtract(7,'day');
                } else if (key === 'right') {
                    m.add(1,'day');
                } else if (key === 'down') {
                    m.add(7,'day');
                } else if (key === 'pageup'){
                    m.subtract(1,'month');
                } else if (key === 'pagedown') {
                    m.add(1,'month');
                }else if (key === 'home') {
                    m.startOf('month');
                } else if (key === 'end') {
                    m.endOf('month');
                }
                
                $timeout(function(){
                    var momentDate = m.toDate();
                    datepicker.setValue(momentDate);
                    scope.date = momentDate;
                    var formattedDate = moment(momentDate).format(scope.options.inputFormat);
                    ngModelCtrl.$setViewValue(formattedDate);
                    ngModelCtrl.$modelValue = momentDate;
                    ngModelCtrl.$render();
                });
            };


            function showErrorMsg() {
                ngModelCtrl.$setValidity('bentoDatePicker',false)
            }

            function clearErrorMsg() {
                ngModelCtrl.$setValidity('bentoDatePicker',true)
            }

            function onDestroy(){
                if(scope.isOpen == true){
                    $timeout(function(){
                        scope.isOpen = false;
                    });
                }
                element.unbind('keydown',romeCtrl.onKeydown);
                element.unbind('blur',onBlur);
                datepicker.destroy();
            }
            //watch directive's options attribute
            function onOptionsChanged(newVal,oldVal){
                if (newVal && !angular.equals(newVal,oldVal)) {
                    //make new datepicker
                    datepicker.options(newVal);
                    //check if multi months
                    checkMonthsToDisplay(datepicker, newVal);
                    //add header element
                    headerElement = createHeaderElement(scope, datepicker);
                    //add events
                    addDatePickerEvents(scope, datepicker, headerElement, romeCtrl, element);
                    //return datepicker to scope
                    scope.control = datepicker;
                    //update model
                    romeCtrl.update();
                }
            }
        }

        /**
         * [checkMonthsToDisplay private function to check if multi-months class should be added]
         * @param  {[object]} datepicker [datepicker object]
         * @param  {[object]} options    [datepicker options object]
         */
        function checkMonthsToDisplay(datepicker, options) {
            if (options && options.monthsInCalendar && options.monthsInCalendar > 1) {
                angular.element(datepicker.container).addClass("rd-container-has-multi-months");
            } else {
                angular.element(datepicker.container).removeClass("rd-container-has-multi-months");
            }
        }

        /**
         * [createHeaderElement append header element to datepicker popup]
         * @param  {[object]} scope      [directive scope]
         * @param  {[object]} datepicker [datepicker object]
         * @return {[DOM element]}       [header DOM element]
         */
        function createHeaderElement(scope, datepicker) {
            var headerElement = document.createElement("div");
            headerElement.className = "rd-header";
            var dateElement = datepicker.container.querySelector('rd-date');
            datepicker.container.insertBefore(headerElement, dateElement);
            return headerElement;
        }

        /**
         * [addDatePickerEvents add datepicker callback handling to datepicker events]
         * @param {[object]} scope         [directive scope]
         * @param {[object]} datepicker    [datepicker object]
         * @param {[DOM element]} headerElement [header DOM element]
         * @param {[object]} ctrl          [directive controller]
         */
        function addDatePickerEvents(scope, datepicker, headerElement, ctrl, element) {
            //Handle datepicker's data event
            datepicker.on('data', onData);
            //Handle datepicker's hide event for the 'is-open' toggle logic
            datepicker.on('hide', onHide);
            //Handle datepicker's hide event for the 'is-open' toggle logic
            datepicker.on('show', onShow);

            function onData(value) {
                $timeout(function() {
                    //update model
                    ctrl.validateAndUpdate();
                });
            }

            function onHide() {
                $timeout(function() {
                    scope.isOpen = false;
                });
            }

            function onShow() {
                $timeout(function() {
                    scope.isOpen = true;

                    headerElement.innerText = datepicker.getDateString() ? datepicker.getDateString() : "";
                    //If append, attach to element
                    var calendar = datepicker.container;
                    
                    if (scope.appendTo) {
                        var parent = document.querySelector(scope.appendTo);
                        parent.appendChild(calendar);
                        calendar.style.left = (parseInt(calendar.style.left) - parent.offsetLeft + parent.scrollLeft) + 'px';
                        calendar.style.top = (parseInt(calendar.style.top) - parent.offsetTop + parent.scrollTop) + 'px';
                    }
                    element[0].focus();
                });
            }
        }

        return directive;
    }
})();
angular.module('ui.bootstrap.tabs', [])

.controller('TabsetController', ['$scope', function TabsetCtrl($scope) {
  var ctrl = this,
      tabs = ctrl.tabs = $scope.tabs = [];

  ctrl.select = function(selectedTab) {
    angular.forEach(tabs, function(tab) {
      if (tab.active && tab !== selectedTab) {
        tab.active = false;
        tab.onDeselect();
      }
    });
    selectedTab.active = true;
    selectedTab.onSelect();
  };

  ctrl.addTab = function addTab(tab) {
    tabs.push(tab);
    // we can't run the select function on the first tab
    // since that would select it twice
    if (tabs.length === 1 && tab.active !== false) {
      tab.active = true;
    } else if (tab.active) {
      ctrl.select(tab);
    }
    else {
      tab.active = false;
    }
  };

  ctrl.removeTab = function removeTab(tab) {
    var index = tabs.indexOf(tab);
    //Select a new tab if the tab to be removed is selected and not destroyed
    if (tab.active && tabs.length > 1 && !destroyed) {
      //If this is the last tab, select the previous tab. else, the next tab.
      var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
      ctrl.select(tabs[newActiveIndex]);
    }
    tabs.splice(index, 1);
  };

  var destroyed;
  $scope.$on('$destroy', function() {
    destroyed = true;
  });
}])

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabset
 * @restrict EA
 *
 * @description
 * Tabset is the outer container for the tabs directive
 *
 * @param {boolean=} vertical Whether or not to use vertical styling for the tabs.
 * @param {boolean=} justified Whether or not to use justified styling for the tabs.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab heading="Tab 1"><b>First</b> Content!</tab>
      <tab heading="Tab 2"><i>Second</i> Content!</tab>
    </tabset>
    <hr />
    <tabset vertical="true">
      <tab heading="Vertical Tab 1"><b>First</b> Vertical Content!</tab>
      <tab heading="Vertical Tab 2"><i>Second</i> Vertical Content!</tab>
    </tabset>
    <tabset justified="true">
      <tab heading="Justified Tab 1"><b>First</b> Justified Content!</tab>
      <tab heading="Justified Tab 2"><i>Second</i> Justified Content!</tab>
    </tabset>
  </file>
</example>
 */
.directive('tabset', function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    scope: {
      type: '@'
    },
    controller: 'TabsetController',
    templateUrl: 'template/tabs/tabset.html',
    link: function(scope, element, attrs) {
      scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
      scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
    }
  };
})

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tab
 * @restrict EA
 *
 * @param {string=} heading The visible heading, or title, of the tab. Set HTML headings with {@link ui.bootstrap.tabs.directive:tabHeading tabHeading}.
 * @param {string=} select An expression to evaluate when the tab is selected.
 * @param {boolean=} active A binding, telling whether or not this tab is selected.
 * @param {boolean=} disabled A binding, telling whether or not this tab is disabled.
 *
 * @description
 * Creates a tab with a heading and content. Must be placed within a {@link ui.bootstrap.tabs.directive:tabset tabset}.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <div ng-controller="TabsDemoCtrl">
      <button class="btn btn-small" ng-click="items[0].active = true">
        Select item 1, using active binding
      </button>
      <button class="btn btn-small" ng-click="items[1].disabled = !items[1].disabled">
        Enable/disable item 2, using disabled binding
      </button>
      <br />
      <tabset>
        <tab heading="Tab 1">First Tab</tab>
        <tab select="alertMe()">
          <tab-heading><i class="icon-bell"></i> Alert me!</tab-heading>
          Second Tab, with alert callback and html heading!
        </tab>
        <tab ng-repeat="item in items"
          heading="{{item.title}}"
          disabled="item.disabled"
          active="item.active">
          {{item.content}}
        </tab>
      </tabset>
    </div>
  </file>
  <file name="script.js">
    function TabsDemoCtrl($scope) {
      $scope.items = [
        { title:"Dynamic Title 1", content:"Dynamic Item 0" },
        { title:"Dynamic Title 2", content:"Dynamic Item 1", disabled: true }
      ];

      $scope.alertMe = function() {
        setTimeout(function() {
          alert("You've selected the alert tab!");
        });
      };
    };
  </file>
</example>
 */

/**
 * @ngdoc directive
 * @name ui.bootstrap.tabs.directive:tabHeading
 * @restrict EA
 *
 * @description
 * Creates an HTML heading for a {@link ui.bootstrap.tabs.directive:tab tab}. Must be placed as a child of a tab element.
 *
 * @example
<example module="ui.bootstrap">
  <file name="index.html">
    <tabset>
      <tab>
        <tab-heading><b>HTML</b> in my titles?!</tab-heading>
        And some content, too!
      </tab>
      <tab>
        <tab-heading><i class="icon-heart"></i> Icon heading?!?</tab-heading>
        That's right.
      </tab>
    </tabset>
  </file>
</example>
 */
.directive('tab', ['$parse', '$log', function($parse, $log) {
  return {
    require: '^tabset',
    restrict: 'EA',
    replace: true,
    templateUrl: 'template/tabs/tab.html',
    transclude: true,
    scope: {
      count: '@',
      active: '=?',
      heading: '@',
      onSelect: '&select', //This callback is called in contentHeadingTransclude
                          //once it inserts the tab's content into the dom
      onDeselect: '&deselect'
    },
    controller: function() {
      //Empty controller so other directives can require being 'under' a tab
    },
    compile: function(elm, attrs, transclude) {
      return function postLink(scope, elm, attrs, tabsetCtrl) {
        scope.$watch('active', function(active) {
          if (active) {
            tabsetCtrl.select(scope);
          }
        });

        scope.disabled = false;
        if ( attrs.disable ) {
          scope.$parent.$watch($parse(attrs.disable), function(value) {
            scope.disabled = !! value;
          });
        }

        // Deprecation support of "disabled" parameter
        // fix(tab): IE9 disabled attr renders grey text on enabled tab #2677
        // This code is duplicated from the lines above to make it easy to remove once
        // the feature has been completely deprecated
        if ( attrs.disabled ) {
          $log.warn('Use of "disabled" attribute has been deprecated, please use "disable"');
          scope.$parent.$watch($parse(attrs.disabled), function(value) {
            scope.disabled = !! value;
          });
        }

        scope.select = function() {
          if ( !scope.disabled ) {
            scope.active = true;
          }
        };

        tabsetCtrl.addTab(scope);
        scope.$on('$destroy', function() {
          tabsetCtrl.removeTab(scope);
        });

        //We need to transclude later, once the content container is ready.
        //when this link happens, we're inside a tab heading.
        scope.$transcludeFn = transclude;
      };
    }
  };
}])

.directive('tabHeadingTransclude', [function() {
  return {
    restrict: 'A',
    require: '^tab',
    link: function(scope, elm, attrs, tabCtrl) {
      scope.$watch('headingElement', function updateHeadingElement(heading) {
        if (heading) {
          elm.html('');
          elm.append(heading);
        }
      });
    }
  };
}])

.directive('tabContentTransclude', function() {
  return {
    restrict: 'A',
    require: '^tabset',
    link: function(scope, elm, attrs) {
      var tab = scope.$eval(attrs.tabContentTransclude);

      //Now our tab is ready to be transcluded: both the tab heading area
      //and the tab content area are loaded.  Transclude 'em both.
      tab.$transcludeFn(tab.$parent, function(contents) {
        angular.forEach(contents, function(node) {
          if (isTabHeading(node)) {
            //Let tabHeadingTransclude know.
            tab.headingElement = node;
          } else {
            elm.append(node);
          }
        });
      });
    }
  };
  function isTabHeading(node) {
    return node.tagName &&  (
      node.hasAttribute('tab-heading') ||
      node.hasAttribute('data-tab-heading') ||
      node.tagName.toLowerCase() === 'tab-heading' ||
      node.tagName.toLowerCase() === 'data-tab-heading'
    );
  }
})

;
