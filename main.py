#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import json
import webapp2
import datetime
import httplib, urllib
from google.appengine.ext.webapp import template

import config


template.register_template_library('common.filters')


def get_user_profile():
  params = urllib.urlencode({'access_token': config.Chen_ACCESS_TOKEN})
  url = "api.moves-app.com/api/1.1/user/profile?%s" % (params)
  conn = httplib.HTTPSConnection(url)
  conn.request("GET", "", "")
  response = conn.getresponse()
  user_info = response.read()
  return json.loads(user_info)


def get_places(first_date, last_date=''):
  params = urllib.urlencode({'access_token': config.Chen_ACCESS_TOKEN})
  if last_date == '':
    url = "api.moves-app.com/api/1.1/user/places/daily/%s?%s" % (first_date, params)
  else:
    url = "api.moves-app.com/api/1.1/user/places/daily?from=%s&to=%s&%s" % (first_date, last_date, params)

  conn = httplib.HTTPSConnection(url)
  conn.request("GET", "", "")
  response = conn.getresponse()
  data = json.loads(response.read())
  places = data[0]["segments"]
  locations_json = json.dumps(places)
  return locations_json


def get_storyline(first_date, last_date=''):
  params = urllib.urlencode({'access_token': config.Chen_ACCESS_TOKEN})
  if last_date == '':
    url = "api.moves-app.com/api/1.1/user/storyline/daily/%s?%s" % (first_date, params)
  else:
    url = "api.moves-app.com/api/1.1/user/storyline/daily?from=%s&to=%s&%s" % (first_date, last_date, params)

  conn = httplib.HTTPSConnection(url)
  conn.request("GET", "", "")
  response = conn.getresponse()
  data = json.loads(response.read())
  storyline = data[0]["segments"]
  return storyline


class RequestHandle(webapp2.RequestHandler):
  def post(self):
    first = self.request.get("first")
    last = self.request.get("last")
    locations = get_places(first, last)
    self.response.headers.add_header('content-type', 'application/json', charset='utf-8')
    self.response.out.write(locations)


class IndexHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('index.html',{}))


class RainbowRainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('rainhole.html',{}))


class DotImageHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('dot_image.html',{}))


class DJHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('dj.html',{}))


class MoveHanlder(webapp2.RequestHandler):
    def get(self):
        utc_now = datetime.datetime.now()
        pst_now = utc_now - datetime.timedelta(hours=7)
        today_str = pst_now.strftime('%Y-%m-%d')
        locations = get_places(today_str)
        user_info = get_user_profile()
        first_date = user_info['profile']['firstDate']
        self.response.out.write(template.render('move_index.html',{'locations': locations, 'first_date': first_date}))


class MoveStorylineHanlder(webapp2.RequestHandler):
  def get(self):
    specfied_date = self.request.get("date")
    specfied_date = specfied_date.strip()
    today = False
    yesterday = False

    utc_now = datetime.datetime.now()
    est_now = utc_now - datetime.timedelta(hours=7)
    date_str = est_now.strftime('%Y-%m-%d')

    if specfied_date == '':
      today = True
    else:
      date_str = specfied_date
      # see if specified date is yesterday
      d = datetime.datetime.strptime(specfied_date, '%Y-%m-%d')
      delta = est_now - d
      if delta.days == 0:
        today = True
      if delta.days == 1:
        yesterday = True

    storyline = get_storyline(date_str)
    user_info = get_user_profile()

    first_date = user_info['profile']['firstDate']
    self.response.out.write(template.render('move_storyline.html',{'today': today, 'yesterday': yesterday, 'date_str': date_str, 'storyline': storyline, 'first_date': first_date, 'color_option': 10}))


class MoveAboutHanlder(webapp2.RequestHandler):
  def get(self):
    self.response.out.write(template.render('move_about.html',{}))


class ShortestPathSolverHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('shortest_path_solver.html',{}))


class MemoryCardHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('memory_card.html',{}))


class SudokuHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('sudoku.html',{}))


class NonogramHandler(webapp2.RequestHandler):
    def get(self):
        self.response.out.write(template.render('nonogram.html',{}))


app = webapp2.WSGIApplication([
    ('/', IndexHandler),
    ('/dj', DJHandler),
    ('/dotimage', DotImageHandler),
    ('/rainbowrain', RainbowRainHandler),
    ('/move', MoveHanlder),
    ('/move/about', MoveAboutHanlder),
    ('/move/storyline', MoveStorylineHanlder),
    ('/move/requestHandle', RequestHandle),
    ('/shortest-path-solver', ShortestPathSolverHandler),
    ('/memory-cards', MemoryCardHandler),
    ('/sudoku', SudokuHandler),
    ('/nonogram', NonogramHandler),
], debug=True)
