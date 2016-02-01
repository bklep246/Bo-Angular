/**
 * Bento Toolbar NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.2
 * @date 06/02/2014
 * @info Toolbar for buttons and search input field
 * - button actions are defined in the controller
 * - responsive, buttons accumulate in dropdown as toolbar shrinks width-wise
 * - option to add default buttons under dropdown
 */


(function(angular, undefined) {
    'use strict';

    //Define bentoUI App object
    angular
        .module('bento.toolbar', ['pascalprecht.translate','bento.services', 'bento.reset'])
        //Directive
        .config(['$translateProvider', '$bentoTranslateLoaderProvider', '$bentoJSRootProvider', '$bentoCookieProvider',
            function ($translateProvider, $bentoTranslateLoaderProvider, $bentoJSRootProvider, $bentoCookieProvider) {

            // Project Concert language support
            var language = $bentoCookieProvider.getCookie('uiCulture', 'en');

            // Setup provider
            $bentoJSRootProvider.configAngularTranslateProvider(
              'bento-toolbar',
              $translateProvider,
              $bentoTranslateLoaderProvider,
              language
            );
            }
        ])
        .constant('bentoToolbarConfig', {
            "buttons": [

            ],
            // "moreText": "More",
            // "collapsedText": "Menu",
            // "searchText": "Search"
        })
        .controller('BentoToolbarController', ['bentoToolbarConfig', '$scope', '$attrs', '$parse', '$interpolate', '$translate',
            function(config, $scope, $attrs, $parse, $interpolate, $translate) {
                $scope.searchInfo = {
                    term:""
                }
                this.getAttributeValue = function(attribute, defaultValue, interpolate) {
                    return angular.isDefined(attribute) ? (interpolate ? $interpolate(attribute)($scope.$parent) : $scope.$parent.$eval(attribute)) : defaultValue;
                };
                this.render = function() {
                    $scope.buttons = this.getButtons();
                    $scope.hasSearch = $attrs.onSearch || $attrs.onSearchEnter;
                    $scope.morebuttons = this.getMoreButtons();
                    $scope.moreText = this.getMoreText();
                    $scope.searchText = this.getSearchText();
                };
                $scope.$watch('searchInfo.term',function(){
                    if($scope.searchTerm!=undefined){
                        $scope.searchTerm = $scope.searchInfo.term;
                    }
                    $scope.onSearch({
                        term: $scope.searchInfo.term
                    })
                },true)
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
        .directive('bentoToolbar', ['$compile','$parse', '$window', '$timeout', '$translate', 'bentoToolbarConfig',
            function($compile, $parse, $window, $timeout, $translate, config) {
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
                        var buttons = scope.buttonConfig,
                            moreButtons = scope.moreButtonConfig,
                            movedButtons = [],
                            moreText = "",
                            searchText = "",
                            menuText = "";

                        $translate(['TOOLBAR.SEARCH', 'TOOLBAR.MORE', 'TOOLBAR.MENU']).then(function (translations) {
                            moreText = translations["TOOLBAR.MORE"];
                            searchText = translations["TOOLBAR.SEARCH"];
                            menuText = translations["TOOLBAR.MENU"];
                          });
                        // if(scope.moreText){
                        //     config.moreText = scope.moreText;
                        // }
                        // if(scope.collapsedText){
                        //     config.collapsedText = scope.collapsedText;
                        // }
                        // if(scope.searchText){
                        //     config.searchText = scope.searchText;
                        // }

                        toolbarCtrl.getButtons = function() {
                            return buttons;
                        };
                        toolbarCtrl.getMoreButtons = function() {
                            moreButtons = moreButtons ? moreButtons : [];
                            var allMoreButtons = movedButtons.concat(moreButtons);
                            return allMoreButtons;
                        };
                        toolbarCtrl.getMoreText = function() {
                            return moreText;
                        }
                        toolbarCtrl.getSearchText = function() {
                            return searchText;
                        }
                        scope.$watch('buttonConfig', function(buttonData) {
                            buttons = scope.buttonConfig;
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

                                movedButtons = [];

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
                                        if (buttons[i]) {
                                            movedButtons.push(buttons[i]);
                                        }
                                    }
                                }
                                if (movedButtons.length >= buttons.length) {
                                    moreText = menuText;
                                } else {
                                    moreText = moreText;
                                }
                                toolbarCtrl.render();
                                //$compile(element)(scope);

                            }
                        };
                    }
                };
            }
        ]);
})(window.angular);