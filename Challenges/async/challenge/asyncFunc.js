let id=0;
function RandomTimer(callback){
    
    id++
    let rand=(Math.random() * (5 - 1) + 1)*1000;
    setTimeout((id)=>{
        callback(id);
    },rand,id);
}


