// get back the class
// if want custom extend from class
// otherwise just for emitting and handling events create instance
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// on and emit methods
// keep track of the order

customEmitter.on('response', () => {
  console.log('data recieved')
})

customEmitter.emit('response')
