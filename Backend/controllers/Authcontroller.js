const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../Model/user');
dotenv.config()
const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password,nickname ,address,phone} = req.body;
        if (!firstname || !lastname || !email || !password || !nickname || !address || !phone) {
            return res.status(400).send({ msg: "Please fill all fields" });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ msg: 'User already exists' });
        }
        const hashpassword = await bcrypt.hash(password, 10); // Fixed typo 'bryct' to 'bcrypt'
        const newUser = new User({ firstname, lastname, email, password: hashpassword ,nickname,address,phone});
        const resp = await newUser.save(); // Added 'await'
        res.status(200).send({ success: true, message: "User registered successfully", user: resp });
    } catch (err) {
        console.error(err);
        res.status(500).send({ msg: "User not registered successfully" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ msg: "please enter email and password" });
        }
        let user = await User.findOne({email}); 
        if (!user) {
            return res.status(400).send({ msg: "Invalid Email or Password" });
        }
        const match = await bcrypt.compare(password, user.password); 
        if (match) {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                message: "Logged in successfully",
                user: { Id: user._id, firstname: user.firstname,lastname:user.lastname, email: user.email,address:user.address,phone:user.phone,role:user.role},
                token
            });
        } else {
            res.status(400).send({ message: "Unsuccessful credentials" }); 
        }
    } catch (err) {
        res.status(500).send({msg:"server side error"});
    }
};
// This api is created to test the middleware
const test =(req,res)=>{
    try{
        res.send("test is activated");
    }catch(error){
        res.send("not accepted the test");
    }
};
const forgotpassword= async(req,res)=>{
    try{
        const {email ,nickname,newpassword} =req.body
        if(!email || !nickname || !newpassword){
            res.status(400).send({message:"all fields are required to reset password"});
        }
        const user = await User.findOne({email,nickname})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'wrong user email or nickname'
            });
        }
        const hashed = await bcrypt.hash(newpassword, 10);
        await User.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"password has reset successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            errMsg: "Server Error!"
        })
    }
};
const updateprofile = async (req, res) => {
    try {
      const { firstname, lastname, email, password, address, phone } = req.body;
      const user = await User.findById(req.user._id);
  
      if (password && password.length < 6) {
        return res.json({ error: 'Password is required and must be at least 6 characters long' });
      }
  
      const hashedPassword = password ? await hashpassword(password) : undefined;
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          firstname: firstname || user.firstname,
          lastname: lastname || user.lastname,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
  
      res.status(200).send({
        success: true,
        message: 'Profile updated successfully',
        updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false, msg: 'Something went wrong in the backend server of update profile' });
    }
  };

module.exports={register,login,test,forgotpassword,updateprofile};