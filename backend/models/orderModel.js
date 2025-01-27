const mongoose = require('mongoose')


const Schema = mongoose.Schema


const orderSchema = Schema(
    {
        userId: {
          type: String,
          ref: "User",
          required: true
        },
        products: [
          {
            productId: {
              type: String,
              ref: "Product"
            },
            quantity: {
              type: Number,
              required: true,
              min: 1
            }
          }
        ],
        totalAmount: {
          type: Number,
          required: true
        },
        status: {
          type: String,
          enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
          default: "Pending"
        },
        deliveryDetails: {
          phoneNumber: String,
          deliveryDate: Date
        },
        paymentStatus: {
          type: String,
          enum: ["Paid", "Unpaid", "Refunded"],
          default: "Unpaid"
        },
      }
      ,
      {
        timestamps: true
      }
)

module.exports = mongoose.model('Order', orderSchema)