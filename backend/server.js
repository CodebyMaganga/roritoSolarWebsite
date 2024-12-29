require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoute')


const app = express()

app.use(express.json())


app.use('/users', userRoute)
app.use('/products', productRoute)





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
