const express = require('express')
const {createProduct, createBulkProducts,getAllProduct} = require('../controllers/productController')


const router = express.Router()

router.get('/all', getAllProduct)


router.post('/create-product', createProduct)

router.post('/bulk-create', createBulkProducts)


module.exports = router


