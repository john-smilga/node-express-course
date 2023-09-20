const mongoose = require('mongoose')
require('dotenv').config()

async function connect(){
    mongoose.connect(process.env.MONGO_URI).then(() => console.log("Mongodb connected")).catch((error) => {
        console.log(error)
      })

}


module.exports = connect