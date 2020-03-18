const express = require('express');
const router = express.Router();
const Project = require('../controllers/Project');


router.get('/projects', Project.getProjects);
router.get('/projects/:id_project',Project.getProjectById)
router.get('/projects/:id_user/users',Project.getProjectsByIdUser)
router.get('/projects/:id_costumer/customers',Project.getProjectsByIdCostumer)
router.get('/nbrproject/realized/:id_user',Project.getNumberProjectsRealized)
router.get('/nbrprojects/inprogress/:id_user',Project.getNumberProjectsInProgress)

router.post('/projects', Project.addProject);
router.put('/projects/:id_project', Project.updateProject);
router.delete('/projects/:id_project', Project.deleteProject);




module.exports = router;