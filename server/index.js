const express = require('express');
const router = require('./routes/auth');

const app = express();

const authRoutes = router;

app.get('/', (req, res) => {
    res.send('Welcome to the Auth System')
})

app.use('/api/users', authRoutes)

app.listen(3000, () => {
    console.log('Server is running');
}) 