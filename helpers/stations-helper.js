var request = require("request")
  , Promise = require("promise")
  , app_id = require("./app-key-helper.js");

const base_url = "http://api.dirble.com/v2/countries/IE/stations?token=" + app_id;

exports.callStationsAPI = function() {
  return new Promise(function(fulfill, reject) {
    determineTotalPages(base_url).then(function(totalPages) {
      Promise.all(createPaginatedCalls(base_url, totalPages).map(callStationApi))
        .done(function(results) {
          console.log("all done");
          fulfill([].concat.apply([], results));
        }
      );
    });
  });
};

function determineTotalPages(base_url) {
  return new Promise(function (fulfill, reject) {
    request({url: base_url, method: "HEAD"},
      function(error, resp, body) {
        if(error) {
          reject(error);
        }
        fulfill(resp.headers["x-total-pages"]);
      }
    );
  });
}

function createPaginatedCalls(base_url, totalPages) {
  var listUrls = [];
  for(var i = 1; i <= totalPages; i++) {
    listUrls.push(base_url + "&page="+i);
  }
  return listUrls;
}

function callStationApi(url) {
  return new Promise(function(fulfill, reject) {
    request.get(url,
      function (error, resp, body) {
        if(error || (resp && resp.statusCode != 200)) {
          console.log("Error!: " + error + " " + resp.statusCode);
          reject(error);
          //TODO: Error handling on bad request
        }
        else {
          var list = JSON.parse(body);
          fulfill(list);
        }
      }
    );
  });
}
