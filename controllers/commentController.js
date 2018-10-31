const Photo = require('../models/photo');

function createRoute (req, res){
  Photo
    .findById(req.params.photoId)
    .then(result => {
      result.comments.push(req.body);
      result.save()
        .then( () => res.redirect(`/photos/${req.params.photoId}`));
    });
}

function deleteRoute(req, res) {
  Photo.findById(req.params.photoId)
    .then(result => {
      result.comments.id(req.params.commentId).remove();
      result.save()
        .then(() => res.redirect(`/photos/${req.params.photoId}`));
    });
}

function feedCreateRoute (req, res){
  Photo
    .findById(req.params.photoId)
    .then(result => {
      result.comments.push(req.body);
      result.save()
        .then( () => res.redirect('/'));
    });
}

module.exports = {
  create: createRoute,
  delete: deleteRoute,
  feedCreate: feedCreateRoute
};
