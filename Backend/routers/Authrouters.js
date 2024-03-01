const express= require("express");
const {login,register,test,forgotpassword, updateprofile} =require('../controllers/Authcontroller');
const {Requiresign, isAdmin } =require('../Middleware/Authmiddleware');
const router = express.Router();
router.post('/login',login);
router.post('/register',register);
router.post('/test',Requiresign,test);//It is used to test the middleware.
//user dashboard the access.
router.get('/userauth',Requiresign,(req,res)=>{
    res.status(200).send({ok:true});
});
//admin dashboard access.
router.get('/adminauth',Requiresign,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});
router.post('/forgotpassword',forgotpassword);
router.put('/updateprofile',Requiresign,updateprofile);
module.exports=router;