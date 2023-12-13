const { createReadStream } = require("fs");

const stream = createReadStream("./content/big.txt");

stream.on("data", (result) => {
  console.log(result);
});
