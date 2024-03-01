import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
export default function AdminprivateRoute(){
    const [ok ,setOk] = useState(false);
    const [auth] =useAuth();
    useEffect(()=>{
        const authCheck =async()=>{
            const res = await axios.get('http://localhost:5500/E-commerce/auth/adminauth');
            if(res.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        if(auth?.token) authCheck();
    },[auth?.token])
    return ok ? <Outlet/>: <Spinner path=""/>
}