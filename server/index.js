const express = require('express');
const router = require('./routes/auth');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

const verifyToken = require('./routes/verifyToken')

app.use(express.json());
app.use(cors())

const dotenv = require("dotenv")

dotenv.config()

const authRoutes = router;

app.get('/', (req, res) => {
    res.send('Welcome to the Auth System')
})

app.use('/api/profile', verifyToken, (req, res) => {
    res.send({success: true, data: req.user})
})

app.use('/api/users', authRoutes)

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.l0zes.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(3000, () => {
        console.log('Server is running');
    }) 
}).catch((e) => {
    console.log(e)
})

