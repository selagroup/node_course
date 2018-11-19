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

function stats(dirPath, callback){
    const map  = new Map();
    map.set(DIRECTORY_KEY, new FilesStatsSummary ('directory'));
    fs.readdir(dirPath, (err, files) => {

        if(err){
            callback(err);
            return;
        }

        let filesCount = files.length;
        if(files.forEach((file)=>{
            const filePath = path.join(dirPath,file);
            fs.stat(filePath, (err,stats)=>{
                if(err){
                    callback(err);
                    return;
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
                    callback(null,map);
                }
            })

        }));
    })
}

module.exports = {stats};