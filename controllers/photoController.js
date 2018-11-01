const Photo = require('../models/photo');

function indexRoute(req, res) {
  Photo
    .find()
    .then(result => {
      const photosObject = {
        photos: result
      };
      res.render('photos/index', photosObject);
    });
}

function showRoute(req, res) {
  Photo
    .findById(req.params.id)
    .populate('comments.addedBy addedBy')
    .then(result => {
      res.render('photos/show', result);
    });
}

function newRoute (req, res) {
  res.render('photos/new');
}

function createRoute (req, res){
  Photo
    .create(req.body)
    .then(result =>
      res.redirect(`/photos/${result._id}`));
}

function editRoute (req, res){
  Photo
    .findById(req.params.id)
    .then(result => {
      res.render('photos/edit', result);
    });
}

function updateRoute (req, res){
  Photo
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result =>
      res.redirect(`/photos/${result._id}`));
}

function deleteRoute (req, res){
  Photo
    .findByIdAndDelete(req.params.id)
    .then(res.redirect('/photos'));
}

function likeRoute (req, res){
  Photo
    .findById(req.params.id)
    .then(result => {
      result.likedBy.push(req.body.likedBy);
      result.save()
        .then(setTimeout(function(){
          res.redirect(`/photos/${req.params.id}`);
        }, 700 ));
    });
}

function unlikeRoute (req, res){
  Photo
    .findById(req.params.id)
    .then(result => {
      const index = result.likedBy.indexOf(res.locals.currentUser.id);
      result.likedBy.splice(index, 1);
      result.save()
        .then( () => res.redirect(`/photos/${req.params.id}`));
    });
}

function feedLikeRoute (req, res){
  Photo
    .findById(req.params.id)
    .then(result => {
      result.likedBy.push(req.body.likedBy);
      result.save()
        .then( () => res.redirect('/'));
    });
}

function feedUnlikeRoute (req, res){
  Photo
    .findById(req.params.id)
    .then(result => {
      const index = result.likedBy.indexOf(res.locals.currentUser.id);
      result.likedBy.splice(index, 1);
      result.save()
        .then( () => {
          res.redirect('/');
        });
    });
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  like: likeRoute,
  unlike: unlikeRoute,
  feedLike: feedLikeRoute,
  feedUnlike: feedUnlikeRoute
};
