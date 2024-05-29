import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from './Header';
import { Footer } from './Footer';
const Layout = ({Categories}) => {
    return (
        <>
            <Header Categories={Categories}/>
            <Outlet />
            <Footer Categories={Categories}/>

        </>
    )
}
export default Layout;
