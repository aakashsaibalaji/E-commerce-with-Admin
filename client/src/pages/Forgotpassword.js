import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
function Forgotpassword() {
    const [email,setEmail] =useState("");
    const [newpassword,setNewpassword] =useState("");
    const [nickname,setNickname] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(!email || !newpassword || !nickname){
                toast.warning('Enter all Fields');
            }
            const res =await axios.post(`http://localhost:5500/E-commerce/auth/forgotpassword`,{email,newpassword,nickname});
            if(res){
                toast.success("succesfull reset password");
                navigate('/login');
            }
        }catch (error) {
            console.error(error);
            if (error.response) {
              console.error("Response data:", error.response.data);
            }
            toast.error('unsuccesfull password reset');
          }
      };
    return (<>
    <Layout>
       <div>
           <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className="col-lg-5 col-md-8 col-11 mt-5 p-5 shadow mx-auto mb-5">
                        <h3>FORGOT PASSWORD</h3>
                        <div className="mb-3 mt-4">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}
                            value={email}/>
                        </div>
                        <input type="text" className="form-control mt-3" id="exampleFormControlInput1" placeholder="what is your Nickname" onChange={(e)=>{setNickname(e.target.value)}}
                            value={nickname}/>
                        <input type="password" id="inputPassword5" className="form-control mt-3" placeholder='New Password' onChange={(e)=>{setNewpassword(e.target.value)}}
                            value={newpassword}/>
                        <div id="passwordHelpBlock" className="form-text mb-2">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters.
                        </div>
                        <div className='mb-2'>
                            <button className='btn btn-primary' type='submit'>Reset password</button>
                        </div>
                        <div className="col">
                            <p>Go to<Link className='btn btn-link mb-1' to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </Layout>
    </>);
}

export default Forgotpassword;