const router = require('express').Router();
router.post('/upload', (req, res) => res.json({ message: 'Resume upload API planned' }));
router.get('/', (req, res) => res.json({ message: 'Get resumes API planned' }));
router.get('/job/:jobId', (req, res) => res.json({ message: 'Get resumes by job API planned' }));
router.delete('/:resumeId', (req, res) => res.json({ message: 'Delete resume API planned' }));
module.exports = router;
