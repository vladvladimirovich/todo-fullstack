const mongoose = require('mongoose');
const { getTodos } = require('../helpers/todoHelpers');

const UserSchema = mongoose.Schema({
    username: String,
    password: String
    //owner_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    
})

module.exports = mongoose.model('User', UserSchema);