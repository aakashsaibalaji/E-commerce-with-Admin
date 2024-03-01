import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/Adminmenu';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate,useParams} from 'react-router-dom';
const {Option} = Select
function UpdateProduct() {
    const Navigate =useNavigate()
    const params = useParams();
    const [categories,setCatogories] = useState([])
    const [category,setCategory] = useState("");
    const [name ,setName] = useState("");
    const [photo,setPhoto] = useState("");
    const [description,setDescription] = useState("");
    const [price, setPrice]= useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping ,setShipping] = useState("");
    const [id,setId] = useState("")
    
    const getSingleproduct=async()=>{
        try{
            const {data} = await axios.get(`http://localhost:5500/E-commmerce/product/singleproduct/${params.slug}`)
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);
        }catch(error){
            console.log(error);
        }
    }
    const handledelete=async()=>{
        try{
            let question = window.prompt('Please Confirm to Delete the Product');
            if(!question) return
            await axios.delete(`http://localhost:5500/E-commmerce/product/deleteproduct/${id}`)
            toast.success('Delete Successfully')
            Navigate("/dashboard/admin/allproducts")
        }catch(error){
            console.log(error)
            toast.error("something went wrong in Deleting the Product");
        }
    }
    const handleupdate=async(e)=>{
        e.preventDefault()
        try{
            if(name==="" || category ===""|| price===""|| quantity==="" || description===""){
                toast.error('Please fill all fields name,category,price,quantity')
            }
            const productdata = new FormData()
            productdata.append("name",name)
            productdata.append("description",description)
            productdata.append("price",price);
            productdata.append("category",category)
            productdata.append("quantity",quantity)
            photo && productdata.append("photo",photo)
            productdata.append("shipping",shipping);
            const {data} = await axios.put(`http://localhost:5500/E-commmerce/product/updateproduct/${id}`,productdata)
            if(data.success){
                toast.success(`successfully updated the Product`);
                Navigate('/dashboard/admin/allproducts');
            }
        }catch(error){
            console.log(error)
            toast.error("unsuccessfull in Creating the product");
        }
    }
    const getAllcategory = async()=>{
        try{
            const {data} = await axios.get('http://localhost:5500/E-commerce/categories/get-category')
            if(data?.success){
                setCatogories(data?.category);
            }
        }catch(error){
            console.log(error);
            toast.error("unsuccesfull getting values");
        }
    }
    useEffect(()=>{
        getAllcategory();
        getSingleproduct()
    },[]);
    return (<>
    <Layout>
        <div className='d-flex justify-content-center'>
            <h3>Update Product</h3>
        </div>
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <AdminMenu/>
            </div>
            <div className='col-lg-8 col-md-11 col-11'>
                <div className='mt-1 w-70'>
                    <Select bordered={false} placeholder="Select a category" size='large' 
                     showSearch className='form-select mb-3' onChange={(value) => {
                        setCategory(value);
                      }}
                      value={category}>
                        {categories?.map(P=>(
                            <Option key={P._id} value={P._id}>{P.name}</Option>
                        ))}
                    </Select>
                    <div className='mb-3 text-center'>
                        <label className='btn btn-outline-secondary'>
                            {photo ? photo.name:"Upload photo"} 
                            <input type="file" name="photo" accept="image/*" 
                            onChange={(e)=>setPhoto(e.target.files[0])}
                            hidden />
                        </label>
                    </div>
                    <div className='mb-3 text-center'>
                        {photo ? (
                            <img src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            className='img img-responsive'/>
                        ):(
                            <img src={`http://localhost:5500/E-commmerce/product/singlephotoproduct/${id}`}
                            alt="product_photo"
                            height={"200px"}
                            className='img img-responsive'/>
                        )}
                    </div>
                    <div className='mb-2'>
                        <input type='text' value={name} placeholder='Write Product name'
                         className='form-control' onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <textarea type='text' value={description} placeholder='Write Product Description'
                         className='form-control' onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <input type='number' value={price} placeholder='Write Product price'
                         className='form-control' onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                    <div className='mb-2'>
                        <input type='number' value={quantity} placeholder='Write Product Quantity'
                         className='form-control' onChange={(e)=>setQuantity(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <Select
                        bordered={false}
                        placeholder="Select Shipping "
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                            setShipping(value);
                        }}
                        value={shipping ? "yes" : "No"}
                        >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                        </Select>
                    </div>
                    <div className='mb-2'>
                        <button className='btn btn-primary' onClick={handleupdate}>
                            Update Product
                        </button>
                    </div>
                    <div className='mb-2'> 
                        <button className='btn btn-danger' onClick={handledelete}>
                            Delete Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
    </>);
}

export default UpdateProduct;