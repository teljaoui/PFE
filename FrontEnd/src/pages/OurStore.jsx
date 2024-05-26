import React, { useContext } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { HiMiniBars4 } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';

export default function OurStore() {
    const Products = useContext(ProductContext);
    const [Categories, setCategories] = useState([]);
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/categorielist').then
        ((res) => { setCategories(res.data) })
    }, []);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const [clickedButton, setClickedButton] = useState(3);

    const handleClick = (buttonNumber) => {
        setClickedButton(buttonNumber);
    }

    function getRandomProducts() {
        const randomIndexes = [];
        while (randomIndexes.length < 2) {
            const randomIndex = Math.floor(Math.random() * Products.length);
            if (!randomIndexes.includes(randomIndex)) {
                randomIndexes.push(randomIndex);
            }
        }
        return randomIndexes.map((index) => Products[index]);
    }
    const randomProducts = getRandomProducts();


    const [categorie, setcategorie] = useState(null);
    const { category } = useParams();

    useEffect(() => {
        if (category) {
            setcategorie(category);
        } else {
            setcategorie(null);
        }
    }, [category]);

    const [priceFrom, setPriceFrom] = useState();
    const [priceTo, setPriceTo] = useState();
    return (
        <>
            <Meta title={"Our Store"} />
            <BreadCrumb title="Our Store" />
            <div className="store-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-3">
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    Shop By Categories
                                    <div>
                                        <ul>
                                            <li> <Link to="/store">All Products </Link></li>
                                            {
                                                Categories.map((categorie => (
                                                    <li key={categorie.title}>
                                                        <Link to={`/store/${categorie.title}`}>
                                                            {categorie.title.replace(/_/g, " ")}
                                                        </Link>
                                                    </li>
                                                )))
                                            }
                                        </ul>
                                    </div>
                                </h3>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    Filter By
                                </h3>
                                <h5 className="sub-title py-1">Price</h5>
                                <div className="d-flex align-items-center">
                                    <div className=" m-1">
                                        <input type="number" className="form-control" placeholder="From" onChange={(e) => setPriceFrom(e.target.value)} />
                                    </div>
                                    <div className="m-1">
                                        <input type="number" className="form-control" placeholder="To" onChange={(e) => setPriceTo(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="filter-card mb-3">
                                <h3 className="filter-title">
                                    Random Product
                                </h3>
                                <div>
                                    {
                                        randomProducts.map((product => {
                                            const isOfferExpired = new Date(product.datefin) > new Date();
                                            const isOfferValid = product.offer && isOfferExpired;

                                            return (
                                                <Link to={`/product/${product.id}`} className="random-products d-flex  mt-3" key={product.id}>
                                                    {isOfferValid && (
                                                        <p className="percentage">-{product.percentage}%</p>
                                                    )}
                                                    <div className="w-50">
                                                        <img src={`http://127.0.0.1:8000/${product.img}`} alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="w-50">
                                                        <h5>
                                                            {product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title}
                                                        </h5>
                                                        <ReactStars
                                                            count={5}
                                                            size={20}
                                                            value={product.review}
                                                            edit={false}
                                                            activeColor="#ffd700"
                                                        />
                                                        <p className="price">
                                                            {isOfferValid ? (
                                                                <span>
                                                                    <span className="text-danger">${product.offerPrice}</span> &nbsp;
                                                                    <strike>$ {product.price}</strike>
                                                                </span>
                                                            ) : (
                                                                `$ ${product.price}`
                                                            )}
                                                        </p>
                                                    </div>
                                                </Link>
                                            );
                                        }))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="filter-sort-grid mb-4">
                                <div className="d-flex align-items-center justify-content-end gap-10">
                                    <p className="totalproducts mb-0">{Products.length} Products</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <button onClick={() => handleClick(3)} className={clickedButton === 3 ? "clicked" : ""}><HiMiniBars4 className="icons" /></button>
                                        <button onClick={() => handleClick(12)} className={clickedButton === 12 ? "clicked" : ""}><FaBars className="icons" /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="products-list d-flex flex-wrap pb-5">
                                <ProductCard Products={Products}  clickedButton={clickedButton} categorie={categorie} priceFrom={priceFrom} priceTo={priceTo} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
