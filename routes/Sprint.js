const express = require('express');
const router = express.Router();
const Sprint = require('../controllers/Sprint');

//sprints router
router.post('/add',Sprint.add);
router.put('/edit/:id',Sprint.edit);
router.delete('/remove/:id_sprint',Sprint.remove);
router.post('/list', Sprint.list);
router.get('/:id',Sprint.findOneById);
router.get('/sprints/:id_project',Sprint.filterByProjectId);



//tasks router
router.get('/tasks/:id_sprint',Sprint.getTasks);

router.post('/tasks/:id_sprint',Sprint.addTask);
router.put('/tasks/:id_task/:id_sprint',Sprint.updateTask);
router.delete('/tasks/:id_task/:id_sprint',Sprint.deleteTask);

module.exports = router;