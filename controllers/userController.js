const userModel = require('../models/userModel')



 const loginController = async(req,res)=>{
 
      const {userId,password} = req.body;
    try {
        const user = await userModel.findOne({userId,password});
        if (user){
          res.status(220).send(user)
        } 
        else 
        {
               res.json({
                message :'Login Failed',
                user,
               })  
        }
       
    } catch (error) {
        console.log(error);
    }




};

const registerController = async(req,res)=>{
  try {
         const newUser = new userModel(req.body);
         await newUser.save();
         res.status(201).json(' new User created sucessfully!')


  } catch (error) {
     res.status(400).send(error)
     console.log(error);
  }
}



module.exports = {loginController,registerController}; 