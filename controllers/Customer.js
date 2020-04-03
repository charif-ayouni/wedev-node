const Customer = require('../models/Customer');
const User = require('../models/User');

const add= (req,res) => {
    Customer.create(req.body,(err,customer)=>{
        if(err)  res.status(400).json(err);
        User.findByIdAndUpdate(req.id, { $push: { customers: customer._id } },(err,user)=>{
            if(err)  res.status(400).json(err);
            res.status(200).json();
        })
    })
};
const edit = (req,res)  => {
    Customer.findOneAndUpdate(req.params.id,req.body,(err,customer)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(customer)
    })
};
const remove = (req,res) => {
    Customer.findOneAndDelete({_id:req.params.id},(err,customer)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(customer)
    })
};
const list = (req,res) => {
    User.findById(req.id)
    .select('customers')
    .populate('customers')
    .exec((err,data)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(data.customers)
    })
};
const findOne = (req,res) => {
    Customer.findById(req.params.id,(err,customer)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(customer)
    })
};

module.exports = {
    add,
    edit,
    remove,
    list,
    findOne
};