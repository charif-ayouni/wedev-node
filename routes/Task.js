const express = require('express');
const router = express.Router();
const Task = require('../controllers/Task');
const withAuth = require ('../middleware');

//tasks router
router.post('/add', withAuth, Task.add);
router.put('/edit/:id', withAuth, Task.edit);
router.post('/list', withAuth, Task.list);
router.post('/order', withAuth, Task.setOrder);
router.get('/:id', withAuth, Task.findById);

module.exports = router;