import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from './Header';
import { Footer } from './Footer';
import axios from "axios";
const Layout = ({Categories}) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
    
            });
            setUser(response.data);
          } catch (error) {
            console.log('error')
          }
        };
    
        fetchUserData();
      }, [])

    return (
        <>
            <Header Categories={Categories} user={user}/>
            <Outlet />
            <Footer Categories={Categories} user={user}/>

        </>
    )
}
export default Layout;
