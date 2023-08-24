const express = require('express');

const router = express.Router();
const {  addBillController ,getBillController} = require('../controllers/billController');
//routes

router.post('/add-bills', addBillController );
router.get('/get-bills', getBillController );


module.exports = router;