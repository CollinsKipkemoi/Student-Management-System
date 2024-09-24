const pool = require('../db')
const { getAllStudents, studentById} = require('../queries/Queries')

const test = (req, res) => {
    res.json({
        message: 'Hello World'
    });
};

const getStudents = (req, res) => {
    pool.query(getAllStudents,  (error, results) => {
        if (error) {
            throw error;
        }
        console.log(`results: ${results.rows}`)


        res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    try {
        pool.query(studentById, [id], (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    } catch (error) {
        res.status(404).json({
            message: 'Student not found'
        });
    }

}


module.exports = {
    test,
    getStudents,
    getStudentById
}