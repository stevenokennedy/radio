var express = require("express")
  , router = express.Router();

router.use("/stations", require("./stations"));

router.get("/", function(req, res) {
});

module.exports = router;
