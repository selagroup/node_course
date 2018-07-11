const fs = require('fs');

function readFile(filePath){
    const stream = fs.createReadStream(filePath,'utf8');
    stream.pipe(process.stdout);
}

module.exports = {readFile};