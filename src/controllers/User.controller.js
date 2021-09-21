require('dotenv').config();
const User = require('../schemas/User');
const JWT = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const gen = require('../utils/api.gen.js');
const bcrypt = require("bcryptjs");

exports.registerUser = async (req,res) =>{
    const { email, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12);
    User.findOne({ $or: [{ email }, { username }] })
    .then((_user)=>{
        if(!_user){ 
            const user = {
                email,
                username,
                password: hashedPassword,
            }
            User.create(user)
            .then(data => {
                res.json({message: 'Account registered successfully, Login to continue.', success: true, data: data});
            })
            .catch(err => {
                console.log(err.message)
                res.status(500).send({
                message:
                    err.message || "Uhmm, Something went wrong while creating your account, Try again.",
                success: false
                });
            });
        }else{
            console.log('already registered')
            res.json({message: 'Email/Username already registered with another account, try logging in instead', success: false})
        }
    })
    .catch(err=>{
        console.log(err.message);
        res.json({ message: 'An error occurred', status: false, success: false, error: err.message })
    })
}

exports.login = async (req,res)=>{
    const { username, password } = req.body
    User.findOne({ username }).then(async (user)=>{
        if(!user){
            res.json({message: 'There is no account registered with this username, try creating an account' ,done: true, session: false})
        }else{
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
            console.log("Incorrect password", req.body, password, user.password);
                res.json({ message: 'password is incorrect', ERR_CODE: 4315, done: true, session: false, username})
            }else{
                const id = user._id
                const email = user.email
                const username = user.username
                const token = JWT.sign({id, email}, process.env.JWT_SECRET, {
                    expiresIn:'1d',
                })
                res.json({message: 'login successful.', username, done: true, session: true, token: token, details: user})
            }
        }
    })
    .catch(err => {
        console.log(err)
        res.json({message: 'An error occurred.',done: true, session: false}).status(500)
        console.log(err)
    })
}

exports.updateProfileInfo = async (req, res) =>{
    try{
        const { userId } = req.params;
        const { firstname, lastname, phone, education, bank, accountNumber, dob } = req.body;
        const user = await User.findByIdAndUpdate(userId, { 
            firstname,
            lastname,
            phoneNumber: phone,
            education,
            dob,
            profileUpdated: true
        },{new: true})
        return res.json({ message: 'Profile infomation updated successfully', status: true, details: user });
    }catch(err){
        res.json({ message: 'An error occurred', status: false, error: err.message })
    }
}


exports.addBankInfo = async (req, res) =>{
    try{
        const { userId } = req.params;
        const { bank, accountNumber } = req.body;
        console.log(req.body)
        const user = await User.findByIdAndUpdate(userId, { 
            bankName: bank,
            bankAccountNumber: accountNumber,
        },{new: true})
        return res.json({ message: 'Bank infomation added successfully', status: true, details: user });
    }catch(err){
        res.json({ message: 'An error occurred', status: false, error: err.message })
    }
    
}


exports.removeBankInfo = async (req, res) =>{
    try{
        const { userId } = req.params;
        console.log(req.body)
        const user = await User.findByIdAndUpdate(userId, { 
            bankName: '',
            bankAccountNumber: '',
        },{new: true})
        return res.json({ message: 'Bank infomation removed', status: true, details: user });
    }catch(err){
        res.json({ message: 'An error occurred', status: false, error: err.message })
    }
    
}

exports.isUserAuth = async (req,res) =>{
    console.log(req.userId)
    User.findOne({ _id: req.userId })
    .then((data) => {
      if(data){
        res.json({message:'you are authorised',details: data, authenticated: true})
      }else{
        res.json({message:'not auth', authenticated:false}).status(401)
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({message:'An error occurred.', authenticated:false})
    });
};

