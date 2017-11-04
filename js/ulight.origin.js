$(function() {
  var width = 1000, height = 1000, centerGap = 20, n = 20;
  var lightBulbR = 250, lightBulbBorder = 20;
  var lightOpacity = 0.6;
  var light = [
    {inner: lightBulbR, outer:lightBulbR + lightBulbBorder},
  ];
  var lightColor = "#f4f142";
  var uLightCenterColor = "#efe009";
  var svg = d3.select("#canvas").append("svg").attr("width", width).attr("height", height);

  var radialGradient = svg.append("defs")
    .append("radialGradient")
    .attr("id", "radial-gradient");

  radialGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#fffa05");

  radialGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#fff");

  var c = svg.append("circle")
      .attr("id", "lightBulbInside")
      .attr("cx", width/2)
      .attr("cy", 300)
      .attr("r", lightBulbR + 100)
      .style("fill", "white");

  c.on("click", function() {
    if (d3.select(this).style("fill") == "rgb(255, 255, 255)") {
      d3.select(this).style("fill", "url(#radial-gradient)");
    } else {
      d3.select(this).style("fill", "white");
    }
  });

  var arc = d3.svg.arc()
    .innerRadius(function(d) {
      return d.data.inner;
    })
    .outerRadius(function(d) {
      return d.data.outer;
    })
    .startAngle(-Math.PI / 2 - 1.1)
    .endAngle(Math.PI / 2 + 1.1);

  var pie = d3.layout.pie();

  svg.selectAll('path')
    .data(pie(light))
    .enter()
    .append('path')
    .attr('d', function(d) {
      return arc(d);
    })
    .attr("stroke", "black")
    .style("stroke-linejoin", "round")
    .attr('fill', function(d, i) {
      return "black";
    })
    .attr('class', 'pie')
    .attr('transform', 'translate(' + width/2 + ', 300)');

  var line1Len = 120;
  var lines = [
    {width: 205, height: 20, y: 540},
    {width: 205, height: 20, y: 575},
    {width: 150, height: 20, y: 610},
    {width: 120, height: 20, y: 645},
  ]
  svg.selectAll("rect")
    .data(lines)
    .enter()
    .append('rect')
    .attr("x", function(d) {
      return (width-d.width)/2;
    })
    .attr("y", function(d){
      return d.y;
    })
    .attr("width", function(d) {
      return d.width;
    })
    .attr("height", function(d) {
      return d.height;
    })
    .style("fill", "black")
    .attr("rx", 10);
  svg.append("text")
    .attr("id", "utext")
    .attr("x", 0)
    .attr("y", 500)
    .text("U")
    .attr("font-size", "250px");

  var uText = d3.select("#utext");
  var textW = uText.node().getBoundingClientRect().width;

  uText.attr("x", (width - textW)/2);

  uText.on("click", function() {
    if (d3.select("circle[id='lightBulbInside']").style("fill") == "rgb(255, 255, 255)") {
        d3.select("circle[id='lightBulbInside']").style("fill", "url(#radial-gradient)");
    } else {
        d3.select("circle[id='lightBulbInside']").style("fill", "white");
    }
  });

  var getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  }
  var lights = function() {
    d3.select("path#ulightCenter").remove();
    var data = [{num: "1", all: 100,}];

    for (var i = 2; i < 23; i++) {
        data.push({
            'num': i,
            'all': getRandomInt(0, 850)
        });
    }

    data.push({'num': 23, 'all': 100})

    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var interpolateOptions = ["linear", "cardinal", "monotone"];
    var interpolateOption = interpolateOptions[Math.floor(Math.random() * interpolateOptions.length)];
    var padding = 0.25;
    var outerPadding = 0.5;
    var pathWidth = 8;
    var transition = 250;

    var x = d3.scale.ordinal()
      .rangeBands([0, 140], padding, outerPadding);

    var y = d3.scale.linear()
      .range([height, 500]);

    x.domain(data.map(function(d) { return d.num; }));
    y.domain([0, d3.max(data, function(d) { return d.all; })]);

    var allLineFunc = d3.svg.line()
      .interpolate(interpolateOption)
      .x(function (d) {
        return x(d.num) + width / 2 - 16;
      })
      .y(function (d) {
        return y(d.all) - 120;
      });
      var allSingupPath = svg.append("path")
        .attr("id", 'ulightCenter')
        .attr("d", allLineFunc(data))
        .attr("stroke", uLightCenterColor)
        .attr("stroke-width", pathWidth)
        .attr("fill", "none");

      var totalLength = allSingupPath.node().getTotalLength();

      allSingupPath.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(transition)
        .ease("linear")
        .attr("stroke-dashoffset", 0);
  };
  setInterval(lights, 750);
});
