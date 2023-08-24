const itemModel = require('../models/itemModel')



 const getItemController = async(req,res)=>{

    try {
        const items = await itemModel.find();
        res.status(220).send(items)
    } catch (error) {
        console.log(error);
    }




};

const addItemController = async(req,res)=>{
  try {
         const newItem = new itemModel(req.body);
         await newItem.save();
         res.status(201).json('item created sucessfully!')


  } catch (error) {
     res.status(400).send(error)
     console.log(error);
  }
}

// editItemController
 const editItemController = async(req,res)=>{
   try {
      await itemModel.findOneAndUpdate({_id:req.body.itemId},req.body);
      res.status(201).json('Item Updated')
    
   } catch (error) {
    
   }

 }

//deleteItem
const deleteItemController = async(req,res)=>{
    try {
        const {itemId} = req.body;
       await itemModel.findOneAndDelete({ id : itemId});
       res.status(201).json("item Deleted");
     
    } catch (error) {
      res.status(400).send(error)
      console.log(error);
    }
 
  }


module.exports = {getItemController,addItemController,editItemController,deleteItemController}; 