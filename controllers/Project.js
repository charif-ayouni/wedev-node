const Project = require('../models/Project');
const User = require('../models/User');
const Costumer = require('../models/Customer');
//const Sprint = require('../models/Sprint')

const add= async(req,res,next) =>{
    const projectData = {
        "title" : req.body.title,
        "amount" : req.body.amount,
        "deadlines_realization" : req.body.deadlines_realization,
        "start_date" : req.body.start_date,
        "end_date" : req.body.end_date,
        "statut" : req.body.statut,
        "cost_day" : req.body.cost_day,
        "stacks" : req.body.stacks,
        "customer" : req.body.customer,
        "user" :  req.id
    }
    console.log(projectData)
    Project.create(projectData,(err,result) => {
        if (err) return res.status(400).json({'success' : false, 'error': err})
        id_project = result._id
        User.findByIdAndUpdate(req.body.user, { $push: { projects: id_project } },(err,result)=>{
            Costumer.findByIdAndUpdate(req.body.customer, { $push: { projects: id_project } },(err,result)=>{
                res.status(200).json({'success' : true, 'message': 'Succesfully saved'})
            })
        })
    })
}
const edit = (req,res,next) =>{

    Project.findOneAndUpdate({_id:req.params.id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Succesfully updated'})
    });

}
const remove = async (req,res,next) =>{

    Project.findById(req.params.id,(err,project) => {
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
const list = (req,res,next) =>{
    Project.find().populate({ path: 'costumer', select: ['firstname', 'lastname'] }).exec((err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
};
const findById = (req,res,next) =>{
    Project.findById(req.params.id).populate({ path: 'customer', select: ['firstname', 'lastname'] }).exec((err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
}
const filterByIdUser = (req,res) =>{
     
        Project.find({user:req.id},(err,result)=>{
           
            if(err)  res.status(400).json({'success' : false, 'error': err})
            res.status(200).json({'success' : true, 'data': result})
        })
        
}
const filterByIdCostumer = (req,res,next) =>{

        Project.find({costumer:req.params.id_costumer},(err,result)=>{
            if(err)  res.status(400).json({'success' : false, 'error': err})
            res.status(200).json({'success' : true, 'data': result})
        })
}
const getNumberProjectsInProgress = (req,res,next) => {
    
    Project.countDocuments({ statut:"in progress",user:req.params.id_user},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
          
}
const getNumberProjectsRealized = (req,res,next) => {
    
    Project.countDocuments({ statut:"realized"},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
           
}

module.exports = {
    add,
    edit,
    remove,
    list,
    filterByIdUser,
    filterByIdCostumer,
    findById,
    getNumberProjectsInProgress,
    getNumberProjectsRealized
};