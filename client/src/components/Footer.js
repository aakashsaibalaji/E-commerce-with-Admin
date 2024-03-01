import React from 'react';
import '../style/Footer.css';
import { Link } from 'react-router-dom';
function Footer() {
    return (<>
    <div className='container-fluid main pt-3'>
        <div className='row'>
            <div className='col-lg-5 col-md-8 col-11'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/About'>About</Link></li>
                    <li><Link to='/'>products</Link></li>
                </ul>
            </div>
            <div className='col-lg-5 col-md-8 col-11'>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Signup</Link></li>
                    <li><Link to="/cart">cart</Link></li>
                </ul>
            </div>
            <div className='col-lg-2 col-md-8 col-11'>
                <ul>
                    <li><a href='/instagram'><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href='/twitter'><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href='/facebook'><i className="fa-brands fa-facebook"></i></a></li>
                </ul>
            </div>
        </div>
        <div className='row d-flex text-center'>
            <p>&copy;2024 Ecommerce. All rights reserved.</p>
        </div>
    </div>
    </>);
}

export default Footer;