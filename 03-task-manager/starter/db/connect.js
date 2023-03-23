const mangoose = require('mongoose')




const conecteDB = (url) => {
   return mangoose
    .connect(url, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false, 
        useUnifiedTopology: true,
    })
}

module.exports = conecteDB

// .then(() => console.log('conected the db...'))
// .catch((err) => console.log(err))