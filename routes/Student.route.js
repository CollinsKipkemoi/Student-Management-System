const router = require('express').Router();
const {test, getStudents, getStudentById, addStudents, deleteStudentByEmail, updateStudentById} = require('../controllers/student.controller');
const checkToken = require('../middlewares/VerifyToken');

router.get('/', checkToken, test);
router.get('/students', checkToken, getStudents);
router.post('/students', checkToken, addStudents);
router.get('/students/:id', checkToken,  getStudentById);
router.delete('/students/', deleteStudentByEmail);
router.put('/students/', updateStudentById);


module.exports = router;