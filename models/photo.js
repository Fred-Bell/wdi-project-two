const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
  description: String,
  image: String,
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [
    {
      comment: String,
      addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
      username: String
      //Will add reply button, likes and time posted?
    }
  ]
  // Will add likes and time/date(how old post is)
});


const photoModel = mongoose.model('Photo', photoSchema);
module.exports = photoModel;
