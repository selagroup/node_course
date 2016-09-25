'use strict';

class Task{
    constructor(title,completed){
        this.title=title;
        this.completed=completed;
    }
}

var Tasks=[
    new Task('Take out trash',true),
    new Task('learn Express',false),
    new Task('Do Homework',false)
]

module.exports.getTasks=function(){
    return Tasks;
}

module.exports.createTask=function(title,completed){
    Tasks.push(new Task(title,completed))
}

module.exports.setCompleted=function(title,completed){
	Tasks.forEach(function(element, index){
		if(title===element.title){
			element.completed=completed;
		}
	});
}