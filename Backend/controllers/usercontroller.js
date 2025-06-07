import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from 'validator';

//generate token
const gentoken = async (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET_KEY);
};

//user signUp
const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //if user already exists
    const existingUser = await usermodel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User Already exists" });
    }

    //validate an email
    if(!validator.isEmail(email)){
        return res.json({success:false, message: "Please enter a valid email"});
    }

    if (validator.isStrongPassword(password)) {
      return res.json({ success: false, message: "Password must be at least 8 characters and include a lowercase, uppercase, number, and special character." });
    }

    //hashed password
    let salt = await bcrypt.genSalt(10);

    let hashedpassword = await bcrypt.hash(password, salt);

    //store inside the database
    let userdata = new usermodel({
      name:name,
      email:email,
      password: hashedpassword,
    });

    let user = await userdata.save();

    //generate token for the user
    const token = await gentoken(user._id);

    res.json({success: true, token});

  } catch (error) {
     console.log(error);

     res.json({success:false, message:error.message});
  }
};

//user login
const Login = async (req, res) => {
    try{

    const {email, password} = req.body;

    //checks if user exist
    let existingUser = await usermodel.findOne({email});

    if(!existingUser){
        res.json({success:false, message:"User does not exist. Please signUp first"});
    }

    //dcrypt the password
    let isMatchpassword = await bcrypt.compare(password, existingUser.password);

    if(isMatchpassword){
        const token = await gentoken(existingUser._id);

        res.json({success:true, token});
    }else{
        res.json({sucess:false, message:"Invalid Credentails"})
    }
            
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message});
    }

};

//Admin login
const Admin = async (req, res) => {

  try{
    const {email, password} = req.body;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

       //create token for admin
       const token = await gentoken(email+password)

       res.json({success:true, message:token});
       
    }else{
       
        res.json({success:false, message:"Invalid Credentails"});
    } 

  }catch(error){
    res.json({success:false, message:error.message});
  }
 
};

export { Register, Login, Admin };
