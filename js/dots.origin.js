$(function() {
    var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    var iw, ih;
    var img = new Image();
    var imgNum = getRandomInt(1, 10);
    img.src = '/img/' + imgNum.toString() + '.png';
    var r = 3;
    img.onload = function() {
        iw = this.width;
        ih = this.height;
        var canvas = document.getElementById('canvas');
        canvas.width = iw;
        canvas.height = ih;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        img.style.display = 'none';
        var svg = d3.select("body").append("svg").attr("width", 2 * iw * r).attr("height", 2 * ih * r);
        var pixels = {};
        var pixel_data = {};
        for (var y = 0; y < ih; y++) {
            for (var x = 0; x < iw; x++) {
                startx = 2 * r * x + r;
                starty = 2 * r * y + r;
                var pixel = ctx.getImageData(x, y, 1, 1);
                var data = pixel.data;
                var rgba = 'rgba(' + data[0] + ',' + data[1] +
                        ',' + data[2] + ',' + data[3] + ')';

                var ran = getRandomInt(0, 4);
                if (ran == 0) {
                    svg.append("circle").attr('cx', startx).attr('cy', starty).attr('r', r).attr('fill', 'white').attr('id', y.toString()+ "_" + x.toString()).attr('class', 'up');
                } else if (ran == 1) {
                    svg.append("circle").attr('cx', startx).attr('cy', starty).attr('r', r).attr('fill', 'white').attr('id', y.toString()+ "_" + x.toString()).attr('class', 'down');
                } else if (ran == 2) {
                    svg.append("circle").attr('cx', startx).attr('cy', starty).attr('r', r).attr('fill', 'white').attr('id', y.toString()+ "_" + x.toString()).attr('class', 'left');
                } else if (ran == 3) {
                    svg.append("circle").attr('cx', startx).attr('cy', starty).attr('r', r).attr('fill', 'white').attr('id', y.toString()+ "_" + x.toString()).attr('class', 'right');
                }
                pixels[y.toString()+ "_" + x.toString()] = rgba;
                pixel_data[y.toString()+ "_" + x.toString()] = {
                    color: rgba,
                    cx: startx,
                    cy: starty
                }
            }
        }
        var resetColor = function() {
            d3.selectAll("circle").attr('fill', 'white');
        };

        var renderDots = function(pixel_dic, n) {
            var show = _.sample(Object.keys(pixel_dic), n);
            console.log(Object.keys(pixel_dic).length);
            console.log(show);
            if (show.length === 0) {
                return 1;
            }

            for (var i = 0; i < show.length; i ++) {
                var id = show[i];
                d3.select("circle[id='"+id+"']").transition().attr('fill', pixels[id]).duration(500);
                delete pixel_dic[id];
            }
        };

            // var renderDots2 = function(pixel_dic, n) {
            //     var show = _.sample(Object.keys(pixel_dic), n);
            //     console.log(Object.keys(pixel_dic).length);
            //     console.log(show);
            //     if (show.length === 0) {
            //         return 1;
            //     }
            //
            //     for (var i = 0; i < show.length; i ++) {
            //
            //         var id = show[i];
            //         var c = d3.select("circle[id='"+id+"']")
            //         var cx = c.attr("cx");
            //         var cy = c.attr("cy");
            //         c.attr("cy", -r).attr('fill', pixels[id]).transition().attr('cy', cy).ease("bounce");
            //         delete pixel_dic[id];
            //     }
            // };

        $("#rain").click(function() {
            d3.selectAll("circle").attr('cy', 0).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cy', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cy'];
            }).ease("bounce")
            .duration(1000);
        });

        $("#sunrise").click(function() {
            d3.selectAll("circle").attr('cy', ih * 2 * r).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cy', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cy'];
            })
            .duration(1500);
        });

        $("#four_dir").click(function() {
            var duration = 2000;
            d3.selectAll("circle[class='up']").attr('cy', 0).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cy', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cy'];
            })
            .duration(duration);

            d3.selectAll("circle[class='left']").attr('cx', 0).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cx', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cx'];
            })
            .duration(duration);

            d3.selectAll("circle[class='down']").attr('cy', ih * 2 * r).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cy', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cy'];
            })
            .duration(duration);

            d3.selectAll("circle[class='right']").attr('cx', iw * 2 * r).attr("fill", function(){
                var id = d3.select(this).attr('id');
                return pixel_data[id]['color'];
            })
            .transition()
            .attr('cx', function() {
                var id = d3.select(this).attr('id');
                return pixel_data[id]['cx'];
            })
            .duration(duration);
        });

        $("#painting").click(function() {
            var newPixels = jQuery.extend({}, pixels);
            resetColor();
            setInterval(renderDots, 10, newPixels, 500);
        });
        var whichEffect = getRandomInt(0, 4);
        if (whichEffect == 0) {
            $( "#rain" ).trigger( "click" );
        } else if (whichEffect == 1) {
            $( "#sunrise" ).trigger( "click" );
        } else if (whichEffect == 2) {
            $( "#four_dir" ).trigger( "click" );
        } else if (whichEffect == 3) {
            $( "#painting" ).trigger( "click" );
        }
    };
});
