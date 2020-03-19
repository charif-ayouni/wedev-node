let Sprint = require('../models/Sprint');
let Project = require('../models/Project')


exports.getSprints = (req,res,next) => {
    Sprint.find({project:req.params.id_project},(err,result) => {
        if(err){
            res.status(400).json({'success' : false, 'error': err})
        }
        res.status(200).json({'success' : true, 'data': result})
    })
}

exports.getSprint = (req,res,next) => {
    Sprint.findById(req.params.id_sprint,(err,result) => {
        if(err){
            res.status(400).json({'success' : false, 'error': err})
        }
        res.status(200).json({'success' : true, 'data': result})
    })
}

exports.addSprint = async(req,res,next) =>{
    let sprintData = {
        "title" : req.body.title,
        "start_date" : req.body.start_date,
        "end_date" : req.body.end_date,
        "statut" : req.body.statut,
        "project" : req.params.id_project
    }
    
    Project.findById(req.params.id_project,(err,project) => {
        if(project){
            Sprint.create(sprintData,function(err,reslt){
                if(err){
                   return res.status(400).json({'success' : false, message: 'Sprint was not created'})
                }
                Project.findByIdAndUpdate(req.params.id_project, { $push: { sprints: reslt._id } },function(err,reslt){
                    res.status(200).json({'success' : true, message:'Sprint was Created successfully' })
                })   
             })
        }
      else{
        return res.status(400).json({'success' : false, message: 'project not fount'})
      }
    })
}

exports.updateSprint = (req,res,next) => {
    
    Sprint.findOneAndUpdate({_id:req.params.id_sprint}, req.body,(err, doc) => {
        if (err) return res.status(400).json({'success' : false, message: 'failed to update'});
        res.status(200).json({'success' : true, message:'Sprint was updated successfully' })
    });
}

exports.deleteSprint =async (req,res,next) =>{

    Sprint.findById(req.params.id_sprint ,(err,sprint) => {
     if(err) return res.status(400).json({'success' : false, message: 'failed to delete'});
     Project.findOneAndUpdate({_id:sprint.project}, { $pull: { sprints: sprint._id }},(err,result) => {
        Sprint.findOneAndDelete({_id:sprint._id},(err,result) => {
            res.status(200).json({'success' : true, message:'Sprint was delted successfully' })
         })
     })
     
    })
}   

// TASKS FUNCTIONS

exports.addTask = (req,res,next) =>{
    let taskData = {
        "title" : req.body.title,
        "description" : req.body.description,
        "statut" : req.body.statut,
        "time_realization" : req.body.time_realization
    }
    Sprint.findByIdAndUpdate(req.params.id_sprint,{$push:{tasks:taskData}},function(err,result){
        if(err) return res.status(400).json({'success' : false, message: 'failed ! Sprint not found'});
        res.status(200).json({'success' : true, message: 'Task was created successfully'});
    })
}

exports.getTasks = (req,res,next) => {

    Sprint.findById(req.params.id_sprint,'tasks', function (err, tasks) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, data: tasks});
    })
}

//not fixed
exports.updateTask = (req,res,next) => {

   let taskData = req.body; 
   let id_sprint = req.params.id_sprint
   let id_task = req.params.id_task
    Sprint.findOneAndUpdate({_id:req.params.id_sprint},{ $set: { 'tasks.$':  { taskData} } }, function(err, sprint) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, message: 'Task was updated successfully'});
    });
}
//fixed
exports.deleteTask = (req,res,next) => {

    Sprint.findOneAndUpdate({_id:req.params.id_sprint},{ $pull: { tasks:  { _id: req.params.id_task} } }, function(err, sprint) {
        if(err) return res.status(400).json({'success' : false, message: 'failed !'});
        res.status(200).json({'success' : true, message: 'Task was deleted successfully'});
    });
}