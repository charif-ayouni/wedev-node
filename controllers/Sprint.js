let Sprint = require('../models/Sprint');
let Project = require('../models/Project')


exports.getSprints = (req,res,next) => {
    Sprint.find({project:req.params.id_project}).exec(function(err,sprints){
        if(err){res.send(err)}
        res.send(sprints)
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
     Project.findById(req.params.id_project).exec(function(err,project){
        if(err){res.send(err)}
         Sprint.create(sprintData,function(err,reslt){
            if(err){res.send(err)}
            Project.findByIdAndUpdate(req.params.id_project, { $push: { sprints: reslt._id } },function(err,reslt){
                res.send(reslt)
            })

         })
    });
}

exports.updateSprint = (req,res,next) => {
    
    Sprint.findOneAndUpdate({_id:req.params.id_sprint}, req.body, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
}

exports.deleteSprint =async (req,res,next) =>{

    Sprint.findById(req.params.id_sprint).then(sprint =>{

        Project.findOneAndUpdate({_id:sprint.project}, { $pull: { sprints: sprint._id }}).catch(err => console.log(err));
        Sprint.findOneAndDelete({_id:sprint._id}).catch(err =>  console.log(err));
        res.send("sprint supprimée avec succès");

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
        if(err){res.send(err)} 
        res.send(result)
    })
   
}

exports.getTasks = (req,res,next) => {

    Sprint.findById(req.params.id_sprint,'tasks', function (err, tasks) {
        if (err) {res.send(err) }
        res.send(tasks);
    })
}
//not fixed
exports.updateTask = (req,res,next) => {

    Sprint.findOneAndUpdate({_id:req.params.id_sprint},{tasks}, function(err, sprint) {
        if (err) return res.send(500, {error: err});
       res.send(sprint)
    });
}