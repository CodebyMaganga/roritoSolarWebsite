const Product = require('../models/productModel')


const createProduct = async (req, res) => {
    try {
      const { name, category, price, ...otherFields } = req.body;
  
      // Input validation
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid product name'
        });
      }
  
      if (!category || typeof category !== 'string' || category.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid category'
        });
      }
  
      if (!price || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid price greater than 0'
        });
      }
  

      const newProduct = await Product.create({
        name: name.trim(),
        category: category.trim(),
        price,
        ...otherFields
      });
  
      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
      });
  
    } catch (error) {
      console.error('Error creating product:', error);
      return res.status(500).json({
        success: false,
        message: 'Error creating product',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };



 const createBulkProducts = async (req, res) => {
    try {
      

        const  products  = req.body?.products; 
      

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an array of products'
            });
        }

        const validationErrors = [];
        const validProducts = [];

        products.forEach((product, index) => {
            const { name, category, price } = product;
            const errors = [];

            if (!name || typeof name !== 'string' || name.trim().length === 0) {
                errors.push('Invalid product name');
            }

            if (!category || typeof category !== 'string' || category.trim().length === 0) {
                errors.push('Invalid category');
            }

            if (!price || typeof price !== 'number' || price <= 0) {
                errors.push('Invalid price');
            }

            if (errors.length > 0) {
                validationErrors.push({
                    index,
                    product,
                    errors
                });
            } else {
                validProducts.push({
                    name: name.trim(),
                    category: category.trim(),
                    price,
                    ...product
                });
            }
        });

        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors found',
                errors: validationErrors
            });
        }

        const createdProducts = await Product.insertMany(validProducts, {
            ordered: false
        });

        return res.status(201).json({
            success: true,
            message: `Successfully created ${createdProducts.length} products`,
            data: createdProducts
        });

    } catch (error) {
        console.error('Error creating bulk products:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating products',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};


const getAllProduct = async (req,res) =>{
    try{
    const {page = 1, limit=10, search=""} = req.query

    const query = search ? {name:{$regex : search, $options: "i" }} : {}

    const allProducts =  await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))


    if(!allProducts || allProducts.length === 0){
        return res.status(404).json({message: 'No products found'})
    }

    const totalProducts = await Product.countDocuments(query);

    return res.status(200).json({
        message: "Products retrieved successfully",
        metadata: {
          total: totalProducts,
          page: Number(page),
          limit: Number(limit),
          pages: Math.ceil(totalProducts / limit),
        },
        allProducts
    })
}
catch(error){
    return res.status(500).json({message: `Request failed ${error.message}`})
}


}



  module.exports = {createProduct, createBulkProducts, getAllProduct}