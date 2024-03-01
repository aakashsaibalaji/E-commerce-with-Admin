import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname,setNickname] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!firstname || !lastname || !email || !password){
                toast.warning('Enter all Fields');
            }
            await axios.post(`http://localhost:5500/E-commerce/auth/register`,{firstname,lastname,email,password,nickname,address,phone});
            toast.success("succesfull registered");
            navigate('/login')
        }catch (error) {
            console.error(error);
            if (error.response) {
            console.error("Response data:", error.response.data);
            }
            toast.error('Registration failed');
        }
    };
    return (<>
    <Layout>
        <div>
            <form onSubmit={handleSubmit}>
            <div className='row'>
                    <div className="col-lg-6 col-md-8 col-11 mt-5 p-5 shadow mx-auto mb-5">
                        <h3>Register</h3>
                        <div className="mb-3 mt-3">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Fisrt Name" onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last name" onChange={(e)=>{setLastname(e.target.value)}} value={lastname}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Nick name" onChange={(e)=>{setNickname(e.target.value)}} value={nickname}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Phone Number" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
                        </div>
                        <input type="password" id="inputPassword5" className="form-control" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                        <div id="passwordHelpBlock" className="form-text mb-2">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters.
                        </div>
                        <div className='mb-2'>
                            <button className='btn btn-primary' type='submit'>Register</button>
                        </div>
                        <div className="col">
                            <p>Login here<Link className='btn btn-link mb-1' to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
    </>);
}

export default Register;