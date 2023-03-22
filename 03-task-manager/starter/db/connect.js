const mangoose = require('mongoose')

const connectionString = 'mongodb+srv://CasanadraTaskManager:9TYb8fHaEbMgkde83rT4@nodeexpressprojects.kqcqziw.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority'


const conecteDB = (url) => {
   return mangoose
    .connect(connectionString, {
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useFindAndModify: false, 
        useUnifiedTopology: true,
    })
}

module.exports = conecteDB

// .then(() => console.log('conected the db...'))
// .catch((err) => console.log(err))