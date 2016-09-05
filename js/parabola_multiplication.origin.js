$(function() {
    var squareSize = 10;
    var orangeSqSize = 20;
    var orange = "#ed5842";
    var width = 820, height = 1060;
    var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
    var row_box = 82;
    var col_box = 100;
    var firstFowTextHeight = 20;

    for (var i = 0; i < col_box; i++) {
        for (var j = 0; j < row_box; j++) {
            var x = j * squareSize;
            var y = i * squareSize + firstFowTextHeight;
            svg.append("rect").attr("x", x)
                              .attr("y", y)
                              .attr("width", squareSize)
                              .attr("height", squareSize)
                              .attr('fill', 'white')
                              .attr("stroke-width", 2)
                              .attr("stroke", "gray")
                              .attr("id", i+ "_"+j)
                              .attr("class", "cell");
        }
    }

    var orangeSqData = [
        {"x": 36 * squareSize, "y": 0, "size": orangeSqSize, "text": 2},
        {"x": 40 * squareSize, "y": 0, "size": orangeSqSize, "text": 2},
        {"x": 44 * squareSize, "y": 0, "size": orangeSqSize, "text": 3},
    ];
    svg.selectAll('rect.first_row_orange')
       .data(orangeSqData)
       .enter()
       .append('rect')
       .attr('x', function(d) {
           return d.x;
       })
       .attr('y', function(d) {
           return d.y;
       })
       .attr('width', function(d) {
           return d.size;
       })
       .attr('height', function(d) {
           return d.size;
       })
       .attr('fill', orange)
       .style("opacity", .9);

    var start = 10, turned = 0, annoId = 1;
    for (var i = 0; i <= 80; i += 4) {
        var tid = "text_" + annoId;
        svg.append("text").attr("x", i * squareSize + squareSize - 5).attr("y", 10).text(start).style("font-size","12px").style("font-weight","bold").attr('id', tid);
        var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
        var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
        d3.select("#"+tid).attr("x", i * squareSize + squareSize - textW / 2).attr("y", 6 + textH/2);
        if (start == 0) {
            turned = 1;
        }
        if (start > 0 && turned == 0) {
            start -= 1;
        }
        if (turned == 1) {
            start += 1;
        }
        annoId += 1;
    }
    var modifyIds = ["text_10", "text_11", "text_12"];
    var orangeSqXCenter = [37 * squareSize, 41 * squareSize, 45 * squareSize];
    for (var i = 0; i < modifyIds.length; i++) {
        var tid = modifyIds[i];
        d3.select("#"+tid).style("font-size","20px").style("font-weight","bold").style("fill", "white");
        var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
        var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
        d3.select("#"+tid).attr("x", orangeSqXCenter[i] - textW/2).attr("y", 19 - Math.abs(10 - textH/2));
    }
    svg.append('line').style("stroke", "black").attr('stroke-width', 3).attr("x1", 0).attr("y1", firstFowTextHeight).attr("x2", row_box * squareSize).attr("y2", firstFowTextHeight);
    var circleR = 4;
    var plotData = [
        {"cx": 1 * squareSize, "cy": squareSize * 100 + firstFowTextHeight, "r": circleR},
        {"cx": 5 * squareSize, "cy": squareSize * 81 + firstFowTextHeight, "r": circleR},
        {"cx": 9 * squareSize, "cy": squareSize * 64 + firstFowTextHeight, "r": circleR},
        {"cx": 13 * squareSize, "cy": squareSize * 49 + firstFowTextHeight, "r": circleR},
        {"cx": 17 * squareSize, "cy": squareSize * 36 + firstFowTextHeight, "r": circleR},
        {"cx": 21 * squareSize, "cy": squareSize * 25 + firstFowTextHeight, "r": circleR},
        {"cx": 25 * squareSize, "cy": squareSize * 16 + firstFowTextHeight, "r": circleR},
        {"cx": 29 * squareSize, "cy": squareSize * 9 + firstFowTextHeight, "r": circleR},
        {"cx": 33 * squareSize, "cy": squareSize * 4 + firstFowTextHeight, "r": circleR},
        {"cx": 37 * squareSize, "cy": squareSize + firstFowTextHeight, "r": circleR},
        {"cx": 41 * squareSize, "cy": firstFowTextHeight, "r": circleR},
        {"cx": 45 * squareSize, "cy": squareSize + firstFowTextHeight, "r": circleR},
        {"cx": 49 * squareSize, "cy": squareSize * 4 + firstFowTextHeight, "r": circleR},
        {"cx": 53 * squareSize, "cy": squareSize * 9 + firstFowTextHeight, "r": circleR},
        {"cx": 57 * squareSize, "cy": squareSize * 16 + firstFowTextHeight, "r": circleR},
        {"cx": 61 * squareSize, "cy": squareSize * 25 + firstFowTextHeight, "r": circleR},
        {"cx": 65 * squareSize, "cy": squareSize * 36 + firstFowTextHeight, "r": circleR},
        {"cx": 69 * squareSize, "cy": squareSize * 49 + firstFowTextHeight, "r": circleR},
        {"cx": 73 * squareSize, "cy": squareSize * 64 + firstFowTextHeight, "r": circleR},
        {"cx": 77 * squareSize, "cy": squareSize * 81 + firstFowTextHeight, "r": circleR},
        {"cx": 81 * squareSize, "cy": squareSize * 100 + firstFowTextHeight, "r": circleR},
    ];

    var lineFunction = d3.line().x(function(d) { return d.cx; }).y(function(d) { return d.cy; }).curve(d3.curveCardinal);

    var lineGraph = svg.append("path")
                       .attr("d", lineFunction(plotData))
                       .attr("stroke", "#429cbc")
                       .attr("stroke-width", 3)
                       .attr("fill", "none");

    svg.selectAll('circle')
       .data(plotData)
       .enter()
       .append('circle')
       .attr('cx', function(d) {
           return d.cx;
       })
       .attr('cy', function(d) {
           return d.cy;
       })
       .attr('r', function(d) {
           return d.r;
       })
       .style("stroke", orange)
       .style("stroke-width", 2)
       .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

    function dragstarted(d, i) {
        d3.select("#dragging").remove();
        d3.select("#dragged_active").remove();
    }

    function dragged(d, i) {
        var startX = d.cx, startY = d.cy;
        svg.append('line').style("stroke", "#9723C4")
                          .attr('stroke-width', 3)
                          .attr("x1", startX).attr("y1", startY)
                          .attr("x2", startX).attr("y2", startY + 1)
                          .style("opacity", .8)
                          .attr("id", "dragging");

        d3.event.on("drag", function() {
            var toX = d3.event.x,
                toY = d3.event.y;

            d3.select("#dragging").attr("x2", toX).attr("y2", toY);
        });
    }
    var tolerance = 8;
    function dragended(d, i) {
        var endX = d3.event.x, endY = d3.event.y;
        var checkPoints1 = [
            {"cx": 41 * squareSize, "cy": firstFowTextHeight},
            {"cx": 45 * squareSize, "cy": squareSize + firstFowTextHeight},
            {"cx": 49 * squareSize, "cy": squareSize * 4 + firstFowTextHeight},
            {"cx": 53 * squareSize, "cy": squareSize * 9 + firstFowTextHeight},
            {"cx": 57 * squareSize, "cy": squareSize * 16 + firstFowTextHeight},
            {"cx": 61 * squareSize, "cy": squareSize * 25 + firstFowTextHeight},
            {"cx": 65 * squareSize, "cy": squareSize * 36 + firstFowTextHeight},
            {"cx": 69 * squareSize, "cy": squareSize * 49 + firstFowTextHeight},
            {"cx": 73 * squareSize, "cy": squareSize * 64 + firstFowTextHeight},
            {"cx": 77 * squareSize, "cy": squareSize * 81 + firstFowTextHeight},
            {"cx": 81 * squareSize, "cy": squareSize * 100 + firstFowTextHeight},
        ];
        if (d.cx < 41 * squareSize) {
            for (var i = 0; i < checkPoints1.length; i++) {
                if ((endX < checkPoints1[i].cx + tolerance && endX > checkPoints1[i].cx - tolerance) &&
                    (endY < checkPoints1[i].cy + tolerance && endY > checkPoints1[i].cy - tolerance)) {
                        d3.select("#dragging").attr("x2", checkPoints1[i].cx).attr("y2", checkPoints1[i].cy).attr("id", "dragged_active");
                        return 1;
                    }
            }
            d3.select("#dragging").remove();
            return 0;
        }

        var checkPoints2 = [
            {"cx": 1 * squareSize, "cy": squareSize * 100 + firstFowTextHeight},
            {"cx": 5 * squareSize, "cy": squareSize * 81 + firstFowTextHeight},
            {"cx": 9 * squareSize, "cy": squareSize * 64 + firstFowTextHeight},
            {"cx": 13 * squareSize, "cy": squareSize * 49 + firstFowTextHeight},
            {"cx": 17 * squareSize, "cy": squareSize * 36 + firstFowTextHeight},
            {"cx": 21 * squareSize, "cy": squareSize * 25 + firstFowTextHeight},
            {"cx": 25 * squareSize, "cy": squareSize * 16 + firstFowTextHeight},
            {"cx": 29 * squareSize, "cy": squareSize * 9 + firstFowTextHeight},
            {"cx": 33 * squareSize, "cy": squareSize * 4 + firstFowTextHeight},
            {"cx": 37 * squareSize, "cy": squareSize + firstFowTextHeight},
        ];
        if (d.cx > 41 * squareSize) {
            for (var i = 0; i < checkPoints2.length; i++) {
                if ((endX < checkPoints2[i].cx + tolerance && endX > checkPoints2[i].cx - tolerance) &&
                    (endY < checkPoints2[i].cy + tolerance && endY > checkPoints2[i].cy - tolerance)) {
                        d3.select("#dragging").attr("x2", checkPoints2[i].cx).attr("y2", checkPoints2[i].cy).attr("id", "dragged_active");
                        return 1;
                    }
            }
            d3.select("#dragging").remove();
            return 0;
        }
        var checkPoints3 = checkPoints1.concat(checkPoints2)
        if (d.cx == 41 * squareSize) {
            for (var i = 0; i < checkPoints3.length; i++) {
                if ((endX < checkPoints3[i].cx + tolerance && endX > checkPoints3[i].cx - tolerance) &&
                    (endY < checkPoints3[i].cy + tolerance && endY > checkPoints3[i].cy - tolerance)) {
                        d3.select("#dragging").attr("x2", checkPoints3[i].cx).attr("y2", checkPoints3[i].cy).attr("id", "dragged_active");
                        return 1;
                    }
            }
            d3.select("#dragging").remove();
            return 0;
        }
    }
    svg.selectAll('line.orange')
       .data(plotData)
       .enter()
       .append('line')
       .attr('x1', function(d) {
           return d.cx;
       })
       .attr('y1', function(d) {
           return firstFowTextHeight;
       })
       .attr('x2', function(d) {
           return d.cx;
       })
       .attr('y2', function(d) {
           if (d.cy == firstFowTextHeight) {
               return firstFowTextHeight;
           }
           return d.cy - circleR;
       })
       .style("stroke", orange)
       .style("stroke-width", 3)
       .style("opacity", .9);

    for (var i = 1; i <= col_box; i++) {
        var tid = "t_" + i;
        svg.append("text").attr("x", 41 * squareSize - 5).attr("y", firstFowTextHeight + i * squareSize - 0.5 * squareSize).text(i).style("font-size","10px").style("font-weight","bold").attr("id", tid);
        var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
        var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
        d3.select("#"+tid).attr("x", 41 * squareSize - textW/2).attr("y", firstFowTextHeight + (i+1) * squareSize - 0.5 * textH);
    }

    var orangeSqData = [
        {"x": 32 * squareSize, "y": firstFowTextHeight + 5, "size": orangeSqSize, "text": 2},
        {"x": 48 * squareSize, "y": firstFowTextHeight + 5, "size": orangeSqSize, "text": 2},
        {"x": 28 * squareSize, "y": firstFowTextHeight + 5 * squareSize, "size": orangeSqSize, "text": 3},
        {"x": 52 * squareSize, "y": firstFowTextHeight + 5 * squareSize, "size": orangeSqSize, "text": 3},
        {"x": 24 * squareSize, "y": firstFowTextHeight + 12 * squareSize - 5, "size": orangeSqSize, "text": 4},
        {"x": 56 * squareSize, "y": firstFowTextHeight + 12 * squareSize - 5, "size": orangeSqSize, "text": 4},
        {"x": 20 * squareSize, "y": firstFowTextHeight + 20 * squareSize, "size": orangeSqSize, "text": 5},
        {"x": 60 * squareSize, "y": firstFowTextHeight + 20 * squareSize, "size": orangeSqSize, "text": 5},
        {"x": 16 * squareSize, "y": firstFowTextHeight + 30 * squareSize, "size": orangeSqSize, "text": 6},
        {"x": 64 * squareSize, "y": firstFowTextHeight + 30 * squareSize, "size": orangeSqSize, "text": 6},
        {"x": 12 * squareSize, "y": firstFowTextHeight + 42 * squareSize + 5, "size": orangeSqSize, "text": 7},
        {"x": 68 * squareSize, "y": firstFowTextHeight + 42 * squareSize + 5, "size": orangeSqSize, "text": 7},
        {"x": 8 * squareSize, "y": firstFowTextHeight + 57 * squareSize, "size": orangeSqSize, "text": 8},
        {"x": 72 * squareSize, "y": firstFowTextHeight + 57 * squareSize, "size": orangeSqSize, "text": 8},
        {"x": 4 * squareSize, "y": firstFowTextHeight + 73 * squareSize, "size": orangeSqSize, "text": 9},
        {"x": 76 * squareSize, "y": firstFowTextHeight + 73 * squareSize, "size": orangeSqSize, "text": 9},
        {"x": 0 * squareSize, "y": firstFowTextHeight + 92 * squareSize, "size": orangeSqSize, "text": 10},
        {"x": 80 * squareSize, "y": firstFowTextHeight + 92 * squareSize, "size": orangeSqSize, "text": 10},
    ];
    svg.selectAll('rect.orange')
       .data(orangeSqData)
       .enter()
       .append('rect')
       .attr('x', function(d) {
           return d.x;
       })
       .attr('y', function(d) {
           return d.y;
       })
       .attr('width', function(d) {
           return d.size;
       })
       .attr('height', function(d) {
           return d.size;
       })
       .attr('fill', orange)
       .style("opacity", .9);

    for (var i = 0; i < orangeSqData.length; i++) {
        var tid = "white_" + i;
        svg.append("text").attr("x", orangeSqData[i].x)
                          .attr("y", orangeSqData[i].y + 20)
                          .text(orangeSqData[i].text)
                          .style("font-size","20px")
                          .style("font-weight","bold")
                          .attr("id", tid)
                          .style("fill", "white");
        var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
        var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
        d3.select("#"+tid).attr("x", orangeSqData[i].x + 10 - textW/2).attr("y", orangeSqData[i].y + 20 - Math.abs(10 - textH/2));
    }
});
