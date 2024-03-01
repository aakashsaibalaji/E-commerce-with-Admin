import {useState,useContext,createContext, useEffect} from 'react';
import axios from 'axios';
//I have created a global variable and I have used context api.
const AuthContext = createContext();

const AuthProvider =({children})=>{
    const [auth,setAuth] = useState({
        user:null,
        token:"",
    });
    axios.defaults.headers.common['Authorization']=auth?.token
    useEffect(()=>{
        const data =localStorage.getItem('user');
        if(data){
            const parseData =JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData.user,
                token: parseData.token,
            });
        }
    },[]);
    return (
        <AuthContext.Provider value={[auth,setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () =>useContext(AuthContext);

export {useAuth,AuthProvider};