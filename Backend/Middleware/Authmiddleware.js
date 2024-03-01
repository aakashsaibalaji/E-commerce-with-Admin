const jwt = require('jsonwebtoken');
// creating a middleware to access by token
const User = require('../Model/user');

const Requiresign=(req,res,next)=>{
    try{
        const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    }catch(error){
        console.log(error);
    }
}
const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in admin middelware",
      });
    }
  };

module.exports={Requiresign,isAdmin};