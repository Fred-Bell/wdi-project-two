const User = require('../models/user');

function registerFormRoute (req, res) {
  res.render('auth/register');
}

function invalidRegistrationRoute (req, res){
  res.render('auth/invalidReg');
}

function registerRoute (req, res) {
  User
    .create(req.body)
    .then(result => {
      console.log('user created', result);
      res.redirect('/login');
    })
    .catch( res.redirect('/invalidregistration'));
}

function loginFormRoute (req, res) {
  res.render('auth/login');
}

function invalidLoginRoute (req, res){
  res.render('auth/invalidLogin');
}

function invalidPasswordRoute (req, res){
  res.render('auth/invalidPassword');
}

function loginRoute (req, res) {
  console.log('User is logging in', req.body);
  User.findOne({ email: req.body.email })
    .then(result => {
      if (!result) {
        res.redirect('/invalidlogin');
      } else if (req.body.password !== result.password) {
        res.redirect('/invalidpassword');
      } else {
        req.session.userId = result._id;
        res.redirect('/');
      }
    });
}

function logoutRoute(req, res) {
  req.session
    .regenerate(function() {
      res.redirect('/');
    });
}

module.exports = {
  registerForm: registerFormRoute,
  invalidReg: invalidRegistrationRoute,
  register: registerRoute,
  loginForm: loginFormRoute,
  invalidLogin: invalidLoginRoute,
  invalidPass: invalidPasswordRoute,
  login: loginRoute,
  logout: logoutRoute
};
