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
     User.create(userData ,function(err,result){
         if(err){res.send(err)}
         res.send(result)
     })
    
}

exports.login =async (req,res,next) => {
    let Email = req.body.email;
    let Password = req.body.password
    const result = await User.findOne({ email: Email })
    console.log(result);
    if (result && bcrypt.compareSync(Password, result.password)) {
        const token = jwt.sign({id: result}, 'user');
        res.send( {lvl : 'Your connexion is valide', token:token});
    }
    else {
         res.send( {lvl : ' Please verify your Email or Password '});
    };
}