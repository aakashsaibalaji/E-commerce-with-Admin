import React from 'react';
import Layout from '../../components/Layout';
import Usermenu from '../../components/Usermenu';
import { useAuth } from '../../context/auth';
function Dashboard() {
    const [auth] =useAuth();
    return (<>
    <Layout>
       <div className='d-flex justify-content-center'>
           <h3>User Dashboard</h3>
        </div>
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <Usermenu/>
            </div>
            <div className='col-lg-8 col-md-11 col-11'>
                    <div className='card w-75 p-3 mb-5'>
                        <h5>Name :{auth.user.firstname}</h5>
                        <h5>Email :{auth.user.email}</h5>
                        <h5>Phone no :{auth.user.phone}</h5>
                        <h5>Address :{auth.user.address}</h5>
                    </div>
            </div>
        </div>
    </Layout>
    </>);
}

export default Dashboard;