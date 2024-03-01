const Products = require('../Model/product');
const fs = require('fs');
const slugify =require('slugify');
const product = require('../Model/product');
//The controller function will read the Products details from Frontend and store in database.
const createProduct=async(req,res)=>{
    try{
        const {name,slug,description,price,category,quantity,shipping} =req.fields;
        const {photo} = req.files;
        if(!name || !description||!price||!category|| !quantity){
            return res.status(400).send({
                success:false,
                msg:"Please enter the all fields"});
        }
        if( photo && photo.size >1000000){
            return res.status(401).send({
                success: false,
                error:"Photo is requried and should be less than 1mb"
            });
        }
        const products = new Products({...req.fields,slug:slugify(name)})
        if(photo) {
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"successfully created a Product",
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            msg:"Something went wrong in Creating product"
        })
    }
}
//The controller will get the all the products are available.
const GetTheProducts=async(req,res)=>{
    try{
       const products = await Products.find({}).select("-photo").limit(12).sort({createdAt:-1})
       res.status(200).send({
         sucess:true,
         message:"Allproducts",
         TotalProducts:products.length,
         products
       })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            msg:'Server Error in Showing products'
        });
    }
}
//The controller will show the single product details based on slug name.
const singleProduct=async(req,res)=>{
    try{
        let product = await Products.findOne({slug:req.params.slug}).select("-photo").populate("category");
        res.status(200).send({
            success:true,
            msg:"single product details.",
            product
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            msg:`product with the id of ${req.params.id} is not found`
        })
    }
}
//controller will get the image based on id.
const singlePhotoProduct = async(req,res)=>{
    try{
        const product = await Products.findById(req.params.id).select("photo")
        if(product.photo.data){
            res.set('Content-type',product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            msg: "something went wrong in getting the product based on Image"
        })
    }
}
const deleteProduct = async(req,res)=>{
    try{
        await Products.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success : true,
            msg : 'Product has been deleted successfully.'
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            msg:"Something went wrong in Deleting the Product"
        })
    }
}
const updateProduct = async(req, res) => {
    try{
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;
        if(!name || !description||!price||!category|| !quantity){
            return res.status(400).send({
                success:false,
                msg:"Please enter the all fields"});
        }
        if( photo && photo.size >1000000){
            return res.status(401).send({
                success: false,
                error:"Photo is requried and should be less than 1mb"
            });
        }
        const products = await Products.findOneAndUpdate(
            { _id: req.params.id },
            {...req.fields,slug:slugify(name)},
            { new: true }
        );
        if(photo) {
            products.photo.data=fs.readFileSync(photo.path);
            products.photo.contentType=photo.type
        }
        await products.save()
        res.status(201).send({
            success:true,
            message:"successfully updated a Product",
            products
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            msg:"Something went wrong in updating product"
        })
    }
}
const ProductFilter = async(req,res)=>{
    try{
        const {checked,radio} = req.body;
        let args = {}
        if(checked.length >0) args.category = checked
        if(radio.length) args.price = {$gte: radio[0],$lte:radio[1]}
        const products = await Products.find(args)
        res.status(200).send({
            success:true,
            products
        });
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Something went wrong in Server filtering"
        })
    }
}
const ProductCount = async(req,res)=>{
    try{
        const all = await Products.find({}).estimatedDocumentCount();
        res.status(200).send({
            success:true,
            all,
        }) 
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"something went wrong in Productcount server"
        });
    }
}
const Productlistpage = async(req,res)=>{
    try{
        const Perpage = 6
        const page = req.params.p ? req.params.p :1
        const products = await Products.find({}).select("-photo").skip((page-1)*Perpage).limit(Perpage).sort({createdAt:-1})
        res.status(200).send({
            success:true,
            products,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            msg:"Something went wrong in getting listpage from server"
        })
    }
}
const Searchproduct = async(req,res)=>{
    try{
        const {keyword} = req.params
        const result = await Products.find({
            $or: [
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]
        }).select("-photo");
        res.json(result);
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:true,
            msg:"Something went Wrong with Search server"
        })
    }
}

module.exports={createProduct,GetTheProducts,singleProduct,
    singlePhotoProduct,deleteProduct,updateProduct,ProductFilter,ProductCount,Productlistpage,Searchproduct};