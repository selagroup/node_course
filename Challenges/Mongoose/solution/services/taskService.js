const mongoose = require('mongoose');
const col = require('../models/mongoose/taskSchema');

const MONGO_HOST  = process.env.NODE_ENV === 'production' ? 'mongodb' : 'localhost';
const db = mongoose.connect(`mongodb://${MONGO_HOST}:27017/tasks`);

const taskSchema = col.schema;
const TaskModel = col.model;

function get(){
    
    return TaskModel.find().exec();
}   

function getOne(id){
    return TaskModel.findById(id).exec();
}

function create(task){
    let taskModel = new TaskModel(task);
    return taskModel.save();
}

function update(id,task){

    return TaskModel.findByIdAndUpdate(id,task).exec();
}


function remove(id){
    return TaskModel.findByIdAndDelete(id).exec();
}   

module.exports ={ get, getOne, create, update, remove }



