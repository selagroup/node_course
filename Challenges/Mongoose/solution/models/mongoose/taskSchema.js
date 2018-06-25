const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title:String,
    completed:Boolean
});

const model = mongoose.model('Task',schema);

module.exports = { schema, model};

