const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, deleteUser } = require('../service/auth');

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.render('register', { error: 'All fields are required.', user: req.user });
        }
        const user = await User.create({
            name, email, password
        });
        
        // Create session and set cookie on registration
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);
        
        return res.redirect('/product');
    } catch (err) {
        return res.render('register', { error: 'Registration failed. Email may already be in use.', user: req.user });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render('login', { error: 'Please enter both email and password.', user: req.user });
        }
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.render('login', { error: 'Invalid email or password.', user: req.user });
        }
        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uid', sessionId);
        return res.redirect('/product');
    } catch (err) {
        return res.render('login', { error: 'An error occurred during login.', user: req.user });
    }
}

async function logout(req, res) {
    const sessionId = req.cookies?.uid;
    if (sessionId) {
        deleteUser(sessionId);
        res.clearCookie('uid');
    }
    return res.redirect('/login');
}

module.exports = { createUser, login, logout };