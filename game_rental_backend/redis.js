const redis = require('redis');

const redisClient = redis.createClient({
    host: "myredis",
    port: "6379"
    // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
    console.log("Redis connected!")
});

function checkCache (id) {
    if(redisClient.exists == 1) 
        return redisClient.get(id);
}

module.exports = {
    checkCache,
}