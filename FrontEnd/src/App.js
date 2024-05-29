import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

function App() {
  const [Products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/productlist'),
          axios.get('http://127.0.0.1:8000/api/categorielist'),
        ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return <div class="loader"></div>;
  }
  if (error) {
    return <div>Erreur lors de la récupération des données. Veuillez réessayer plus tard.</div>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout Categories={Categories}/>}>
            <Route index element={<Home Products={Products} Categories={Categories}/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/store' element={<OurStore Products={Products} Categories={Categories} />} />
            <Route exact path='/store/:category' element={<OurStore Products={Products} Categories={Categories} />} />
            <Route path='/product/:id' element={<SingleProduct Products={Products}/>} />
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
