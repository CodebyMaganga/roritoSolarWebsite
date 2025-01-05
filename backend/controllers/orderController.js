const Product = require("../models/productModel");
const Order = require("../models/orderModel")
const mongoose = require('mongoose')


const createOrder = async (req, res) => {
    try {
     
      const { userId, products } = req.body;
  
    
      if (!userId || !products || products.length === 0) {
        return res.status(400).json({ message: "Missing required fields." });
      }
  

      const isValidProducts = products.every(
        (product) => product.productId && product.quantity > 0
      );
      if (!isValidProducts) {
        return res.status(400).json({ message: "Invalid products array." });
      }
  

      
      let totalPrice = 0;
  
      for (const item of products) {
        const product = await Product.findById(item.productId);


        if (!product) {
          return res.status(404).json({ message: `Product not found: ${item.productId}` });
        }

        if (product.stock < item.quantity) {
            return res
              .status(400)
              .json({ message: `Insufficient stock for product: ${product.name}` });
          }



        totalPrice += product.price * item.quantity;
        product.stock -= item.quantity

       await product.save()
      }
  
    
      const newOrder = await Order.create({
        userId,
        products,
       ...req.body,
      });
  
      res.status(201).json({
        message: "Order created successfully.",
        order: newOrder,
      });
    } catch (error) {
      res.status(500).json({ message: `Failed to create order: ${error.message}` });
    }
  };

  const deleteOrder = async (req,res) =>{

    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      try{

        const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (const item of order.products) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.stock += item.quantity; // Reset stock by adding the quantity back
          await product.save();
        }
      }




        const deleteOrder = await Order.findByIdAndDelete(id)

        if (!deleteOrder){
            return res.status(404).json({message: 'Failed to delete Order'})
        }

        return res.status(201).json({message: 'Product deleted successfully', data:deleteOrder})
      }
      catch(error){
        return res.status(500).json({
            message: "An error occurred while deleting the product",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
          })
      }

    
  }

  const getAllOrders = async(req,res) =>{

    const {page = 1, limit=10, search=""} = req.query

    const query = search ? {name:{$regex : search, $options: "i" }} : {}

    try{
        const orders = await Order.find(query).skip((page - 1) * limit)
        .limit(Number(limit)).sort({createdAt: -1})

        if(!orders || orders.length === 0){
            res.status(404).json({message: 'Cannot find orders'})
        }

        const totalOrders = await Order.countDocuments(query);

        res.status(200).json({
            message: "Products retrieved successfully",
            metadata:{
                total: totalOrders,
                page: Number(page),
                limit: Number(limit),
                pages: Math.ceil(totalOrders / limit),

            },
            orders
        })
    }
    catch(error){
        return res.status(500).json({message: `Request failed ${error.message}`})
    }
  }

  const getSingleOrder = async (req,res) =>{
    const {id} = req.params

    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      try{
        const findOrder = await Order.findById({_id:id})
    
        if(!findOrder){
          return res.status(400).json({message: "Order not found"})
      }
    
      return res.status(200).json(findOrder)
      }
      catch (error){
        console.error(error); 
    
        return res.status(500).json({ message: "Internal server error" });
    
      }
  }

  module.exports = {createOrder,deleteOrder,getAllOrders,getSingleOrder}
  