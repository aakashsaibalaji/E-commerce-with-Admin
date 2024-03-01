import React from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/Cart.css';

function AddToCart() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  const totalprice =()=>{
    try{
        let total = 0;
        cart?.map((item)=>{
            total = total + item.price;
        });
        return total;
    }catch(error){
        console.log(error);
    }
  }
  const removeCartitem = (pid) =>{
    try{
        let myCart = [...cart]
        let index = myCart.findIndex(item => item._id === pid)
        myCart.splice(index,1)
        setCart(myCart);
        localStorage.setItem('cart',JSON.stringify(myCart));
    }catch(error){
        console.log(error);
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <h1>Your cart</h1>
          <div className="col-11 text-center">
            {`Welcome to cart ${auth?.token && auth?.user?.firstname}`}
          </div>
          <h4 className="text-center">
            {cart?.length >= 1
              ? `You have ${cart.length} Products in your cart ${
                  auth?.token ? '' : 'Please login to checkout'
                }`
              : 'Your cart is Empty'}
          </h4>
        </div>

        <div className="row">
          {cart?.map((p, index) => (
            <div key={index} className="col-lg-8 col-md-9 col-11">
              <div className="card p-4 mb-2 shadow">
                <div className="row">
                  {/* Cart image */}
                  <div className="col-md-5 col-11 mx-auto bg-light shadow d-flex justify-content-center align-items-center p_img">
                    {/* You may want to display the actual product image here */}
                    <img
                            src={`http://localhost:5500/E-commmerce/product/singlephotoproduct/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ objectFit: "cover", height: "16rem" }}
                            onClick={()=>navigate(`/product/${p.slug}`)}
                        />
                  </div>

                  {/* Product details */}
                  <div className="col-md-7 col-11 mx-auto px-4 mt-2">
                    <div className="row">
                      <div className="col-6 card-title">
                        <h3 className="mb-4 p_name">{p.name}</h3>
                        <p className="mb-2">{p.description}</p>
                        <p className="mb-2">Quantity Available: {p.quantity}</p>
                      </div>

                      {/* Increment buttons div */}
                      <div className="col-6">
                        <ul className="pagination justify-content-end s_quantity">
                          <li className="page-item">
                            <button className="page-link small-button" onClick={()=>{setCart([...cart,p]);
                             localStorage.setItem('cart',JSON.stringify([...cart,p]))
                             toast.success("Adding same item to cart Succesfully");}}>
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </li>
                          {/*<li className="page-item">
                            <input className="page-link small-input" value="0" id={`text-box-${index}`} /></li>*/}
                          <li className="page-item">
                            <button className="page-link small-button" onClick={()=> removeCartitem(p._id)}>
                              <i className="fa-solid fa-minus"></i>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-8 d-flex justify-content-between r_wish">
                        <p>
                          <i className="fa-solid fa-trash" onClick={()=> removeCartitem(p._id)}></i>REMOVE ITEM
                        </p>
                      </div>
                      <div className="col-4 d-flex justify-content-end p_money">
                        <h3>Rs <span id={`itemvalue-${index}`}>{p.price}</span></h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Right side section */}
          <div className='col-lg-4 col-md-6 col-11 text-center'>
                <h2>Cart Summary</h2>
                <p>Total | Payment | checkout</p>
                <hr/>
                <h4>Total Rs {totalprice()}</h4>
                {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address:</h5>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
         </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddToCart;
