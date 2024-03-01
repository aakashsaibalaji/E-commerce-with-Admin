import React from 'react';
import { NavLink } from 'react-router-dom';
function AdminMenu() {
    return (<>
    <h3 className='mt-2'>Admin Menu</h3>
    <ul className="list-group mb-5">
        <li className="list-group-item " aria-current="true"><NavLink to="/dashboard/admin/create-category">Create category</NavLink></li>
        <li className="list-group-item "><NavLink to="/dashboard/admin/create-product">Create Products</NavLink></li>
        <li className="list-group-item "><NavLink to="/dashboard/admin/allproducts">All-Products</NavLink></li>
        <li className="list-group-item "><NavLink to="/dashboard/admin/users">Users Details</NavLink></li>
    </ul>
    </>);
}

export default AdminMenu;