const Category = require('../Model/category');
const slugify =require('slugify');
const CreateCategorycontroller= async(req,res)=>{
    try{
        const {name} =req.body
        if(!name){
            return res.status(400).json({msg:"Please enter a valid name"});
        }
        const Existingcategory = await Category.findOne({ name });
        if(Existingcategory) {
            return  res.status(409).json({msg:'This Category already exists'})
        }
        const category = await new Category({name,slug:slugify(name)}).save()
        res.status(200).send({
            succes:true,
            msg:"New category is Created",
            category,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            succes:false,
            msg:"some thing went wrong"
        })
    }
}
const updatecategory=async(req,res)=>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        if(!name){
            return res.status(400).json({msg:"please provide the field of name"});
        }
        const category = await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            succes:true,
            msg:`The category has been updated`,
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false ,
            msg : "Internal Error"
        });
    }
}
const CategoryController = async (req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).send({
            success: true,
            msg: 'All Categories List',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "Internal server error"
        });
    }
};
const singleCategory = async(req,res)=>{
    try{
        const category = await Category.findOne({slug:req.params.slug})
        res.status(200).send({
            succes:true,
            msg:"get Single Category is Successfully",
            category
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false ,
            msg : "something went wrong"   
        })
    }
};
const deleteCategory = async(req,res)=>{
    try{
        const {id} =req.params
        await Category.findByIdAndDelete(id)
        res.status(200).send({
            success : true ,
            msg : "Delete Category Is Successfully"
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success : false ,
            msg : "Something Went Wrong in server"
        })
    }
}

module.exports={CreateCategorycontroller,updatecategory,CategoryController,singleCategory,deleteCategory};