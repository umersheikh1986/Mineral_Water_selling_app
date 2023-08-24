const billsModel = require('../models/billsModel')

const addBillController = async(req,res)=>{
  try {
         const newbill = new billsModel(req.body);
         await newbill.save();
         res.status(201).json('bill created sucessfully!')

  } catch (error) {
     res.status(400).send(error)
     console.log(error);
  }
}

// get bill data
const getBillController = async(req,res)=>{

  try {
      const bills = await billsModel.find();
      res.status(220).send(bills)
  } catch (error) {
      console.log(error);
  }

};


module.exports = {addBillController , getBillController}; 