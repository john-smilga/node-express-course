const crypto = require('crypto');

const hashString = (string) =>
  crypto.createHash('md5').update(string).digest('hex');

module.exports = hashString;
