var redisHelper = require("../helpers/redis-helper.js")
  , stationsHelper = require("../helpers/stations-helper.js")
  , JSONPath = require("JSONPath")
  , Promise = require("promise")
  , cleanDeep = require("clean-deep")
  , flatten = require("flat");

exports.list = function() {
  return new Promise(function(fulfill, reject) {
    redisHelper.getClient().then(function(client){
      client.sort("stationsList", "ALPHA", function(error, reply)
      {
        //TODO: Deal with error handling
        if(error) {
          console.log(error);
        }

        if(!reply || reply.length == 0) {
          console.log("Not Using redis cache")
          //Need to get the list of stations as we don't have it cached
          stationsHelper.callStationsAPI()
            .then(function(stationList) {
              //Extract the station names and use them as cache them as the station list
              addToStationListCache(stationList).then(function() {
                //addToStationCache(stationList);

                console.log("Sorting output and returning");
                //Return the sorted list of stations
                client.sortAsync("stationsList", "ALPHA").then(
                  function(error, reply) {
                    fulfill(reply);
                  }
                );
              });
            }
          );
        }
        else {
          //We have them cached so just return them
          console.log("Using redis cache, returning")
          fulfill(reply);
        }
      });
    });
  });
}

exports.get = function(name) {

}

function addToStationListCache(stationList) {
  return new Promise(function(fulfill, reject) {
    console.log("Adding station list to cache")
    redisHelper.getClient().then(function(client){
      var list = JSONPath({
        json: stationList,
        path: "$..name"
      });

      client.sadd.apply(client, ['stationsList'].concat(list));
      fulfill();
    });
  });
}

function addToStationCache(stationList) {
  return new Promise(function(fulfill, reject) {
    console.log("Adding stations to cache")
    redisHelper.getClient().then(function(client){
      for(var i in stationList) {
        try {
          var stationJson = stationList[i];
          console.log("flattening and caching");
          //console.log(flatten(cleanDeep(stationJson)));
          client.set("station:" + stationJson.name, JSON.stringify(stationJson));
        } catch (e) {
          console.log("Error:" + e)
        }
      }
      console.log("finished caching");
      fulfill();
    });
  });
}
