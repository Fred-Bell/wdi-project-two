const mongoose = require('mongoose');


const photoSchema = mongoose.Schema({
  description: String,
  image: String,
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  comments: [
    {
      comment: String,
      addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
      //Will add likes and time posted?
    }
  ],
  likedBy: [
    { type: mongoose.Schema.ObjectId, ref: 'User' }
  ]
  // Will add likes and time/date(how old post is)
});

photoSchema.virtual('numberOfLikes')
  .get(function() {
    return this.likedBy.length;
  });

photoSchema.set('toJSON', {
  virtuals: true
});


const photoModel = mongoose.model('Photo', photoSchema);
module.exports = photoModel;
