import React,{useState,useEffect} from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
function ProductDetail() {
    const params = useParams();
    const [product ,setProduct] = useState({})
    useEffect(()=>{
        if(params?.slug)getProduct()
    },[params?.slug])
    const getProduct = async()=>{
        try{
            const {data} = await axios.get(`http://localhost:5500/E-commmerce/product/singleproduct/${params.slug}`)
            setProduct(data?.product)
        }catch(error){
            console.log(error);
        }
    }
    return (<>
    <Layout>
        <div className='row mt-2'>
            <div className='col-lg-6 col-md-8 col-11'>
                <div className='shadow mt-2 mb-2 mx-1'>
                    <img
                        src={`http://localhost:5500/E-commmerce/product/singlephotoproduct/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{  objectFit: "cover" ,height: "30rem" }}
                    />
                </div>
            </div>
            <div className='col-lg-5 col-md-8 col-11 mt-2'>
                <h2 className='text-center'>Product-Details</h2>
                <h4>Name:{product.name}</h4> 
                <h4>Description:{product.description}</h4>  
                <h4>Price:{product.price}</h4>
                <button className='btn btn-primary mt-4'>Add to cart</button>         
            </div>
        </div>
    </Layout>
    </>);
}

export default ProductDetail;