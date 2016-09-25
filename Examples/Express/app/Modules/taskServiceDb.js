var mongoose=require('mongoose');

var taskSchema = mongoose.Schema({
    title:String,
    completed:Boolean
});

var Task= mongoose.model("task",taskSchema);

mongoose.connect("mongodb://localhost:27017/taskslistdb");

module.exports.getTasks=function(){
    return Task.find();
}

module.exports.createTask=function(title,completed){
    var task = new Task({
        title:title,
        completed:completed
    })
    return task.save();
}

module.exports.setCompleted = function(taskId,isCompleted){
       return Task.findOneAndUpdate({"_id": taskId},{completed:isCompleted},{fields:'completed'}).exec();     
};