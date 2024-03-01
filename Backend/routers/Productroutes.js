const express = require('express');
const formidable = require('express-formidable');
const {Requiresign, isAdmin } =require('../Middleware/Authmiddleware');
const { createProduct, GetTheProducts, singleProduct, singlePhotoProduct, deleteProduct, updateProduct, ProductFilter, ProductCount, Productlistpage, Searchproduct } = require('../controllers/Productcontroller');
const router = express.Router()
router.post('/create-product',Requiresign,isAdmin,formidable(),createProduct);
router.get('/allproducts',GetTheProducts);
router.get('/singleproduct/:slug',singleProduct);
router.get('/singlephotoproduct/:id',singlePhotoProduct);
router.delete('/deleteproduct/:id',Requiresign,isAdmin,deleteProduct);
router.put('/updateproduct/:id',Requiresign,isAdmin,formidable(),updateProduct);
router.post('/Productfilter',ProductFilter);
router.get('/productcount',ProductCount);
router.get('/productlist/:p',Productlistpage);
router.get('/searchproduct/:keyword',Searchproduct);
module.exports=router;