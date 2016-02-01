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
