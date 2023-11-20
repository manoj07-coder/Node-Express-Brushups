require('dotenv').config()
require('express-async-errors')

const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const notFoundMiddleware = require('./middlewares/not-found')
const errorHandleMiddleware = require('./middlewares/error-handler')
const productRouter = require('./routes/products')

// middleware
app.use(express.json())

// routes
app.get('/',(req,res)=>{
    res.send(`<h1>Store API</h1><a href='/api/v1/products'>Product route</a>`)
})

// products routes
app.use('/api/v1/products',productRouter)


app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()

