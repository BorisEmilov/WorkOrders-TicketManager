const express = require('express');
const { check, validatornResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

router.post('/create-user', [
    check('email', 'Email is required').isEmail(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastname', 'Last Name is required').not().isEmpty(),
    check('password', 'Password is required').isLength({min: 4}),
], async (req, res) => {
    const errors = validatornResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ error: errors.array() });

    try {
        const {
            email,
            name,
            lastname,
            password,
            role,
        } = req.body;

        const newUser = new User({
            email,
            name,
            lastname,
            password,
            role
        });

        if(!newUser) return res.status(400).json({ msg: 'Error creating user' });

        await newUser.save();

        res.json(newUser);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
    }

});

