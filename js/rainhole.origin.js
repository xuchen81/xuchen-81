$(function() {
	var width = 600;
	var height = 600;
	var radius = 10;
	var holes = [];
	var holesDict = {};
	var holes1Dict = {};
	var rains = 53;
	var svg = d3.select("body").append("svg");
	svg.attr("width", width);
	svg.attr("height", height);

	var generateHoles = function(num) {
		for (var i = 0; i < num; i++) {
			var cx = Math.floor((Math.random() * width) + 1);
			holesDict[cx] = holesDict[cx] || {};
			var cy = Math.floor((Math.random() * height) + 1);

			var hole = svg.append("circle")
				.attr("cx", cx)
				.attr("cy", cy)
				.attr("r", 10)
				.attr("fill", "black")
				.attr("id", "hole"+i)
				.attr("filled", false);

			holes1Dict[hole.attr("id")] = hole;
			holesDict[cx][cy] = hole;
			holes.push(hole);
		}
	};

	var getHoleToFill = function(rain) {
		var rainx = parseInt(rain.attr("cx"));
		var coverRangeMin = rainx - 2 * radius; // exclusive
		var coverRangeMax = rainx + 2 * radius; // exclusive

		var currMinY = height + radius;
		var currMinHole = null;
		for (var key in holesDict) {
			if (key > coverRangeMin && key < coverRangeMax) {
				var possibleHoles = holesDict[key];

				for (var ykey in possibleHoles) {
					if (possibleHoles[ykey].attr("fill") == "black" &&
						ykey < currMinY) {
						currMinY = ykey;
						currMinHole = possibleHoles[ykey];
					}

				}
			}
		}
		return currMinHole;
	}

	var drop = function(rain) {
		var currCY = parseInt(rain.attr("cy"));
		var duration = Math.floor((Math.random() * 3000) + 1);
		var rainX = parseInt(rain.attr("cx"));

		var possibleHoles = holesDict[rainX] || {};
		var toFill = getHoleToFill(rain);

		var desHight = height;
		if (toFill != null) {
			desHight = parseInt(toFill.attr("cy"));
		}

		while (currCY != desHight){
			rain.transition().attr("cy", currCY+1).duration(duration)
			.each("end", function() {
				if (toFill != null) {
					toFill.attr("fill", rain.attr("fill"));
					rain.remove();
					delete(holes1Dict[toFill.attr("id")]);
				}
			});
			currCY += 1;
		}
	};

	var rain = function(num) {

		for (var i = 0; i < num; i++) {
			var randomCX = Math.floor((Math.random() * width) + 1);
			var R = Math.floor((Math.random() * 255) + 1);
			var G = Math.floor((Math.random() * 255) + 1);
			var B = Math.floor((Math.random() * 255) + 1);

			var rain = svg.append("circle")
						.attr("cx", randomCX)
						.attr("cy", -10)
						.attr("r", 10)
						.attr("fill", d3.rgb(R, G, B));
			drop(rain);
		}
	};
	var start = function() {
		generateHoles(30);

		setInterval(function() {
			if (Object.keys(holes1Dict).length == 0) {
				return;
			}
			var rainNum = Math.floor((Math.random() * 25) + 1);
			rain(rainNum);
		}, 1000);
	};

	start();
});
