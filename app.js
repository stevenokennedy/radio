var express = require('express')
  , request = require("request")
  , JSONPath = require("JSONPath")
  , redisHelper = require("./helpers/redis-helper.js");

const app = express();
redisHelper.startServer().then(
  function(server) {
    redisHelper.getClient().then(function(client)
    {
      client.on("connect", function() {
        console.log("Redis connection established");
      })
    });
  },
  function(error) {
    console.log("Error!: " + error);
  });

app.use(express.static("public"));
app.use(require('./controllers'))

app.listen(8081, function()
{
  console.log("Listening on port 8081");
});
