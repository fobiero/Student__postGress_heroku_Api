const express = require('express')
const studentRoutes = require('./src/student/routes')
const app = express()
const port = 3000;

// middlewares 
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Logged Successful`)
})

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => console.log(`listenin on port ${port}`));