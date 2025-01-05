const express = require('express')


const {createProduct, createBulkProducts,getAllProduct,getSingleProduct,deleteProduct,updateProduct} = require('../controllers/productController')


const router = express.Router()

router.get('/all', getAllProduct)
router.get('/product/:id', getSingleProduct)

router.post('/create-product', createProduct)

router.post('/bulk-create', createBulkProducts)

router.patch('/product/:id', updateProduct)

router.delete('/product/:id', deleteProduct)


module.exports = router


