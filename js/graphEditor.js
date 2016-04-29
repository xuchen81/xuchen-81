var graphEditor = function(){
	var self = {};
	var graph = new Graph();
	var paper = null;
	var currEditingPath = null;
	var initPaper = function() {
		paper = Raphael("holder", 640, 430);
		paper.rect(0, 0, 639, 429, 10).attr({ stroke: "#666" });
	};

	var attachCircleEvent = function(circle) {
        var cx;
        var cy;
        var line = null;
        var editingMode = "dragingPath1";

        var onmove = function(dx, dy, x, y, e) {
            var a = e.offsetX;
            var b = e.offsetY;

            if ($("#editingMode").val() == "path") {
                var movement = "M" + cx + " " + cy + "L" + a + " " + b;
                if (line == null) {
                    line = paper.path(movement).attr({ "stroke-width":5, fill: "#000" });
                } else {
                    line.attr("path", movement);
                }
            } else {
                this.attr({cx: a, cy: b});
                var nodeId = this.data("id");
                var connectedNoeds = graph.edges[nodeId];
                for (var k in connectedNoeds) {
                    var movement = "M" + a + " " + b + "L" + graph.nodes[k].attrs.cx + " " + graph.nodes[k].attrs.cy;
                    connectedNoeds[k].attr("path", movement);
                }
            }
        };

        var onstart = function() {
            if ($("#editingMode").val() == "path") {
                cx = this.attrs.cx;
                cy = this.attrs.cy;
            }
        };

        var onend = function(e) {

            if ($("#editingMode").val() == "path") {
                var getClosetNode = function() {
                    var x = e.offsetX;
                    var y = e.offsetY;

                    for (var i in graph.nodes) {
                        if ((x >= graph.nodes[i].attrs.cx - 10 && x <= graph.nodes[i].attrs.cx + 10) &&
                            (y >= graph.nodes[i].attrs.cy - 10 && y <= graph.nodes[i].attrs.cy + 10)) {
                            return graph.nodes[i];
                        }
                    }
                    return null;
                }

                var closetNode = getClosetNode();

                if (closetNode != null) {
                    var movement = "M" + cx + " " + cy + "L" + closetNode.attrs.cx + " " + closetNode.attrs.cy;
                    if (line != null) {
                        line.attr("path", movement);
                        graph.addEdge(this.data("id"), closetNode.data("id"), line);
                        line = null;
                        showWeightToolbar();
                    }
                } else {
                    line.remove();
                    line = null;
                }
            } else {

            }
        };

        circle.drag(onmove, onstart, onend);

        circle.dblclick(function(e) {
            var nodeId = this.data("id");
            graph.removeNode(nodeId);
            for (var k in graph.edges[nodeId]) {
                graph.removeEdge(nodeId, k);
            }
            e.stopPropagation();
            return false;
        });
    };

    var attachPathEvent = function(path) {
    	path.click(function(e) {

    	});
    };

    var showWeightToolbar = function() {
    	if ($('#toolbar').css('display') == 'none') {
    		$('#toolbar').slideDown('fast', function() {
    		// Animation complete.
    		});
    	}
    };

    $("#holder").dblclick(function(e) {
        var x = e.offsetX;
        var y = e.offsetY;
        var circle = paper.circle(x, y, 10);
        circle.attr({"fill": "#f00"});
        graph.addNode(circle);
        attachCircleEvent(circle);
        var t = paper.text(x, y, 3);

        e.stopPropagation();
    });
    $("#testG").click(function(){
        console.log(graph);
    });
	initPaper();
	return self;
}
