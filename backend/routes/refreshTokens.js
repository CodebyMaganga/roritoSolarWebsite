
const express = require('express')

const router = express.Router()


// refreshToken.js
router.post('/refresh-token', async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token" });
      }
  
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
      
      // Generate new access token
      const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // Set new access token cookie
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      res.json({ message: "Token refreshed successfully" });
    } catch (error) {
      res.status(401).json({ message: "Invalid refresh token" });
    }
  });

  module.exports= router

