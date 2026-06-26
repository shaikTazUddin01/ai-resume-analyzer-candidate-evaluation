const router = require('express').Router();
router.post('/register', (req, res) => res.json({ message: 'Register API planned' }));
router.post('/login', (req, res) => res.json({ message: 'Login API planned' }));
router.get('/profile', (req, res) => res.json({ message: 'Profile API planned' }));
router.post('/logout', (req, res) => res.json({ message: 'Logout API planned' }));
module.exports = router;
