import React from 'react';
import { NavLink } from 'react-router-dom';
function Usermenu() {
    return (<>
    <h3 className='mt-2'>USER MENU</h3>
    <ul className="list-group mb-5">
        <li className="list-group-item " aria-current="true"><NavLink to="/dashboard/user/profile">Profile</NavLink></li>
        <li className="list-group-item "><NavLink to="/dashboard/user/orders">Orders</NavLink></li>
    </ul>
    </>);
}

export default Usermenu;