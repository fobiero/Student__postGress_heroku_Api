const pool = require('../../db')
const queries = require('./queries')

const getStudents = (req, res) => {
    // console.log('getting students');
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // check if email exist 

    pool.query(queries.checkEmailExist, [email], (error, results) => {
        if (results.rows.length) {
            res.send('email already exist')
        }

        // add student to db 
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send('Student created successfully!');
        })
    })
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    // check student id if exists 
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFount = !results.rows.length;
        if (noStudentFount) {
            res.send('Student not Found');
        }
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Student Successfully! removed!');
        });
    });
};


const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    // check student if exist 
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send('Student not Found');
        }

        // update student if exists 
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Student sucessfuly updates!')
        });
    });

}
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
}