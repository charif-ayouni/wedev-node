const express = require('express');
const router = express.Router();
const Sprint = require('../controllers/Sprint');

//sprints router
router.get('/sprints/:id_project',Sprint.getSprints);
router.post('/sprints/:id_project',Sprint.addSprint);
router.put('/sprints/:id_sprint',Sprint.updateSprint)
router.delete('/sprints/:id_sprint',Sprint.deleteSprint);

//tasks router
router.get('/tasks/:id_sprint',Sprint.getTasks);
router.post('/tasks/:id_sprint',Sprint.addTask);
router.put('/tasks/:id_task/:id_sprint',Sprint.updateTask)






module.exports = router;