function secureRoute(req, res, next) {
  if (req.session.userId) {
    next();
  } else {
    console.log('User was unauthorised');
    res.redirect('/register');
  }
}


module.exports = secureRoute;
