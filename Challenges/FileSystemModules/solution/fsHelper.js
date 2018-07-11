const fs = require('fs');
function isDirectory(filePath,cb){
    fs.stat(filePath,function(err,stats){
        if(err){
            return cb(err);
        }
        cb(null,stats.isDirectory());
    });
}

module.exports ={ isDirectory };
