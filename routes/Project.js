const express = require('express');
const router = express.Router();
const Project = require('../controllers/Project');


router.get('/projects', Project.getProjects);
router.get('/user/:id_user/projects',Project.getProjectsByIdUser)
router.get('/costumer/:id_costumer/projects',Project.getProjectsByIdCostumer)
router.get('/projects/:id_project',Project.getProjectById)

router.post('/projects', Project.addProject);
router.put('/projects/:id_project', Project.updateProject);
router.delete('/projects/:id_project', Project.deleteProject);




module.exports = router;