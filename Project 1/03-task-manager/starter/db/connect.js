const mongoose = require('mongoose');

const connectDB = (url) =>{//this function returns a promise
    return mongoose.connect(url,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        })
}
module.exports = connectDB;
//  mongoose.connect(connectionString,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true,
//     })
//     .then(()=> console.log('Connected to DB...'))
//     .catch((err)=>console.log(err));

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
