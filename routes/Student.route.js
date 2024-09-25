const router = require('express').Router();
const {test, getStudents, getStudentById, addStudents, deleteStudentByEmail} = require('../controllers/student.controller');

router.get('/', test);
router.get('/students', getStudents);
router.post('/students', addStudents);
router.get('/students/:id', getStudentById);
router.delete('/students/', deleteStudentByEmail);


module.exports = router;