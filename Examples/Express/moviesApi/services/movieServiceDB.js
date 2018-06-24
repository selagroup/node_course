const mongoose = require('mongoose');
const col = require('../models/mongoose/movieSchema')

const db = mongoose.connect('mongodb://localhost:27017/movies');

const movieSchema = col.schema;
const MovieModel = col.model;


const byId = (id) => (movie) => movie.id === id; 

function get(page=1, pageSize=10){
    
    return MovieModel.find()
        .skip((page-1)*pageSize)
        .limit(pageSize).exec();
}   

function getOne(id){
    return MovieModel.findById(id).exec();
}

function create(movie){
    let movieModel = new MovieModel(movie)
    return movieModel.save();
}

function update(id,movie){
    return MovieModel.findByIdAndUpdate(id,movie).exec();
}


function remove(id){
    return MovieModel.findByIdAndDelete(id).exec();
}   

module.exports ={ get, getOne, create, update, remove }



