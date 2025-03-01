require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/order')
const authRoute = require('./routes/authentication')
const authenticate = require('./middlewares/authenticate')
const cors = require('cors');


const app = express()

app.use(cors({
    origin: 'https://rorito-solar-website.vercel.app/', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, authorization headers)
  }));


  app.options('*', cors());
app.use(express.json())
app.use(cookieParser());

app.use('/auth', authRoute)

app.use('/users',authenticate, userRoute)
app.use('/products',authenticate, productRoute)
app.use('/order',authenticate, orderRoute)





mongoose.connect(process.env.DATABASE_URI)
.then(()=>{
    app.listen(process.env.PORT, (req,res)=>{
        console.log(req)
        console.log('Connected to db & listening on port 4000')
    })
})
.catch((err) =>{
    console.error('error:',err)
})
