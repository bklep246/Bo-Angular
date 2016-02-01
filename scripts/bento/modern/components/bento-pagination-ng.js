/**
 * Bento Pagination NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>, Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.3.1
 * @date 21/05/2015
 *
 * Now using Bento Translate Loader
 *
 * Refactored on
 * @author Yashraj J.D <YashrajJayaraj.Digge@thomsonreuters.com>, Joe Huang <joe.huang@thomsonreuters.com>, Chi Gao <chi.gao@thomsonreuters.com>
 * @date 28/01/2015
 */

(function(angular, window) {
    'use strict';
    //Define bentoUI App object
    var bentoPaginageApp = angular.module('bento.pagination', ['bento.services', 'bento.select', 'bento.cookie', 'pascalprecht.translate']);
    //Directive
    bentoPaginageApp
        .config(['$translateProvider', '$bentoTranslateLoaderProvider', '$bentoJSRootProvider', '$bentoCookieProvider',
            function($translateProvider, $bentoTranslateLoaderProvider, $bentoJSRootProvider, $bentoCookieProvider) {
                // Concert team Support and setup provider
                var language = $bentoCookieProvider.getCookie('uiCulture', 'en');
                $bentoJSRootProvider.configAngularTranslateProvider('bento-pagination', $translateProvider, $bentoTranslateLoaderProvider, language);
            }
        ])
        .directive('bentoPagination', ['$parse', '$translate', '$q',
            function($parse, $translate, $q) {
                return {
                    restrict: 'EA',
                    scope: {
                        currentPage: '=page',
                        totalItems: '=',
                        itemsPerPage: '=?',
                        infoText: '@',
                        infoPageText: '@',
                        goToText: '@',
                        lang: '=?',
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
                        $translate.preferredLanguage('en');
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
                            directionLinks: true,
                            infoPageText: 'Page _PAGE_ of _PAGES_',
                            infoText: '_START_ to _END_ of _MAX_ Entries',
                            goToText: 'Go',
                            lang: 'en'
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
                            if (typeof(scope.infoText) !== "undefined") {
                                var endValue = (scope.totalItems < (scope.itemsPerPage * scope.currentPage)) ? scope.totalItems : (scope.itemsPerPage * scope.currentPage);
                                scope.VM.infoText = scope.infoText;
                                scope.VM.infoText = scope.VM.infoText.replace("_START_", (scope.currentPage - 1) * scope.itemsPerPage + 1);
                                scope.VM.infoText = scope.VM.infoText.replace("_END_", endValue);
                                scope.VM.infoText = scope.VM.infoText.replace("_MAX_", scope.totalItems);
                            }
                            if (typeof(scope.infoPageText) !== "undefined") {
                                scope.VM.infoPageText = scope.infoPageText;
                                scope.VM.infoPageText = scope.VM.infoPageText.replace("_PAGE_", scope.currentPage);
                                scope.VM.infoPageText = scope.VM.infoPageText.replace("_PAGES_", Math.ceil(scope.totalItems / scope.itemsPerPage).toString());
                            }
                            scope.eventTracking(trackedEvent);
                            if(scope.currentPage != onChangeEvent.page){
                                onChangeEvent.page = scope.currentPage;
                                scope.onChange(onChangeEvent);
                            }
                        };
                        scope.renderComponent = renderComponent; //used only to test this function.

                        scope.textCollection = [];
                        if (scope.lang !== undefined) {
                            scope.$watch('lang', function(newVal) {
                                $translate.use(newVal).then(function() {
                                    $translate('GO_BUTTON').then(function(text) {
                                        scope.goToText = text;
                                        scope.textCollection[0] = text;
                                    });
                                    $translate('INFO_PAGE_TEXT').then(function(text) {
                                        scope.infoPageText = text;
                                        scope.textCollection[1] = text;
                                    });
                                    $translate('INFO_TEXT').then(function(text) {
                                        scope.infoText = text;
                                        scope.textCollection[2] = text;
                                    });
                                });
                            });
                        } //internationalization code.

                        scope.$watchCollection('textCollection', function() {
                            trackedEvent.eventName = "pagination text changed";
                            trackedEvent.value = scope.infoText + "//" + scope.infoPagetext + "//" + scope.lang;
                            renderComponent();
                        });

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


                    }
                };
            }
        ]);
})(window.angular, window);
