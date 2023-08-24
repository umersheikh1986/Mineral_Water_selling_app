const express = require('express');

const router = express.Router();
const { getItemController ,addItemController,editItemController,deleteItemController} = require('../controllers/itemController');
//routes
router.delete('/delete-item',deleteItemController);
router.get('/get-item',getItemController)
router.post('/add-item',addItemController);
router.put('/edit-item',editItemController);


module.exports = router;