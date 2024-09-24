const router = require('express').Router();
const {test, getStudents, getStudentById} = require('../controllers/student.controller');

router.get('/', test);
router.get('/students', getStudents);
router.get('/students/:id', getStudentById);


module.exports = router;