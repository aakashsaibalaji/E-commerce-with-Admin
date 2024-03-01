import React from 'react';
import { Link } from 'react-router-dom';
function Pagenotfound() {
    return (<>
     <div className='d-flex text-center justify-content-center'>
        <div>
            <h1 className="display-4 fw-bold">Page Not Found 404</h1>
            <Link to="/">Go Back</Link>
        </div>
     </div>
    </>);
}

export default Pagenotfound;