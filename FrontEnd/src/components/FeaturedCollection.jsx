import { useState, useEffect } from 'react';
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { BsCartPlusFill } from "react-icons/bs";
import { IoEyeSharp } from "react-icons/io5";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addCartAction, addwishlistAction } from '../config/Action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";


export default function FeaturedCollection({ currentProductId, Products }) {

    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.carts);
    const wishlistItems = useSelector(state => state.wishlist);
    const [ProductQuantity, setProductQuantity] = useState(1);
    const [Product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(getRandomProducts());
    }, [currentProductId, Products]);

    const getRandomProducts = () => {
        const productsCopy = Products.filter(product => product.id !== currentProductId);
        for (let i = productsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [productsCopy[i], productsCopy[j]] = [productsCopy[j], productsCopy[i]];
        }
        return productsCopy.slice(0, 12);
    };

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
    const handleClickwishlist = (product) => {
        const isProductInWishlist = wishlistItems.some(item => item.id === product.id);
        if (!isProductInWishlist) {
            dispatch(addwishlistAction({
                id: product.id,
                ProductImage: product.img,
                ProductTitle: product.title,
                ProductPrice: product.price,
                ProductReview: product.review,
                ProductQuantity: ProductQuantity
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
    }

    const NextArrow = ({ onClick }) => {
        return (
            <div className="custom-arrow next-arrow" onClick={onClick}>
                <FaArrowRight />
            </div>
        );
    };
    const PrevArrow = ({ onClick }) => {
        return (
            <div className="custom-arrow prev-arrow" onClick={onClick}>
                <FaArrowLeft />
            </div>
        );
    };
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: currentSlide !== Products.length - 6 ? <NextArrow /> : null,
        prevArrow: currentSlide !== 0 ? <PrevArrow /> : null,
        beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    initialSlide:1,
                    infinite: true,
                    dots: true,
                    nextArrow:null,
                    prevArrow:null,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    nextArrow:null,
                    prevArrow:null,
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow:null,
                    prevArrow:null,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow:null,
                    prevArrow:null,
                    
                }
            }
        ]
    };
    const scroll = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <div className="col-12">
                <h3 className="section-heading">Featured Collection</h3>
            </div>
            <div className="col-12">
                <Slider {...settings}>
                    {Product.map((product => {
                        const isOfferExpired = new Date(product.datefin) > new Date();
                        const isOfferValid = product.offer && isOfferExpired;

                        return (
                            <div className="col-2">
                                <Link to={`/product/${product.id}`} className="product-card position-relative m-2 py-4" key={product.id} onClick={scroll}>
                                    {isOfferValid && (
                                        <p className="percentage">-{product.percentage}%</p>
                                    )}
                                    <div className="product-image text-center mb-1">
                                        <img src={`http://127.0.0.1:8000/${product.img} `} alt="" className="img-fluid" width={160} />
                                    </div>
                                    <div className="product-details">
                                        <h6 className="brand">{product.brand} </h6>
                                        <h5 className="product-title">
                                            {product.title.length > 20 ? product.title.substring(0, 20) + '...' : product.title}
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={17}
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
                                    <div className="action-bar position-absolute">
                                        <div className="d-flex flex-column gap-15">
                                            <button onClick={(e) => { e.preventDefault(); handleClickwishlist(product) }}>
                                                <AiFillHeart />
                                            </button>
                                            <Link to={`/product/${product.id}`} className="button">
                                                <IoEyeSharp />
                                            </Link>
                                            <button onClick={(e) => { e.preventDefault(); handleClick(product); }}>
                                                <BsCartPlusFill />
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )

                    }
                    ))}
                </Slider>
            </div>
        </>
    )
}
