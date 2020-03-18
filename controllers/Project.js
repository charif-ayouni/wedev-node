const Project = require('../models/Project');
const User = require('../models/User')
const Costumer = require('../models/Customer')
const Sprint = require('../models/Sprint')

exports.getProjects = (req,res,next) =>{

        Project.find().populate({ path: 'costumer', select: ['firstname', 'lastname'] }).exec((err,result)=>{
            if(err)  res.status(400).json({'success' : false, 'error': err})
            res.status(200).json({'success' : true, 'data': result})
        })
        
}
exports.getProjectsByIdUser = (req,res,next) =>{

        Project.find({user:req.params.id_user},(err,result)=>{
            if(err)  res.status(400).json({'success' : false, 'error': err})
            res.status(200).json({'success' : true, 'data': result})
        })
        
}
exports.getProjectsByIdCostumer = (req,res,next) =>{

        Project.find({costumer:req.params.id_costumer},(err,result)=>{
            if(err)  res.status(400).json({'success' : false, 'error': err})
            res.status(200).json({'success' : true, 'data': result})
        })
}
exports.getProjectById = (req,res,next) =>{

    Project.findById(req.params.id_project,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
}
exports.addProject= async(req,res,next) =>{
   const projectData = {
       "title" : req.body.title,
       "amount" : req.body.amount,
       "deadlines_realization" : req.body.deadlines_realization,
       "start_date" : req.body.start_date,
       "end_date" : req.body.end_date,
       "statut" : req.body.statut,
       "cost_day" : req.body.cost_day,
       "stacks" : req.body.stacks,
       "costumer" : req.body.costumer,
       "user" :  req.body.user
   }
   Project.create(projectData,(err,result) => {
    if (err) return res.status(400).json({'success' : false, 'error': err})
    id_project = result._id
    User.findByIdAndUpdate(req.body.user, { $push: { projects: id_project } },(err,result)=>{
        Costumer.findByIdAndUpdate(req.body.costumer, { $push: { projects: id_project } },(err,result)=>{
            res.status(200).json({'success' : true, 'message': 'Succesfully saved'})
        })
    })
})
}

exports.updateProject = (req,res,next) =>{

    Sprint.findOneAndUpdate({_id:req.params.id_sprint}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Succesfully updated'})
    });
        
}

exports.deleteProject = async (req,res,next) =>{

    Project.findById(req.params.id_project,(err,project) => {
    if(err)return res.status(400).json({'success' : false, 'message': 'Failed ! project not fount'})
    User.findOneAndUpdate({_id:project.user}, { $pull: { projects: project._id }},(err,result)=>{
        Costumer.findOneAndUpdate({_id:project.costumer}, { $pull: { projects: project._id }},(err,result)=>{
            Project.findOneAndDelete({_id:project._id},(err,result)=>{
                if(err)return res.status(400).json({'success' : false, 'message': 'Failed to delete !'})
                res.status(200).json({'success' : true, 'message': 'Succesfully deleted'})
            })
           })
      })
})
}

exports.getNumberProjectsInProgress = (req,res,next) => {
    
    Project.countDocuments({ statut:"in progress",user:req.params.id_user},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
          
}

exports.getNumberProjectsRealized = (req,res,next) => {
    
    Project.countDocuments({ statut:"realized"},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
           
}
