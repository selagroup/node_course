const dirStats = require('./directoryStats');

const path = require('path');


const dirPath = path.resolve(path.resolve('../../'));

dirStats.stats(dirPath, (err,map) => {

    if(err){
        console.error(err);
        return;
    }

    console.log(map);

});
