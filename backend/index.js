const express = require('express')
const app = express() 
const cors=require('cors')
const port = 5000
const mongoDB=require("./db")
mongoDB();
app.use(cors())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(express.json());
app.use('/api',require('./routes/auth'));
app.use('/api',require('./routes/notes'));
app.use('/api',require('./routes/Displaydata'));
app.use('/api',require('./routes/DeleteData'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})