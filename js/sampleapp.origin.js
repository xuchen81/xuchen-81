$(function() {
    var data = [
        {
            "controller": 589,
            "account_id": "253",
            "preprovision_account_name": "",
            "account_name": "Hopper2017041510",
            "user_name": "Hopper201704271510266",
            "access_key": "h5cb8cyl7kjd",
            "license": "149336545589DAQ",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T00:44:25.455464",
            "associated_to_license_on": "2017-04-27T22:13:20.700305",
            "lock_status": "PERMANENT",
            "sample_app_id": "996"
        },
        {
            "controller": 589,
            "account_id": "254",
            "preprovision_account_name": "",
            "account_name": "Bear2271510267",
            "user_name": "Mac8379439",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:45.029377",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": null,
            "lock_status": "PERMANENT",
            "sample_app_id": "1000"
        },
        {
            "controller": 589,
            "account_id": "255",
            "preprovision_account_name": "",
            "account_name": "Test03849",
            "user_name": "Hopper201704271510267",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": "2017-04-27T21:13:20.700305",
            "lock_status": "PERMANENT",
            "sample_app_id": "1001"
        },
        {
            "controller": 589,
            "account_id": "255",
            "preprovision_account_name": "",
            "account_name": "Lion479302",
            "user_name": "Water0483429",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": "2017-04-28T06:13:20.700305",
            "lock_status": "PERMANENT",
            "sample_app_id": "1002"
        },
        {
            "controller": 589,
            "account_id": "255",
            "preprovision_account_name": "",
            "account_name": "Banana3749020",
            "user_name": "Warriors7483393",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": null,
            "lock_status": "PERMANENT",
            "sample_app_id": "1004"
        },
        {
            "controller": 589,
            "account_id": "255",
            "preprovision_account_name": "",
            "account_name": "Sushi84940",
            "user_name": "AppD739403",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": "2017-04-28T04:13:20.700305",
            "lock_status": "PERMANENT",
            "sample_app_id": "1006"
        },
        {
            "controller": 589,
            "account_id": "255",
            "preprovision_account_name": "",
            "account_name": "Tiger023849",
            "user_name": "Orange7490383",
            "access_key": "023gnb0v0dye",
            "license": "149336717728HDO",
            "created_on": "2017-04-27T20:13:20.700305",
            "modified_on": "2017-04-28T01:13:07.173383",
            "associated_to_license_on": "2017-04-28T10:13:20.700305",
            "lock_status": "PERMANENT",
            "sample_app_id": "1008"
        }

    ];
    //PDT str, PDT str, UTC datetime
    var wastedMinutes = function(createdTime, associateTime, checkTime, lifecycleBarWidth) {
        var PDTtoUTCOffset = 7;
        var create = new Date(createdTime);
        create.setHours(create.getHours() + PDTtoUTCOffset);
        if (associateTime == null) {
            var diffMs = checkTime - create;
            var diffMins = Math.round(diffMs / 60000); // minutes
            var width = diffMins * lifecycleBarWidth / 24 / 60;
            if (width >= lifecycleBarWidth) {
                width = lifecycleBarWidth
            }
            return {"wastedWidth": width, "runningWidth":0, "toRunWidth": lifecycleBarWidth - width}
        }

        var associate = new Date(associateTime);
        associate.setHours(associate.getHours() + PDTtoUTCOffset);
        var diffMs = associate - create;
        var diffMins = Math.round(diffMs / 60000); // minutes
        var wastedWidth = diffMins * lifecycleBarWidth / 24 / 60;

        var runningMs = checkTime - associate;
        var runningMins = Math.round(runningMs / 60000); // minutes
        var runningWidth = runningMins * lifecycleBarWidth / 24 / 60;
        if (wastedWidth + runningWidth >= lifecycleBarWidth) {
            runningWidth = lifecycleBarWidth - wastedWidth;
        }

        return {"wastedWidth": wastedWidth, "runningWidth":runningWidth, "toRunWidth":lifecycleBarWidth-wastedWidth-runningWidth};
    };

    class SampleAppTimeWastedGeneration {
        constructor(data, canvasId) {
            self.green = "#82e589";
            self.wastedRed = "#ed7b7b";
            self.idle = "#6da0ed";
            self.barHeight = 30;
            self.lineHeight = 50;
            self.maxTextWidth = 0;
            self.textBarSpace = 20;
            self.barWidth = 432; // 24 * 60 * 0.3
            self.width = 900;
            self.height = data.length * self.lineHeight;
            self.svg = d3.select("#"+canvasId).append("svg").attr("width", self.width).attr("height", self.height);
            for (var i = 0; i < data.length; i++) {
                var check = new Date("2017-04-28T23:30:20.700305");
                var widthInfo = wastedMinutes(data[i]["created_on"], data[i]["associated_to_license_on"], check, self.barWidth);
                data[i]["wastedTimeWidth"] = widthInfo["wastedWidth"];
                data[i]["runningTimeWidth"] = widthInfo["runningWidth"];
                data[i]["toRunTimeWidth"] = widthInfo["toRunWidth"];
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
                    return d["account_name"] + "-" + d["sample_app_id"];
                })
                .attr("id", function(d, i) {
                    return "account_id_" + d["account_name"] + "-" + d["sample_app_id"];
                })
                .attr("font-size", "16px");

            for (var i = 0; i < self.data.length; i++) {
                var id = "account_id_" + self.data[i]["account_name"] + "-" + self.data[i]["sample_app_id"];
                var currText = d3.select("#"+id);
                var textW = currText.node().getBoundingClientRect().width;
                self.maxTextWidth = Math.max(self.maxTextWidth, textW)
                var currY = parseInt(currText.attr("y"));
                var textH = currText.node().getBoundingClientRect().height;
                currText.attr("y", currY - (self.lineHeight - self.barHeight) - (self.barHeight - textH) / 2 - 2);
            }

            for (var i = 0; i < self.data.length; i++) {
                var id = "account_id_" + self.data[i]["account_name"] + "-" + self.data[i]["sample_app_id"];
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
                    var textH = currText.node().getBoundingClientRect().height;
                    var currY = parseInt(currText.attr("y"));
                    currText.attr("y", currY - (self.lineHeight - self.barHeight) - (self.barHeight - textH) / 2 - 2);
                };

                var greenTransitionCallback = function() {
                    var blueIdlePart = svg.append("rect")
                        .attr("x", self.maxTextWidth + self.textBarSpace + d["wastedTimeWidth"] + d["runningTimeWidth"])
                        .attr("y", i * self.lineHeight)
                        .attr("width", 0)
                        .attr("height", self.barHeight)
                        .attr("fill", self.idle);

                    var renderTimeWastedText = function() {
                        svg.append("text")
                            .attr("x", self.maxTextWidth + 2 * self.textBarSpace + self.barWidth)
                            .attr("y", (i + 1) * self.lineHeight)
                            .text(function() {
                                return Math.round(d["wastedTimeWidth"] * 24 * 60 / self.barWidth) + " mins";
                            })
                            .attr("id", "wasted_minutes_" + d["account_name"] + "-" + d["sample_app_id"])
                            .attr("font-size", "16px")
                            .style("fill", self.wastedRed)
                            .style("font-weight", "bold");

                        var currText = d3.select("#wasted_minutes_" + d["account_name"] + "-" + d["sample_app_id"]);
                        var textH = currText.node().getBoundingClientRect().height;
                        var currY = parseInt(currText.attr("y"));
                        currText.attr("y", currY - (self.lineHeight - self.barHeight) - (self.barHeight - textH) / 2 - 2);
                    };

                    blueIdlePart.transition()
                        .duration(500)
                        .attr("width", function () {
                            return d["toRunTimeWidth"];
                        })
                        .each("end", renderTimeWastedText);
                };

                greenPart.transition()
                    .duration(500)
                    .attr("width", function () {
                        return d["runningTimeWidth"];
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

    $("#sampleapp_check_button").click(function() {
        $("#canvas").empty();
        var g = new SampleAppTimeWastedGeneration(data, 'canvas');
        g.rederSampleAppAccountInfo();
        g.renderSampleAppLifecycleBar();
    });

    $("#sampleapp_check_button").trigger("click");
});
