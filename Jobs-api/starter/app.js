require('dotenv').config()
require('express-async-errors')

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimter = require('express-rate-limit')

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const authenticationMiddleware = require('./middlewares/authentication')

const express = require('express')
const app = express()
const errorHandlerMiddleware = require('./middlewares/error-handler')
const notFoundMiddleWare = require('./middlewares/not-found')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
const connectDB = require('./db/connect')

app.use(express.json())

app.use(rateLimter({
    windowMs: 15 * 60 * 1000, 
    limit: 100,
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.get('/', (req,res)=>{
    res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>')
})

app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument))

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticationMiddleware,jobsRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleWare)



const port = process.env.PORT || 3000

const start = async()=> {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start()