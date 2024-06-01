import React, { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCartAction } from '../config/Action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SpecialProduct = ({ Products }) => {

    const [specialProducts, setSpecialProducts] = useState([]);

    useEffect(() => {
        const currentDate = new Date();

        const filteredProducts = Products.filter(product => {
            const productDate = new Date(product.datefin);
            return productDate > currentDate;
        });

        setSpecialProducts(filteredProducts);

        const interval = setInterval(() => {
            setSpecialProducts(prevProducts => {
                return prevProducts.map(product => {
                    const { days, hours, minutes, seconds } = calculateTimeRemaining(new Date(product.datefin));
                    return { ...product, days, hours, minutes, seconds };
                });
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [Products]);

    const calculateTimeRemaining = (endDate) => {
        const totalSeconds = Math.floor((endDate - new Date()) / 1000);

        const days = Math.floor(totalSeconds / (24 * 60 * 60));
        const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        return { days, hours, minutes, seconds };
    };

    const [ProductQuantity, setProductQuantity] = useState(1);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.carts);


    const handleClick = (product) => {
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            dispatch(addCartAction({
                id: product.id,
                ProductImage: product.img,
                ProductTitle: product.title,
                ProductPrice: product.price,
                ProductQuantity: ProductQuantity
            }));
            toast.success("The product has been added to the shopping cart successfully", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("The product is already in the shopping cart", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const [show, setShow] = useState(3);
    const handelShow = () => {
        setShow(show + show)
    }

    const slicedisplayedProducts = specialProducts.slice(0, show);
    const allProductsDisplayed = show >= specialProducts.length || show < slicedisplayedProducts.length;

    return (
        <div className="row">
            {slicedisplayedProducts.map((product) => {
                const averageRating = () => {
                    if (!product.reviews || product.reviews.length === 0) {
                        return 0;
                    }
                    const total = product.reviews.reduce((acc, review) => acc + review.review, 0);
                    return (total / product.reviews.length).toFixed(1);
                };
                return (
                    <div className="col-4 py-2" key={product.id}>
                        <div className="special-product-card">
                            <Link to={`/product/${product.id}`} className="d-flex justify-content-between text-dark">
                                <p className="percentage">-{product.percentage}%</p>
                                <div>
                                    <img src={`http://127.0.0.1:8000/${product.img}`} alt={product.title} width={150} />
                                </div>
                                <div className="special-product-content">
                                    <h6 className="brand">{product.brand}</h6>
                                    <h5 className="title">{product.title.length > 30 ? product.title.substring(0, 30) + '...' : product.title}</h5>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={parseFloat(averageRating())}
                                        edit={false}
                                        activeColor="#ffd700"
                                    />
                                    <p className="price fs-6">
                                        <span><span className="text-danger">{product.offerPrice} Dhs</span> &nbsp; <strike>{product.price} Dhs</strike></span>
                                    </p>
                                    <div className="discount-till d-flex align-items-center gap-15 pb-1">
                                        <p className="mb-0 fs-6">
                                            <span className="fs-5">{product.days}</span> Days
                                        </p>
                                        <div className="d-flex gap-0 align-items-center">
                                            <span className="badge">{product.hours}</span><span className="fs-6">:</span>
                                            <span className="badge">{product.minutes}</span><span className="fs-6">:</span>
                                            <span className="badge">{product.seconds}</span>
                                        </div>
                                    </div>
                                    <div className="prod-count my-3">
                                        <p style={{ fontSize: '12px' }}>Product: <span style={{ color: `${(product.quantities > 100 ? 'green ' : product.quantities > 50 ? 'yellow' : 'red')}`, fontWeight: '500' }}>{product.quantities}</span></p>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" style={{ width: `${(product.quantities / 10)}%`, backgroundColor: product.quantities > 100 ? 'green' : product.quantities > 50 ? 'yellow' : 'red' }} aria-valuenow={product.quantities} aria-valuemin="0" aria-valuemax="1000"></div>
                                        </div>
                                    </div>

                                    <button className="button" onClick={(e) => { e.preventDefault(); handleClick(product); }}>Add to cart</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
            {!allProductsDisplayed && (
                <div className="col-12 text-center">
                    <button onClick={handelShow} className="button mt-5">show more</button>
                </div>
            )}
        </div>
    );
};

export default SpecialProduct;
