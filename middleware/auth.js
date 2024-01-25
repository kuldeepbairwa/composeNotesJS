const jwt = require('jsonwebtoken');
const createResponse = require("../utils/genericResponse");
const tokenSecret = require("../utils/tokenSecret");


const auth = async (req,res,next) =>{
    try {
        const token = req.header("Authorization")?.split(" ")[1];

        if(!token)
         return res.status(401).json(createResponse(false,"Unauthorized Access","Access denied! no auth token found!"));

         const verified = jwt.verify(token,tokenSecret);

        if(!verified) 
         return res.status(401).json(createResponse(false,"Unauthorized Access","Authorization denied! Invalid auth token!"));
        
         req.uid = verified.id;
         req.token = token;
         next();
        
    } catch (error) {
        if(error.name == "JsonWebTokenError") return res.status(401).json(createResponse(false,"Unauthorized Access","Authorization denied! Invalid auth token!"));
        
       return res.json(createResponse(false,"Internal Server Error",error.message));
    }
}

module.exports = auth;