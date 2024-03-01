const { CreateCategorycontroller,updatecategory,CategoryController,singleCategory, deleteCategory} =require('../controllers/CategoryController');
const express = require('express');
const {Requiresign, isAdmin } =require('../Middleware/Authmiddleware');
const router = express.Router()
router.post('/create-category',Requiresign,isAdmin,CreateCategorycontroller);
router.put('/update-category/:id',Requiresign,isAdmin,updatecategory);
router.get('/get-category',CategoryController);
router.get('/single-category/:slug',singleCategory);
router.delete('/delete-category/:id',Requiresign,isAdmin,deleteCategory);
module.exports=router;