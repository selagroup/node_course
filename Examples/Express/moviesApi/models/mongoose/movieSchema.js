const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:String,
    year:Number,
    poster:String
});

const model = mongoose.model('Movie',schema);

module.exports = { schema, model};

