import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout';
//import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import {Checkbox,Radio} from 'antd';
import {PriceFilter} from '../components/PriceFilter';
import { useNavigate } from 'react-router-dom';
import {useCart} from '../context/cart';
function HomePage() {
    const navigate = useNavigate();
    const [cart,setCart] = useCart();
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);
    const [checked,setChecked] = useState([]);
    const [radio,setRadio] = useState([]);
    const [total ,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    const getAllcategory = async()=>{
        try{
            const {data} = await axios.get('http://localhost:5500/E-commerce/categories/get-category')
            if(data?.success){
                setCategories(data?.category);
            }
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        getAllcategory();
        getTotal();
    },[]);
    const getTotal=async()=>{
        try{
            const {data} = await axios.get('http://localhost:5500/E-commmerce/product/productcount');
            setTotal(data.all)
        }
        catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(page === 1) return;
        loadmore()
    },[page])
    const loadmore = async()=>{
        try{
            const {data} = await axios.get(`http://localhost:5500/E-commmerce/product/productlist/${page}`);
            setLoading(false)
            setProducts([...products,...data?.products])
        }catch(error){
            console.log(error);
            setLoading(false)
        }
    }
    const handleFilter = (value,id)=>{
        let all = [...checked]
        if(value){
            all.push(id)
        }else{
            all = all.filter((item)=> item !== id)
        }
        setChecked(all)
    };
    const gettingProduct = async()=>{
        try{
            setLoading(true)
            const {data} = await axios.get(`http://localhost:5500/E-commmerce/product/productlist/${page}`);
            setLoading(false)
            setProducts(data.products);
        }catch(error){
            setLoading(false);
            console.log(error);
            toast.error("something went wrong");
        }
    }
    useEffect(()=>{
        if(!checked.length || !radio.length) gettingProduct();
    },[checked.length,radio.length]);
    const filterProduct = async()=>{
        try{
            const {data} = await axios.post('http://localhost:5500/E-commmerce/product/Productfilter',{checked,radio})
            setProducts(data?.products)
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
       if(checked.length || radio.length)filterProduct();
    },[checked,radio]);
    return (<>
    <Layout>
        <div className='row mt-2'>
            <div className='col-lg-3 col-md-6 col-11'>
                <h4 className="text-center">Filter by Category</h4>
                <div className='d-flex mx-1'>
                    {categories?.map(cate=>(
                        <Checkbox key={cate._id} onChange={(e)=>handleFilter(e.target.checked,cate._id)}>
                            {cate.name}
                        </Checkbox>
                    ))}
                </div>
                <h4 className="text-center">Filter the Product Price</h4>
                <div className='d-flex mx-1'>
                    <Radio.Group onChange={e=>setRadio(e.target.value)}>
                        {
                            PriceFilter.map(P=>(
                                <div key={P._id}>
                                    <Radio value={P.array}>{"Rs"} {P.name}</Radio>
                                </div>
                        ))}
                    </Radio.Group>
                </div>
            </div>
            <div className='col-lg-9 col-md-6 col-11'>
                <h3 className='text-center'>All-Products</h3>
                <div className='d-flex flex-wrap justify-content-center'>
                    {products.map(p => (
                        <div key={p._id} className="card col-lg-4 col-md-6 col-11 mx-2 mb-3" style={{ width: "18rem" ,height:"26rem"}}>
                        <img
                            src={`http://localhost:5500/E-commmerce/product/singlephotoproduct/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ objectFit: "cover", height: "14rem" }}
                        />
                        <div className="card-body" style={{ height: "8rem" }}>
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description.substring(0,30)}...</p>
                            <p className="card-text">{"Rs "}{p.price}</p>
                            <button className='btn btn-primary mx-2 mt-1' onClick={()=>navigate(`/product/${p.slug}`)}>View Details</button>
                            <button className='btn btn-success mt-1'
                             onClick={()=>{setCart([...cart,p]);
                             localStorage.setItem('cart',JSON.stringify([...cart,p]))
                             toast.success("Add to cart Succesfully");}}>Add to cart</button>
                        </div>
                        </div>
                    ))}
                </div>
                <div className='m-2 p-2 text-center'>
                    {products && products.length <total && (
                        <button className='btn btn-warning' onClick={(e)=>{e.preventDefault(); setPage(page+1)}}>
                            {loading ? "loading..." : "Loadmore"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    </Layout>
    </>);
}

export default HomePage;