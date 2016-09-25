var promise = new Promise(function(fulfill,reject){
  setTimeout(function(){
  reject(new Error('REJECTED!'));
  },300);
});

function onReject (error) {
     console.log(error.message);
}
// Your solution here
promise.then(null,onReject);
