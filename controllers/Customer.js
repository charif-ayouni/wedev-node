const Customer = require('../models/Customer');

const add= (req,res) => {
    Customer.create(req.body,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully saved'})
    })
};
const edit = (req,res)  => {
    Customer.findOneAndUpdate(req.params.id,req.body,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully updated'})
    })
};
const remove = (req,res) => {
    Customer.findOneAndDelete({_id:req.params.id},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully deleted'})
    })
};
const list = (req,res) => {
    Customer.find((err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};
const findOne = (req,res) => {
    Customer.findById(req.params.id,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json({'success' : true, 'data': result})
    })
};

module.exports = {
    add,
    edit,
    remove,
    list,
    findOne
};