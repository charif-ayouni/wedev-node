const Project = require('../models/Project');
const User = require('../models/User')
const Costumer = require('../models/Customer')
const Sprint = require('../models/Sprint')

exports.getProjects = (req,res,next) =>{

        Project.find().populate({ path: 'costumer', select: ['firstname', 'lastname'] })
        .then(result =>{
            res.send(result)
        })
        .catch(err => err)
        
}
exports.getProjectsByIdUser = (req,res,next) =>{

        Project.find({user:req.params.id_user})
        .then(result =>{
            res.send(result)
        })
        .catch(err => err)
}
exports.getProjectsByIdCostumer = (req,res,next) =>{

        Project.find({costumer:req.params.id_costumer}).then(result =>{
            res.send(result)
        })
        .catch(err => err)
}
exports.getProjectById = (req,res,next) =>{

    Project.findById(req.params.id_project)
    .then(result =>{
        res.send(result)
    })
    .catch(err => err)
}
exports.addProject= async(req,res,next) =>{
   const projectData = {
       "title" : req.body.title,
       "amount" : req.body.amount,
       "deadlines_realization" : req.body.deadlines_realization,
       "start_date" : req.body.start_date,
       "end_date" : req.body.end_date,
       "Statut" : req.body.Statut,
       "Cost_day" : req.body.Cost_day,
       "stacks" : req.body.stacks,
       "costumer" : req.body.costumer,
       "user" :  req.body.user
   }
   Project.create(projectData)
   .then(result =>{
    id_project = result._id
    User.findByIdAndUpdate(req.body.user, { $push: { projects: id_project } }).catch(err => {console.log(err)})
    Costumer.findByIdAndUpdate(req.body.costumer, { $push: { projects: id_project } }).catch(err => {console.log(err)})
    res.send('projet ajoutée avec succées')
   })
   .catch(err => {
        res.send('projet NONNNN')
   })
}

exports.updateProject = (req,res,next) =>{

    Sprint.findOneAndUpdate({_id:req.params.id_sprint}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
        
}

exports.deleteProject = (req,res,next) =>{

    Project.findById(req.params.id_project).then(project =>{
        User.findOneAndUpdate({_id:project.user}, { $pull: { projects: project._id }}).catch(err => console.log(err));
        Costumer.findOneAndUpdate({_id:project.costumer}, { $pull: { projects: project._id }}).catch(err =>  console.log(err));
        Project.findOneAndDelete({_id:project._id}).catch(err =>  console.log(err));
        res.send("projet supprimée avec succès");

    })
    .catch(err => console.log(err));
}



