from google.appengine.ext import webapp
import time, datetime
import random

register = webapp.template.create_template_register()

@register.filter
def formatTime(yyyyMMddTHHmmssZ):
  yyyyMMddTHHmmss = yyyyMMddTHHmmssZ.split('-')[0]
  time_format = "%Y%m%dT%H%M%S"
  dt = datetime.datetime.strptime(yyyyMMddTHHmmss, time_format)
  est_dt = dt - datetime.timedelta(hours=4)
  date_str = est_dt.strftime("%Y-%m-%d %H:%M")
  return date_str

@register.filter
def formatTimeWithSeconds(yyyyMMddTHHmmssZ):
  yyyyMMddTHHmmss = yyyyMMddTHHmmssZ.split('-')[0]
  time_format = "%Y%m%dT%H%M%S"
  dt = datetime.datetime.strptime(yyyyMMddTHHmmss, time_format)
  est_dt = dt - datetime.timedelta(hours=4)
  date_str = est_dt.strftime("%H:%M:%S")
  return date_str

@register.filter
def toMinutes(seconds):
  return int(seconds / 60)

@register.filter
def convertSecsToMins(value):
  return int(value / 60)

@register.filter
def randomizeColor(value):
  return random.randint(1, value)

@register.filter
def setMoveHeight(value):
  minute = int(value / 60)
  if int(value / 60) * 20 <= 40:
    return 40
  if int(value / 60) * 20 >= 250:
    return 250
  return int(value / 60) * 15
