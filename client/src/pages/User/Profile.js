import React, { useState ,useEffect } from 'react';
import Layout from '../../components/Layout';
import Usermenu from '../../components/Usermenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
function Profile() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");
    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const {email,firstname,lastname,address,phone} = auth?.user
        setFirstname(firstname);
        setLastname(lastname);
        setEmail(email);
        setAddress(address);
        setPhone(phone);
    },[auth.user])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put(`http://localhost:5500/E-commerce/auth/updateprofile`,{firstname,lastname,email,address,phone,password});
            if(data?.error){
                toast.error(data?.error)
            }
            else{
                setAuth({...auth,user:data?.updatedUser})
                let localstorage = localStorage.getItem("user")
                localstorage = JSON.parse(localstorage)
                localstorage = data.updatedUser
                localStorage.setItem("user",JSON.stringify(localstorage));
                toast.success("profile updated successfully");
            }
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
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <Usermenu/>
            </div>
            <div className='col-lg-8 col-md-11 col-11'>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className="col-lg-6 col-md-8 col-11 p-5 mx-auto mb-2">
                        <h3>Update Profile</h3>
                        <div className="mb-3 mt-3">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Fisrt Name" onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Last name" onChange={(e)=>{setLastname(e.target.value)}} value={lastname}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Address" onChange={(e)=>{setAddress(e.target.value)}} value={address}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Phone Number" onChange={(e)=>{setPhone(e.target.value)}} value={phone}/>
                        </div>
                        <div className="mb-3 mt-2">
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}} value={email} disabled/>
                        </div>
                        <input type="password" id="inputPassword5" className="form-control mb-2" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                        <div className='mb-2'>
                            <button className='btn btn-primary' type='submit'>UPDATE</button>
                        </div>
                    </div>
                   </div>
                 </form>
               </div>
            </div>
        </div>
       </Layout>
    </>);
}

export default Profile;