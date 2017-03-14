var express = require("express")
  , redisHelper = require("./helpers/redis-helper.js");

const app = express();
async function start() {
  await redisHelper.startServer();
  try {
    let client = await redisHelper.getClient();
    client.on("connect", function() {
      console.log("Redis connection established");
    });
  } catch (error) {
    console.log("Error!: " + error);
  }
}
start();

app.use(express.static("client"));
app.use(require("./controllers"));

app.listen(8081, function()
{
  console.log("Listening on port 8081");
});
