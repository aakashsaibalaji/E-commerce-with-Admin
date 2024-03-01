import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth';
import {useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
function Login() {
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [auth,setAuth] = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!email || !password){
                toast.warning('Enter all Fields');
            }
            const res =await axios.post(`http://localhost:5500/E-commerce/auth/login`,{email,password});
            if(res){
                toast.success("succesfull Login");
                setAuth({...auth,user : res.data.user,token : res.data.token })
                localStorage.setItem("user",JSON.stringify(res.data));
                navigate(location.state ||'/');
            }
        }catch (error) {
            console.error(error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
            toast.error('Login falied');
          }
      };
    return (<>
    <Layout>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-lg-5 col-md-8 col-11 mt-5 p-5 shadow mx-auto mb-5">
                        <h3>LOGIN</h3>
                        <div className="mb-3 mt-4">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}
                            value={email}/>
                        </div>
                        <input type="password" id="inputPassword5" className="form-control" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}}
                            value={password}/>
                        <div id="passwordHelpBlock" className="form-text mb-2">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters.
                        </div>
                        <div className='mb-2'>
                            <Link to='/forgotpassword'>Forgot password</Link>
                        </div>
                        <div className='mb-2'>
                            <button className='btn btn-primary' type='submit'>Login</button>
                        </div>
                        <div className="col">
                            <p>Don't have an account?<Link className='btn btn-link mb-1' to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
    </>);
}

export default Login;