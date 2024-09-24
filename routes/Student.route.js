const router = require('express').Router();
const {test, getStudents, getStudentById, addStudents} = require('../controllers/student.controller');

router.get('/', test);
router.get('/students', getStudents);
router.post('/students', addStudents);
router.get('/students/:id', getStudentById);


module.exports = router;