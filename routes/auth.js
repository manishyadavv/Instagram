const express= require("express")
const router = express.Router()

const mongoose= require ('mongoose')

const User = mongoose.model('User')

router.get("/",(req,res)=>{
    res.send("hello")
})

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

            const user= new User({
                email:email,
                password:password,
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


module.exports=router