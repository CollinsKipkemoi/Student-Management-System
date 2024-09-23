const router = require('express').Router();
const {test} = require('../controllers/student.controller');

router.get('/', test);


module.exports = router;