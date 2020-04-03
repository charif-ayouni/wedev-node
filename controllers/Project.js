const Project = require('../models/Project');
const User = require('../models/User');
const Customer = require('../models/Customer');
//const Sprint = require('../models/Sprint')

const add= async(req,res,next) =>{
    const projectData = {
        "title" : req.body.title,
        "amount" : req.body.amount,
        "deadlines_realization" : req.body.deadlines_realization,
        "start_date" : req.body.start_date,
        "end_date" : req.body.end_date,
        "status" : req.body.status,
        "cost_day" : req.body.cost_day,
        "stacks" : req.body.stacks,
        "customer" : req.body.customer,
        "user" :  req.id
    };

    Project.create(projectData,(err,project) => {
        if (err) return res.status(400).json({'success' : false, 'error': err});
        project_id = project._id;
        User.findByIdAndUpdate(req.id, { $push: { projects: project_id } },(err,user)=>{
            Customer.findByIdAndUpdate(req.body.customer, { $push: { projects: project_id } },(err,result)=>{
                res.status(200).json({'success' : true, 'message': 'Succesfully saved'})
            })
        })
    })
};
const edit = (req,res) =>{

    Project.findOneAndUpdate({_id:req.params.id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Succesfully updated'})
    });

};
const remove = async (req,res) =>{

    Project.findById(req.params.id,(err,project) => {
        if(err)return res.status(400).json({'success' : false, 'message': 'Failed ! project not fount'});
        User.findOneAndUpdate({_id:project.user}, { $pull: { projects: project._id }},(err,user)=>{
            Customer.findOneAndUpdate({_id:project.customer}, { $pull: { projects: project._id }},(err,customer)=>{
                Project.findOneAndDelete({_id:project._id},(err,project)=>{
                    if(err)return res.status(400).json({'success' : false, 'message': 'Failed to delete !'});
                    res.status(200).json({'success' : true, 'message': 'Succesfully deleted'})
                })
            })
        })
    })

}
const list = (req,res) =>{
    Project.find().populate('customer').exec((err,projects)=>{
        if(err){
            res.status(400).json({'success' : false, 'error': err});
        }
        res.status(200).json(projects)
    })
};
const findById = (req,res) =>{
    Project.findById(req.params.id).populate('customer').exec((err,project)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(project)
    })
};
const filterByIdUser = (req,res) =>{
    Project.find({user:req.id},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};
const filterByIdCustomer = (req,res) =>{
    Project.find({custumer:req.params.id_custumer},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};
const getNumberProjectsInProgress = (req,res) => {
    Project.countDocuments({ statut:"in progress",user:req.params.id_user},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};
const getNumberProjectsRealized = (req,res) => {
    Project.countDocuments({ statut:"realized"},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};

module.exports = {
    add,
    edit,
    remove,
    list,
    filterByIdUser,
    filterByIdCustomer,
    findById,
    getNumberProjectsInProgress,
    getNumberProjectsRealized
};