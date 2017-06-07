const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const colors = require('colors');

var start = Date.now();

console.log('start reading files');

let file = path.join(__dirname,process.argv[2]);
let zipFileName = path.basename(file,path.extname(file))+'.gz';
console.log(zipFileName);



// let strm1 = fs.createReadStream(file)
// let zipStream = zlib.createGzip();
// let zipFileStream = fs.createWriteStream(zipFileName);

// strm1
//     .on('data',(buffer)=>{
//         zipStream.write(buffer);
//     })
//     .on('end',()=>{
//         zipStream.end();
//     });

// zipStream.on('data',(buffer)=>{
//     zipFileStream.write(buffer);
// })
// .on('end',()=>{
//     zipFileStream.end();
// });

//piped version
fs.createReadStream(file)
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream(zipFileName))
    .on('finish', () => console.log(`File  successfully compressed`));


