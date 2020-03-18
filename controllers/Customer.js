const Customer = require('../models/Customer')

exports.getCustomers = (req,res,next) => {

    Customer.find((err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })

}

exports.getCustomer = (req,res,next) => {

    Customer.findById(req.params.id_customer,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })

}

exports.addCustomer = (req,res,next) => {

    Customer.create(req.body,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully saved'})
    })
}

exports.updateCustomer = (req,res,next)  => {

    Customer.findOneAndUpdate(req.params.id_customer,req.body,(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully updated'})
    })

}

exports.deleteCustomer = (req,res,next) => {

    Customer.findOneAndDelete({_id:req.params.id_customer},(err,result)=>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'message': 'Customer Succesfully deleted'})
    })
    
}