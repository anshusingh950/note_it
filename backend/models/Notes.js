const mongoose=require('mongoose')
const {Schema}=mongoose
const NoteSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true,
    },
    
    date:{
        type:Date,
        default : Date.now()
    }  
})

module.exports=mongoose.model('Notes',NoteSchema)