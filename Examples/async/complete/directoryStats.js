const fs = require('fs');
const path = require('path');

class FilesStatsSummary {


    constructor(type){
        this.fileType = type;
        this.count = 0;
        this.totalSize = 0;
    }

}

const DIRECTORY_KEY  = 'directories';
const NOEXTENSION_KEY  = 'unknown';

function readDirectory(dirPath, cb){
    fs.readdir(dirPath, cb);
}
function fileStats(filePath, cb){
    fs.stat(filePath,cb);
}


function handleFiles(files, dirPath, cb){
    const map  = new Map();
    map.set(DIRECTORY_KEY, new FilesStatsSummary ('directory'));

    let filesCount = files.length;
    files.forEach((file)=> {
        const filePath = path.join(dirPath,file);
        fileStats(filePath, (err, stats) => {
            if(err){
                return cb(err);
            }
            
            let fileSum
            if(stats.isDirectory()){
                fileSum  =  map.get(DIRECTORY_KEY);
            }
            else {
                let extName = path.extname(filePath) || NOEXTENSION_KEY;
                if(map.has(extName)){
                    fileSum = map.get(extName);
                }
                else{
                    fileSum = new FilesStatsSummary(extName);
                    map.set(extName, fileSum);
                }

            }
            fileSum.count +=1;
            fileSum.totalSize += stats.size;
            filesCount -= 1;
            if(!(filesCount)){
                cb(null,map);
            }
        })
    });

}

function stats(dirPath, callback){

    readDirectory(dirPath, (err, files) => {
        if(err){
            return callback(err);
        }

        handleFiles(files, dirPath, (err,map) => callback(err, map));
    })
}

module.exports = {stats};