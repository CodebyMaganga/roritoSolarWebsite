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

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const findUser = await User.findOne({ phone });
    if (!findUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie('authToken', token, {
        httpOnly: true, // Makes cookie inaccessible to JavaScript
        secure: process.env.NODE_ENV === 'production', // Send cookie only over HTTPS in production
        sameSite: 'strict', // Prevents CSRF by restricting the cookie to same site requests
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });

    res.status(200).json({ message: "Login successful", token });
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
    res.status(200).json({ message: 'Logged out successfully' });
  });

module.exports = router;
