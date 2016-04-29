var StorylineLoader = function(storyline) {
  var loadmap = function(lat, lon, title, div) {
  	var center = new google.maps.LatLng(lat, lon);
    var mapOptions = {
      zoom: 14,
      center: center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDoubleClickZoom: true,
      scrollwheel: false,
      streetViewControl: false,
    }

    var map = new google.maps.Map(div, mapOptions);

    var marker = new google.maps.Marker({
      position: center,
      map: map,
      title: title
    });
  };

  this.loadMaps = function() {
  	var mapdivs = document.getElementsByClassName("map-place");

  	for (var i = 0; i < mapdivs.length; i++) {
  	  var mapdiv = mapdivs[i];
  	  var lat = mapdivs[i].getAttribute("data-lat");
  	  var lon = mapdivs[i].getAttribute("data-lon");
  	  var title = mapdivs[i].getAttribute("data-name");
  	  loadmap(lat, lon, title, mapdivs[i]);
  	}
  };
}
