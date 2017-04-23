$(function() {
    // $.ajax({
    //     url: "https://portal-staging.saastest.appdynamics.com/api/rest/v1/controllers/sampleapp/",
    //     data: data,
    //     done: function(data){
    //         console.log(data);
    //     },
    //     fail: function() {
    //
    //     }
    // });

    $.ajax({
        url: "https://portal-staging.saastest.appdynamics.com/api/rest/v1/controllers/sampleapp/",
    })
    .done(function(data) {
        console.log(data);

    })
    .fail(function(error) {
        console.log(error);
    });

    var data2 = [
        {
            account_id: "Hopper2017042201591318",
            sampleapp_id: "Hopper2017042201591318",
            created_on: "2017-04-12T22:47:11.435560",
            modified_on: "2017-04-13T00:39:49.490987",
        },
        {
            account_id: "20",
            sampleapp_id: "2234",
            created_on: "2017-04-13T00:53:34.159765",
            modified_on: "2017-04-13T01:01:40.419511",
        },
        {
            account_id: "2034",
            sampleapp_id: "223324",
            created_on: "2017-04-13T00:53:34.159765",
            modified_on: "2017-04-13T01:01:40.419511",
        },
        {
            account_id: "334",
            sampleapp_id: "643",
            created_on: "2017-04-13T00:53:34.159765",
            modified_on: "2017-04-13T01:01:40.419511",
        },
        {
            account_id: "344",
            sampleapp_id: "3566",
            created_on: "2017-04-13T00:53:34.159765",
            modified_on: "2017-04-13T01:01:40.419511",
        }
    ];
    var wastedMinutes = function(ts1, ts2, lifecycleBarWidth) {
        var d1 = new Date(ts1);
        var d2 = new Date(ts2);
        var diffMs = d2 - d1;
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
        return diffMins * lifecycleBarWidth / 24 / 60;
    };

    class SampleAppTimeWastedGeneration {
        constructor(data, canvasId) {
            self.green = "#82e589";
            self.wastedRed = "#ed7b7b";
            self.barHeight = 30;
            self.lineHeight = 50;
            self.maxTextWidth = 0;
            self.textBarSpace = 20;
            self.barWidth = 432; // 24 * 60 * 0.3
            self.width = 800;
            self.height = data2.length * self.lineHeight;
            self.svg = d3.select("#"+canvasId).append("svg").attr("width", self.width).attr("height", self.height);
            for (var i = 0; i < data.length; i++) {
                data[i]["wastedTimeWidth"] = wastedMinutes(data[i]["created_on"], data[i]["modified_on"], self.barWidth = 432);
            }
            self.data = data;
        }

        rederSampleAppAccountInfo() {
            self.svg.selectAll('text')
                .data(self.data)
                .enter()
                .append('text')
                .attr("x", 0)
                .attr("y", function(d, i) {
                    return (i + 1) * self.lineHeight;
                })
                .text(function(d){
                    console.log(d);
                    return d["account_id"];
                })
                .attr("id", function(d, i) {
                    return "account_id_" + d["account_id"];
                })
                .attr("font-size", "16px");

            for (var i = 0; i < data2.length; i++) {
                var id = "account_id_" + self.data[i]["account_id"];
                var currText = d3.select("#"+id);
                var textW = currText.node().getBoundingClientRect().width;
                self.maxTextWidth = Math.max(self.maxTextWidth, textW)
                var currY = parseInt(currText.attr("y"));
                var textH = currText.node().getBoundingClientRect().height;
                currText.attr("y", currY - (self.lineHeight - self.barHeight) - (self.barHeight - textH) / 2 - 2);
            }

            for (var i = 0; i < data2.length; i++) {
                var id = "account_id_" + self.data[i]["account_id"];
                var currText = d3.select("#"+id);
                var textW = currText.node().getBoundingClientRect().width;
                currText.attr("x", self.maxTextWidth - textW);
            }
        }

        renderSampleAppLifecycleBar() {
            svg.selectAll('rect')
               .data(self.data)
               .enter()
               .append('rect')
               .attr("x", self.maxTextWidth + self.textBarSpace)
               .attr("y", function(d, i) {
                   return i * self.lineHeight;
               })
               .attr('width', function(d) {
                   return 0;
               })
               .attr("height", self.barHeight)
               .attr('fill', function(d, i) {
                   return self.wastedRed;
               })
               .style("opacity", .9);

            var redTransitionCallback = function(d, i) {
                var greenPart = svg.append("rect")
                    .attr("x", self.maxTextWidth + self.textBarSpace + d["wastedTimeWidth"])
                    .attr("y", i * self.lineHeight)
                    .attr("width", 0)
                    .attr("height", self.barHeight)
                    .attr("fill", self.green);

                var renderTimeWastedText = function() {
                    svg.append("text")
                        .attr("x", self.maxTextWidth + 2 * self.textBarSpace + self.barWidth)
                        .attr("y", (i + 1) * self.lineHeight)
                        .text(function() {
                            return Math.round(d["wastedTimeWidth"] * 24 * 60 / self.barWidth) + " mins";
                        })
                        .attr("id", "wasted_minutes_" + d["account_id"])
                        .attr("font-size", "16px")
                        .style("fill", self.wastedRed)
                        .style("font-weight", "bold");

                    var currText = d3.select("#wasted_minutes_" + d["account_id"]);
                    console.log(currText);
                    var textH = currText.node().getBoundingClientRect().height;
                    var currY = parseInt(currText.attr("y"));
                    currText.attr("y", currY - (self.lineHeight - self.barHeight) - (self.barHeight - textH) / 2 - 2);
                };

                var greenTransitionCallback = function() {
                    renderTimeWastedText();
                };

                greenPart.transition()
                    .duration(500)
                    .attr("width", function () {
                        return self.barWidth - d["wastedTimeWidth"];
                    })
                    .each("end", greenTransitionCallback);
            };
            svg.selectAll('rect')
                .transition()
                .duration(500)
                .attr("width", function (d, i) {
                    return d["wastedTimeWidth"];
                })
                .each("end", redTransitionCallback);
        }
    }

    var g = new SampleAppTimeWastedGeneration(data2, 'canvas');
    g.rederSampleAppAccountInfo();
    g.renderSampleAppLifecycleBar();

});
