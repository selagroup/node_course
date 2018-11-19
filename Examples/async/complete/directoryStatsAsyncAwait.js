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


function readDirectory(dirPath) {
    return new Promise( (resolve,reject) => {
        fs.readdir(dirPath, (err, files) => {
            if(err){
                reject(err);
                return;
            }
            resolve(files);
        })
    })
}

function fileStats(filePath){

    return new Promise( (resolve,reject) => {
        fs.stat(filePath, (err, stats) => {
            if(err){
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}


function handleFiles(files,dirPath) {

    return Promise.all( files.map( (file) => {
        const filePath = path.join(dirPath,file);
        return fileStats(filePath)
            .then(stats =>  ({path: filePath, stats}));
    }));

}

function handleStats(fileStats){

    const map  = new Map();
    map.set(DIRECTORY_KEY, new FilesStatsSummary ('directory'));

    fileStats.forEach( file => {
        let fileSum
        if(file.stats.isDirectory()){
            fileSum  =  map.get(DIRECTORY_KEY);
        }
        else {

            let extName = path.extname(file.path) || NOEXTENSION_KEY;
            if(map.has(extName)){
                fileSum = map.get(extName);
            }
            else{
                fileSum = new FilesStatsSummary(extName);
                map.set(extName, fileSum);
            }

        }
        fileSum.count +=1;
        fileSum.totalSize += file.stats.size;
    });

    return map;

}



async function stats(dirPath){

     const fileNames = await readDirectory(dirPath);
     const filesData = await handleFiles(fileNames,dirPath);

     return handleStats(filesData)


}

function _stats(dirPath, callback){
    const map  = new Map();
    map.set(DIRECTORY_KEY, new FilesStatsSummary ('directory'));
    fs.readdir(dirPath, (err, files) => {

        if(err){
            callback(err);
            return;
        }

        let filesCount = files.length;
        files.forEach((file)=>{
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

        });
    })
}

module.exports = {stats};