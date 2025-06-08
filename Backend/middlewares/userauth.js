import jwt from "jsonwebtoken";

const userAuth = async (req, res, next)=>{

    try{
        const {login} = req.headers;

        if(!login){
           return res.json({success:false, message : "Not Authorized, login Again"});
        }

        const decodetoken = jwt.verify(login, process.env.JWT_SECRET_KEY);

        req.body.userId = decodetoken.id;

        next();
    }catch(error){
         res.json({success:false, message:error.message});
    }

}

export default userAuth;