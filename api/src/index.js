import redis from 'redis'
import connect from '../src/db'
import express from 'express'




/**
 * @initialize redis client
 */

let client = redis.createClient()
client.on('connect', () => {
    console.log(' Redis client connected')
})
client.on('error', (err) => {
    console.log(' Redis client  not connected')
})

// init express server and mongo server
const PORT = 8000
const app = express();

connect()
    .then(() => {
        console.log('MongoDB connected successfully')
        app.listen(PORT, () => {
            console.log(`Server is running on PORT:${PORT}`)
        })
    })
    .catch(e => console.error(e))