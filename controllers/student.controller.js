const pool = require('../db')
const {getAllStudents, studentById, checkEmailExists, addStudent, deleteStudent} = require('../queries/Queries')

const test = (req, res) => {
    return res.json({
        message: 'Hello World'
    });
};

const getStudents = (req, res) => {
    pool.query(getAllStudents, (error, results) => {
        if (error) {
            throw error;
        }


        return res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        pool.query(studentById, [id], (error, results) => {
            if (error) {
                throw error;
            }
            return res.status(200).json(results.rows);
        });
    } catch (error) {
        return res.status(404).json({
            message: 'Student not found'
        });
    }

}

const addStudents = (req, res) => {
    const {first_name, second_name, email, dob} = req.body
    try {
        pool.query(checkEmailExists, [email], (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                return res.status(400).json({
                    message: 'Email already exists'
                });
            } else {
                pool.query(addStudent, [first_name, second_name, email, dob], (error, results) => {
                    if (error) {
                        throw error;
                    }
                    return res.status(201).json(results.rows);
                });
            }
        })
    } catch (error) {
        res.status(404).json({
            message: 'Cannot add student'
        });
    }
}

const deleteStudentByEmail = async (req, res) => {
    const { email } = req.body;
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
                message: 'Student not found'
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Cannot delete student',
            error: error.message
        });
    }
};

module.exports = {
    test,
    getStudents,
    getStudentById,
    addStudents,
    deleteStudentByEmail
}