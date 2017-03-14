var stationModel = require("../models/station.js");

var stream = function() {
  return async function(req, res, next) {
    console.log("Called Stream middleware");
    try {
      let stationDetail = await stationModel.get(req.params["name"]);
      if(!stationDetail) {
        throw new Error("Can't find station: " + req.params["name"]);
      }

      //TODO: Currently just looking at the first stream in every case
      for(var stream of stationDetail.streams) {
        await processStream(stream.stream, res);
        break;
      }
    }
    catch(error) {
      res.status(400);
      res.json(error.message);
    }
    finally {
      next();
    }
  };
};

var processStream = function(url, res) {
  return new Promise((fulfill, reject) => {
    const lib = url.startsWith("https") ? require("https") : require("http");
    const request = lib.get(url, (response) => {
      // handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error("Failed to load page, status code: " + response.statusCode));
        return;
      }
      for(let h in response.headers) {
        console.log(h + ": " + response.headers[h]);
      }
      res.setHeader("content-type", response.headers["content-type"]);
      res.setHeader("icy-name", response.headers["icy-name"]);
      res.setHeader("icy-pub", response.headers["icy-pub"]);
      if(response.headers["ice-audio-info"]) {
        res.setHeader("ice-audio-info", response.headers["ice-audio-info"]);
      }
      response.on("data", (chunk) => res.write(chunk));
      response.on("end", () => fulfill());
    });
    // handle connection errors of the request
    request.on("error", (err) => reject(err));
  });
};


module.exports = stream;
