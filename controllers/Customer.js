const Customer = require('../models/Customer')

exports.addCustomer = (req,res,next) =>{

    Customer.create(req.body).then(reslt =>{
        res.send(reslt)
    })
    .catch(err=>{console.log(err)})
}

exports.deleteCustomer = (req,res,next) =>{
    Customer.findOneAndDelete({_id:req.params.id_customer})
    .then(result =>{ 
        res.send("client supprimer avec succées")
    })
    .catch(err =>{
        res.send('error')
    })
}