var prms = new Promise(function(resolve,reject){
  resolve('PROMISE VALUE');
});

prms.then(console.log);
console.log('MAIN PROGRAM');
