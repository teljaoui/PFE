import React, { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { searchAction } from '../config/Action';
import axios from 'axios';


export const Header = () => {
  const location = useLocation()
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categorielist').then
      ((res) => { setCategories(res.data) })
  }, []);
  const carts = useSelector((state) => state.carts);

  const calculateTotal = () => {
    let totalPrice = 0;
    carts.forEach((product) => {
      totalPrice += product.ProductQuantity * product.ProductPrice;
    });
    return totalPrice;
  };

  const handelSearch = (search) => {
    dispatch(searchAction(
      { search: search }
    )
    )
  }
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
      <header className="header-top-strip py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6 d-start">
              <p className=" text-white mb-0">
                Free Shipping  & Freee Returns
              </p>
            </div>
            <div className="col-6 d-end">
              <p className="text-end text-white mb-0">
                Hotline:{" "}
                <a className="text-white" href="tel:+212652583234">
                  +212652583234
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="logo">tim tech</Link>
              </h2>
            </div>
            <Link to="/store" className="col-5 search">
              <div class="input-group ">
                <input
                  className="form-control py-2"
                  type="text"
                  placeholder="Search Prodcut Here..."
                  onChange={(e) => handelSearch(e.target.value)}
                />

                <span className="input-group-text py-2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </Link>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center float-end">
                <div>
                  <Link to="/wishlist" className="d-flex align-items-center gap-10 text-white  me-3">
                    <img src="/images/wishlist.svg" alt="wishlist" />
                    <p className="mb-0">
                      Favorite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to="/login" className="d-flex align-items-center gap-10 text-white  me-3">
                    <img src="/images/user.svg" alt="user" />
                    {user ? (
                      <p className="mb-0">
                        Welcome, <br /> {user.name}
                      </p>
                    ) : (
                      <p className="mb-0">
                        Login in <br /> My Account
                      </p>
                    )}
                  </Link>
                </div>
                <div>
                  <Link to="/cart" className="d-flex align-items-center gap-10 text-white ">
                    <img src="/images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-1">
                      <span className="badge bg-white text-dark"> {calculateTotal()}</span>
                      <p className="mb-0 fw-normal">Panier</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header >
      <header className="header-bottom py-1">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div class="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex  align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="/images/menu.svg" alt="" />
                      <span className="me-5 d-inline-block">Shop Categories</span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {
                        Categories.map(
                          (categorie => (
                            <li key={categorie.id}>
                              <Link to={`/store/${categorie.title}`} className="dropdown-item text-white">
                                {categorie.title.replace(/_/g, " ")}
                              </Link>
                            </li>
                          ))
                        )
                      }
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    {
                      location.pathname !== "/" && (
                        <NavLink to="/">Home</NavLink>
                      )
                    }
                    {
                      location.pathname !== "/store" && (
                        <NavLink to="/store">Our Store</NavLink>
                      )
                    }
                    {
                      location.pathname === "/" && (
                        <a href="#special">Special Product</a>

                      )
                    }
                    {
                      location.pathname !== "/contact" && (
                        <NavLink to="/contact">Contact</NavLink>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    </>
  );
};
