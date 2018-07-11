
const path = require('path');
const helper = require('./fsHelper');
const dirReader = require('./directoryReader');
const fileReader = require('./fileReader');

const filePath = path.resolve(process.argv[2]);

helper.isDirectory(filePath,(err, isDirectory)=>{
    if(isDirectory){
        dirReader.readDir(filePath);
    }
    else
        fileReader.readFile(filePath);
});

