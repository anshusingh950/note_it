const mongoose=require('mongoose');
const express = require('express')
const router=express.Router();

router.post('/getdata/:userEmail',async (req,res)=>{
    try{
        let userEmail=req.params.userEmail;
        const fetched_data1=await mongoose.connection.db.collection('notes');        
        global.notes=await fetched_data1.find({}).toArray();
        global.userNotes=[]
        for(let i=0;i<(global.notes.length);i++){
            if(global.notes[i].email==userEmail){
                global.userNotes.push(global.notes[i]);
            }
        }
        res.send([global.userNotes])
    }
    catch(error){
        console.log(error.message)
        res.send("Server Error");
    } 
})

module.exports=router;
