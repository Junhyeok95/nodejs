const fs = require('fs');

const readStream = fs.createReadStream('./readme.txt');
const writeStream = fs.createWriteStream('./pipe.txt');
readStream.pipe(writeStream);