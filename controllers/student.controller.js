const pool = require('../db')
const jwt = require('jsonwebtoken')
const {getAllStudents, studentById, checkEmailExists, addStudent, deleteStudent, updateStudent} = require('../queries/Queries')

const test = (req, res) => {
        const token = req.token;
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err) => {
                if (err) {
                    return res.status(403).json({
                        message: 'Forbidden',
                        error: err.message
                    });
                } else {
                    return res.status(200).json({
                        message: 'Test route working!',
                    });
                }
            });
        } catch (e) {
            return res.status(500).json({
                message: 'Cannot verify token',
                error: e.message
            });
        }
    }
;

const getStudents = async (req, res) => {
    const token = req.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if (err) {
                return res.status(403).json({
                    message: 'Forbidden',
                    error: err.message
                });
            } else {
                const results = await pool.query(getAllStudents);
                return res.status(200).json(results.rows);
            }
        })
    } catch (e) {
        return res.status(404).json({
            message: 'Cannot retrieve students',
            error: e.message
        });
    }
}

const getStudentById = async (req, res) => {
    const token = req.token;
    const id = parseInt(req.params.id);
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if (err) {
                return res.status(403).json({
                    message: 'Forbidden',
                    error: err.message
                });
            } else {
                const results = await pool.query(studentById, [id]);
                return res.status(200).json(results.rows);
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot retrieve student',
            error: error.message
        });
    }
};
const addStudents = async (req, res) => {
    const {first_name, second_name, email, dob, neptune_id} = req.body
    const  token = req.token;
    try {
        jwt.verify(token, process.env.JWT_SECRET, async (err) => {
            if(err){
                return res.status(403).json({
                    message: 'Forbidden',
                    error: err.message
                });
            } else{
                const results = await pool.query(checkEmailExists, [email])
                if (results.rows.length > 0) {
                    return res.status(400).json({
                        message: 'Email already exists'
                    });
                } else {
                    const results2 = await pool.query(addStudent, [first_name, second_name, email, dob, neptune_id]);
                    return res.status(201).json({
                        message: 'Student added successfully',
                        student: results2.rows
                    });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Cannot add student'
        });
    }
}

const deleteStudentByEmail = async (req, res) => {
    const {email} = req.body;
    try {
        const emailCheckResult = await pool.query(checkEmailExists, [email]);
        if (emailCheckResult.rows.length > 0) {
            const deleteResult = await pool.query(deleteStudent, [email]);
            return res.status(200).json({
                message: 'Student deleted successfully',
                student: deleteResult.rows
            });
        } else {
            return res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot delete student',
            error: error.message
        });
    }
};


const updateStudentByEmail = async (req, res) => {
    const {first_name, second_name, email, dob, neptune_id} = req.body;
    try {
        const results = await pool.query(checkEmailExists, [email]);
        console.log(results.rows);
        if (results.rows.length > 0) {
            const updateResult = await pool.query(updateStudent, [first_name, second_name, email, dob, neptune_id]);
            return res.status(200).json({
                message: 'Student updated successfully',
                student: updateResult.rows
            });
        } else {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot update student',
            error: error.message
        });
    }
}

const success = (req, res) => {
    const user = req.user;
    try {
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return res.status(200).json({
            message: 'Authentication successful',
            token
        });
    } catch
        (e) {
        return res.status(500).json({
            message: 'Cannot generate token',
            error: e.message
        });
    }

}

const failure = (req, res) => {
    const msg = req.flash('error')[0];
    return res.status(401).json({
        message: 'Authentication failed',
        error: msg
    });
}


module.exports = {
    test,
    getStudents,
    getStudentById,
    addStudents,
    deleteStudentByEmail,
    updateStudentById: updateStudentByEmail,
    success,
    failure
}