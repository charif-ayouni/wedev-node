let Sprint = require('../models/Sprint');
let Project = require('../models/Project');

const add = async(req,res) =>{

    let body = {
        "title" : req.body.title,
        "start_date" : new Date(req.body.start_date),
        "end_date" : new Date(req.body.end_date),
        "status" : req.body.status,
        "project" : req.body.project,
        "tasks" : req.body.tasks
    };

    Project.findById(req.body.project,(err,project) => {
        if( project ) {
            Sprint.create(body,(err,sprint) => {

                if(err){
                    console.log(err);
                    return res.status(500).json({'error' : 'Sprint was not created'})
                }

                project.sprints.push(sprint._id);
                project.save();

                res.status(200).json({'success' : 'Your sprint has been successfully created' })

            })
        } else {
            return res.status(500).json({'error' : 'project not found'})
        }
    }).catch(error => {
        return res.status(500).json({'error' : error})
    })
};
const edit = (req,res,next) => {
    Sprint.findOneAndUpdate({_id:req.params.id}, req.body,(err, doc) => {
        if (err) return res.status(400).json({'success' : false, message: 'failed to update'});
        res.status(200).json({'success' : true, message:'Sprint was updated successfully' })
    });
};
const remove =async (req,res,next) =>{
    Sprint.findById(req.params.id,(err,sprint) => {
        if(err) return res.status(400).json({'success' : false, message: 'failed to delete'});
        Project.findOneAndUpdate({_id:sprint.project}, { $pull: { sprints: sprint._id }},(err,result) => {
            Sprint.findOneAndDelete({_id:sprint._id},(err,result) => {
                res.status(200).json({'success' : true, message:'Sprint was deleted successfully' })
            })
        })

    })
};
const findOneById = (req,res,next) => {
    Sprint.findById(req.params.id,(err,result) => {
        if(err){
            res.status(400).json({'success' : false, 'error': err})
        }
        res.status(200).json({'success' : true, 'data': result})
    })
};

const list = (req,res) =>{
    Sprint.find({ 'project': req.body.project_id }).populate('project').exec((err,sprints)=>{
        if(err){
            res.status(400).json({'success' : false, 'error': err});
        }
        res.status(200).json(sprints)
    })
};

const filterByProjectId = (req,res,next) => {
    Sprint.find({project:req.params.id_project},(err,result) => {
        if(err){
            res.status(400).json({'success' : false, 'error': err})
        }
        res.status(200).json({'success' : true, 'data': result})
    })
};

// TASKS FUNCTIONS
const addTask = (req,res,next) =>{
    let taskData = {
        "title" : req.body.title,
        "description" : req.body.description,
        "statut" : req.body.statut,
        "time_realization" : req.body.time_realization
    };
    Sprint.findByIdAndUpdate(req.params.id_sprint,{$push:{tasks:taskData}},function(err,result){
        if(err) return res.status(400).json({'success' : false, message: 'failed ! Sprint not found'});
        res.status(200).json({'success' : true, message: 'Task was created successfully'});
    })
};
const getTasks = (req,res,next) => {

    Sprint.findById(req.params.id_sprint,'tasks', function (err, tasks) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, data: tasks});
    })
};

//not fixed
const updateTask = (req,res,next) => {

   let taskData = req.body; 
   let id_sprint = req.params.id_sprint;
   let id_task = req.params.id_task;
    Sprint.findOneAndUpdate({_id:req.params.id_sprint},{ $set: { 'tasks.$':  { taskData} } }, function(err, sprint) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, message: 'Task was updated successfully'});
    });
};

//fixed
const deleteTask = (req,res,next) => {

    Sprint.findOneAndUpdate({_id:req.params.id_sprint},{ $pull: { tasks:  { _id: req.params.id_task} } }, function(err, sprint) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, message: 'Task was deleted successfully'});
    });
};

module.exports = {
    add,
    edit,
    remove,
    list,
    findOneById,
    filterByProjectId,
    addTask,
    getTasks,
    updateTask,
    deleteTask
};
