$(function() {
  var width = 1000, height = 1000, centerGap = 20, n = 20, r = 100;
  var lightBulbR = 250, lightBulbBorder = 20;
  var lightOpacity = 0.6;
  var light = [
    {inner: lightBulbR, outer:lightBulbR + lightBulbBorder},
  ];
  var lightColor = "#f4f142";
  var uLightCenterColor = "#efe009";

  var data = [
    {"label":"one", "value":20},
    {"label":"two", "value":50},
    {"label":"three", "value":30}
  ];

  var svg = d3.select("#canvas").append("svg").data([data])
    .attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + r + "," + r + ")");


});
