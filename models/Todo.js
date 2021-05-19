const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    name: String,
    state: Number
})

module.exports = mongoose.model('Todo', TodoSchema);