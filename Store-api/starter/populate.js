require('dotenv').config()

const connectDB = require('./db/connect')
const products = require('./models/products')
const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await products.deleteMany()
        await products.create(jsonProducts)
        console.log('Success!!!')
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(0)
    }
}

start()