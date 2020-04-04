const express = require('express');
const router = express.Router();
const Sprint = require('../controllers/Sprint');
const withAuth = require ('../middleware');

//sprints router
router.post('/add', withAuth, Sprint.add);
router.put('/edit/:id', withAuth, Sprint.edit);
router.delete('/remove/:id', withAuth, Sprint.remove);
router.post('/list', withAuth, Sprint.list);
router.get('/:id', withAuth, Sprint.findById);

module.exports = router;