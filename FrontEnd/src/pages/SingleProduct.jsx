import React, { useState, useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import ReactStars from "react-rating-stars-component";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams, useNavigate } from 'react-router-dom';
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaHeadset } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addCartAction, addwishlistAction } from '../config/Action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedCollection from '../components/FeaturedCollection';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const SingleProduct = ({ Products }) => {
    const { id } = useParams();
    const Product = Products.find(p => p.id === parseInt(id));

    const [ProductImage, setProductImage] = useState(Product ? Product.img : '');
    const [ProductQuantity, setProductQuantity] = useState(1);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [currentProductId, setCurrentProductId] = useState(Product ? Product.id : null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector(state => state.carts);
    const wishlistItems = useSelector(state => state.wishlist);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setProductImage(Product.img)
    }, [Product]);

    useEffect(() => {
        if (Product && Product.datefin) {
            const calculateTimeRemaining = () => {
                if (new Date(Product.datefin) > new Date()) {
                    const currentDate = new Date();
                    const endDate = new Date(Product.datefin);

                    const totalSeconds = Math.floor((endDate - currentDate) / 1000);

                    const days = Math.floor(totalSeconds / (24 * 60 * 60));
                    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
                    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
                    const seconds = Math.floor(totalSeconds % 60);

                    setTimeRemaining({ days, hours, minutes, seconds });
                } else {
                    setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            };

            calculateTimeRemaining();

            const interval = setInterval(calculateTimeRemaining, 1000);

            return () => clearInterval(interval);
        }
    }, [Product]);

    const handleClick = (Product) => {
        const isProductInCart = cartItems.some(item => item.id === Product.id);
        if (!isProductInCart) {
            dispatch(addCartAction({
                id: Product.id,
                ProductImage: ProductImage,
                ProductTitle: Product.title,
                ProductPrice: Product.price,
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
    };

    const checkout = (Product) => {
        const isProductInCart = cartItems.some(item => item.id === Product.id);
        if (!isProductInCart) {
            dispatch(addCartAction({
                id: Product.id,
                ProductImage: ProductImage,
                ProductTitle: Product.title,
                ProductPrice: Product.price,
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
        navigate('/checkout');
    };

    const addwishlist = (Product) => {
        const isProductInWishlist = wishlistItems.some(item => item.id === Product.id);
        if (!isProductInWishlist) {
            dispatch(addwishlistAction({
                id: Product.id,
                ProductImage: ProductImage,
                ProductTitle: Product.title,
                ProductReview: Product.review,
                ProductPrice: Product.price,
            }));
            toast.success("The product has been added to the wishlist successfully", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error("The product is already in the wishlist", {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const toggleReviewForm = () => {
        setShowReviewForm(!showReviewForm);
    };

    if (!Product) {
        return <div class="loader"></div>;
    }
    return (
        <>
            <Meta title={Product.title} />
            <BreadCrumb title={Product.title} />
            <div className="main-product-wrapper py-5 home-wrapper-2" id={Product.title}>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <div className="main-product-image">
                                <div>
                                    {Product.offer && Product.datefin && new Date(Product.datefin) > new Date() && (
                                        <p className="percentage">-{Product.percentage}%</p>
                                    )}
                                    <Zoom>
                                        <img src={`http://127.0.0.1:8000/${ProductImage}`} alt="" />
                                    </Zoom>
                                </div>
                            </div>
                            <div className="other-product-images d-flex">
                                <div><img src={`http://127.0.0.1:8000/${Product.img}`} onClick={() => setProductImage(Product.img)} alt="" /></div>
                                <div><img src={`http://127.0.0.1:8000/${Product.img2}`} onClick={() => setProductImage(Product.img2)} alt="" /></div>
                                <div><img src={`http://127.0.0.1:8000/${Product.img3}`} onClick={() => setProductImage(Product.img3)} alt="" /></div>
                                <div><img src={`http://127.0.0.1:8000/${Product.img4}`} onClick={() => setProductImage(Product.img4)} alt="" /></div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="main-product-details">
                                <div className="border-bottom">
                                    <h5>{Product.title}</h5>
                                </div>
                                <div className="border-bottom">
                                    {Product.offer && new Date(Product.datefin) > new Date() ? (
                                        <div>
                                            <p className="price mt-2">
                                                <span>
                                                    <span className="text-danger">${Product.offerPrice}</span> &nbsp;
                                                    <strike>${Product.price}</strike>
                                                </span>
                                            </p>

                                            <div className="discount-till d-flex align-items-center gap-15 pb-1">
                                                <p className="mb-0 fs-6">
                                                    <span className="fs-5">{timeRemaining.days}</span> Days
                                                </p>
                                                <div className="d-flex gap-0 align-items-center">
                                                    <span className="badge">{timeRemaining.hours}</span><span className="fs-6">:</span>
                                                    <span className="badge">{timeRemaining.minutes}</span><span className="fs-6">:</span>
                                                    <span className="badge">{timeRemaining.seconds}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="price mt-2">  ${Product.price} </p>
                                    )}
                                    <div className="d-flex align-items-center gap-10">
                                        <ReactStars
                                            count={5}
                                            size={18}
                                            value={Product.review}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <p className="mb-0">( 2 Review )</p>
                                    </div>
                                    <div>
                                        <a className="text-dark text-decoration-underline" href="#review-form" onClick={toggleReviewForm}>Write a Review</a>
                                    </div>
                                </div>
                                <div className="border-bottom py-3">
                                    <div className="d-flex align-items-center gap-10 my-3">
                                        <h6 className="product-heading">Categories : </h6>
                                        <p className="product-data">{Product.categorie.title}</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-10  my-3">
                                        <h6 className="product-heading">Brand : </h6>
                                        <p className="product-data">{Product.brand}</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-10 my-3">
                                        <h6 className="product-heading">Shipping : </h6>
                                        <p className="product-data text-success">Free shipping</p>
                                    </div>
                                    <div className="d-flex align-items-center gap-10 my-4 singalerespo">
                                        <div className="gap-10 d-flex align-items-center">
                                            <p className="product-heading">Quantity :</p>
                                            <input type="number" name="" id="" min={1} value={ProductQuantity} onChange={(e) => setProductQuantity(e.target.value)} className="form-control me-4" />
                                        </div>
                                        <div className="gap-10 d-flex align-items-center">
                                            <button className="button" onClick={() => { handleClick(Product); }}>ADD TO CART</button>
                                            <ToastContainer className="notif" />
                                            <button className="buttonbg" onClick={() => { checkout(Product) }}>Buy It Now</button>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="d-flex align-items-center add-link">
                                            <AiOutlineHeart className="fs-5" />
                                            <p className="mb-0" onClick={() => { addwishlist(Product) }}>Add to Wishlist</p>
                                        </button>
                                    </div>
                                </div>
                                <div className="border-bottom d-flex gap-15 py-2 service ">
                                    <p>
                                        <FaShippingFast /> Free Delivery
                                    </p>
                                    <p>
                                        <MdOutlineAttachMoney /> Easy Payments
                                    </p>
                                    <p>
                                        <FaHeadset /> 24/7 Service
                                    </p>
                                </div>
                                <div className="payment py-3">
                                    <h5 className="text-center">Payment methods</h5>
                                    <div className="payment-images">
                                        <div><img src="/images/payment.png" alt="payment" /></div>
                                        <div><img src="/images/payment2.png" alt="payment" /></div>
                                        <div><img src="/images/payment3.png" alt="payment" /></div>
                                        <div><img src="/images/payment4.png" alt="payment" /></div>
                                        <div><img src="/images/payment5.png" alt="payment" /></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="description-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4>Description</h4>
                            <div className="bg-white p-3 description">
                                <p className="py-2 ">
                                    {Product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="reviews-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h4>Reviews</h4>
                            <div className="review-inner-wrapper">
                                <div className="review-head d-flex justify-content-between align-items-end py-2">
                                    <div>
                                        <h6 className="mb-2">Customer Reviews</h6>
                                        <div className="d-flex align-items-center gap-10">
                                            <ReactStars
                                                count={5}
                                                size={17}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                            <p className="mb-0">Based on 2 Review</p>
                                        </div>
                                    </div>
                                    {!showReviewForm && (
                                        <div>
                                            <a className="text-dark text-decoration-underline" href="#review-form" onClick={toggleReviewForm}>Write a Review</a>
                                        </div>
                                    )}
                                </div>
                                {showReviewForm && (
                                    <div className="review-form py-4" id="review-form">
                                        <h6 className="mb-2 fw-light">write a Review</h6>
                                        <form action="" className="d-flex flex-column gap-15">
                                            <div>
                                                <input type="text" className="form-control" placeholder="Name" required />
                                            </div>
                                            <div>
                                                <input type="email" className="form-control" placeholder="Email" required />
                                            </div>
                                            <div>
                                                <ReactStars
                                                    count={5}
                                                    size={30}
                                                    value={0}
                                                    edit={true}
                                                    activeColor="#ffd700"
                                                />
                                            </div>
                                            <div>
                                                <textarea name="" id="" className="w-100 form-control" cols="30" rows="4" placeholder="Write your comments here" required></textarea>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="button">Submit Review</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                                <div className="reviews py-4">
                                    <div className="review py-3">
                                        <div className="d-flex align-items-center">
                                            <h6>teljaoui2004@gmail.com</h6>
                                            <ReactStars
                                                count={5}
                                                size={17}
                                                value={4}
                                                edit={false}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <p className="p-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, saepe!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <FeaturedCollection Products={Products} currentProductId={currentProductId} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProduct;
