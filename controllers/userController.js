const User = require('../models/user');


function showProfileRoute (req, res){
  User
    .findById(req.params.id)
    .populate('addedPhotos')
    .then(result =>{
      res.render('users/profile', result);
    });
}

function followProfileRoute (req, res){
  User
    .findById(res.locals.currentUser.id)
    .then(result => {
      req.body._id = req.params.id;
      result.following.push(req.body);
      console.log(result.username + ' is now following ' + req.body.username);
      result.save()
        .then( () => res.redirect(`/profile/${req.params.id}`));
    });
}

function unfollowProfileRoute(req, res) {
  User
    .findById(res.locals.currentUser.id)
    .then(result => {
      result.following.id(req.params.id).remove();
      result.save()
        .then(() => res.redirect(`/profile/${req.params.id}`));
    });
}

module.exports = {
  showProfile: showProfileRoute,
  followProfile: followProfileRoute,
  unfollowProfile: unfollowProfileRoute
};
