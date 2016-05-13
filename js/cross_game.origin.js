$(function() {
    var level = [
        [15, 3],[15, 2],[12, 5],[12, 3],[12, 2],[10, 2],[10, 1],[8, 3],[8, 2],[8, 1]
    ];
    // [min, max]
    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    var l = getRandomIntInclusive(0, level.length - 1);
    var n = level[l][0];
    var annoBoxColor = "#DAF5E8";

    var getStringFrom2DArray = function(ls) {
        var l = [];
        for (var i = 0; i < n; i++) {
            l.push(ls[i].join(","));
        }
        return l.join(",");
    };

    var getAnnotation = function(l) {
        var a = [];
        var sum = 0;
        for (var i = 0; i < l.length; i++) {
            if (l[i] == 1) {
                sum += 1;
            } else if (l[i] == 0 && sum != 0) {
                a.push(sum);
                sum = 0;
            }
        }
        if (a.length == 0) {
            a.push(0);
        }
        return a;
    };
    var game = [];
    var soln = []
    for (i = 0; i < n; i++) {
        var row = [];
        var solnRow = []
        for (j = 0; j < n; j++) {
            var num = getRandomIntInclusive(0, level[l][1]);
            if (num >= 1) {
                row.push(1);
            } else {
                row.push(0);
            }
            solnRow.push(0);
        }
        game.push(row);
        soln.push(solnRow);
    }

    var maxNum = 0;
    var leftAnnotations = [];
    for (var i = 0; i < game.length; i++) {
        var ls = getAnnotation(game[i].concat([0]));
        leftAnnotations.push(ls);
        if (ls.length > maxNum) {
            maxNum = ls.length;
        }
    }

    var topAnnotations = [];
    for (var i = 0; i < n; i++) {
        var col = [];
        for (var j = 0; j < n; j++) {
            col.push(game[j][i]);
        }
        var ls = getAnnotation(col.concat([0]));
        topAnnotations.push(ls);
        if (ls.length > maxNum) {
            maxNum = ls.length;
        }
    }

    var squareSize = 35;
    var mode = null;
    var modeSwitchBtnSpace = 50;
    var modeBtnSize = 50;
    var boardAnnotationSpace = 20;
    var topAnnotationBoxH = maxNum * 20, topAnnotationBoxW = 25;
    var leftAnnotationBoxH = topAnnotationBoxW, leftAnnotationBoxW = topAnnotationBoxH;

    var width = n * squareSize + leftAnnotationBoxW + 50, height = 1000;
    var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            var x = j * squareSize + leftAnnotationBoxW + boardAnnotationSpace;
            var y = i * squareSize + topAnnotationBoxH + boardAnnotationSpace;
            svg.append("rect").attr("x", x)
                              .attr("y", y)
                              .attr("width", squareSize)
                              .attr("height", squareSize)
                              .attr('fill', 'white')
                              .attr("stroke-width", 5)
                              .attr("stroke", "gray")
                              .attr("id", i+ "_"+j)
                              .attr("class", "cell");
        }
    }
    for (var i = 0; i < n; i++) {
        var x = i * squareSize + leftAnnotationBoxW + squareSize / 2 - topAnnotationBoxW / 2 + boardAnnotationSpace;
        var y = 0;
        svg.append("rect").attr("x", x)
                          .attr("y", y)
                          .attr("rx", 3)
                          .attr("ry", 3)
                          .attr("width", topAnnotationBoxW)
                          .attr("height", topAnnotationBoxH)
                          .attr('fill', 'white')
                          .attr("stroke-width", 2)
                          .attr("stroke", "gray")
                          .attr("id", "top_a_"+i);
    }

    for (var i = 0; i < n; i++) {
        var x = 0;
        var y = i * squareSize + topAnnotationBoxH + squareSize / 2 - leftAnnotationBoxH / 2 + boardAnnotationSpace;
        svg.append("rect").attr("x", x)
                          .attr("y", y)
                          .attr("rx", 3)
                          .attr("ry", 3)
                          .attr("width", leftAnnotationBoxW)
                          .attr("height", leftAnnotationBoxH)
                          .attr('fill', 'white')
                          .attr("stroke-width", 2)
                          .attr("stroke", "gray")
                          .attr("id", "left_a_"+i);
    }

    var yesy = topAnnotationBoxH + 2 * boardAnnotationSpace + n * squareSize;
    var yesx = leftAnnotationBoxW + boardAnnotationSpace + n * squareSize / 2 - modeBtnSize - modeSwitchBtnSpace / 2;

    svg.append("rect").attr("x", yesx)
                      .attr("y", yesy)
                      .attr("rx", 3)
                      .attr("ry", 3)
                      .attr("width", modeBtnSize)
                      .attr("height", modeBtnSize)
                      .attr('fill', 'white')
                      .attr("stroke-width", 4)
                      .attr("class", "yes_btn")
                      .attr("id", "yes_btn_boader")
                      .attr("stroke", "gray");

    svg.append("rect").attr("x", yesx + 10)
                      .attr("y", yesy + 10)
                      .attr("width", modeBtnSize - 20)
                      .attr("height", modeBtnSize - 20)
                      .attr('fill', 'black')
                      .attr("stroke-width", 4)
                      .attr("class", "yes_btn")
                      .attr("stroke", "gray");

    var noy = topAnnotationBoxH + 2 * boardAnnotationSpace + n * squareSize;
    var nox = leftAnnotationBoxW + boardAnnotationSpace + n * squareSize / 2 + modeSwitchBtnSpace / 2;

    svg.append("rect").attr("x", nox)
                      .attr("y", noy)
                      .attr("rx", 3)
                      .attr("ry", 3)
                      .attr("width", modeBtnSize)
                      .attr("height", modeBtnSize)
                      .attr('fill', 'white')
                      .attr("stroke-width", 4)
                      .attr("class", "no_btn")
                      .attr("id", "no_btn_boader")
                      .attr("stroke", "gray");

    var noCrossX = nox + modeBtnSize / 2;
    var noCrossY = noy + modeBtnSize / 2;
    svg.append('path').attr("d", d3.svg.symbol().size(700).type(function(d) { return 'cross'}))
                      .attr("class", "no_btn")
                      .attr('transform', 'translate(' + noCrossX + ',' + noCrossY + ') rotate(45)')
                      .attr('fill', 'red');

    var separator = null;
    if (n == 15 || n == 10) {
        separator = 5;
    } else {
        separator = 4;
    }
    var numL = n / separator - 1;

    for (var i = 0; i < numL; i++) {
        var row = separator * (i + 1);
        var id = row + "_0";
        var x1 = parseInt(d3.select("rect[id='" + id + "']").attr("x"));
        var y1 = parseInt(d3.select("rect[id='" + id + "']").attr("y"));
        var end = row + "_"+ (n - 1);
        var x2 = parseInt(d3.select("rect[id='" + end + "']").attr("x")) + squareSize;
        var y2 = parseInt(d3.select("rect[id='" + end + "']").attr("y"));
        svg.append('line').style("stroke", "black").attr('stroke-width', 3).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
    }
    for (var i = 0; i < numL; i++) {
        var col = separator * (i + 1);
        var id = "0_" + col;
        var x1 = parseInt(d3.select("rect[id='" + id + "']").attr("x"));
        var y1 = parseInt(d3.select("rect[id='" + id + "']").attr("y"));
        var end = (n - 1) + "_" + col;
        var x2 = parseInt(d3.select("rect[id='" + end + "']").attr("x"));
        var y2 = parseInt(d3.select("rect[id='" + end + "']").attr("y")) + squareSize;
        svg.append('line').style("stroke", "black").attr('stroke-width', 3).attr("x1", x1).attr("y1", y1).attr("x2", x2).attr("y2", y2);
    }

    d3.selectAll(".yes_btn").on('click', function() {
        d3.select("rect[id='yes_btn_boader']").attr("stroke-width", 8).attr("stroke", '#5CD932');
        d3.select("rect[id='no_btn_boader']").attr("stroke-width", 4).attr("stroke", 'gray');
        mode = "yes";
    });

    d3.selectAll(".no_btn").on('click', function() {
        d3.select("rect[id='yes_btn_boader']").attr("stroke-width", 4).attr("stroke", 'gray');
        d3.select("rect[id='no_btn_boader']").attr("stroke-width", 8).attr("stroke", '#5CD932');
        mode = "no";
    });

    d3.select(".yes_btn").on("click")();

    d3.selectAll("rect[class='cell']").on('click', function() {
        if (mode == "yes") {
            var cellId = d3.select(this).attr("id");
            var posn = cellId.split("_");
            var clickedRow = parseInt(posn[0]), clickedCol = parseInt(posn[1]);

            var fill = d3.select(this).attr('fill');
            if (fill == "black") {
                d3.select(this).attr('fill', 'white');
                soln[clickedRow][clickedCol] = 0;
            } else if (fill == "white" && d3.select("#cross_" + cellId).size() == 0) {
                d3.select(this).attr('fill', 'black');
                soln[clickedRow][clickedCol] = 1;
            }

            // Checking row
            var rowCheck = [];
            for (var i = 0; i < n; i++) {
                var checkId = clickedRow + "_" + i;
                var color = d3.select("rect[id='" + checkId + "']").attr("fill");
                if (color == "white") {
                    rowCheck.push(0);
                } else if (color == "black") {
                    rowCheck.push(1);
                }
            }
            rowCheck.push(0);
            var anno = getAnnotation(rowCheck);
            if (anno.toString() == leftAnnotations[clickedRow].toString()) {
                var annoBoxId = "left_a_" + clickedRow;
                d3.select("#"+annoBoxId).transition().attr("fill", annoBoxColor);
            } else {
                var annoBoxId = "left_a_" + clickedRow;
                d3.select("#"+annoBoxId).transition().attr("fill", "white");
            }
            // Done checking row
            // Checking column
            var colCheck = [];
            for (var i = 0; i < n; i++) {
                var checkId = i + "_" + clickedCol;
                var color = d3.select("rect[id='" + checkId + "']").attr("fill");
                if (color == "white") {
                    colCheck.push(0);
                } else if (color == "black") {
                    colCheck.push(1);
                }
            }
            colCheck.push(0);
            var anno = getAnnotation(colCheck);
            anno.reverse();
            if (anno.toString() == topAnnotations[clickedCol].toString()) {
                var annoBoxId = "top_a_" + clickedCol;
                d3.select("#"+annoBoxId).transition().attr("fill", annoBoxColor);
            } else {
                var annoBoxId = "top_a_" + clickedCol;
                d3.select("#"+annoBoxId).transition().attr("fill", "white");
            }
            // Done checking column

            var leftSolnAnnotations = [];
            for (var i = 0; i < soln.length; i++) {
                var ls = getAnnotation(soln[i].concat([0]));
                leftSolnAnnotations.push(ls);
            }

            var topSolnAnnotations = [];
            for (var i = 0; i < n; i++) {
                var col = [];
                for (var j = 0; j < n; j++) {
                    col.push(soln[j][i]);
                }
                var ls = getAnnotation(col.concat([0]));
                topSolnAnnotations.push(ls);
            }
            var solved = true;
            for (var i = 0; i < n; i ++) {
                topSolnAnnotations[i].reverse();
                if (topSolnAnnotations[i].join(",") != topAnnotations[i].join(",")){
                    return;
                }
            }
            for (var i = 0; i < n; i ++) {
                if (leftSolnAnnotations[i].join(",") != leftAnnotations[i].join(",")){
                    return;
                }
            }

            setTimeout(function() {
                alert("Congrats! You win!");
            }, 1100);
        } else if (mode == "no") {
            if (d3.select(this).attr('fill') == "black") {
                return;
            }
            var id = d3.select(this).attr('id');
            var crossId = 'cross_' + id;
            var cross = d3.select("path[id='" + crossId + "']");
            if (cross.size() == 1) {
                cross.remove();
            } else if (cross.size() == 0) {
                var x = parseInt(d3.select(this).attr("x")) + squareSize / 2;
                var y = parseInt(d3.select(this).attr("y")) + squareSize / 2;
                svg.append('path').attr("d", d3.svg.symbol().size(350).type(function(d) { return 'cross'}))
                                  .attr("id", crossId)
                                  .attr("class", "cross")
                                  .attr('transform', 'translate(' + x + ',' + y + ') rotate(45)')
                                  .attr('fill', 'red')
                                  .on("click", function() {
                                      if (mode == "no") {
                                          d3.select(this).remove();
                                      }
                                  });
            }
        }
    });

    for (var i = 0; i < n; i++) {
        var id = "left_a_" + i;
        var rx = parseInt(d3.select("#"+id).attr("x"));
        var ry = parseInt(d3.select("#"+id).attr("y"));
        var t = leftAnnotations[i].join(" ");

        var tid = id + "_text";
        svg.append("text").attr("x", rx).attr("y", ry).text(t).attr("id", tid);
        var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
        var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
        d3.select("#"+tid).attr("x", rx + leftAnnotationBoxW - textW - 8).attr("y", ry + textH / 2 + leftAnnotationBoxH / 2 - 3);
    }

    for (var i = 0; i < n; i++) {
        var id = "top_a_" + i;
        var rx = parseInt(d3.select("#"+id).attr("x"));
        var ry = parseInt(d3.select("#"+id).attr("y"));
        topAnnotations[i].reverse();
        for (var j = 0; j < topAnnotations[i].length; j++) {
            var tid = id + "_text_"+j;

            svg.append("text").attr("x", rx).attr("y", ry).text(topAnnotations[i][j]).attr("id", tid);
            var textW = d3.select("#"+tid).node().getBoundingClientRect().width;
            var textH = d3.select("#"+tid).node().getBoundingClientRect().height;
            d3.select("#"+tid).attr("x", rx + topAnnotationBoxW / 2 - textW / 2).attr("y", topAnnotationBoxH - j * textH - 6);
        }
    }
    $("#hint_btn button").click(function() {
        if ($("#instructions").is(':visible')) {
            $(this).html("Show How to Play");
        } else {
            $(this).html("Hide How to Play");
        }
    });
});
