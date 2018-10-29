const router = require('express').Router();
const photoController = require('../controllers/photoController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');
const secureRoute = require('../lib/secureRoute');

router.get('/', (req, res) =>{
  res.render('pages/home');
});

router.get('/about', (req, res) =>{
  res.render('pages/about');
});

router.get('/register', authController.registerForm);
router.post('/register', authController.register);

router.get('/login', authController.loginForm);
router.post('/login', authController.login);

router.get('/logout', authController.logout);


router.get('/photos', secureRoute, photoController.index);
router.get('/photos/new', secureRoute, photoController.new);
router.get('/photos/:id', secureRoute, photoController.show);
router.post('/photos', secureRoute, photoController.create);
router.get('/photos/:id/edit', secureRoute, photoController.edit);
router.put('/photos/:id', secureRoute, photoController.update);
router.delete('/photos/:id', secureRoute, photoController.delete);

router.post('/photos/:photoId/comments', secureRoute, commentController.create);
router.delete('/photos/:photoId/comments/:commentId', secureRoute, commentController.delete);

module.exports = router;
