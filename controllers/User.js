const User = require('../models/User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');


exports.register = async(req, res, next) => {
    console.log(req.body)
    let userData = {
        "firstname" : req.body.firstname,
        "lastname" : req.body.lastname,
        "company" : req.body.company,
        "siret" : req.body.siret,
        "email" : req.body.email,
        "password" : bcrypt.hashSync(req.body.password),
        "phone" : req.body.phone,
        "company_statut" : req.body.company_statut,
        "profile" : req.body.profile

    }
     User.create(userData ,(err,result) =>{
         if(err) res.status(400).json({'success' : false, 'error': err})
         res.status(200).json({'success' : true, 'message': 'User Succesfully saved'})
     })
    
}

exports.login =async (req,res,next) => {
    let email = req.body.email;
    let password = req.body.password
    const result = await User.findOne({ email: email })
    if (result && bcrypt.compareSync(password, result.password)) {
        const token = jwt.sign({id: result}, 'user');
        res.status(200).json({'success' : true, 'message': 'Your connexion is valide'});
    }
    else {
        res.status(202).json({'success' : false, 'message': 'Please verify your Email or Password '});
    };
}
exports.getUser = (req,res,next) => {
    User.findById(req.params.id_user,(err,result) =>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
}
exports.getUsers = (req,res,next) => {
    User.find((err,result) =>{
        if(err)  res.status(400).json({'success' : false, 'error': err})
        res.status(200).json({'success' : true, 'data': result})
    })
}