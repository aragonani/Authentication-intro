const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    return res.redirect('/product');
});

router.get('/register', (req, res) => {
    return res.render('register', { error: null, user: req.user });
});

router.get('/login', (req, res) => {
    return res.render('login', { error: null, user: req.user });
});

module.exports = router;