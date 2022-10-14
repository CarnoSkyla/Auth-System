const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to the Auth System')
})

app.listen(3000, () => {
    console.log('Server is running');
})