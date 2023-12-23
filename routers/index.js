const router = require('express').Router();
const auth = require('../middleware/auth');
// GET methods
router.get('/', auth, require('../controllers/userController').Profile);

router.get('/register', require('../controllers/authController').register_page);

router.get('/login', require('../controllers/authController').login_page);


// POST methods Authentication
router.post('/register',require('../controllers/authController').register);

router.post('/login',require('../controllers/authController').login);

router.post('/log-out',require('../controllers/authController').logOut);



// post methods under profile(/) page
router.post('/shorten', auth, require('../controllers/userController').create_short_url);

router.get('/:url', auth, require('../controllers/userController').show_short_url);
module.exports = router;