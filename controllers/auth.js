const userModel = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { validationResult } = require("express-validator");

async function signUpUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password, password_confirmation } = req.body;

        if (password !== password_confirmation) {
            return res.status(400).send('Passwords do not match');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: 'user',
        });

        await user.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}

async function logInUser(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid email or password');
        }

        const payload = { userId: user._id, email: user.email, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            user: payload,
            token: token
        });

    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
}
module.exports = {
    signUpUser,
    logInUser
};
