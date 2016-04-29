$(function() {
  $('.sidebar-nav ul li').click(function() {
  	$('.sidebar-nav ul li.active').removeClass('active');
  	$(this).addClass('active');
  });

  $('#place-today').click(function() {
  	var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getToday();
    var rq = new MoveRequest();
    rq.requestPlaces(data);
  	return false;
  });

  $('#place-yesterday').click(function() {
    var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getYesterday();
    var rq = new MoveRequest();
    rq.requestPlaces(data);
  	return false;
  });

  $('#place-thisweek').click(function() {
    var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getDateCurrentWeek();
    var rq = new MoveRequest();
    rq.requestPlaces(data);
  	return false;
  });

  $('#place-lastweek').click(function() {
    var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getDateLastWeek();
    var rq = new MoveRequest();
    rq.requestPlaces(data);
  	return false;
  });

  $('#view-place-by-date').click(function() {
    var date = $('input#datepicker').val();
    if (date == '') {
      return false;
    }
    $('.sidebar-nav ul li.active').removeClass('active');
    var rq = new MoveRequest();
    rq.requestPlaces({first: date});
    return false;
  });

  $('#storyline-today').click(function() {
    var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getToday();
    var date = data['first']
    window.location.href = "/move/storyline";
    return false;
  });

  $('#storyline-yesterday').click(function() {
    var dateUtil = new DateUtil(minDate);
    var data = dateUtil.getYesterday();
    var date = data['first']
    window.location.href = "/move/storyline?date=" + date;
    return false;
  });

  $('#view-storyline-by-date').click(function() {
    var date = $('input#datepicker').val();
    if (date == '') {
      return false;
    }

    window.location.href = "/move/storyline?date=" + date;
    return false;
  });
});
