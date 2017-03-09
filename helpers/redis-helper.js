var redis = require("redis")
  , redisServer = require("redis-server")
  , bluebird = require("bluebird");

  bluebird.promisifyAll(redis.RedisClient.prototype);
  bluebird.promisifyAll(redis.Multi.prototype);

var client = null;

exports.startServer = function() {
  console.log("Starting redis server");
  return new Promise(function(fulfill, reject) {
    const server = new redisServer({
      port: 6379,
      bin: 'C:\\redis\\redis-server.exe',
      conf: 'C:\\redis\\redis.windows.conf'
    });

    server.open(function(err) {
      if(err === null) {
        fulfill(server)
      }
      else {
        console.log(err);
        reject(err)
      }
    });
  })
}

exports.getClient = function() {
  return new Promise(function(fulfill, reject) {
    if(!client) {
        client = redis.createClient();
    }
    return fulfill(client);
  })

}
