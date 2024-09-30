require('../middlewares/LocalStrategy')
const router = require('express').Router();
const {success, failure} = require('../controllers/student.controller')
const passport = require('passport')

router.use(passport.initialize())
router.use(passport.session())

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure',
    failureFlash: true
}));

router.get('/success', success);
router.get('/failure', failure);

module.exports = router;