const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String
});

//need to create user pages add following and a feed of who you follow

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
