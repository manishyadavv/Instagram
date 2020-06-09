
const express =require("express");
const app=express();

PORT=5000;

//middleware

const customMiddleware =(req,res,next)=>{
    console.log("middleware executed!!")
    next()

}



//app.use(customMiddleware)


app.get('/',(req,res)=>{
    console.log("home")
    res.send("hello world")
});


app.get('/about',customMiddleware,(req,res)=>{
    console.log("about")
    res.send("about page")
});


app.listen(PORT,()=>{
    console.log("server is running on ", PORT)
});

