require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middlewares/not-found')
const errorHandleMiddleware = require('./middlewares/error-handler')
const connectDB = require('./db/connect')
const mainRouter = require('./routes/main')

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1',mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()

