const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    label: String,
    state: Number,
    owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
})

module.exports = mongoose.model('Todo', TodoSchema);