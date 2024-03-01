const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config()
const app = express()
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("connected"))
    .catch(err => console.log("Error while connecting", err))
const auth_controller = require('./routers/Authrouters');
app.use('/E-commerce/auth', auth_controller);
const category_controller = require('./routers/Categoryroutes');
app.use('/E-commerce/categories', category_controller);
const Product_controller = require('./routers/Productroutes');
app.use('/E-commmerce/product',Product_controller);
app.listen(process.env.PORT,()=>{
    console.log("server has started");
})
