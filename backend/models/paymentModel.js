const mongoose = require('mongoose')

const Schema = new mongoose.Schema

const paymentSchema = new Schema(
    {
        orderId: {
          type: String,
          ref: "Order",
          required: true
        },
        userId: {
          type: String,
          ref: "User",
          required: true
        },
        amount: {
          type: Number,
          required: true
        },
        status: {
          type: String,
          enum: ["Success", "Failed", "Pending"],
          default: "Pending"
        },
        method: {
          type: String,
          enum: ["Cash", "Mpesa"],
          required: true
        },
        transactionRef: String, // Optional field for external payment gateway reference
      },
      {
        timestamps: true
      }
      
)

module.exports = mongoose.model("Payment", paymentSchema)