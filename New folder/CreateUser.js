const express=require('express')
const router=express.Router()
const User=require('../models/user');
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const jwtSecret="mypopisotwellasheshouldbepasswordisnotnull"

router.post("/createuser",[
    body('name').isLength({min:3}),body('password','Password should be min 8 characters').isLength({min:8}),body('email',).isEmail(),body('location').isLength({min:3})]
    ,async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt=await bcrypt.genSalt(10);
    const securedpassword=await bcrypt.hash(req.body.password,salt)
    try {
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:securedpassword,
            location:req.body.location
        }).then(res.json({success:true}))
    }
     catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

router.post("/loginuser",[
    body('password','Password should be min 8 characters').isLength({min:8}),body('email',"Enter Correct E-mail").isEmail()],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let eml=req.body.email;
    try {
        const userData=await User.findOne({email:eml});
        console.log(userData)
        if(!userData){
        return res.status(400).json({errors:"Try with Correct Credentials1"});
        }
        const cmp=await bcrypt.compare(req.body.password,userData.password)
        if(cmp===false){
        return res.status(400).json({errors:"Try with Correct Credentials2"});
        }
        const data={
            user:{
                id:userData.id
            }
        }
        const authToken=jwt.sign(data,jwtSecret)
        return res.json({success:true,authToken:authToken});
        
    }
     catch (error) {
        console.log(error)
        res.json({success:false});

    }
})

module.exports=router;