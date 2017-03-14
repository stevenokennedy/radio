var redisHelper = require("../helpers/redis-helper.js")
  , stationsHelper = require("../helpers/stations-helper.js")
  , JSONPath = require("JSONPath");

/**
 * list - returns a list of the available radio station names wrapped in a
 * Promise
 *
 * @return {Promise} - exposing an array containing the list of radio stations
 */
exports.list = function() {
  return new Promise(async function(fulfill, reject) {
    let client = await redisHelper.getClient();
    try {
      let sortedList = await client.sortAsync("stationsList", "ALPHA");
      if(!sortedList || sortedList.length == 0) {
        console.log("Not Using redis cache");

        //Need to get the list of stations as we don't have it cached
        let stationList = await stationsHelper.callStationsAPI();

        //Extract the station names and use them as cache them as the station list
        let numCached = await addToStationListCache(stationList);
        console.log("Cached list of " + numCached + " stations");
        await addToStationCache(stationList);

        //Return the sorted list of stations
        console.log("Sorting output and returning");
        sortedList = await client.sortAsync("stationsList", "ALPHA");
        fulfill(sortedList);
      }
      else {
        //We have them cached so just return them
        console.log("Using redis cache, returning");
        fulfill(sortedList);
      }
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};


/**
 * get - returns details related to a particular radio station
 *
 * @param  {String} name - the name of the radio station we want
 * @return {Promise}
 */
exports.get = function(name) {
  return new Promise(async function(fulfill, reject){
    let client = await redisHelper.getClient();
    try {
      let detail = await client.getAsync("station:" + name);
      if(!detail) {
        console.log("Can't find station: " + name);
        reject("Can't find station: " + name);
      }
      else {
        console.log(detail);
        let detailsJson = JSON.parse(detail);
        fulfill(detailsJson);
      }
    }
    catch(error) {
      console.log(error);
      reject(error);
    }
  });
};

//---------------------------------------------
// PRIVATE FUNCTIONS
//---------------------------------------------

function addToStationListCache(stationList) {
  return new Promise(async function(fulfill, reject) {
    console.log("Adding station list to cache");
    let client = await redisHelper.getClient();

    var list = JSONPath({
      json: stationList,
      path: "$..name"
    });

    try {
      fulfill(await client.saddAsync("stationsList", ...list));
    }
    catch(err) {
      reject(err);
    }

  });
}

function addToStationCache(stationList) {
  return new Promise(async function(fulfill, reject) {
    console.log("Adding stations to cache");
    let client = await redisHelper.getClient();
    for(var i in stationList) {
      try {
        var stationJson = stationList[i];
        console.log("flattening and caching");
        await client.setAsync("station:" + stationJson.name, JSON.stringify(stationJson));
      } catch (err) {
        console.log("Error:" + err);
        reject(err);
      }
    }
    console.log("finished caching");
    fulfill();
  });
}
