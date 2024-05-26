import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import OurStore from './pages/OurStore';
import Wishlist from './pages/Wishlist';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Forgotpassword from './pages/Forgotpassword';
import Resetpassword from './pages/Resetpassword';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import FinalCommande from './pages/FinalCommande';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/store' element={<OurStore />} />
            <Route exact path='/store/:category' element={<OurStore />} />
            <Route path='/product/:id' element={<SingleProduct />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotpassword' element={<Forgotpassword />} />
            <Route path='/resetpassword' element={<Resetpassword />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/finalOrder' element={<FinalCommande />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
