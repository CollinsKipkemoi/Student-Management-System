const passport = require('../middlewares/LocalStrategy')
const router = require('express').Router();
const {authenticateAdmin} = require('../controllers/student.controller')

router.post('/login',  authenticateAdmin)



module.exports = router;