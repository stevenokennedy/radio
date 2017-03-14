var express = require("express")
  , router = express.Router()
  , stream = require("../middlewares/stream.js")
  , stationModel = require("../models/station.js");

router.get("/", async function get_station_list(req, res) {
  let stationList = await stationModel.list();
  res.json(stationList);
});

router.get("/:name", async function get_station_details(req, res) {
  let detail = await stationModel.get(req.params["name"]);
  res.json(detail);
});

router.use("/:name/stream", stream());

module.exports = router;
