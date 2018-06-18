const dirStats = require('./directoryStats');
const dirStatsPromise = require('./directoryStatsPromise');
const dirStatsPromiseAll = require('./directoryStatsPromiseAll');
const dirStatsAsyncAwait = require('./directoryStatsAsyncAwait');
const DirectoryStats = require('./directoryStatsEmitter');

const path = require('path');


const dirPath = path.resolve(path.resolve('../../'));

// dirStats.stats(dirPath, (err,map) => {
//
//     if(err){
//         console.error(err);
//         return;
//     }
//
//     console.log(map);
//
// });
//
// dirStatsPromise.stats(dirPath)
//     .then(console.log)
//     .catch( (err) => console.error(err));
//
// dirStatsPromiseAll.stats(dirPath)
//     .then(console.log)
//     .catch(console.error);
//
// (async function () {
//
//     try{
//         console.log(await dirStatsAsyncAwait.stats(dirPath));
//     }
//     catch(err){
//         console.error(err);
//     }
//
// }());

const directoryStats = new DirectoryStats(dirPath);

directoryStats.on('started',()=>console.log('started reading directory'));
directoryStats.on('file',console.log );
directoryStats.on('end',console.log);