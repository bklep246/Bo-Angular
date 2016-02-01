/**
 * Bento Number Input Directive
 *
 * @author Chi Gao <chi.gao@thomsonreuters.com>
 * @version 0.2
 * @date 06/26/2014
 *
 * Changelog:
 * 17/04/2015
 * Add support for ngModel where object is not attached directly to scope
 *
 * 19/02/2015
 * Adding max and min support
 *
 * 26/06/2014
 * Initial build
 *
 */

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
                            '<i class="glyphicon glyphicon-chevron-up"></i>' +
                            '</div>'
                        );
                        var _downButton = angular.element('<div ' +
                            'id="bento-number-input-button-up-' + uid + '" ' +
                            'class="bento-number-input-button bento-number-input-button-down">' +
                            '<i class="glyphicon glyphicon-chevron-down"></i>' +
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