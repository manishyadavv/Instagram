const express= require("express")
const router = express.Router()

const mongoose= require ('mongoose')

const User = mongoose.model('User')

const bcrypt = require('bcryptjs')
//
// router.get("/",(req,res)=>{
//     res.send("hello")
// })


//signup route
router.post('/signup',(req,res)=>{
    //console.log(req.body.name)
    const {name,email,password}= req.body

    if( !email || !password|| !name){
       return res.status(422).json({error:"please add all fields"})
    }

    //if a user with same email exits
    //querying in Db
    User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"user already exists"})
            }
            bcrypt.hash(password,12)
                .then(hashedpassword=>{
                    const user= new User({
                        email:email,
                        password:hashedpassword,
                        name:name
                    })
                    user.save()
                        .then(user=>{
                            res.json({message:"saved successfulyy"})
                        })
                        .catch(err=>{
                            console.log(err)

                        })
                })
                .catch(err=>{
                    console.log(err)
                })
                })



})




router.post('/signin',(req,res)=>{

    const {email,password}=req.body

    if(!email||!password){
        return req.status(422).json({error:"please add email and password"})
    }

    User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser)
            {
                return res.status(422).json({error:"Invalid Email or Password"})
            }

            bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch)
                    {
                        res.json({message:"successfully signed in"})
                    }
                    else{
                        return res.status(422).json({error:"Invalid Email or Password"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        })




})




module.exports=router