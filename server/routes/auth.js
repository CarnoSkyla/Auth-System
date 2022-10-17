const express = require('express');

const {check, validationResult} = require('express-validator')

const bcrypt = require('bcryptjs')

const router = express.Router();

const User = require('../models/user')

const validate = [
    check('fullName').isLength({min: 2})
    .withMessage('Your fullName is required'),
    check('email').isEmail()
    .withMessage('Please provide your valid email'),
    check('password').isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
]

const loginValidation = [
    check('email').isEmail()
    .withMessage('Please provide your valid email'),
    check('password').isLength({min: 6})
    .withMessage('Password must be at least 6 characters')
]

router.post('/register', validate, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const userExist = await User.findOne({email: req.body.email})

    if(userExist) return res.status(400).send('Email already exist');

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashPassword
    })

    try {
        const savedUser = await user.save();
        res.send({
            id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email
        });
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', loginValidation, async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    //check if email exist

    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send('User not registered')
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(404).send('Invalid email or password')
    }
    res.send('Logged In')
})

module.exports = router;