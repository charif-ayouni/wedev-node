const express = require('express');
const router = express.Router();
const Project = require('../controllers/Project');
const withAuth = require ('../middleware');

router.post('/add', withAuth, Project.add);
router.put('/edit/:id', withAuth,  Project.edit);
router.delete('/remove/:id', withAuth,  Project.remove);
router.get('/list', withAuth,  Project.list);
router.get('/:id', withAuth, Project.findById);
router.get('/filter/user', withAuth,Project.filterByIdUser);
router.get('/filter/customer/:id_costumer', withAuth, Project.filterByIdCustomer);
router.get('/filter/realized/:id_user', withAuth, Project.getNumberProjectsRealized);
router.get('/filter/inprogress/:id_user', withAuth, Project.getNumberProjectsInProgress);

module.exports = router;