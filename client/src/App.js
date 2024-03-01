//import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/auth';
import Dashboard from './pages/User/Dashboard';
import Pagenotfound from './pages/Pagenofound';
import About from './pages/About';
import PrivateRoute from './components/routes/Private';
import Forgotpassword from './pages/Forgotpassword';
import AdminprivateRoute from './components/routes/adminPrivate';
import Admindashboard from './pages/Admin/Admindashboard';
import Users from './pages/Admin/Users';
import Createcategory from './pages/Admin/Createcategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Orders from './pages/User/Orders';
import Profile from './pages/User/Profile';
import AllProducts from './pages/Admin/Allproducts';
import UpdateProduct from './pages/Admin/Updateproduct';
import { SearchProvider } from './context/search';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './context/cart';
import Addtocart from './pages/Addtocart';
function App() {
  return (
    <div>
    <AuthProvider>
      <SearchProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/product/:slug' element={<ProductDetail/>}/>
              <Route path='/cart' element={<Addtocart/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/dashboard' element={<PrivateRoute/>}>
                <Route path='user' element={<Dashboard/>}/>
                <Route path='user/profile'element={<Profile/>}/>
                <Route path='user/orders' element={<Orders/>}/>
              </Route>
              <Route path='/dashboard' element={<AdminprivateRoute/>}> 
                <Route path='admin'element={<Admindashboard/>}/>
                <Route path='admin/create-category' element={<Createcategory/>}/>
                <Route path='admin/users' element={<Users/>}/>
                <Route path='admin/create-product' element={<CreateProduct/>}/>
                <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
                <Route path='admin/allproducts'element={<AllProducts/>}/>
              </Route>
              <Route path='/About' element={<About/>}/>
              <Route path='/forgotpassword'element={<Forgotpassword/>}/>
              <Route path='*' element={<Pagenotfound/>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SearchProvider>
    </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
