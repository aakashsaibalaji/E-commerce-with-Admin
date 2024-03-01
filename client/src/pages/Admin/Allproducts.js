import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/Adminmenu';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
function AllProducts() {
    const [products,setProducts] = useState([])
    const getAllproducts = async()=>{
        try{
            const {data} = await axios.get('http://localhost:5500/E-commmerce/product/allproducts');
            setProducts(data.products)
        }catch(error){
            console.log(error);
            toast.error("something went wrong in getting products")
        }
    };
    useEffect(() => {
        getAllproducts();
    },[])
    return (<>
    <Layout>
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <AdminMenu/>
            </div>
            <div className='col-lg-9 col-md-11 col-11'>
                <h3 className='text-center'>All Products List</h3><br /><hr />
                <div className='d-flex flex-wrap justify-content-center'>
                    {products.map(p => (
                        <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} className="Product-card mb-2">
                        <div className="card col-lg-4 col-md-6 col-11 mx-2 mb-3" style={{ width: "18rem" }}>
                            <img
                            src={`http://localhost:5500/E-commmerce/product/singlephotoproduct/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ objectFit: "cover", height: "10rem" }}
                            />
                            <div className="card-body" style={{ height: "8rem" }}>
                            <h5 className="card-title">{p.name}</h5>
                            <p className="card-text">{p.description}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
    </>);
}

export default AllProducts;