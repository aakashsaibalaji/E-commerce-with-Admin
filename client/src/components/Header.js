import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Searchbar from './Forms/Searchbar';
//import Dropdown from 'react-bootstrap/Dropdown';
import { useCart } from '../context/cart';
import { Badge } from 'antd';
function Header() {
    const [auth,setAuth] =useAuth();
    const [cart] = useCart();
    const handleLogout =()=>{
        setAuth({
            ...auth,user:null,token:'',
        })
        localStorage.removeItem('user');
        toast.success("succesfully Logout");
    }
    return (<>
    <div>
        <Navbar expand="lg" className="bg-body-tertiary d-block d-sm-block d-md-block d-lg-none">
            <Container fluid>
                <div>
                  <Navbar.Brand>E-Commerce</Navbar.Brand>
                </div>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                  <Navbar.Collapse id="navbarScroll">
                      <Nav
                          className="me-auto my-2 my-lg-0"
                          style={{ maxHeight: '200px' }}
                          navbarScroll
                      >
                        <div className="mt-1 mx-5">
                          <Searchbar/>
                        </div>
                        <LinkContainer to="/">
                        <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/" >
                          <Nav.Link>category</Nav.Link>
                        </LinkContainer>
                      {!auth.user ?(<>
                        <LinkContainer to="/login">
                          <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/register">
                        <Nav.Link>Signup</Nav.Link>
                      </LinkContainer>
                      </>):(<>
                        <LinkContainer to={`/dashboard/${auth?.user.role === 1 ? "admin" :"user"}`}>
                          <Nav.Link >Dashboard</Nav.Link>
                        </LinkContainer>
                        <LinkContainer onClick={handleLogout} to="/login">
                          <Nav.Link >LOGOUT</Nav.Link>
                        </LinkContainer>
                      </>)}
                      <Badge count={cart?.length} showZero>
                          <LinkContainer to="/cart">
                            <Nav.Link className=' mt-1 mx-3'><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                          </LinkContainer>
                      </Badge>
                      </Nav>
                  </Navbar.Collapse>
            </Container>
        </Navbar>
        <Navbar expand="lg" className="bg-body-tertiary d-none d-lg-block">
            <Container fluid className='d-flex justify-content-between'>
                <div>
                  <Navbar.Brand>E-Commerce</Navbar.Brand>
                </div>
                <div>
                  <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '200px' }}
                            navbarScroll
                        >
                        <div className="mt-1 mx-5">
                          <Searchbar/>
                        </div>
                        <LinkContainer to="/" className='mx-2'>
                          <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        {!auth.user ?(<>
                          <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/register">
                          <Nav.Link>Signup</Nav.Link>
                        </LinkContainer>
                        </>):(<>
                          <NavDropdown
                              id="nav-dropdown-dark-example"
                              title={auth?.user?.firstname}
                              menuVariant="light"
                              className='mx-1'
                            >
                              <NavDropdown.Item ><LinkContainer to={`/dashboard/${auth?.user.role === 1 ? "admin" :"user"}`}>
                                <Nav.Link >Dashboard</Nav.Link>
                                </LinkContainer></NavDropdown.Item>
                              <NavDropdown.Item>
                              <LinkContainer onClick={handleLogout} to="/login">
                                <Nav.Link >LOGOUT</Nav.Link>
                                </LinkContainer>
                              </NavDropdown.Item>
                          </NavDropdown>
                        </>)}
                          <Badge count={cart?.length} showZero>
                          <LinkContainer to="/cart">
                            <Nav.Link className=' mt-1 mx-3'><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                          </LinkContainer>
                          </Badge>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Container>
        </Navbar>
    </div>
    </>);
}

export default Header;
