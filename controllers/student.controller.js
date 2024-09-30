const pool = require('../db')
const {getAllStudents, studentById, checkEmailExists, addStudent, deleteStudent, updateStudent} = require('../queries/Queries')

const test = (req, res) => {
    return res.json({
        message: 'Hello World'
    });
};

const getStudents = async (req, res) => {
    try {
        const results = await pool.query(getAllStudents);
        return res.status(200).json(results.rows);
    } catch (e) {
        return res.status(404).json({
            message: 'Cannot retrieve students',
            error: e.message
        });
    }
}

const getStudentById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(studentById, [id]);
        if (results.rows.length > 0) {
            return res.status(200).json(results.rows);
        } else {
            return res.status(404).json({
                message: 'Student not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot retrieve student',
            error: error.message
        });
    }
};
const addStudents = async (req, res) => {
    const {first_name, second_name, email, dob, neptune_id} = req.body
    try {
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
    return res.json({
        message: 'Successfully authenticated'
    });
}

const failure = (req, res) => {
    return res.json({
        message: 'Failed to authenticate'
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