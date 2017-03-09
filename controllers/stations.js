var express = require('express')
  , router = express.Router()
  , stationModel = require("../models/station.js")
  , stationsHelper = require("../helpers/stations-helper.js");

router.get("/", function get_station_list(req, res) {
  stationModel.list().then(function(stationList) {
    res.json(stationList);
  });

  router.get("/:1", function get_station_details(req, res) {

  });
});

module.exports = router
