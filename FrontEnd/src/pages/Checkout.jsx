import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { useEffect } from 'react';
import axios from 'axios';
import { deleteAllAction } from '../config/Action';
import emailjs from '@emailjs/browser';


export default function Checkout() {
    const currentDate = new Date().toISOString().split('T')[0];
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [city, setcity] = useState(null);
    const [adress, setadress] = useState(null);
    const [suiteAderess, setsuiteAderess] = useState(null);
    const [dateCm, setdateCm] = useState(currentDate)
    const [user_id, setUserId] = useState(null);
    const dispatch = useDispatch();
    const form = useRef();
    const carts = useSelector((data) => data.carts);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }

                });
                setUser(response.data);
                setUserId(response.data.id);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                navigate('/login');
            }
        };

        fetchUserData();
    }, [])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!city || !adress || !suiteAderess) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        const orderData = {
            city,
            adress,
            suiteAderess,
            total: calculateTotal(),
            dateCm,
            user_id: user_id,
            carts
        };
        try {
            if (window.confirm('Voulez-vous confirmer votre commande?')) {
                const response = await axios.post('http://127.0.0.1:8000/api/orders', orderData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                emailjs
                    .sendForm('service_xmarvj6', 'template_2jyctrs', form.current, {
                        publicKey: '-yADHJ8qBIDGIbIKm',
                    })
                    .then(
                        () => {
                            console.log('SUCCESS!');
                        },
                        (error) => {
                            console.log('FAILED...', error.text);
                        },
                    );
                alert('Order created successfully:', response.data);
                dispatch(deleteAllAction())
                navigate('/finalOrder')
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Une erreur s\'est produite lors de la création de la commande. Veuillez réessayer plus tard.');
        }

    };



    const calculateTotal = () => {
        let totalPrice = 0;
        carts.forEach((product) => {
            totalPrice += product.ProductQuantity * product.ProductPrice;
        });
        return totalPrice;
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Meta title={"Checkout"} />
            <BreadCrumb title={"Checkout"} />
            <div className="chekout-wrapper home-wrapper-2 py-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-7">
                            <div className="checkout-left-data">
                                <h4 className="title">Contact Information</h4>
                                <p className="user-details">
                                    <span className="text-uppercase">{user.name}</span> <span className="text-uppercase"> {user.lastName}</span> ( {user.email} )
                                </p>
                                <form  ref={form} onSubmit={handleSubmit} className="d-flex flex-column gap-15 justify-content-between">
                                    <input type="hidden" name="name" value={user.name} />
                                    <input type="hidden" name="email" value={user.email} />
                                    <input type="hidden" name="phone" value={user.phone} />
                                    <div className="flex-grow-1">
                                        <input type="text" placeholder="City" name="city"  className="form-control" required value={city} onChange={(e) => setcity(e.target.value)} />
                                    </div>
                                    <div className="w-100">
                                        <input type="text" placeholder="Adress" name="adress" className="form-control" required value={adress} onChange={(e) => setadress(e.target.value)} />
                                    </div>
                                    <div className="w-100">
                                        <input type="text" placeholder="Apartment, Suiten, etc" className="form-control" value={suiteAderess} onChange={(e) => setsuiteAderess(e.target.value)} required />
                                    </div>
                                    <div className="d-flex justify-content-between py-3 align-items-center">
                                        <Link to="/cart" className="text-dark">
                                            <BiArrowBack />
                                            Return to Cart
                                        </Link>
                                        <button type="submit" className="button">
                                            Continue to Shipping
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                        <div className="col-5">
                            <div className="checkout-right-data ">
                                <div className="product-info  pb-3">
                                    {
                                        carts.map(
                                            (product => (
                                                <div className="d-flex  justify-content-between align-items-center border-bottom py-3">

                                                    <div className="d-flex align-items-center">
                                                        <div className="position-relative">
                                                            <span className="rounded-circle p-2">{product.ProductQuantity}</span>
                                                            <img src={`http://127.0.0.1:8000/${product.ProductImage} `} width={60} alt="" />
                                                        </div>
                                                        <p className="title">
                                                            {product.ProductTitle.length > 20 ? product.ProductTitle.substring(0, 20) + '...' : product.ProductTitle}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="price">$ {product.ProductQuantity * product.ProductPrice}</p>
                                                    </div>
                                                </div>


                                            ))
                                        )
                                    }
                                </div>
                                <div className="border-bottom py-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p>Subtotal</p>
                                        <p className="price">$ {calculateTotal()}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-0">Shipping</p>
                                        <p className="price mb-0 text-success">$ 0</p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between border-bottom py-4 align-items-center">
                                    <h6>Total</h6>
                                    <h6>$ {calculateTotal()}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
