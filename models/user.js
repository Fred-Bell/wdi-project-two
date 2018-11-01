const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  name: String,
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  admin: {type: Boolean, default: false},
  password: String,
  profilePicture: String,
  bio: String,
  following: [
    {
      username: String,
      _id: String
    }
  ],
  followers: Number
});

userSchema.virtual('addedPhotos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'addedBy'
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
