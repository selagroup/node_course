const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const colors = require('colors');

var start = Date.now();

console.log('start reading files');

let file = path.join(__dirname,process.argv[2]);
let zipFileName = path.basename(file,path.extname(file))+'.gz';
console.log(zipFileName);


