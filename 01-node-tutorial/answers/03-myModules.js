// Modules
// Node uses CommonJs, in node every file is module (by default)

// require() allows whatever is inside module.exports{} to be accessed from the current file or app.
// I can also use destructure:
// const {Greg, John} = require('./04-myNames')
const names = require('./04-myNames')
const sayHi = require('./05-myUtils')
const data = require('./06-myAltFlav')

// require() can also be used to invoke a function from another file/module in node. 
require('./07-myMindG')

sayHi('susan')

// Here dot notation is used to access the values from the module.exports{} object.
sayHi(names.Greg)
sayHi(names.John)