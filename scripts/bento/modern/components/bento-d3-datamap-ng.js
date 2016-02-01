/**
 * Bento D3 Map NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.1
 * @date 05/12/2014
 *
 * @description Angular Directive Wrapper for D3 Map
 * d3js.org
 * Helpful d3 Map references
 * https://github.com/markmarkoh/datamaps/blob/master/README.md#getting-started
 * 3 letter country codes http://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
 */


(function(angular, undefined) {
    'use strict';

    //Define bentoUI App object
    var bentoApp = angular.module('bento.d3');
    //Directive
    bentoApp
        .directive('bentoD3DataMap', ['bentoD3Config', '$window', '$timeout', '$compile',
            function(config, $window, $timeout, $compile) {
                return {
                    restrict: 'EA',
                    scope: {
                        "options": "=",
                        "alpha": "="
                    },
                    link: function(scope, element, attrs) {
                        var currentCountry = "";
                        var zoom;

                        var features;
                        var defaultOptions = {
                            projection: 'times',
                            fills: {
                                defaultFill: "#ccc"
                            },
                            geographyConfig: {
                                dataUrl: null, //if not null, datamaps will fetch the map JSON (currently only supports topojson)
                                hideAntarctica: true,
                                borderWidth: 1,
                                borderColor: '#ddd',
                                popupTemplate: function(geography, data) { //this function should just return a string
                                },
                                popupOnHover: true, //disable the popup while hovering
                                highlightOnHover: true,
                                highlightFillColor: "#000",
                                highlightFillOpacity: 0.2,
                                highlightBorderColor: 'rgba(0,0,0,0.12)',
                                highlightBorderWidth: 5
                            },
                            setProjection: function(element) {
                                //times original size = 468 x 245
                                var origWidth = 468;
                                var origHeight = 245;
                                var scaleX = element.offsetWidth / origWidth;
                                var scaleY = element.offsetHeight / origHeight;

                                var scale = scaleY < scaleX ? scaleY : scaleX;

                                var projection = d3.geo.times()
                                    .center([0, 0])
                                    .scale(scale * 100)
                                    .translate([element.offsetWidth / 2, element.offsetHeight / 2 + (30 * scale)]);
                                var path = d3.geo.path()
                                    .projection(projection);
                                return {
                                    path: path,
                                    projection: projection
                                };
                            }
                        }
                        var usaDefaultOptions = {
                            setProjection: function(element) {
                                //times original size = 468 x 245
                                var origWidth = 200;
                                var origHeight = 97;
                                var scaleX = element.offsetWidth / origWidth;
                                var scaleY = element.offsetHeight / origHeight;

                                var scale = scaleY < scaleX ? scaleY : scaleX;
                                //scale = 2;
                                var projection = d3.geo.times()
                                    .center([0, 0])
                                    .scale(scale * 100)
                                    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                                var path = d3.geo.path()
                                    .projection(projection);
                                return {
                                    path: path,
                                    projection: projection
                                };
                            }
                        }
                        var zoomed = function () {
                          features.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
                          features.select(".state-border").style("stroke-width", 1.5 / d3.event.scale + "px");
                          features.select(".county-border").style("stroke-width", .5 / d3.event.scale + "px");
                        }
                        scope.mapRollOver = function(id) {
                            if (currentCountry != id) {
                                console.log(id);
                            }
                            currentCountry = id;
                        }
                        scope.mapIsDone = function() {}

                        scope.$watch('options', function(options) {
                            scope.render(options);
                        }, true);

                        scope.$on('$destroy',onDestroy);
                        element.on('$destroy',onDestroy);

                        function getPopupTopPosition(position, svg) {
                            var panelHeight = element.find('.datamaps-hoverover').height();
                            var totalHeight = element.height();
                            var pad = panelHeight * .5;
                            var topPosition = position - pad;
                            if (position > (totalHeight - pad)) {
                                topPosition = totalHeight - panelHeight;
                            }
                            if (position < pad + 30) {
                                topPosition = 30;
                            }

                            return topPosition;
                        }

                        function getPopupLeftPosition(position, svg) {
                            var panelWidth = element.find('.datamaps-hoverover').width();
                            var totalWidth = element.width();
                            var pad = 60;
                            var leftPosition = position + pad;
                            if (position > totalWidth * .5) {
                                leftPosition = position - panelWidth - pad * .5;
                            }
                            return leftPosition;
                        }

                        function updatePopup(self, el, d, options, svg) {
                            var hoverPanel = d3.select(svg[0][0].parentNode).select('.datamaps-hoverover');
                            var previousAttributes = JSON.parse(el.attr('data-previous-attributes'));
                            scope.$apply(function() {
                                scope.alpha = d.id
                            });
                            var data = JSON.parse(el.attr('data-info'));
                            var closeButtonTemplate = '<div class="hover-close-btn"><span class="bento-icon-close-x"></span></div>';
                            if (data) {
                                hoverPanel
                                    .html(function() {
                                        return options.popupTemplate(d, data)+closeButtonTemplate;
                                    })
                                    .style('display', 'block')
                                    .style('opacity', '1')
                                    .style('z-index', 2);

                                var closeBtn = hoverPanel.select('.hover-close-btn');
                                closeBtn.on('click',function(d){
                                    hoverPanel
                                        .style('opacity', '0')
                                        .style('top', '-9999999px');
                                    scope.$apply(function() {
                                        scope.alpha = "";
                                    });
                                });

                                if (previousAttributes) {
                                    if (attrs.theme == "dark") {
                                        hoverPanel
                                            .style('color', previousAttributes.fill);
                                    } else {
                                        hoverPanel
                                            .style('background-color', previousAttributes.fill);
                                        closeBtn
                                            .style('background-color', previousAttributes.fill);
                                    }
                                } else {
                                    hoverPanel
                                        .style('background-color', '#ccc');
                                }
                                var position = d3.mouse(element[0]);
                                hoverPanel
                                    .style('top', (getPopupTopPosition(position[1], svg)) + "px")
                                    .style('left', (getPopupLeftPosition(position[0], svg)) + "px")

                            } else {
                                hoverPanel
                                    .style('opacity', '0')
                                    .style('top', '-9999999px');
                            }

                            //$compile(element.contents())(scope);

                            //el.on('mousemove', null);
                            //el.on('mousemove', function() {
                            //});
                        };

                        function moveToFront() {
                            this.parentNode.appendChild(this);
                        }


                        scope.render = function(options) {
                            var mapOptions = options ? config.mergeObjects(defaultOptions, angular.copy(options)) : defaultOptions;
                            mapOptions.element = element[0];
                            mapOptions.done = scope.mapIsDone();

                            if (mapOptions.scope === 'usa') {
                                config.mergeObjects(mapOptions, usaDefaultOptions);
                            }
                            // mapOptions.geographyConfig.popupTemplate = function(geography, data) { //this function should just return a string
                            //     scope.mapRollOver(geography.id);

                            // }
                            var map = new Datamap(mapOptions);


                            var svg = d3.select(element[0]).select("svg");
                            var self = this;
                            var options = mapOptions.geographyConfig;

                            features = svg.selectAll('.datamaps-subunit');

                            features
                                .on('mouseover', function(d) {
                                    var $this = d3.select(this);
                                    var previousAttributes = {
                                        'fill': $this.style('fill'),
                                        'stroke': $this.style('stroke'),
                                        'stroke-width': $this.style('stroke-width'),
                                        'fill-opacity': $this.style('fill-opacity')
                                    };
                                    $this
                                    //.style('fill', options.highlightFillColor)
                                    .style('stroke', options.highlightBorderColor)
                                    .style('stroke-width', options.highlightBorderWidth)
                                    .attr('data-previous-attributes', JSON.stringify(previousAttributes));

                                    if (!/MSIE/.test(navigator.userAgent)) {
                                        moveToFront.call(this);
                                    }

                                })
                                .on('click', function(d) {
                                    var $this = d3.select(this);
                                    var previousAttributes = {
                                        'fill': $this.style('fill'),
                                        'stroke': $this.style('stroke'),
                                        'stroke-width': $this.style('stroke-width'),
                                        'fill-opacity': $this.style('fill-opacity')
                                    };

                                    svg.selectAll('.datamaps-subunit')
                                    .style('stroke',options.borderColor)
                                    .style('stroke-width',options.borderWidth);

                                    $this
                                    .style('stroke', options.highlightBorderColor)
                                    .style('stroke-width', options.highlightBorderWidth)
                                    .attr('data-previous-attributes', JSON.stringify(previousAttributes));

                                    if (options.popupOnHover) {
                                        //console.log(options);
                                        updatePopup(this, $this, d, options, svg);

                                    }

                                })
                                .on('mouseout', function() {
                                    var $this = d3.select(this);
                                        //reapply previous attributes
                                        var previousAttributes = JSON.parse($this.attr('data-previous-attributes'));
                                        for (var attr in previousAttributes) {
                                            $this.style(attr, previousAttributes[attr]);
                                        }

                                });


                                zoom = d3.behavior.zoom()
                                         .translate([0, 0])
                                         .scale(1)
                                         .scaleExtent([1, 8])
                                         .on("zoom", zoomed);

                                svg.call(zoom);

                        };

                        function onDestroy(){
                            var svg = d3.select(element[0]).select("svg");
                            var features = svg.selectAll('.datamaps-subunit');
                            features.on('mouseover',null);
                            features.on('click',null);
                            features.on('mouseout',null);
                        }
                    }
                }
            }
        ]);
})(window.angular);
