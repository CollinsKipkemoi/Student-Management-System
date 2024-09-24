const getAllStudents = 'SELECT * FROM STUDENTS'
const studentById = 'SELECT * FROM STUDENTS WHERE id = $1'
const checkEmailExists = 'SELECT * FROM STUDENTS WHERE EMAIL = $1'
const addStudent = 'INSERT INTO STUDENTS (first_name, second_name, email, dob) VALUES ($1, $2, $3, $4) RETURNING *' // Return the newly created student

module.exports = {
    getAllStudents,
    studentById,
    checkEmailExists,
    addStudent
}