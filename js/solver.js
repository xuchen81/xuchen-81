$(function () {
    var graph = new Graph();
    $("#holder").dblclick(function(e) {
        var x = e.offsetX==undefined?e.pageX - $("#holder").offset().left:e.offsetX;
		var y = e.offsetY==undefined?e.pageY - $("#holder").offset().top:e.offsetY;
        graph.addNode(x, y);
        e.stopPropagation();
    });
    $("#testG").click(function(){
        console.log(graph);
    });
    $("#solve").click(function(){
    	graph.Dijkstra(1);
    });
});
