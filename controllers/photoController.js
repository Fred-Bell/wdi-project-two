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

module.exports = {
  index: indexRoute,
  show: showRoute,
  new: newRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
