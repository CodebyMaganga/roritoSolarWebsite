const User = require('../models/userModel')
const mongoose = require('mongoose')



//create new user
const createUser = async(req,res)=>{

    const fields = req.body
    console.log('fields',fields)

    try{
        if(!fields.firstName || !fields.password || !fields.phone){
            return res.status(400).json({message: 'firstName,password,phone are required'})
        }

        const existingUser = User.findOne({phone: fields.phone})

        if(existingUser){
            return res.status(409).json({message: "User already exists"})
        }

        const bcrypt = require('bcrypt')
        const hashedPassword = await bcrypt.hash(fields.password, 10)


        const newUser = User.create({
            ...fields,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User created succesfully',
            user: newUser
        })
    }
    catch (error) {
        res
          .status(500)
          .json({ message: `Failed to create user, ${error.message}` });
      }
}


const allUsers = async (req,res)=>{

    try{
        const { page = 1, limit = 10, search = "" } = req.query;

        const query = search ? {firstName:{$regex: search, $options: 'i'} } : {}
    
        const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .select("-password")
    
        if(!users || users.length === 0){
            return res.status(400).json({message: 'No users found'})
        }
    
        const totalUsers = await User.countDocuments(query);
    
        return res.status(200).json({
            message: "Users retrieved successfully",
            metadata: {
              total: totalUsers,
              page: Number(page),
              limit: Number(limit),
              pages: Math.ceil(totalUsers / limit),
            },
            users
        })
    }
    catch(error){
        return res.status(201).json({message: `Request failed ${error.message}`})
    }


}

const singleUser = async (req,res) =>{

    const {id} = req.params

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {

        return res.status(400).json({ message: "Invalid user ID format" });

    }

    try{
        const user = await User.findById({_id: id}).select("-password")

        if(!user){
            return res.status(400).json({message: "User not found"})
        }
    
        return res.status(200).json(user)
    }
    catch (error) {

        console.error(error); 

        return res.status(500).json({ message: "Internal server error" });

    }
    
}


module.exports = {
    createUser,allUsers,singleUser
}