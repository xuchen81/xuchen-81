var Graph = function() {
	var self = {};
	var currNodeId = 1;
	var paper = null;
	var currEditingPath = null;
	var pathHoverColor = "#D19C71";
	var pathEditingColor = "#EB832F";
	var shortestPathFoundColor = "#3BD966";
	var regularPathColor = "#AEB2B8";


	var initPapar = function() {
		paper = Raphael("holder", 640, 430);
		paper.rect(0, 0, 639, 429, 10).attr({ stroke: "#666" });
		self.nodes = {};
		self.edges = {};
	};
	self.addNode = function(x, y){
		var node = paper.circle(x, y, 10).attr({"fill": "#f00"});
		self.nodes[currNodeId] = node;
		node.data("id", currNodeId)
		var t = paper.text(x, y-20, currNodeId).attr({"font-size": 16});
		node.data("text", t);
		attachNodeEventHandler(node);
		currNodeId += 1;
	};

	self.removeNode = function(id) {
		self.nodes[id].data("text").remove();
		self.nodes[id].remove();
		delete self.nodes[id];
	};

	var attachNodeEventHandler = function(node) {
        var cx;
        var cy;
        var line = null;
        var editingMode = "dragingPath1";

        var onmove = function(dx, dy, x, y, e) {
        	var a = e.offsetX==undefined?e.pageX - $("#holder").offset().left:e.offsetX;
			var b = e.offsetY==undefined?e.pageY - $("#holder").offset().top:e.offsetY;

            if ($("#editingMode").val() == "path") {
                var movement = "M" + cx + " " + cy + "L" + a + " " + b;
                if (line == null) {
                    line = paper.path(movement).attr({ "stroke-width":5, stroke: pathEditingColor });
                } else {
                    line.attr("path", movement);
                }
            } else {
                this.attr({cx: a, cy: b});
                this.data("text").attr({x: a, y: b - 20});
                var nodeId = this.data("id");
                var connectedNoeds = self.edges[nodeId];
                for (var k in connectedNoeds) {
                    var movement = "M" + a + " " + b + "L" + self.nodes[k].attrs.cx + " " + self.nodes[k].attrs.cy;
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
                	var x = e.offsetX==undefined?e.pageX - $("#holder").offset().left:e.offsetX;
					var y = e.offsetY==undefined?e.pageY - $("#holder").offset().top:e.offsetY;

                    for (var i in self.nodes) {
                        if ((x >= self.nodes[i].attrs.cx - 10 && x <= self.nodes[i].attrs.cx + 10) &&
                            (y >= self.nodes[i].attrs.cy - 10 && y <= self.nodes[i].attrs.cy + 10)) {
                            return self.nodes[i];
                        }
                    }
                    return null;
                }

                var closetNode = getClosetNode();

                if (closetNode != null) {
                    var movement = "M" + cx + " " + cy + "L" + closetNode.attrs.cx + " " + closetNode.attrs.cy;
                    if (line != null) {
                        line.attr("path", movement);
                        line.data("start", this);
                        line.data("end", closetNode);
                        self.addEdge(this.data("id"), closetNode.data("id"), line);
                        if (currEditingPath != null) {
                        	currEditingPath.attr({stroke: regularPathColor});
                        }
                        currEditingPath = line;
                        currEditingPath.data("weight", 0);
                        attachPathEventHandler(currEditingPath);
                        line = null;
                        showWeightToolbar();
                    }
                } else {
                    line.remove();
                    line = null;
                }
            }
        };

        node.drag(onmove, onstart, onend);

        node.dblclick(function(e) {
            var nodeId = this.data("id");
            self.removeNode(nodeId);
            for (var k in self.edges[nodeId]) {
                self.removeEdge(nodeId, k);
            }
            e.stopPropagation();
            return false;
        });
    };

    var attachPathEventHandler = function(edge) {
    	edge.click(function() {
    		if (this != currEditingPath) {
    			currEditingPath.attr({stroke: regularPathColor});
    			currEditingPath = this;
    			currEditingPath.attr({stroke: pathEditingColor});
    		}

    		showWeightToolbar();
    	});

    	edge.mouseover(function(e) {
    		if (this != currEditingPath) {
    			this.attr({stroke: pathHoverColor});
    		}
    	});

    	edge.mouseout(function(e) {
    		if (this != currEditingPath) {
    			this.attr({stroke: regularPathColor});
    		}
    	});
    };


	self.addEdge = function(node1Id, node2Id, edge){
		self.edges[node1Id] = self.edges[node1Id] || {};
		self.edges[node1Id][node2Id] = edge;
		self.edges[node2Id] = self.edges[node2Id] || {};
		self.edges[node2Id][node1Id] = edge;
	};


	self.removeEdge = function(node1Id, node2Id) {
		self.edges[node1Id][node2Id].remove();
		delete self.edges[node1Id][node2Id];
		delete self.edges[node2Id][node1Id];
		if (Object.keys(self.edges[node1Id]).length == 0) {
			delete self.edges[node1Id];
		}
		if (Object.keys(self.edges[node2Id]).length == 0) {
			delete self.edges[node2Id];
		}
	};

	var showWeightToolbar = function() {
		var text = "Enter a weight between node " +
    		currEditingPath.data("start").data("id") +
    		" and " +
    		currEditingPath.data("end").data("id") +
    		": ";
    	if ($('#toolbar').css('display') == 'none') {
    		$("#weightEditor span").text(text);
			$("#weightInput").attr("placeholder", "0");
    		$('#toolbar').slideDown('fast', function() {
    			$("#weightInput").focus();
    			$("#weightInput").keyup(function(e) {
    				currEditingPath.data("weight", $(this).val());
    			});
    		});
    	} else {
    		$('#toolbar').hide();
    		$("#weightEditor span").text(text);
			if (currEditingPath.data("weight") != '0') {
				$("#weightInput").val(currEditingPath.data("weight"));
			} else {
				$("#weightInput").val(null);
				$("#weightInput").attr("placeholder", "0");
			}
    		$('#toolbar').slideDown('fast', function() {
    			$("#weightInput").focus();
    			$("#weightInput").keyup(function(e) {
    				currEditingPath.data("weight", $(this).val());
    			});
    		});
    	}
    };

    self.Dijkstra = function(s) {
    	var distance = {};
    	var previous = {};
    	var nodes = {};
    	for (var k in self.nodes) {
    		distance[k] = Number.MAX_VALUE;
    		previous[k] = null;
    		nodes[k] = "unsolved";
    	}
    	distance[s] = 0;

    	var smallestNode = function() {
    		var currMin = Number.MAX_VALUE;
    		var currMinNode = null;
    		for (var k in distance) {
    			if (nodes[k] == "unsolved" && distance[k] < currMin) {
    				currMin = distance[k];
    				currMinNode = k;
    			}
    		}
    		return currMinNode;
    	};

    	var numNodes = Object.keys(self.nodes).length;

    	while (Object.keys(nodes).length != 0) {
    		var smallestNodeId = smallestNode();
    		delete nodes[smallestNodeId];

    		if (distance[smallestNodeId] == Number.MAX_VALUE) { break; }

    		for (var k in self.edges[smallestNodeId]) {
    			var newDis = distance[smallestNodeId] + parseInt(self.edges[smallestNodeId][k].data("weight"));
    			if (newDis < distance[k]) {
    				distance[k] = newDis;
    				previous[k] = smallestNodeId ;
    			}
    		}
    	}
    	updateShotestPath(distance, previous);
    };

    var updateShotestPath = function(dis, prev) {
    	var st = {};
    	for (var k in prev) {
    		if (prev[k] != null) {
    			self.edges[k][prev[k]].attr({stroke: shortestPathFoundColor});
    		}
    	}
    	for (var s in self.edges) {
    		for (var e in self.edges[s]) {
    			st[s] = st[s] || {};
    			st[e] = st[e] || {};
    			if (st[s][e] != 1 && st[e][s] != 1) {
    				var x = Math.min(self.edges[s][e].data("start").attrs.cx,
    							self.edges[s][e].data("end").attrs.cx) +
    						Math.abs((self.edges[s][e].data("start").attrs.cx - self.edges[s][e].data("end").attrs.cx)/2);

    				var y = Math.min(self.edges[s][e].data("start").attrs.cy,
    							self.edges[s][e].data("end").attrs.cy) +
    						Math.abs((self.edges[s][e].data("start").attrs.cy - self.edges[s][e].data("end").attrs.cy)/2);

    				paper.text(x, y, self.edges[s][e].data("weight")).attr({"font-size": 22, "font-weight": "bold"});
    				st[s][e] = 1;
    				st[e][s] = 1;
    			}
    		}
    	}

    };

	initPapar();
	return self;
}
