/**
 * Bento D3 NG
 *
 * @author Joe Huang <joe.huang@thomsonreuters.com>
 * @version 0.1
 * @date 05/06/2014
 *
 * @description Angular Directive Wrapper for D3
 * d3js.org
 * Helpful d3 concept references
 * http://bost.ocks.org/mike/join/
 * http://bost.ocks.org/mike/bar/
 */


(function(angular, d3, undefined) {
    'use strict';

    //Define bentoUI App object
    var bentoApp = angular.module('bento.d3', []);
    //Directive
    bentoApp.constant('bentoD3Config', {
        bentoColors: {
            'green': '#85ab44',
            'orange': '#ff8000',
            'red': '#dc0a0a',
            'blue': '#1472c2'
        },
        colors: [
            '#dc0a0a',
            '#ff8000',
            '#ffb400',
            '#b2b2b8',
            '#6d6d78',
            '#37383d',
            '#78a22f',
            '#387c2b',
            '#096352',
            '#0aa386',
            '#0083bf',
            '#005a84',
            '#a00000',
            '#dc0a0a',
            '#bf086d',
            '#f4317b',
            '#dd40c6',
            '#991a99',
            '#46166b',
            '#6234a4',
        ],
        category20: function() {
            return d3.scale.ordinal().range(this.colors);
        },
        getBentoColors: function(color) {
            var bentoColor = color;
            if (this.bentoColors[color]) {
                bentoColor = this.bentoColors[color];
            }
            return bentoColor;
        },
        addVerticalGradientDef: function(svg, gradientName, color1, color2) {
            var gradient = svg.append('svg:defs')
                .append('svg:linearGradient')
                .attr('id', gradientName)
                .attr('x1', '0%')
                .attr('y1', '0%')
                .attr('x2', '0%')
                .attr('y2', '100%')
                .attr('spreadMethod', 'pad');

            gradient.append('svg:stop')
                .attr('offset', '0%')
                .attr('stop-color', color1)
                .attr('stop-opacity', 1);

            gradient.append('svg:stop')
                .attr('offset', '100%')
                .attr('stop-color', color2)
                .attr('stop-opacity', 1);
        },
        mergeObjects: function(obj1, obj2) {
            for (var p in obj2) {
                try {
                    // Property in destination object set; update its value.
                    if (obj2[p].constructor === Object) {
                        obj1[p] = this.mergeObjects(obj1[p], obj2[p]);
                    } else {
                        obj1[p] = obj2[p];
                    }
                } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    obj1[p] = obj2[p];
                }
            }
            return obj1;
        }

    })
        .directive('bentoD3VerticalSplitBars', ['bentoD3Config', '$window', '$timeout',
            function(config, $window, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                    },
                    link: function(scope, element, attrs) {
                        var margin = {
                                top: 40,
                                right: 20,
                                bottom: 80,
                                left: 50
                            },
                            dWidth = attrs.width ? attrs.width : (element[0].offsetWidth ? element[0].offsetWidth : 400),
                            dHeight = attrs.height ? attrs.height : (element[0].offsetHeight ? element[0].offsetHeight : 400),
                            width = dWidth - margin.left - margin.right,
                            height = dHeight - margin.top - margin.bottom,
                            barHeight = height * 0.5,
                            ticks = attrs.ticks ? attrs.ticks : 3,
                            renderTimeout;

                        var svg = d3.select(element[0]).append('svg')
                            .attr('width', '100%')
                            .attr('height', height + margin.top + margin.bottom)
                            .append('g')
                            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                        //check to see if bar color will be gradient
                        //set default bar colors
                        var topColor = config.bentoColors.orange;
                        var bottomColor = config.bentoColors.green;
                        //if attributes are defined
                        if (attrs.topColor) {
                            topColor = scope.$parent.$eval(attrs.topColor);
                        }
                        if (attrs.bottomColor) {
                            bottomColor = scope.$parent.$eval(attrs.bottomColor);
                        }

                        scope.$watch('data', function(newData) {
                            scope.render(newData);
                        }, true);


                        if (attrs.autoWidth === 'true') {
                            $window.onresize = function() {
                                scope.$apply();
                            };

                            scope.$watch(function() {
                                return angular.element($window)[0].innerWidth;
                            }, function() {
                                svg.selectAll('*').remove();

                                if (renderTimeout) {
                                    clearTimeout(renderTimeout);
                                }

                                renderTimeout = $timeout(function() {
                                    dWidth = element[0].offsetWidth;
                                    width = dWidth - margin.left - margin.right;
                                    scope.render(scope.data);

                                }, 100);

                            });
                        }


                        scope.render = function(data) {
                            var x = d3.scale.ordinal()
                                .rangeRoundBands([0, width], 0.35);
                            var xAxis = d3.svg.axis()
                                .scale(x)
                                //.tickFormat('')
                                .orient('bottom');

                            var y = d3.scale.linear()
                                .range([barHeight, 0]);
                            var yAxis = d3.svg.axis()
                                .scale(y)
                                .orient('left')
                                .ticks(ticks, '');

                            var yBottom = d3.scale.linear()
                                .range([barHeight, height]);
                            var yAxisBottom = d3.svg.axis()
                                .scale(yBottom)
                                .orient('left')
                                .ticks(ticks, '');

                            //if attribute is array
                            //add gradient definition to svg
                            if (topColor instanceof Array && topColor.length === 2) {
                                config.addVerticalGradientDef(svg, 'topColor', topColor[0], topColor[1]);
                            }
                            if (bottomColor instanceof Array && bottomColor.length === 2) {
                                config.addVerticalGradientDef(svg, 'bottomColor', bottomColor[0], bottomColor[1]);
                            }

                            //d3.tsv('data.tsv', type, function(error, data) {
                            x.domain(data.map(function(d) {
                                return d[attrs.category];
                            }));

                            //find max value of bottom and top for y axis
                            var maxTop = d3.max(data, function(d) {
                                return d[attrs.topBars];
                            });
                            var maxBottom = d3.max(data, function(d) {
                                return d[attrs.bottomBars];
                            });
                            var max = maxTop > maxBottom ? maxTop : maxBottom;

                            y.domain([0, max]);
                            yBottom.domain([0, max]);

                            //x-axis
                            svg.append('g')
                                .attr('class', 'x axis')
                                .attr('transform', 'translate(0,0)')
                                .attr('fill', 'none')
                                .attr('stroke', 'none')
                                .attr('shape-rendering', 'crispEdges')
                                .call(xAxis);
                            //y-axis
                            svg.append('g')
                                .attr('fill', 'none')
                                .attr('stroke', '#000')
                                .attr('shape-rendering', 'crispEdges')
                                .attr('class', 'y axis')
                                .call(yAxis);

                            svg.append('g')
                                .attr('fill', 'none')
                                .attr('stroke', '#000')
                                .attr('shape-rendering', 'crispEdges')
                                .attr('class', 'y axis')
                                .call(yAxisBottom);
                            // .append('text')
                            // .attr('transform', 'rotate(-90)')
                            // .attr('y', 6)
                            // .attr('dy', '.71em')
                            // .style('text-anchor', 'end')
                            // .text('Value');
                            svg.selectAll('.bar')
                                .data(data)
                                .enter().append('rect')
                                .attr('class', 'bar')
                                .attr('x', function(d) {
                                    return x(d[attrs.category]);
                                })
                                .attr('width', x.rangeBand())
                                .attr('fill', function() {
                                    if (topColor instanceof Array) {
                                        return 'url(#topColor)';
                                    } else {
                                        return topColor;
                                    }
                                })
                                .attr('height', 0)
                                .attr('y', barHeight)
                                .transition()
                                .duration(1000)
                                .attr('y', function(d) {
                                    return y(d[attrs.topBars]);
                                })
                                .attr('height', function(d) {
                                    return barHeight - y(d[attrs.topBars]);
                                });



                            svg.selectAll('.bar-bottom')
                                .data(data)
                                .enter().append('rect')
                                .attr('class', 'bar-bottom')
                                .attr('x', function(d) {
                                    return x(d[attrs.category]);
                                })
                                .attr('width', x.rangeBand())
                                .attr('fill', function() {
                                    if (bottomColor instanceof Array) {
                                        return 'url(#bottomColor)';
                                    } else {
                                        return bottomColor;
                                    }
                                })
                                .attr('height', 0)
                                .attr('y', barHeight)
                                .transition()
                                .duration(1000)
                                .attr('height', function(d) {
                                    return yBottom(d[attrs.bottomBars]) - barHeight;
                                });


                            svg.selectAll('line.horizontal-grid')
                                .data(y.ticks(ticks))
                                .enter()
                                .append('line')
                                .attr({
                                    'class': 'horizontal-grid',
                                    'x1': 0,
                                    'x2': width,
                                    'y1': function(d) {
                                        return y(d);
                                    },
                                    'y2': function(d) {
                                        return y(d);
                                    }
                                })
                                .style({
                                    'stroke': '#000',
                                    'stroke-opacity': '0.1'
                                });

                            svg.selectAll('line.bottom-horizontal-grid')
                                .data(yBottom.ticks(ticks))
                                .enter()
                                .append('line')
                                .attr({
                                    'class': 'bottom-horizontal-grid horizontal-grid',
                                    'x1': 0,
                                    'x2': width,
                                    'y1': function(d) {
                                        return yBottom(d);
                                    },
                                    'y2': function(d) {
                                        return yBottom(d);
                                    }
                                })
                                .style({
                                    'stroke': '#000',
                                    'stroke-opacity': '0.1'
                                });

                            svg.append('line')
                                .attr({
                                    'class': 'middle-x-axis',
                                    x1: 0,
                                    y1: barHeight,
                                    x2: width,
                                    y2: barHeight,
                                    stroke: '#eee',
                                    'stroke-width': '3'
                                });

                            svg.selectAll('.x.axis text') // select all the text elements for the xaxis
                            .attr('transform', function() {
                                return 'translate(' + (this.getBBox().height) * -1 + ',' + (this.getBBox().height) + ')rotate(-45 0,0)';
                            })
                                .style('text-anchor', 'end')
                                .attr('x', -(barHeight * 1.35))
                                .attr('y', barHeight * 1.35);
                            // svg.append('g')
                            // .attr({
                            //     'class':'xaxis-label'
                            // })
                            // .selectAll('text.label')
                            //     .data(data)
                            //     .enter()
                            //     .append('text')
                            //     .text(function(d) {
                            //         return d[attrs.category];
                            //     })
                            //     .attr({
                            //         'class': 'label',
                            //         'text-anchor': 'end',
                            //         'transform':function(d){
                            //             var rx = x(d[attrs.category])*-2;
                            //             var ry = x(d[attrs.category])*.4
                            //             return 'rotate(-45 '+ry+','+rx+')'
                            //         },
                            //          'y': height*.4,
                            //          'x': -height*.4
                            //         // 'x': function(d) {
                            //         //     return x(d[attrs.category]);
                            //         // }
                            //     })
                            //     .style({
                            //         'stroke': '#000',
                            //         'stroke-opacity': '0.1'
                            //     });

                            // svg.selectAll('.tick line')
                            // .style({
                            //     'stroke-opacity': '0'
                            // })

                            // svg.selectAll('.domain')
                            // .style({
                            //     'stroke-opacity': '0'
                            // })

                        };

                        // function type(d) {
                        //     d[attrs.topBars] = +d[attrs.topBars];
                        //     return d;
                        // }
                    }
                };
            }
        ])
        .directive('bentoD3ProgressMeter', ['bentoD3Config',
            function(config) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '='
                    },
                    link: function(scope, element, attrs) {
                        var width = parseInt(attrs.width) || 200,
                            height = parseInt(attrs.height) || 10,
                            padding = height * 3,
                            fontsize = height,
                            radius = attrs.radius ? parseInt(attrs.radius) : 0,
                            alignment = attrs.alignment ? attrs.alignment : 'right',
                            data;

                        var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width + padding)
                            .attr('height', height);

                        var color = attrs.color ? config.getBentoColors(attrs.color) : config.bentoColors.orange;
                        var fillColor = attrs.bgColor ? config.getBentoColors(attrs.bgColor) : '#ccc';
                        var textColor = attrs.bgColor ? config.getBentoColors(attrs.bgColor) : '#000';

                        scope.$watch('data', function(newData) {
                            data = newData;
                            render();
                        }, true);


                        attrs.$observe('alignment', function(val){
                            if(val){
                                alignment = val;
                                render();
                            }
                        });

                        attrs.$observe('color', function(val){
                            if(val){
                                color = config.getBentoColors(val);
                                render();
                            }
                        });

                        function render() {
                            if (data === undefined) {
                                return;
                            }
                            svg.selectAll('*').remove();

                            var start_val = 0,
                                current_val = 0,
                                end_val = [parseInt(data)],
                                textWidth = 0;

                            svg.selectAll('text')
                                .data(end_val)
                                .enter()
                                .append('text')
                                .text(start_val)
                                .attr('fill', textColor)
                                .attr('y', height - 2)
                                .attr('x', function() {
                                    var pos = width + 3;
                                    if (alignment === 'left') {
                                        pos = 0;
                                    }
                                    return pos;
                                })
                                .style('font-size', fontsize + 'px')
                            //.style('font-family', 'KnowledgeLight')
                            .attr('text-anchor', alignment)
                                .transition()
                                .duration(1500)
                                .tween('text', function(d) {
                                    var i = d3.interpolate(current_val, d);
                                    return function(t) {
                                        current_val = Math.round(i(t));
                                        this.textContent = current_val + '%';
                                    };
                                });

                            var xPos = 0;
                            if (alignment === 'left') {
                                var myText = svg.select('text')[0][0];
                                myText.textContent = '100%';
                                textWidth = myText.getBBox().width;
                                xPos = textWidth;
                            }

                            //background
                            svg.append('rect')
                                .attr('height', height)
                                .attr('width', width)
                                .attr('rx', radius)
                                .attr('ry', radius)
                                .attr('x', xPos)
                                .attr('y', 0)
                                .attr('fill', fillColor);
                            //foreground
                            svg.append('rect')
                                .attr('height', height)
                                .attr('width', 0)
                                .attr('x', xPos)
                                .attr('y', 0)
                                .attr('rx', radius)
                                .attr('ry', radius)
                                .attr('fill', color)
                                .transition()
                                .duration(1500)
                                .attr('width', function() {
                                    return data * 0.01 * width;
                                });


                        };

                    }
                };
            }
        ])
        .directive('bentoD3HorizontalBars', ['bentoD3Config', '$window', '$timeout',
            function(config, $window, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                    },
                    link: function(scope, element, attrs) {
                        var renderTimeout;
                        var margin = parseInt(attrs.margin) || 20,
                            barHeight = parseInt(attrs.barHeight) || 30,
                            barPadding = parseInt(attrs.barPadding) || 5;

                        var svg = d3.select(element[0])
                            .append('svg')
                            .style('width', '100%');

                        $window.onresize = function() {
                            scope.$apply();
                        };

                        scope.$watch(function() {
                            return angular.element($window)[0].innerWidth;
                        }, function() {
                            scope.render(scope.data);
                        });

                        scope.$watch('data', function(newData) {
                            scope.render(newData);
                        }, true);

                        scope.render = function(data) {
                            svg.selectAll('*').remove();

                            if (!data) {
                                return;
                            }
                            if (renderTimeout) {
                                clearTimeout(renderTimeout);
                            }

                            renderTimeout = $timeout(function() {
                                var width = d3.select(element[0]).node().offsetWidth - margin,
                                    height = scope.data.length * (barHeight + barPadding),
                                    color = config.category20(),
                                    xScale = d3.scale.linear()
                                    .domain([0, d3.max(data, function(d) {
                                        return d.value;
                                    })])
                                    .range([0, width]);

                                svg.attr('height', height);

                                svg.selectAll('rect')
                                    .data(data)
                                    .enter()
                                    .append('rect')
                                    .on('click', function(d) {
                                        return scope.onClick({
                                            item: d
                                        });
                                    })
                                    .attr('height', barHeight)
                                    .attr('width', 140)
                                    .attr('x', Math.round(margin / 2))
                                    .attr('y', function(d, i) {
                                        return i * (barHeight + barPadding);
                                    })
                                    .attr('fill', function(d) {
                                        return color(d.value);
                                    })
                                    .on('click', function(d) {
                                        return scope.onClick({
                                            item: d
                                        });
                                    })
                                    .transition()
                                    .duration(1000)
                                    .attr('width', function(d) {
                                        return xScale(d.value);
                                    });
                                svg.selectAll('text')
                                    .data(data)
                                    .enter()
                                    .append('text')
                                    .attr('fill', '#fff')
                                    .attr('y', function(d, i) {
                                        return i * (barHeight + barPadding) + 15;
                                    })
                                    .attr('x', 15)
                                    .text(function(d) {
                                        return d.name + ' (' + d.value + ')';
                                    });
                            }, 100);
                        };
                    }
                };
            }
        ])
        .directive('bentoD3PercentArc', ['bentoD3Config',
            function(config) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                        onClick: '&'
                    },
                    link: function(scope, element, attrs) {

                        var width = parseInt(attrs.size) || 80,
                            height = parseInt(attrs.size) || 80,
                            pi = 2 * Math.PI,
                            arc = d3.svg.arc()
                            .innerRadius(0.9 * width * 0.5)
                            .outerRadius(width * 0.5)
                            .startAngle(0),
                            fontsize = 28 * width / 100;

                        var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr('transform',
                                'translate(' + width / 2 + ',' + height / 2 + ')');

                        var color = attrs.color ? config.getBentoColors(attrs.color) : config.bentoColors.orange;
                        var fillColor = attrs.bgColor ? config.getBentoColors(attrs.bgColor) : '#ddd';

                        scope.$watch('data', function(newData) {
                            scope.render(newData);
                        }, true);

                        function arcTween(transition, angle) {
                            transition.attrTween('d', function(d) {
                                var interpolate = d3.interpolate(d.endAngle, angle);
                                return function(t) {
                                    d.endAngle = interpolate(t);
                                    return arc(d);
                                };
                            });
                        }

                        scope.render = function(data) {
                            if (data === undefined) {
                                return;
                            }
                            svg.selectAll('*').remove();
                            //background
                            svg.append('path')
                                .datum({
                                    endAngle: pi
                                })
                                .style('fill', fillColor)
                                .attr('d', arc);
                            //foreground
                            svg.append('path')
                                .datum({
                                    endAngle: 0
                                })
                                .style('fill', color)
                                .attr('d', arc)
                                .transition()
                                .duration(1500)
                                .call(arcTween, parseInt(data) * 0.01 * pi);

                            var start_val = 0,
                                current_val = 0,
                                end_val = [parseInt(data)];

                            svg.selectAll('text')
                                .data(end_val)
                                .enter()
                                .append('text')
                                .text(start_val)
                                .attr('fill', color)
                                .attr('y', fontsize * 0.3)
                                .attr('x', 0)
                                .style('font-size', fontsize + 'px')
                            //.style('font-family', 'KnowledgeLight')
                            .attr('text-anchor', 'middle')
                                .transition()
                                .duration(1500)
                                .tween('text', function(d) {
                                    var i = d3.interpolate(current_val, d);
                                    return function(t) {
                                        current_val = Math.round(i(t));
                                        this.textContent = current_val + '%';
                                    };
                                });


                        };
                        scope.render();
                    }
                };
            }
        ])
        .directive('bentoD3PieChart', ['bentoD3Config',
            function(config) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                        index: '=',
                        onClick: '&',
                        onHover: '&',
                        onLeave: '&',
                    },
                    link: function(scope, element, attrs) {
                        var diameter = attrs.diameter ? parseInt(attrs.diameter) : 120,
                            padding = attrs.padding ? parseInt(attrs.padding) : 0,
                            width = diameter + padding,
                            height = diameter + padding,
                            radius = diameter / 2,
                            color = config.category20(),
                            innerRadius = attrs.innerRadius ? attrs.innerRadius : 0,
                            duration = 250,
                            labelr = radius + 20;

                        var arc = d3.svg.arc()
                            .outerRadius(radius)
                            .innerRadius(innerRadius);

                        var pie = d3.layout.pie()
                            .sort(null);

                        var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr('transform',
                                'translate(' + width / 2 + ',' + height / 2 + ')');

                        scope.$watchCollection('data', function(newData) {
                            scope.render(newData);
                        });

                        //Destroy event
                        scope.$on('$destroy', onDestroy);
                        element.on('$destroy', onDestroy);

                        scope.$watch('index', function(newIndex) {
                            selectPieSlice(newIndex);
                        });


                        function selectPieSlice(index) {
                            if (index === undefined) {
                                return;
                            }
                            var data;
                            svg.selectAll('.arc')
                                .each(function(d, i) {
                                    if (i === index) {
                                        data = d;
                                        d3.select(this)
                                            .classed('is-faded', false)
                                            .classed('is-selected', true);
                                    } else if (index === -1) {
                                        resetPie();
                                    } else {
                                        d3.select(this)
                                            .classed('is-faded', true)
                                            .classed('is-selected', false);
                                    }
                                });
                            scope.onHover({
                                item: data,
                                index: index
                            });
                            scope.onClick({
                                item: data,
                                index: index
                            });

                        }

                        function resetPie() {
                            svg.selectAll('.arc')
                                .classed('is-faded', false)
                                .classed('is-selected', false);

                            scope.onClick({
                                item: {},
                                index: -1
                            });

                        }

                        scope.render = function(data) {
                            var total = d3.sum(data, function(d) {
                                return d.value;
                            });

                            svg.selectAll('*').remove();

                            var pieData = [];
                            data.forEach(function(d) {
                                pieData.push(d.value);
                            });

                            var g = svg.selectAll('.arc')
                                .data(pie(pieData))
                                .enter().append('g')
                                .attr('class', 'arc');


                            if (attrs.onClick) {
                                g.on('click', function(d, i) {
                                    var self = this;
                                    var index = i;
                                    scope.$apply(function() {
                                        if (d3.select(self).classed('is-selected')) {
                                            resetPie();
                                        } else {
                                            selectPieSlice(index);
                                        }
                                    });
                                });
                            }

                            if (attrs.onHover) {
                                g.on('mouseover', function(d, i) {
                                    var index = i;
                                    scope.$apply(function() {
                                        selectPieSlice(index);
                                    });
                                });
                            }

                            if (attrs.onLeave) {
                                svg.on('mouseleave', function() {
                                    scope.$apply(function() {

                                        svg.selectAll('.arc')
                                            .classed('is-faded', false)
                                            .classed('is-selected', false);

                                        scope.onLeave();
                                    });

                                });
                            }


                            g.append('path')
                                .style('fill', function(d, i) {
                                    //set color
                                    var fillColor = data[i].color ? data[i].color : color(i);
                                    data[i].color = fillColor;
                                    //set percentage here too
                                    data[i].percent = d3.round(d.value / total * 100, 1);
                                    return fillColor;
                                })
                                .transition()
                                .ease('out')
                                .duration(duration)
                                .attr('d', arc);

                            if (attrs.labelOutside) {
                                g.append('text')
                                    .transition()
                                    .ease('out')
                                    .duration(duration)
                                    .attr('transform', function(d) {
                                        var c = arc.centroid(d),
                                            x = c[0],
                                            y = c[1],
                                            h = Math.sqrt(x * x + y * y);
                                        return 'translate(' + (x / h * labelr) + ',' +
                                            (y / h * labelr) + ')';
                                    })
                                    .attr('class', 'label-outside')
                                    .attr('text-anchor', function(d) {
                                        return (d.endAngle + d.startAngle) / 2 > Math.PI ? 'end' : 'start';
                                    })
                                    .text(function(d, i) {
                                        return data[i].label;
                                    });
                            } else {
                                g.append('text')
                                    .transition()
                                    .ease('out')
                                    .duration(duration)
                                    .attr('transform', function(d) {
                                        return 'translate(' + arc.centroid(d) + ')';
                                    })
                                    .style('text-anchor', 'middle')
                                    .text(function(d, i) {
                                        return data[i].label;
                                    });
                            }

                        };

                        function onDestroy(){
                            var g = svg.selectAll('.arc');
                            if (attrs.onClick) {
                                g.on('click', null);
                            }
                            if (attrs.onHover) {
                                g.on('mouseover', null);
                            }
                            if (attrs.onLeave) {
                                svg.on('mouseleave', null);
                            }                            
                        }
                    }
                };
            }
        ])
        .directive('bentoD3LineChart', ['bentoD3Config',
            function(config) {
                return {
                    restrict: 'EA',
                    scope: {
                        data: '=',
                        onClick: '&'
                    },
                    link: function(scope, element, attrs) {
                        var width = parseInt(attrs.size) || 150,
                            height = parseInt(attrs.size) || 150,
                            color = config.category20();

                        var arc = d3.svg.arc()
                            .innerRadius(30)
                            .outerRadius(60);

                        var pie = d3.layout.pie()
                            .sort(null);

                        var svg = d3.select(element[0])
                            .append('svg')
                            .attr('width', width)
                            .attr('height', height)
                            .append('g')
                            .attr('transform',
                                'translate(' + width / 2 + ',' + height / 2 + ')');

                        scope.$watch('data', function(newData) {
                            scope.render(newData);
                        }, true);

                        scope.render = function(data) {
                            svg.selectAll('*').remove();

                            svg.selectAll('path')
                                .data(pie(data))
                                .enter().append('path')
                                .attr('fill', function(d, i) {
                                    return color(i);
                                })
                                .attr('d', arc);

                        };
                    }
                };
            }
        ]);
})(window.angular, d3);