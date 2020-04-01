const express = require('express');
const router = express.Router();
const Project = require('../controllers/Project');
const withAuth = require ('../middleware');

router.post('/add',withAuth, Project.add);
router.put('/edit/:id', Project.edit);
router.delete('/remove/:id', Project.remove);
router.get('/list', Project.list);
router.get('/:id',Project.findById);
router.get('/filter/user', withAuth,Project.filterByIdUser);
router.get('/filter/customer/:id_costumer',Project.filterByIdCostumer);
router.get('/filter/realized/:id_user',Project.getNumberProjectsRealized);
router.get('/filter/inprogress/:id_user',Project.getNumberProjectsInProgress);

module.exports = router;