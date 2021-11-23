const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Logged Successful`)
})

app.listen(port, () => console.log(`listenin on port ${port}`));