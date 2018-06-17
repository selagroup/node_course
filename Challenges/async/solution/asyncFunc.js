
module.exports.parallel = (promises) =>{
    return Promise.all(promises)
}

async function seriesAsync(funcs){

    let result=[];
    for(i=0; i<funcs.length; i++){
        result.push(await funcs[i]());
    };
    return result;
}

function series(funcs) {

    return funcs.reduce( (promise,func) => {

        return promise.then( all => func().then( res => all.concat(res)));

    },Promise.resolve([]));

}

let id=0;
function RandomTimer(){
    
    id++
    let rand=(Math.random() * (5 - 1) + 1)*1000;
    console.log(rand);
    return new Promise((resolve,reject)=>{
        setTimeout((id)=>{
            console.log(id);
            resolve(id);            
        },rand,id);
    });
}


series([
    RandomTimer,
    RandomTimer,
    RandomTimer
]).then((result)=>{
    console.log(result);
})
