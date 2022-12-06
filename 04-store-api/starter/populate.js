<<<<<<< HEAD
require('dotenv').config()


const connectDB = require('./db/connect')
const Product = require('./models/product')
const jsonProducts = require('./products.json')

const start=async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProducts)

        
      console.log('db connected')
      process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
 
    }
}

start() 
=======
require('dotenv').config();

const connectDB = require('./db/connect')
const Product = require('./models/Product')
const jsonProducts = require('./products.json')

const start =async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('succeed')
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1);
    }
}

start()
>>>>>>> 903c21e04f1f41b763ed6ae3f3235ce0a2b9a628
