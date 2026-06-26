const router = require('express').Router();
router.post('/', (req, res) => res.json({ message: 'Create job API planned' }));
router.get('/', (req, res) => res.json({ message: 'Get jobs API planned' }));
router.get('/:jobId', (req, res) => res.json({ message: 'Get single job API planned' }));
router.put('/:jobId', (req, res) => res.json({ message: 'Update job API planned' }));
router.delete('/:jobId', (req, res) => res.json({ message: 'Delete job API planned' }));
module.exports = router;
