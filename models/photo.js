const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
  description: String,
  image: String,
  comments: [
    {
      comment: String,
      username: String
      //Will add reply button, likes and time posted?
    }
  ]
  // Will likes and time/date(how old post is)
});


const photoModel = mongoose.model('Photo', photoSchema);
module.exports = photoModel;
