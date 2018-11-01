const router = require('express').Router();
const photoController = require('../controllers/photoController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');
const secureRoute = require('../lib/secureRoute');

router.get('/', userController.homePage);

router.get('/about', (req, res) =>{
  res.render('pages/about');
});

router.get('/register', authController.registerForm);
router.get('/invalidregistration', authController.invalidReg);
router.post('/register', authController.register);

router.get('/login', authController.loginForm);
router.get('/invalidlogin', authController.invalidLogin);
router.get('/invalidpassword', authController.invalidPass);
router.post('/login', authController.login);

router.get('/logout', authController.logout);


router.get('/photos', secureRoute, photoController.index);
router.get('/photos/new', secureRoute, photoController.new);
router.get('/photos/:id', secureRoute, photoController.show);
router.post('/photos', secureRoute, photoController.create);
router.get('/photos/:id/edit', secureRoute, photoController.edit);
router.put('/photos/:id', secureRoute, photoController.update);
router.delete('/photos/:id', secureRoute, photoController.delete);

router.post('/photos/:id/likes', secureRoute, photoController.like);
router.post('/photos/:id/unlike', secureRoute, photoController.unlike);

router.post('/photos/:photoId/comments', secureRoute, commentController.create);
router.delete('/photos/:photoId/comments/:commentId', secureRoute, commentController.delete);
router.post('/feed/:photoId/comments', secureRoute, commentController.feedCreate);

router.get('/profile/:id', secureRoute, userController.showProfile);
router.get('/profile/:id/edit', secureRoute, userController.editProfile);
router.put('/profile/:id', secureRoute, userController.updateProfile);
router.post('/profile/:id/follow', secureRoute, userController.followProfile);
router.post('/profile/:id/unfollow', secureRoute, userController.unfollowProfile);

module.exports = router;
