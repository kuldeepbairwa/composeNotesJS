const User = require("../models/user");
const createResponse = require("../utils/genericResponse");
const jwt = require("jsonwebtoken");
const tokenSecret = require("../utils/tokenSecret");
const bcrypt = require("bcrypt");




const signin = async (req,res) => {

    const {email,password} = req.body;
    let user   = await User.findOne({email});
    if(!user){
        res.status(404).json(createResponse(false,"User not found!","this account does not exists!"))
        return
    }
    const matchedPassword = await bcrypt.compare(password,user.password);
    if(!matchedPassword){
        res.status(404).json(createResponse(false,"invalid credentials","invalid email or password"))
        return
    }
    else {

        const token = jwt.sign({email:user.email, id:user._id},tokenSecret);
        
        res.json(createResponse(true,"user logged in",{user,token}))
        return
    }

}


const signup = async (req,res) => {
    try {
        const {email,password,name} = req.body;
      
        let user = await User.findOne({email});
        if(!user){

            const hashedPassword = await bcrypt.hash(password, 10);            
            const user = await User.create({name,email,"password":hashedPassword});
            const token = jwt.sign({email: user.email ,id:user._id},tokenSecret);
             
            
            res.json(createResponse(true,"user registered",{user,token}))
            return;
        }
        else{
            res.status(400).json(createResponse(false,"duplicate user","an user with this email already exists!"));
            return;
        }


    } catch (error) {
        console.log(error);
       res.status(500).json(createResponse(false,"something went wrong",`${error}`))

    }

}

module.exports = {signin,signup}