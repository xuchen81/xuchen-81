$(function() {
    var width = 500, height = 500, centerGap = 20, n = 20;
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var generateDataset = function(n, inner, outer) {
        var ls = [];
        for (var i = 0; i < n; i++) {
            ls.push({
                'inner': inner,
                'outer': getRandomInt(outer - 60, outer)
            });
        }
        return ls;
    }
    var colorRand = getRandomInt(0,3);
    if (colorRand==0) {
        var color = d3.scale.category20();
    } else if (colorRand==1) {
        var color = d3.scale.category20b();
    } else if (colorRand==2) {
        var color = d3.scale.category20c();
    }

    var dataset = generateDataset(n, centerGap, Math.min(width, height) / 2);
    var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
    var arc = d3.svg.arc()
                    .innerRadius(function(d) {
                        return d.data.inner;
                    })
                    .outerRadius(function(d) {
                        return d.data.outer;
                    });

    var pie = d3.layout.pie()
                       .value(function(d) { return getRandomInt(10, 15); })
                       .sort(null);

    var randArc = d3.svg.arc()
                        .innerRadius(function(d) {
                            return d.data.inner;
                        })
                        .outerRadius(function(d) {
                            return getRandomInt(100, Math.min(width, height) / 2);
                        });

    var randomRotate = function() {
        var curAngle = getRandomInt(0,360);
        var rand = getRandomInt(0, 7);
        var easeFunc = 'cubic-in-out';
        if (rand == 0) {
            easeFunc = 'linear';
        } else if (rand == 1) {
            easeFunc = 'quad';
        } else if (rand == 2) {
            easeFunc = 'back';
        } else if (rand == 3) {
            easeFunc = 'elastic';
        } else if (rand == 4) {
            easeFunc = 'bounce';
        }
        svg.selectAll('path').transition()
                             .attr("d", function(d) {
                                 return randArc(d);
                             })
                             .attr("transform", "translate(" + width / 2 + "," + height / 2 + ") rotate(" + curAngle + "," + 0 + "," + 0 + ")")
                             .duration(500)
                             .ease(easeFunc);
    }

    svg.selectAll('path')
       .data(pie(dataset))
       .enter()
       .append('path')
       .attr('d', function(d) {
           return arc(d);
       })
       .attr("stroke-width", 2)
       .attr("stroke", "black")
       .style("stroke-opacity", .3)
       .style("stroke-linejoin", "round")
       .attr('fill', function(d, i) {
           return color(i);
       })
       .style("opacity", .9)
       .attr('class', 'pie')
       .attr('transform', 'translate(250, 250)');
    setInterval(randomRotate, 1000);
});
