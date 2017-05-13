$(function() {
  var data = [
    {date: "05/01", all: 100, sampleapp: 65},
    {date: "05/02", all: 200, sampleapp: 25},
    {date: "05/03", all: 40, sampleapp: 25},
    {date: "05/04", all: 30, sampleapp: 15},
    {date: "05/05", all: 20, sampleapp: 5},
    {date: "05/06", all: 145, sampleapp: 88},
    {date: "05/07", all: 150, sampleapp: 45},
    {date: "05/08", all: 132, sampleapp: 68},
    {date: "05/09", all: 128, sampleapp: 89},
    {date: "05/10", all: 119, sampleapp: 100},
    {date: "05/11", all: 130, sampleapp: 120},
    {date: "05/12", all: 121, sampleapp: 97},
    {date: "05/13", all: 15, sampleapp: 10},
    {date: "05/14", all: 188, sampleapp: 45},
    {date: "05/15", all: 100, sampleapp: 65},
    {date: "05/16", all: 200, sampleapp: 25},
    {date: "05/17", all: 40, sampleapp: 25},
    {date: "05/18", all: 150, sampleapp: 45},
    {date: "05/19", all: 132, sampleapp: 68},
    {date: "05/20", all: 128, sampleapp: 89},
    {date: "05/21", all: 119, sampleapp: 100},
    {date: "05/22", all: 130, sampleapp: 120},
    {date: "05/23", all: 121, sampleapp: 97},
    {date: "05/24", all: 15, sampleapp: 10},
    {date: "05/25", all: 290, sampleapp: 45},
    {date: "05/26", all: 134, sampleapp: 65},
    {date: "05/27", all: 126, sampleapp: 76},
    {date: "05/28", all: 47, sampleapp: 35},
    {date: "05/29", all: 123, sampleapp: 123},
    {date: "05/30", all: 119, sampleapp: 43},
    {date: "05/31", all: 198, sampleapp: 45},
  ];
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  var interpolateOptions = ["linear", "cardinal", "monotone"];
  var interpolateOption = interpolateOptions[Math.floor(Math.random() * interpolateOptions.length)];
  var sampleAppPathColor = "#0fa56b";
  var padding = 0.25;
  var outerPadding = 0.5;
  var pathWidth = 5;
  var transition = 1500;
  var barColor = "#edb590";

  var x = d3.scale.ordinal()
    .rangeBands([0, width], padding, outerPadding);

  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(20);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<strong style='font-size:12px;'>Sample App:</strong> <span style='color:red;font-size:12px;'>" + d.sampleapp + "</span>";
    })

  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  x.domain(data.map(function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.all; })]);

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Daily Signup");


  var bars = svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.date);
    })
    .attr("fill", barColor)
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return height; })
    .attr("height", function(d) { return 0; })
    .on('dblclick', function(d) {
      console.log(d.date);
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);

  bars.transition()
    .duration(transition)
    .attr("y", function(d) { return y(d.sampleapp); })
    .attr("height", function(d) { return height - y(d.sampleapp); });

  var allLineFunc = d3.svg.line()
    .interpolate(interpolateOption)
    .x(function (d) {
      return x(d.date) + x.rangeBand() / 2;
    })
    .y(function (d) {
      return y(d.all);
    });

  var sampleAppLineFunc = d3.svg.line()
    .interpolate(interpolateOption)
    .x(function (d) {
      return x(d.date) + x.rangeBand() / 2;
    })
    .y(function (d) {
      return y(d.sampleapp);
    });

    var allSingupPath = svg.append("path")
      .attr("d", allLineFunc(data))
      .attr("stroke", "steelblue")
      .attr("stroke-width", pathWidth)
      .attr("fill", "none");

    var totalLength = allSingupPath.node().getTotalLength();

    allSingupPath.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(transition)
      .ease("linear")
      .attr("stroke-dashoffset", 0);

    var sampleAppSingupPath = svg.append("path")
      .attr("d", sampleAppLineFunc(data))
      .attr("stroke", sampleAppPathColor)
      .attr("stroke-width", pathWidth)
      .attr("fill", "none");

    var totalLength = sampleAppSingupPath.node().getTotalLength();

    sampleAppSingupPath.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(transition)
      .ease("linear")
      .attr("stroke-dashoffset", 0);
});
//
// $(function() {
//   var data = [
//     {date: "05/01", all: 100, sampleapp: 65},
//     {date: "05/02", all: 200, sampleapp: 25},
//     {date: "05/03", all: 40, sampleapp: 25},
//     {date: "05/04", all: 30, sampleapp: 15},
//     {date: "05/05", all: 20, sampleapp: 5},
//     {date: "05/06", all: 145, sampleapp: 88},
//     {date: "05/07", all: 150, sampleapp: 45},
//     {date: "05/08", all: 132, sampleapp: 68},
//     {date: "05/09", all: 128, sampleapp: 89},
//     {date: "05/10", all: 119, sampleapp: 100},
//     {date: "05/11", all: 130, sampleapp: 120},
//     {date: "05/12", all: 121, sampleapp: 97},
//     {date: "05/13", all: 15, sampleapp: 10},
//     {date: "05/14", all: 188, sampleapp: 45},
//     {date: "05/15", all: 100, sampleapp: 65},
//     {date: "05/16", all: 200, sampleapp: 25},
//     {date: "05/17", all: 40, sampleapp: 25},
//     {date: "05/18", all: 150, sampleapp: 45},
//     {date: "05/19", all: 132, sampleapp: 68},
//     {date: "05/20", all: 128, sampleapp: 89},
//     {date: "05/21", all: 119, sampleapp: 100},
//     {date: "05/22", all: 130, sampleapp: 120},
//     {date: "05/23", all: 121, sampleapp: 97},
//     {date: "05/24", all: 15, sampleapp: 10},
//     {date: "05/25", all: 290, sampleapp: 45},
//     {date: "05/26", all: 134, sampleapp: 65},
//     {date: "05/27", all: 126, sampleapp: 76},
//     {date: "05/28", all: 47, sampleapp: 35},
//     {date: "05/29", all: 123, sampleapp: 123},
//     {date: "05/30", all: 119, sampleapp: 43},
//     {date: "05/31", all: 198, sampleapp: 45},
//   ];
//
//   class SaasSignupGrowthBarChartGeneration {
//     constructor(data) {
//       var interpolateOptions = ["linear", "cardinal", "monotone"];
//       self.margin = {top: 40, right: 20, bottom: 30, left: 40};
//       self.width = 960 - self.margin.left - self.margin.right;
//       self.height = 500 - self.margin.top - self.margin.bottom;
//       self.height = 500 - self.margin.top - self.margin.bottom;
//       self.interpolateOption = interpolateOptions[Math.floor(Math.random() * interpolateOptions.length)];
//       self.sampleAppPathColor = "#0fa56b";
//       self.padding = 0.25;
//       self.outerPadding = 0.5;
//       self.pathWidth = 5;
//       self.transition = 1500;
//       self.barColor = "#edb590";
//       self.data = data;
//       self.data = data;
//       self.svg = d3.select("body").append("svg")
//         .attr("width", self.width + self.margin.left + self.margin.right)
//         .attr("height", self.height + self.margin.top + self.margin.bottom)
//         .append("g")
//         .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");
//     }
//
//     rederChart() {
//       var x = d3.scale.ordinal()
//         .rangeBands([0, self.width], self.padding, self.outerPadding);
//
//       var y = d3.scale.linear()
//         .range([self.height, 0]);
//
//       var xAxis = d3.svg.axis()
//         .scale(x)
//         .orient("bottom");
//
//       var yAxis = d3.svg.axis()
//         .scale(y)
//         .orient("left")
//         .ticks(20);
//
//       var tip = d3.tip()
//         .attr('class', 'd3-tip')
//         .offset([-10, 0])
//         .html(function(d) {
//           return "<strong style='font-size:12px;'>Sample App:</strong> <span style='color:red;font-size:12px;'>" + d.sampleapp + "</span>";
//         })
//
//       self.svg.call(tip);
//
//       x.domain(self.data.map(function(d) { return d.date; }));
//       y.domain([0, d3.max(self.data, function(d) { return d.all; })]);
//
//       self.svg.append("g")
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + self.height + ")")
//         .call(xAxis);
//
//       self.svg.append("g")
//         .attr("class", "y axis")
//         .call(yAxis)
//         .append("text")
//         .attr("transform", "rotate(-90)")
//         .attr("y", 6)
//         .attr("dy", ".71em")
//         .style("text-anchor", "end")
//         .text("Daily Signup");
//
//       var bars = self.svg.selectAll(".bar")
//         .data(self.data)
//         .enter().append("rect")
//         .attr("class", "bar")
//         .attr("x", function(d) {
//           return x(d.date);
//         })
//         .attr("fill", self.barColor)
//         .attr("width", x.rangeBand())
//         .attr("y", function(d) { return self.height; })
//         .attr("height", function(d) { return 0; })
//         .on('dblclick', function(d) {
//           console.log(d.date);
//         })
//         .on('mouseover', tip.show)
//         .on('mouseout', tip.hide);
//
//       bars.transition()
//         .duration(self.transition)
//         .attr("y", function(d) { return y(d.sampleapp); })
//         .attr("height", function(d) { return self.height - y(d.sampleapp); });
//
//       var allLineFunc = d3.svg.line()
//         .interpolate(self.interpolateOption)
//         .x(function (d) {
//           return x(d.date) + x.rangeBand() / 2;
//         })
//         .y(function (d) {
//           return y(d.all);
//         });
//
//       var sampleAppLineFunc = d3.svg.line()
//         .interpolate(self.interpolateOption)
//         .x(function (d) {
//           return x(d.date) + x.rangeBand() / 2;
//         })
//         .y(function (d) {
//           return y(d.sampleapp);
//         });
//
//       var allSingupPath = svg.append("path")
//         .attr("d", allLineFunc(self.data))
//         .attr("stroke", "steelblue")
//         .attr("stroke-width", self.pathWidth)
//         .attr("fill", "none");
//
//       var totalLength = allSingupPath.node().getTotalLength();
//
//       allSingupPath.attr("stroke-dasharray", totalLength + " " + totalLength)
//         .attr("stroke-dashoffset", totalLength)
//         .transition()
//         .duration(self.transition)
//         .ease("linear")
//         .attr("stroke-dashoffset", 0);
//
//       var sampleAppSingupPath = svg.append("path")
//         .attr("d", sampleAppLineFunc(data))
//         .attr("stroke", sampleAppPathColor)
//         .attr("stroke-width", pathWidth)
//         .attr("fill", "none");
//
//       var totalLength = sampleAppSingupPath.node().getTotalLength();
//
//       sampleAppSingupPath.attr("stroke-dasharray", totalLength + " " + totalLength)
//         .attr("stroke-dashoffset", totalLength)
//         .transition()
//         .duration(self.transition)
//         .ease("linear")
//         .attr("stroke-dashoffset", 0);
//     }
//
//     render() {
//       this.rederChart();
//     }
//   }
//   var g = new SaasSignupGrowthBarChartGeneration(data);
//   g.render();
//
// });
