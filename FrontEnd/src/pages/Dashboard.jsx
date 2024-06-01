import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Meta from '../components/Meta';
import { Link, useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";
import { FaEye } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showPasswordButton, setShowPasswordButton] = useState(true);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const navigate = useNavigate();


    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                setUser(response.data);
            } else {
                throw new Error('User data not found');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    useEffect(() => {
        if (user) {
            getOrder(user.id);
        }
    }, [user]);

    const getOrder = async (userId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/orders`);
            setOrders(response.data.orders);

        } catch (error) {
            console.error('Error fetching user orders:', error);
            setLoading(false);
        }

    };

    const showform = () => {
        setShowPasswordForm(true)
        setShowPasswordButton(false)
    }
    const closeform = () => {
        setShowPasswordForm(false)
        setShowPasswordButton(true)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (window.confirm('Are you sure you want to update password')) {
            if (password !== confirmPassword) {
                toast.error("Passwords do not match", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

            try {
                const response = await axios.put('http://127.0.0.1:8000/api/user/password',
                    {
                        password,
                        password_confirmation: confirmPassword
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                toast.success("Password updated successfully", {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setPassword('');
                setConfirmPassword('');
                closeform();
            } catch (error) {
                toast.error('Error updating password', {
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    const logout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('token');
            window.location.reload();
        }
    };

    if (loading) {
        return <div class="loader"></div>;
    }

    return (
        <>
            {user ? (
                <div>
                    <Meta title={user.name + ' ' + user.lastName} />
                    <div className="main-product-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            <div className="row">
                                <div className="col-4">
                                    <div className="main-product-details">
                                        <div className="d-flex justify-content-around">
                                            <div>
                                            <img src={`https://avatar.iran.liara.run/username?username=${user.name}+${user.lastName}`} width={100} alt="" />
                                            </div>
                                            <div className="userinfo">
                                                <h3>Welcome, <span> {user.name} {user.lastName}</span></h3>
                                            </div>
                                        </div>
                                        <div className="user-detail py-4">
                                            <ul>
                                                <li>
                                                    <span>Email :</span>
                                                    <p>{user.email}</p>
                                                </li>
                                                <li>
                                                    <span>Phone : </span>
                                                    <p> {user.phone}</p>
                                                </li>
                                            </ul>
                                        </div>
                                        {
                                            showPasswordButton && (
                                                <div className="password">
                                                    <button className="buttonbg" onClick={showform}>Edite Password</button>
                                                </div>
                                            )
                                        }

                                        {showPasswordForm && (
                                            <form action="" className="d-flex flex-column gap-15" onSubmit={handleSubmit}>

                                                <div>
                                                    <input type="password" name="password" className="form-control w-100" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <input type="password" name="confirmPassword" className="form-control w-100" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                                </div>
                                                <div>
                                                    <button className="button w-50" type="submit">Update Password</button>
                                                    <button className="buttonbg w-50" type="submit" onClick={closeform}>Cancel</button>
                                                </div>
                                            </form>
                                        )}
                                        <div className="d-flex justify-content-between">
                                            <span className="logout" onClick={logout}>
                                                <SlLogout />
                                                logout
                                            </span>
                                        </div>
                                        <ToastContainer className="notif" />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="admin-order">
                                        <h3>Order history</h3>
                                        <div className="order-history">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Order Matricule</th>
                                                        <th>Total</th>
                                                        <th>Date order</th>
                                                        <th>statue</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map(order => (
                                                        <React.Fragment key={order.id}>
                                                            <tr>
                                                                <td>{order.id}</td>
                                                                <td>{order.total}</td>
                                                                <td>{order.dateCm}</td>
                                                                <td>
                                                                    <span className={order.statue === 0 ? "statue ongoing" : order.statue === 1 ? "statue confirmed" : "statue delivered"}>
                                                                        {order.statue === 0 ? "En cours" : order.statue === 1 ? "confirmed" : "Livrée"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className="statue" onClick={() => setSelectedOrderId(selectedOrderId === order.id ? null : order.id)}>
                                                                        {selectedOrderId === order.id ? <><IoMdClose /> Close</> : <><FaEye />  Details</>}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                            {selectedOrderId === order.id && (
                                                                <>
                                                                    <tr>
                                                                        <th>Product</th>
                                                                        <th>Price</th>
                                                                        <th>Quantities</th>
                                                                    </tr>
                                                                    {order.order_details.map((detail, index) => (
                                                                        <tr key={index}>
                                                                            <td><img src={`http://127.0.0.1:8000/${detail.productImage}`} alt="" width={50} />  </td>
                                                                            <td>{detail.price}</td>
                                                                            <td>{detail.quantitieCm}</td>
                                                                        </tr>
                                                                    ))}
                                                                </>

                                                            )}
                                                        </React.Fragment>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Error: Unable to fetch user data</div>
            )}
        </>
    );
};

export default Dashboard;
