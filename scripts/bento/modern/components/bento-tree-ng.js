/**
 * Bento Tree NG
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.7
 * @date 22/12/2014
 *
 * Changelog:
 *
 * 22/12/2014
 * - Adding `selectModel`
 * - Adding `selectableModel`
 *
 * 08/12/2014
 * New Feature:
 * - `select-as-check` attribute is added
 * - {collapsed:[true|false]} is exposed
 * - `on-collapse-change` callback document is added
 *
 * 16/07/2014
 * Update:
 * - `bento-tree-root` class is now `bento-tree-branch`
 * - `bento-tree-root` is now the true `root` to this tree
 *
 *
 * 15/07/2014
 * Update:
 * - Width sniffer is fixed
 *
 * New Feature:
 * - `.bento-tree-small` class is added for desktop applications
 *
 *
 * 11/07/2014
 * Update:
 * - `treeCollapse` typo is fixed
 * - Logic error that prevents `treeCollapse` to work is fixed
 *
 * 26/06/2014
 * Update:
 * - MAJOR code base overhaul!! Now using general data binding instead of attribute parameters
 * - Template is reworked
 * - `loadMore` is turn off
 * - All checkboxes are now related so that checking/unchecking one node will trigger it's
 *   parent's status to change based on the siblings status accordingly
 *
 * New Features:
 * - `data-on-checkbox-change` call back is added
 *
 * 12/06/2014
 *
 * New Features:
 *  - `data-use-checkbox` is added
 *  - `data-checkbox-model` is added
 *  - `data-second-tree-icon` is added
 *
 * This is a Bento port of the original FEF Tree Directive (preview version)
 *
 *
 * TODO: checkbox with server interactions
 *
 */
(function (angular) {
  "use strict";

  // Provides lazy loading to enhance initial load time
  angular.module('bento.tree', ['bento.services'])
    // Tree selection factory
    .factory('treeSelection', function () {

      var TreeSelectionHelper = function() {

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

        this.updateSelection = function(_node) {
          if (this.node.indexOf(_node) === -1) {
            this.node.push(_node);
          }
        };

        this.getSelection = function() {
          return this.node;
        };

        this.removeSelection = function (_node) {
          var index = this.node.indexOf(_node);
          this.node.splice(index, 1);
        };

        this.clearNodes = function() {
          this.node = [];
        };

        this.findSelectElement = function(node, child, lable, id) {
          return this.getSelection();
        };


      };

      var getHelper = function(){
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

        if (typeof checked !== 'undefined') {

          node[checkboxModelName] = checked;
          node._indeterminate = false;
          document.getElementById(node._id).indeterminate = false;
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
            document.getElementById(node._id).indeterminate = true;
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
          var checkbox = document.getElementById(parentNode._id);

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
        if (typeof node._id === 'undefined') {
          node._id = 'bento-tree-node-checkbox-' + Math.round(Math.random() * 1000000000000);
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

        var hasChildren = $scope.treeModel.length > 0;

        // treeId defines the root of this tree
        if (typeof $scope.treeSelectionHelper === 'undefined') {
          $scope.treeSelectionHelper = treeSelection.getHelper();
          for (var i = 0; i < $scope.treeModel.length; i++) {
            treeHelper.formatNodeBranch($scope.treeModel[i], $scope.nodeChildren);
          }

          // Add a root class
          $element.addClass('bento-tree-root');

          // Watch main data object to re-adjust the width
          $scope.$watchCollection('treeModel', function () {
            $timeout(function () {
              treeHelper.adjustMinWidth($element);
            });
          });

          // Update checks
          $timeout(function () {
            for (var j = 0; j < $scope.treeModel.length; j++) {
              treeHelper.checkOffspring($scope.treeModel[j], $scope.nodeChildren, $scope.checkboxModel);
            }
          });

        }

        //check to see if we need to collapse by default
        if (hasChildren) {
          var children = $scope.treeModel;
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
          for (var i = 0; i < $scope.treeModel.length; i++) {
            var nodeModel = $scope.treeModel[i];
            if (!!treeHelper.getSelectModelValue($scope, nodeModel)) {
              $scope.labelSelect(nodeModel);
            }
          }
        });

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

          var node = _node || this.node;
          // remove indeterminate
          node._indeterminate = false;
          document.getElementById(node._id).indeterminate = false;

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
          }else
          // Forward a label select as tree toggle
          if(!!$scope.expandOnlyModel && elementNode[$scope.expandOnlyModel]){
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
            treeId            : '@',
            treeIcon          : '@',
            treeCollapsed     : '=',
            treeModel         : '=',
            treeLabel         : '@',
            nodeChildren      : '@',
            collapsingCallback: '=', // Two way binding is needed for direct function reference
            expandingCallback : '=', // Two way binding is needed for direct function reference
            selectCallback    : '=', // Two way binding is needed for direct function reference
            multiSelect       : '=',
            useCheckbox       : '=',
            selectModel       : '@', // Selection Model
            checkboxModel     : '@',
            selectableModel   : '@', // Model to determine if the node is selectable or not
            expandOnlyModel   : '@', // Model to determine if the current node can only expand and collapse
            selectAsCheck     : '=',
            onCheckboxChange  : '=', // Two way binding is needed for direct function reference
            secondTreeIcon    : '@',
            treeSelectionHelper: '=?' // **Internal Use** forwarded TreeSelectionHelper
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
