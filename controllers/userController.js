const User = require('../models/user');


function showProfileRoute (req, res){
  User
    .findById(req.params.id)
    .populate('addedPhotos')
    .then(result =>{
      console.log(result._id + ' is the id of profile page ' + res.locals.currentUser.id + ' is the id of current user');
      res.render('users/profile', result);
    });
}

function followProfileRoute (req, res){
  User
    .findById(res.locals.currentUser.id)
    .then(result => {
      req.body.id = req.params.id;
      result.following.push(req.body);
      console.log(result.username + ' is now following ' + req.body.username);
      result.save()
        .then( () => res.redirect(`/profile/${req.params.id}`));
    });
}

module.exports = {
  showProfile: showProfileRoute,
  followProfile: followProfileRoute
};
