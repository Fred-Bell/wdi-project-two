const User = require('../models/user');

function homePageRoute (req, res){
  if (res.locals.isLoggedIn){
    User
      .find()
      .populate('addedPhotos')
      .then(users => {
        const followingUsers = [];
        users.forEach(function(user){
          for (let i = 0; i < res.locals.currentUser.following.length; i++){
            if((res.locals.currentUser.following[i]._id).toString() === (user._id).toString()){
              followingUsers.push(user);
            }
          }
        });
        console.log(followingUsers);
        const followingObject = {
          following: followingUsers
        };
        res.render('pages/home', followingObject);
      });
  } else {
    res.render('pages/home');
  }
}

function showProfileRoute (req, res){
  User
    .findById(req.params.id)
    .populate('addedPhotos')
    .then(result =>{
      res.render('users/profile', result);
    });
}

function editProfileRoute (req, res){
  User
    .findById(req.params.id)
    .then(result =>{
      res.render('users/edit', result);
    });
}

function updateProfileRoute (req, res){
  User
    .findByIdAndUpdate(req.params.id, req.body)
    .then(result =>
      res.redirect(`/profile/${result._id}`));
}

function followProfileRoute (req, res){
  User
    .findById(res.locals.currentUser.id)
    .then(result => {
      req.body._id = req.params.id;
      result.following.push(req.body);
      console.log(result.username + ' is now following ' + req.body.username);
      result.save()
        .then(User.findById(req.params.id)
          .then(user => {
            user.followers = user.followers + 1;
            user.save()
              .then( () => res.redirect(`/profile/${req.params.id}`));
          })
        );
    });
}

function unfollowProfileRoute(req, res) {
  User
    .findById(res.locals.currentUser.id)
    .then(result => {
      result.following.id(req.params.id).remove();
      result.save()
        .then(User.findById(req.params.id)
          .then(user => {
            user.followers = user.followers - 1;
            user.save()
              .then( () => res.redirect(`/profile/${req.params.id}`));
          })
        );
    });
}

module.exports = {
  homePage: homePageRoute,
  showProfile: showProfileRoute,
  editProfile: editProfileRoute,
  updateProfile: updateProfileRoute,
  followProfile: followProfileRoute,
  unfollowProfile: unfollowProfileRoute
};
