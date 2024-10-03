const router = require('express').Router();
const {test, getStudents, getStudentById, addStudents, deleteStudentByEmail, updateStudentById} = require('../controllers/student.controller');
const checkToken = require('../middlewares/VerifyToken');

router.get('/', checkToken, test);
router.get('/students', checkToken, getStudents);
router.post('/students', checkToken, addStudents);
router.get('/students/:id', checkToken, getStudentById);
router.delete('/students/', checkToken, deleteStudentByEmail);
router.put('/students/', checkToken, updateStudentById);


module.exports = router;