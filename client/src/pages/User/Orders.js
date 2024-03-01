import React from 'react';
import Layout from '../../components/Layout';
import Usermenu from '../../components/Usermenu';
function Orders() {
    return (<>
    <Layout>
        <div className='d-flex justify-content-center'>
           <h3>Orders</h3>
        </div>
        <div className='row'>
            <div className='col-lg-3 col-md-8 col-11'>
                <Usermenu/>
            </div>
            <div className='col-lg-8 col-md-11 col-11'>
            </div>
        </div>
       </Layout>
    </>);
}

export default Orders;