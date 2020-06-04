import redis from 'redis'

let client = redis.createClient()


client.on('connect', () => {
    console.log(' Redis client connected')
})

client.on('error', (err) => {
    console.log(' Redis client  not connected')
})