const User = require('../models/user');

function registerFormRoute (req, res) {
  res.render('auth/register');
}

function registerRoute (req, res) {
  User
    .create(req.body)
    //need to fix what happens when registering duplicate email/username
    .then(result => {
      console.log('user created', result);
      res.redirect('/login');
    });
}

function loginFormRoute(req, res) {
  res.render('auth/login');
}

function loginRoute (req, res) {
  console.log('User is logging in', req.body);
  User.findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        res.redirect('/register');
      } else {
        req.session.userId = result._id;
        res.redirect('/');
      }
    });
  // learn to validate the password!!!!
}

function logoutRoute(req, res) {
  req.session
    .regenerate(function() {
      res.redirect('/');
    });
}

module.exports = {
  registerForm: registerFormRoute,
  register: registerRoute,
  loginForm: loginFormRoute,
  login: loginRoute,
  logout: logoutRoute
};
