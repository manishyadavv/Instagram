
const express =require("express");
const app=express();

PORT=5000;

app.get('/home',(req,res)=>{

    res.send("hello world")
});



app.listen(PORT,()=>{
    console.log("server is running on ", PORT)
});

