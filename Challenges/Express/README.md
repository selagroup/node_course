# Express Challenge

In this challenge you will build a simple Express based restful api for a ToDo application.

1. create a new express app using the express generator (make sure you have it installed:
``` bash
$ npm install express-generator -g
$ express [project_name]
```
2. If you would like to use postman for your testing api calls you can import the collection [here](https://www.getpostman.com/collections/62bef247fc82211e8f6c)

3. your api should have 5 endpoints:
    1. GET /tasks           - get all tasks
    2. GET /tasks/[id]      - get a task by id
    3. POST /tasks          - create new task
    4. PUT /tasks/[id]      - update a task
    5. DELETE /tasks/[id]   - delete a task

4. The task model should be as follows:
``` javascript
class Task {
    constructor(title='', completed=false) {
        this.id =0;
        this.title = title;
        this.completed=completed;
    }
  }
```
5. For now the data would be saved in-memory, you can use the following service class for data fetching:
``` javascript
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

``` 
6. you should implement proper error handling and data validation (using the express-validator middleware) for the appropriate end points.
