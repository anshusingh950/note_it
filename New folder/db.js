const mongoose=require('mongoose');
const monuri='mongodb+srv://anshu8877947678:atlas123@cluster0.pr6de2v.mongodb.net/Foody_Web?retryWrites=true&w=majority'
const connectmongo=async()=>{
    try{
        mongoose.set("strictQuery",false);
        await mongoose.connect(monuri);
        console.log("connected to mongodb");
        const fetched_data1=await mongoose.connection.db.collection('food_item');        
        global.food_item=await fetched_data1.find({}).toArray();
        const fetched_data2=await mongoose.connection.db.collection('food_category1');        
        global.food_category=await fetched_data2.find({}).toArray();
    }
    catch(error){
        console.log(`Error in connecting to MongoDB ${error}`);
        process.exit();
    }    
}
module.exports=connectmongo;