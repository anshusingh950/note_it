const express=require('express')
const router=express.Router();
const { body, validationResult } = require('express-validator');
const Notes=require("../models/Notes")
router.post("/addnotes" ,[
    body("email","Please Login to add notes").isEmail().withMessage("Please Login to add notes"),
    body('description',"Description can't be set to empty").isLength({min:1})
    ],async (req,res)=>{    
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()});
    }
       
    try {
        await Notes.create({
            email:req.body.email,
            description:req.body.description,
            date:Date.now()
        }).then(res.json({success:true})) 
    } 
     catch (error) {
        console.log(error)
        res.json({success:false});
    }
})

module.exports=router 