const { getUser } = require('../service/auth');

// Middleware to attach req.user if cookie is present
function checkAuth(req, res, next) {
    const uid = req.cookies?.uid;
    const user = uid ? getUser(uid) : null;
    req.user = user;
    next();
}

// Middleware to protect routes: only logged-in users can proceed
function requireAuth(req, res, next) {
    const uid = req.cookies?.uid;
    if (!uid) return res.redirect('/login');
    
    const user = getUser(uid);
    if (!user) return res.redirect('/login');
    
    req.user = user;
    next();
}

module.exports = { checkAuth, requireAuth };