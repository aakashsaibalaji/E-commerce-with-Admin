import React,{useEffect,useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
function Spinner({path = "/login"}) {
    const [count ,setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        const interval = setInterval(() => {
            setCount((c) => c - 1);
        }, 1000)
        count === 0 && navigate(`${path}`,{
            state:location.pathname
        });
        return ()=>clearInterval(interval);
    },[count,navigate,location,path]);
    return (<>
    <div>
       <div className="d-flex justify-content-center align-items-center" style={{height:"120vh"}}>
          <h3 className='Text-center mx-3'>Redirecting to Home {count} second</h3>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    </div>
    </>);
}

export default Spinner;