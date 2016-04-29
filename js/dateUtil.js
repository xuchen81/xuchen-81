function DateUtil(minDate) {
  this.now = new Date();
  this.firstDate = minDate;
}

DateUtil.prototype.getToday = function() {
  var firstDate = $.datepicker.formatDate('yy-mm-dd', this.now);
  return {
    'first': firstDate,
  };
};

DateUtil.prototype.getYesterday = function() {
  var day = new Date();
  day.setDate(day.getDate() - 1);
  var firstDate = $.datepicker.formatDate('yy-mm-dd', day);
  return {
    'first': firstDate,
  };
};

DateUtil.prototype.getDateCurrentWeek = function() {
  var daysOffset = this.now.getDay();
  var day = new Date();
  day.setDate(day.getDate() - daysOffset);
  var firstDate = $.datepicker.formatDate('yy-mm-dd', day);

  var lastDate = this.getToday();

  return {
    'first': firstDate,
    'last': lastDate
  };
};

DateUtil.prototype.getDateLastWeek = function() {
  var daysOffset = this.now.getDay() + 7;
  var day = new Date();
  day.setDate(day.getDate() - daysOffset);
  var firstDate = $.datepicker.formatDate('yy-mm-dd', day);

  day = new Date();
  day.setDate(day.getDate() - (this.now.getDay() + 1));
  var lastDate = $.datepicker.formatDate('yy-mm-dd', day);

  return {
    'first': firstDate,
    'last': lastDate
  };
};
