const { createReadStream } = require('fs')

const stream = createReadStream('./content/big.txt')

stream.on('data', (text) => {
  console.log(text)
})
