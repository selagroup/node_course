const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');
class FilesStatsSummary {


    constructor(type){
        this.fileType = type;
        this.count = 0;
        this.totalSize = 0;
    }

}

const DIRECTORY_KEY  = 'directories';
const NOEXTENSION_KEY  = 'unknown';


class DirectoryStats extends EventEmitter{

    constructor(dirPath){
        super();
        process.nextTick(() => this.getStats(dirPath) )
    }

    async getStats(dirPath){
        this.emit('started',dirPath);

        try {

            const dirFiles = await readDirectory(dirPath);
            const filesData = await this.handleFiles(dirFiles,dirPath);

            this.emit('end',handleStats(filesData));

        }
        catch(error){
            this.emit('error',error);
        }


    }

    handleFiles(files,dirPath) {

        return Promise.all( files.map( (file) => {
            const filePath = path.join(dirPath,file);
            return fileStats(filePath)
                .then(stats =>  {
                    let stat = {path: filePath, stats};
                    this.emit('file',stat);
                    return stat;
                });
        }));

    }

}



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

module.exports = DirectoryStats;