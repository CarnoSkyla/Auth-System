const express = require('express');
const router = require('./routes/auth');
const mongoose = require('mongoose')

const app = express();

const verifyToken = require('./routes/verifyToken')

app.use(express.json());

const authRoutes = router;

app.get('/', (req, res) => {
    res.send('Welcome to the Auth System')
})

app.use('/api/profile', verifyToken, (req, res) => {
    res.send('This is the profile')
})

app.use('/api/users', authRoutes)

mongoose.connect(`mongodb+srv://sibu_auth:carnoskylalabi@cluster0.l0zes.mongodb.net/auth_system?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running');
    }) 
}).catch((e) => {
    console.log(e)
})

