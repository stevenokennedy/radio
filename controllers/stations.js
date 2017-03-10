var express = require("express")
  , router = express.Router()
  , stationModel = require("../models/station.js");

router.get("/", async function get_station_list(req, res) {
  let stationList = await stationModel.list();
  res.json(stationList);
});

router.get("/:1", function get_station_details(req, res) {
});

module.exports = router;
