const { generateToken } = require("../libs/utils");
const User = require("../models/User");
const bcrypt = require("bcrypt");


// SignUp for new User
exports.signup = async (req,res)=>{
    const{fullName , bio , email , password ,} = req.body;

    try {
        // Validation 
        if(!fullName || !bio || !email || !password){
            return res.json({
                success:false,
                message:"All feilds are required"
            })
        };

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.json({
                success:false,
                message:"User is already register..."
            })
        };

        // Password Hashing
        const hashedPassword = await bcrypt.hash(password,10);

        // creating the new user
        const newUser = await User.create({
            fullName,password:hashedPassword,bio,email
        });

        // creating the token
        const token = generateToken(newUser._id);

        // sending successfull response
        res.json({
            success:true,
            userData:newUser,
            token,
            message:"Account created Succefully..."
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        });
    }
}

// Controller for Login
exports.login = async (req,res)=>{
    // fetching the data from req body
    const{password,email} = req.body;
    try {
        // finding the user on the basis of email
        const userData = await User.findOne({email});

        // comparing the the password for the validation
        const isPasswordCorrect = await bcrypt.compare(password,userData.password);

        if(!isPasswordCorrect){
            return res.json({
                success:false,
                message:"Invalid Credentials..."
            })
        }

        // generating the token
        const token = generateToken(userData._id);

        // sending the successfull response
        res.json({
            success:true,
            userData,
            token,
            message:"Successfully login..."
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success:false,
            message:error.message
        })
    }
}