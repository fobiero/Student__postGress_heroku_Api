const pool = require('../../db')

const getStudents = (req, res) => {
    // console.log('getting students');
    pool.query("SELECT * FROM students", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getStudents,
}