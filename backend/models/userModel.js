const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        

    },
    email: String,
    password: {
        type: String,
        required: true,
        // select: false
    },
    phone:{
    type: String,
    unique: true,
    required: true
},
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
      },
      profilePicture: String,
},{timestamps:true})


module.exports = mongoose.model('User', userSchema);

