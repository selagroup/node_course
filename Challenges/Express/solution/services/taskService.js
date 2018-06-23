const tasks = [
    { id:1, title:'learn node', completed: false},
    { id:2, title:'learn express', completed: false}
]

const byId = (id) => (task) => task.id === id; 

function get(){
    
    return Promise.resolve(tasks);
}   

function getOne(id){
    let task = tasks.find(byId(id));
    return task ? Promise.resolve(task) : Promise.reject();
}

function create(task){
    task.id = Math.ceil(Math.random() * 100);
    tasks.push();

    return Promise.resolve(task);
}

function update(id,task){

    let inx  = tasks.findIndex(byId(id));
    if(inx > -1){
        
        tasks[inx] = Object.assign({},tasks[inx],task);
        return Promise.resolve(tasks[inx]);
    }

    Promise.reject();
}


function remove(id){
    let inx  = tasks.findIndex(byId(id));
    if(inx > -1){
        tasks.splice(inx,1);
        return  Promise.resolve(true);
    }

    return Promise.resolve(false);

}   

module.exports ={ get, getOne, create, update, remove }



