const mongoose = require('mongoose');

//définition de schéma
const userSchema = new mongoose.Schema({
    name: {
    type : String,
    required : true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    age: {
    type : Number,
    min: 18,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
