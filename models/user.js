const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  password: String,
  profilePicture: String,
  bio: String
});

userSchema.virtual('addedPhotos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'addedBy'
});

//need to create user pages add following and a feed of who you follow

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
