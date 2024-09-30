const getAllStudents = 'SELECT * FROM STUDENTS'
const studentById = 'SELECT * FROM STUDENTS WHERE id = $1'
const checkEmailExists = 'SELECT * FROM STUDENTS WHERE EMAIL = $1'
const addStudent = 'INSERT INTO STUDENTS (first_name, second_name, email, dob, neptune_id) VALUES ($1, $2, $3, $4, $5) RETURNING *' // Return the newly created student
const deleteStudent = 'DELETE FROM STUDENTS WHERE email = $1 RETURNING *'
const updateStudent = 'UPDATE STUDENTS SET first_name = $1, second_name = $2, email = $3, dob = $4, neptune_id=$5 WHERE email = $3 RETURNING *'
module.exports = {
    getAllStudents,
    studentById,
    checkEmailExists,
    addStudent,
    deleteStudent,
    updateStudent
}