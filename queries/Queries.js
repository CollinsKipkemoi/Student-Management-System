const getAllStudents = 'SELECT * FROM STUDENTS'
const studentById = 'SELECT * FROM STUDENTS WHERE id = $1'

module.exports = {
    getAllStudents,
    studentById
}