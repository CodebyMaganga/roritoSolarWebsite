const express = require('express')

const {createOrder,deleteOrder,getAllOrders, getSingleOrder} = require('../controllers/orderController')


const router = express.Router()

router.get('/all', getAllOrders)
router.get('/get-order/:id',getSingleOrder)



router.post('/create-order', createOrder)

router.delete('/delete-order/:id',deleteOrder)


module.exports  = router