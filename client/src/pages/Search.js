import React from 'react';
import Layout from '../components/Layout';
import { useSearch } from '../context/search';
function Search() {
    const [values,setValues] = useSearch()
    return (<>
      <Layout>
        <div className='text-center'>
            <h5 className="mb-5 mt-2">Similar Products</h5>
            <h6>{values?.result.length<1? 'No products Found' : `Found ${values?.result.length}`}</h6>
        </div>
        <div className='d-flex flex-wrap justify-content-center'>
                    {values?.result.map(p => (
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
                            <button className='btn btn-primary mx-2 mt-1'>View Details</button>
                            <button className='btn btn-success mt-1'>Add to cart</button>
                        </div>
                        </div>
                    ))}
            </div>
      </Layout>
    </>);
}

export default Search;