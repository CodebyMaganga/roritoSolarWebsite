const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


const router = express.Router();

router.post("/sign-up", async (req, res) => {
  const fields = req.body;

  if (!fields.phone || !fields.password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const existingUser = await User.findOne({ phone: fields.phone });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(fields.password, 10);

    const newUser = await User.create({ ...fields, password: hashedPassword });

    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  console.log("phone", phone);

  const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Short lived
    });
    
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Long lived
    });
    
    return { accessToken, refreshToken };
  };

  try {
    const findUser = await User.findOne({ phone });
    if (!findUser || !await bcrypt.compare(password, findUser.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  }
  catch(error){
    console.log(error)
  }



  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const findUser = await User.findOne({ phone });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    
      
    const { accessToken, refreshToken } = generateTokens(findUser._id);

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', 
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/', 
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(200).json({ message: "Login successful",accessToken,refreshToken });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

router.post('/logout', (req, res) => {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;
