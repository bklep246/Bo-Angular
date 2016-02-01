/**
 * Bento Nav Toolbar NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.1
 * @date 06/02/2014
 * @info Stand alone toolbar for buttons and search input field
 * - responsive, buttons accumulate in dropdown as toolbar shrinks width-wise
 * - adds ARIA tags 
 * changelog
 * 01/22/2015
 * - added feature to allow ng-disable to work in the dropdown menu items. 
 */


(function (angular) {
    'use strict';

    //Define bentoUI App object
    angular
        .module('bento.nav.toolbar', ['pascalprecht.translate','bento.services', 'bento.reset', 'bento.cookie'])
        .config(['$translateProvider', '$bentoTranslateLoaderProvider', '$bentoJSRootProvider', '$bentoCookieProvider',
            function ($translateProvider, $bentoTranslateLoaderProvider, $bentoJSRootProvider, $bentoCookieProvider) {

            // Project Concert language support
            var language = $bentoCookieProvider.getCookie('uiCulture', 'en');

            // Setup provider
            $bentoJSRootProvider.configAngularTranslateProvider(
              'bento-nav-toolbar',
              $translateProvider,
              $bentoTranslateLoaderProvider,
              language
            );
            }
        ])
        .constant('bentoNavToolbarConfig',{
            addAccessibilityToMenu: function(menuItem){
                menuItem.setAttribute('role','menu');
                var menuChildren = angular.element(menuItem).children();
                //set ARIA roles for 'more' buttons
                for(var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];
                    this.addAccessibilityToListElements(el);
                    el.setAttribute('role','menuitem');
                    if(angular.element(el).hasClass('divider')){
                        el.setAttribute('role','separator');
                    }
                }
            },
            addAccessibilityToListElements: function(listItem){
                var anchorButton = listItem.getElementsByTagName('a')[0];
                var listElement = angular.element(listItem);   

                if(anchorButton){
                    anchorButton.setAttribute('role','button');
                }

                if(listElement.hasClass('active')){
                    anchorButton.setAttribute('aria-checked','true');
                }
                if(listElement.hasClass('disabled')){
                    anchorButton.setAttribute('aria-disabled','true');
                }
            },
            disableMenuButtons: function(menuItem){
                if(!menuItem){ return; }
                var menuChildren = angular.element(menuItem).children();
                for(var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];
                    el.setAttribute('tabindex','-1');
                    var anchorButton = el.getElementsByTagName('a')[0];
                    if(anchorButton){
                        anchorButton.setAttribute('tabindex','-1');
                    }
                }
            },
            enableMenuButtons: function(menuItem){
                if(!menuItem){ return; }
                var menuChildren = angular.element(menuItem).children();
                for(var i = 0, total = menuChildren.length; i < total; i++) {
                    var el = menuChildren[i];   
                    el.removeAttribute('tabindex');
                    var anchorButton = el.getElementsByTagName('a')[0];
                    if(anchorButton){
                        anchorButton.removeAttribute('tabindex');
                    }
                }
            },

        })
        .controller('bentoNavToolbarController', ['$scope', '$translate',
            function ($scope,$translate) {
                // Watch Language setting
                $scope.$watch('lang', function () {
                  if (!!$scope.lang) {
                    $translate.use($scope.lang.toLowerCase());
                  }
                });
            }
        ])
        .directive('toolbarDropdown', ['$parse', '$window', '$timeout', '$compile', 'bentoNavToolbarConfig', 
            function($parse, $window, $timeout, $compile, config) {
                return {
                    restrict: 'EAC',
                    scope: false,
                    link: function(scope, element) {
                        var isToggledOpen = false;
                        var toolbarMenu = element[0].querySelector('ul.toolbar-dropdown-menu');
                        var toggleElement = element[0].querySelector('a.toolbar-dropdown-toggle');

                        element.addClass('toolbar-dropdown-close');
                        element.removeClass('toolbar-dropdown-open');
                        

                        toggleElement.setAttribute('aria-expanded','false');
                        
                        config.disableMenuButtons(toolbarMenu);


                        function closeMenu(el){
                                element.addClass('toolbar-dropdown-close');
                                element.removeClass('toolbar-dropdown-open');
                                el.setAttribute('aria-expanded','false');
                                config.disableMenuButtons(toolbarMenu);
                        }


                        angular.element(toggleElement).bind('click',function(){
                            //if element has attribute disabled, do not toggle open
                            if(toggleElement.attributes['disabled'] && toggleElement.attributes['disabled'].value==='disabled'){
                                return;
                            }
                            if(isToggledOpen) {
                                closeMenu(this);
                            }
                            else {
                                element.addClass('toolbar-dropdown-open');
                                element.removeClass('toolbar-dropdown-close');
                                toggleElement.setAttribute('aria-expanded','true');
                                config.enableMenuButtons(toolbarMenu);
                            }
                            isToggledOpen = !isToggledOpen;
                        });

                        //watch if dropdown toggle has attribute disabled
                        scope.$watch(function(){return toggleElement.attributes['disabled'];}, function(newValue){
                            if(newValue && newValue.value==='disabled'){
                                closeMenu(toggleElement);
                                isToggledOpen = false;
                                return;
                            }
                        });


                        //ARIA
                        config.addAccessibilityToMenu(toolbarMenu);
                    }
                };
            }
        ])
        .directive('bentoNavToolbar', ['$parse', '$window', '$timeout', '$compile', 'bentoNavToolbarConfig',
            function($parse, $window, $timeout, $compile, config) {
                return {
                    restrict: 'EA',
                    scope: {
                        'lang':'='
                    },
                    controller: 'bentoNavToolbarController',
                    link: function(scope, element, attrs) {
                        // localization
                        var moreLabel = '{{ "MORE" | translate }}';
                        // if more button is explicit, use the attribute's value
                        if(attrs.moreButtonLabel !== undefined){
                            moreLabel = attrs.moreButtonLabel;
                        }
                        //template for "more" dropdown
                        var moreTemplate = '<li class="dropdown" data-more-buttons="true" dropdown>' + 
                                           '    <a href="" class="dropdown-toggle" role="button" dropdown-toggle>' + moreLabel + '</a>' + 
                                           '    <ul role="menu" class="dropdown-menu" ng-click="$event.stopPropagation()">' + 
                                           '    </ul>' + 
                                           '</li>';

                        //get main '<ul>' element and append "more" dropdown
                        var menuList = element[0].getElementsByTagName('ul')[0];
                        if(!element[0].querySelector('[data-more-buttons]')){
                            menuList.insertAdjacentHTML('beforeend',moreTemplate);
                            var moreElement = menuList.lastChild;
                            $compile(moreElement)(scope);
                        }
                        //set up initial vars
                        var moreButton = element[0].querySelector('[data-more-buttons]'),           //more button
                            moreWidth = moreButton ? moreButton.offsetWidth : 0,                    //width of more button
                            mainContainer = angular.element(menuList),                              //main '<ul>' element as angular object
                            rightContainer = element[0].querySelector('.navbar-right'),             //search container
                            buttonArray = [],                                                       //array of buttons
                            moreContainer = moreButton.querySelector('ul.dropdown-menu'),   //'<ul>' element of 'more' dropdown
                            moreIndex;                                                              //index position of 'more' <li> element
                        //children of main '<ul>' element
                        var children = mainContainer.children();        

                        //array of all dropdowns that are not 'more' button
                        var dropdownButtons = [];

                        //init buttons, determine initial widths
                        function initButtons(){
                            if(!element[0].hasAttribute('role')){
                                element[0].setAttribute('role','toolbar');
                            }

                            var buttonElement, originalElement;

                            menuList.setAttribute('role','menu');

                            //determine initial order and widths of buttons
                            for (var i = 0, total = children.length; i < total; i++) {
                                var el = children[i];
                                var width = el.offsetWidth;
                                //set data attributes with order and widths
                                el.setAttribute('data-button-id', i);
                                el.setAttribute('data-button-width', width);

                                //ARIA
                                config.addAccessibilityToListElements(el);

                                buttonArray[i]=el;
                                
                                //if element is a dropdown, clone it for use in the 'more' dropdown as 
                                //a nested dropdown with different behavior

                                if(angular.element(el).hasClass('dropdown')&&!el.hasAttribute('data-more-buttons')){
                                    buttonElement = el.cloneNode(true);
                                    originalElement = el;

                                    var obj = {
                                        'buttonElement':buttonElement,
                                        'originalElement':originalElement
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
                                originalElement.parentNode.insertBefore(buttonElement,originalElement);

                                //get the order id
                                var id = buttonElement.getAttribute('data-button-id');
                                //remove the data attribute for button-id
                                buttonElement.removeAttribute('data-button-id');
                                //set new data attribute with same order id, will be used later 
                                //in adjustButtons() to determine placement in "more" dropdown
                                buttonElement.setAttribute('data-dropdown-id',id);
                                //set width data attribute to 0, just in case
                                buttonElement.setAttribute('data-button-width',0);
                                //hide it until later when it's displayed in the 'more' dropdown
                                buttonElement.style.display = 'none';
                                
                                //alter the class names so it doesn't get compiled as regular dropdown
                                //it will compile as new toolbar-dropdown directive instead
                                buttonElement = angular.element(buttonElement);

                                if(buttonElement.hasClass('dropdown')){
                                    buttonElement.removeClass('dropdown').addClass('toolbar-dropdown');
                                    buttonElement.removeAttr('dropdown');
                                    var dropdownMenu = buttonElement[0].querySelector('ul.dropdown-menu');
                                    angular.element(dropdownMenu).removeClass('dropdown-menu').addClass('toolbar-dropdown-menu');
                                    var dropdownToggle = buttonElement[0].querySelector('a.dropdown-toggle');
                                    angular.element(dropdownToggle).removeClass('dropdown-toggle').removeAttr('dropdown-toggle').addClass('toolbar-dropdown-toggle');
                                }
                                //compile the toolbar-dropdown directive
                                $compile(buttonElement)(scope.$parent);
                            }

                            //after all the index of buttons are set, cache the index of more button
                            moreIndex = moreButton.getAttribute('data-button-id');

                            //window resize listener
                            angular.element($window).bind('resize', function(){
                                scope.$apply();
                            });

                            scope.$watch(function() {
                                var containerWidth = element[0].offsetWidth;
                                return containerWidth;
                            }, function() {
                                //adjust buttons on window resize
                                adjustButtons();
                            });
                        }

                        //shifts buttons between main container and more container on window resize
                        function adjustButtons() {
                            var containerWidth = element[0].offsetWidth,
                                childrenWidth = moreWidth,
                                rightWidth = rightContainer ? rightContainer.offsetWidth : 0,
                                diffWidth = containerWidth - rightWidth - 20,
                                mainButtonArray = [],
                                moreButtonArray = [];

                            moreWidth = moreButton ? moreButton.offsetWidth : 0;
                            
                            //iterate through all the buttons
                            for (var index = 0, total = buttonArray.length; index < total; index++) {
                                var el = buttonArray[index];
                                if (el.getAttribute('data-more-buttons') !== 'true') {
                                    childrenWidth += Number(el.getAttribute('data-button-width'));
                                    var buttonItem = buttonArray[index];
                                    var buttonElement = angular.element(buttonItem);
                                    var dropdownItem;

                                    //if sum of all button widths is greater than window
                                    //shift them into 'more' dropdown
                                    if (childrenWidth > diffWidth) {
                                        buttonItem.setAttribute('role','menuitem');
                                        moreButtonArray.push(buttonItem);

                                        //switch dropdowns
                                        if(buttonElement.hasClass('dropdown')){
                                            //get related toolbar-dropdown component
                                            var id = buttonItem.getAttribute('data-button-id');
                                            id = '[data-dropdown-id="'+id+'"]';
                                            dropdownItem = element[0].querySelector(id);
                                            dropdownItem.style.display = 'block';
                                            buttonItem.style.display = 'none';
                                            moreButtonArray.push(dropdownItem);
                                        }
                                    } else {
                                    //if window is wider then sum of all button widths combined
                                    //shift buttons out of 'more' dropdown and back into 'main' container
                                        buttonItem.removeAttribute('role');
                                        mainButtonArray.push(buttonItem);

                                        //switch dropdowns
                                        if(buttonElement.hasClass('dropdown')){
                                            var id = buttonItem.getAttribute('data-button-id');
                                            id = '[data-dropdown-id="'+id+'"]';
                                            dropdownItem = element[0].querySelector(id);
                                            dropdownItem.style.display = 'none';
                                            buttonItem.style.display = 'block';
                                            mainButtonArray.push(dropdownItem);
                                        }
                                    }
                                }
                            }

                            var moreButtonCount = moreButtonArray.length-1;
                            //iterate through 'more' button array and add to DOM
                            while (moreButtonCount >= 0){
                                moreContainer.insertBefore(moreButtonArray[moreButtonCount],moreContainer.firstChild);
                                moreButtonCount--;
                            }

                            //iterate through 'main' button array and add to DOM
                            for(var i = 0, total = mainButtonArray.length; i < total; i++){
                                mainContainer.append(mainButtonArray[i]);
                                //shift more button to correct place
                                var buttonIndex = mainButtonArray[i].getAttribute('data-button-id');
                                if(moreIndex > buttonIndex){
                                    mainContainer.append(moreButton);
                                }
                            }

                            //display or hide 'more' button
                            if(!angular.element(moreContainer).children().length){
                                moreButton.style.display = 'none';
                            } else {
                                moreButton.style.display = 'block';
                            }

                        }

                        //initial set up
                        $timeout(function(){
                            initButtons();
                            adjustButtons();
                        },10);

                    }
                };
            }
        ]);
})(window.angular);