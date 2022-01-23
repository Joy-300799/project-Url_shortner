const redis = require("redis");

//Connect to redis
const redisClient = redis.createClient(
    14040,
    "redis-14040.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true }
);
redisClient.auth("2tmMudjaWwiAvxVW9pXj2Xq0U20LTPRx", function(err) {
    if (err) throw err;
});

redisClient.on("connect", async function() {
    console.log("Connected to Redis..");
});
module.exports.redisClient = redisClient;