const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('../db/conn');

const User = require('../model/schema');
// middleware
const middleware = (req,res,next)=>{
    console.log("heloo your middleware");
    next();
}

// endpoint

router.get("/",(req,res)=>{
    res.status(201).send("hello from the server");
});

// for registration.......
router.post("/register",async (req,res)=>{

    const {email,username,phone,password,cpassword} = req.body;
    if (!email || !username || !phone || !password || !cpassword){
        
        res.status(422).send("filled all the entity");
    }
    try{
     const emailResponce = await User.findOne({email:email});
     const usernameResponce = await User.findOne({username:username});
     if (emailResponce){
        res.status(422).json({response:"Email already exist"});
     }
   
     else if (usernameResponce){
        res.status(422).json({response:"username already exist"});
     }
     else{
        const user = new User({email,username,phone,password,cpassword});

        await user.save();
        res.status(201).json({response:"registered successfull"});
     }
     
    }catch(err){
        console.log(err);
    } 
});
// for login..........

router.post("/login", async (req,res)=>{

    const {email,password} = req.body;    

    // checking email and password are filled or not...
    if (!email || !password ){
       
        res.status(402).json({ error:"Invalid entity"})

    }
    // find email in database are matching or not with user given email...

   const userInfo = await User.findOne({email:email})
   if(userInfo){
       const isMatch = await bcrypt.compare(password, userInfo.password)

    //  call the function which is genarate the token in schema.js...........  
       const token = await userInfo.generateAuthToken();
       console.log(token);

    //    res.cookie("authtoken",token);

        

        if(isMatch){
            res.json({
                message:"sign in successfull!",
                user: userInfo
            })
        }else{
            alert("password incorrect!!")
            res.json({message: "password Incorrect"})
        }

   }else{
        alert("please register first")
        res.json({ message: "please register first"})
   }

})



module.exports = router;