const mongoose = require('mongoose')


const Schema = mongoose.Schema


const productSchema = new Schema({
   
        productId: String, 
        name: {
          type: String,
          required: true
        },
        description: String,
        category: {
          type: String,
          enum: ["Solar Panels", "Solar Lamps", "Batteries","Inverters", "CCTV", "Cables", "Router"],
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        stock: {
          type: Number,
          default: 0,
          min: 0
        },
        tags: [String], 
        images: [String],
},{timestamps: true})


module.exports = mongoose.model('Product', productSchema)


