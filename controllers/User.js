const User = require('../models/User');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_KEY;

const login =async (req,res) => {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error(err);
            res
                .status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res
                .status(403)
                .json({
                    error: 'Incorrect email'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    res
                        .status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res
                        .status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    let id = user._id;
                    const payload = { id };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
};
const register = async(req,res) => {
    const { firstname, lastname, company, siret, email, password, phone, company_status, profile  } = req.body;
    const user = new User({ firstname, lastname, company, siret, email, password, phone, company_status, profile });
    user.save(function(err) {
        if (err) {
            res.status(500).send("Error registering new user please try again.");
        } else {
            res.status(200).send("Welcome to the club!");
        }
    });
};
const findOne = (req,res) => {
    User.findById(req.id,(err,user) =>{
        if(err)  res.status(400).json({'success' : false, 'error': err});
        res.status(200).json(user)
    })
};
const edit = (req,res)  => {
    User.findByIdAndUpdate(req.id,req.body,(err,user)=>{
        if(err)  res.status(400).json(err);
        res.status(200).json(user)
    })
};
const checkToken = (req,res) => {
    res.sendStatus(200);
};


module.exports = {
    register,
    login,
    edit,
    findOne,
    checkToken
};