const Product = require('../models/productModel')
const mongoose = require('mongoose')


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

const getSingleProduct = async (req,res) =>{
  const {id} = req.params

  if(!id || !mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try{
    const findProduct = await Product.findById({_id:id})

    if(!findProduct){
      return res.status(400).json({message: "User not found"})
  }

  return res.status(200).json(findProduct)
  }
  catch (error){
    console.error(error); 

    return res.status(500).json({ message: "Internal server error" });

  }
}

const updateProduct = async (req,res) =>{
  const {id} = req.params

  const fields = req.body

  if(!id || !mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid product ID format" });
  }

  try{
    if (Object.keys(fields).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }



    const findProduct = await Product.findOneAndUpdate({_id:id},fields,{ new: true, runValidators: true })

    if(!findProduct){
      return res.status(404).json({message: 'Failed to update Product'})
    }

    return res.status(201).json({message: 'Product updated successfully', data:findProduct})

  }
  catch(error){
    return res.status(500).json({
      message: "An error occurred while updating the product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    })
  }


}

const deleteProduct = async(req,res)=>{
  const {id} = req.params

  if(!id || !mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try{
    
    const deleteProduct = await Product.findByIdAndDelete(id)

    if(!deleteProduct){
      return res.status(404).json({message: 'Failed to deleteProduct'})
    }

    return res.status(201).json({message: 'Product deleted successfully', data:deleteProduct})

  }
  catch(error){
    return res.status(500).json({
      message: "An error occurred while deleting the product",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    })


  }
}



  module.exports = {createProduct, createBulkProducts, getAllProduct,getSingleProduct,updateProduct,deleteProduct,updateProduct}