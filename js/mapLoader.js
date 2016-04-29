function convertMoveTimeToEST(yyyyMMddTHHmmssZ) {
  var year = yyyyMMddTHHmmssZ.substring(0, 4);
  var month = yyyyMMddTHHmmssZ.substring(4, 6);
  var date = yyyyMMddTHHmmssZ.substring(6, 8);
  var hour = yyyyMMddTHHmmssZ.substring(9, 11);
  var minute = yyyyMMddTHHmmssZ.substring(11, 13);
  var second = yyyyMMddTHHmmssZ.substring(13, 15);

  var date = new Date(year, month - 1, date, hour, minute, second);
  date.setHours(date.getHours() - 4);

  var hr = (date.getHours() < 10 ? "0" : "" ) + date.getHours();
  var min = (date.getMinutes() < 10 ? "0" : "" ) + date.getMinutes();
  var hrmin = hr + ':' + min;
  var dateStr = $.datepicker.formatDate('yy-mm-dd', date);
  return dateStr + ' ' + hrmin;
}

function MapLoader(date) {
  this.loadingPlaces = function(places) {

    function initialize() {
      console.log(places);
  	  var mapOptions = {
  	    mapTypeId: google.maps.MapTypeId.ROADMAP,
  	    center: new google.maps.LatLng(places[0]['place']['location']['lat'], places[0]['place']['location']['lon'])
  	  };

  	  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
      var today = new Date();
      var todayStr = $.datepicker.formatDate('yy-mm-dd', today);

      var bounds = new google.maps.LatLngBounds();

  	  for (key in places) {
        var coords = new google.maps.LatLng(places[key]['place']['location']['lat'], places[key]['place']['location']['lon']);
        bounds.extend(coords);

        var startTime = convertMoveTimeToEST(places[key]['startTime']);
        var endTime = convertMoveTimeToEST(places[key]['endTime']);
        var placeName = places[key]['place']['name']

        var contentString = '<div id="place-info">'+
          '<p><img src="/img/home.png" /><span>' + placeName + '</span></p>' +
          '<p><img src="/img/clock_green.png" /><span>' + startTime + '</span></p>' +
          '<p><img src="/img/clock_yellow.png" /><span>' + endTime + '</span></p>' +
          '</div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var zIndex = 1;
        if (key == places.length - 1 && todayStr == date) {
          var icon = '/img/green-dot.png';
          zIndex = google.maps.Marker.MAX_ZINDEX;
        }
  	    var marker = new google.maps.Marker({
  	      map: map,
  	      position: coords,
  	      animation: google.maps.Animation.DROP,
          zIndex: zIndex,
          icon: icon || ''
  	    });

        (function(marker, infowindow) {
          google.maps.event.addListener(marker, 'mouseover', function() {
            infowindow.open(map, this);
          });

          google.maps.event.addListener(marker, 'mouseout', function() {
            infowindow.close();
          });
        })(marker, infowindow);
  	  }

      if (places.length == 1) {
        map.setCenter(bounds.getCenter());
        map.setZoom(18);
      } else {
        map.fitBounds(bounds);
      }
  	}

    initialize();
  }
}
