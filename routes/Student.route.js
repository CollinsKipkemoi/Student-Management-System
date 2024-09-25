const router = require('express').Router();
const {test, getStudents, getStudentById, addStudents, deleteStudentByEmail, updateStudentById} = require('../controllers/student.controller');

router.get('/', test);
router.get('/students', getStudents);
router.post('/students', addStudents);
router.get('/students/:id', getStudentById);
router.delete('/students/', deleteStudentByEmail);
router.put('/students/:id', updateStudentById);


module.exports = router;