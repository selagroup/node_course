const fs = require('fs');
const Path = require('path');
function readDir(dirPath){
    fs.readdir(dirPath,function(err,files){
        if(err){
            console.log('An Error has occured');
            return;
        }
    
        files.forEach(function(file){
            var path = Path.join(process.argv[2],file);
            console.log(path);
        })
    
    });    
}

module.exports =  {readDir};