import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Meta from '../components/Meta';
import { useNavigate } from 'react-router-dom';
import { SlLogout } from "react-icons/sl";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showPasswordButton, setShowPasswordButton] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
                navigate('/login');

            }
        };

        fetchUserData();
    }, [])
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
        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
            setSuccess('Password updated successfully');
            setError('');
            setPassword('');
            setConfirmPassword('');
            closeform();
        } catch (error) {
            setError('Error updating password');
            setSuccess('');
            console.error('Error updating password:', error);
        }
    };

    const logout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            localStorage.removeItem('token');
            window.location.reload();
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {user ? (
                <div>
                    <Meta title={user.name + ' ' + user.lastName} />
                    <div className="main-product-wrapper py-5 home-wrapper-2">
                        <div className="container-xxl">
                            {error && <div className="alert alert-danger">{error}</div>}
                            {success && <div className="alert alert-success">{success}</div>}
                            <div className="row">
                                <div className="col-4">
                                    <div className="main-product-details">
                                        <div className="d-flex justify-content-around">
                                            <div>
                                                <img src="https://avatar.iran.liara.run/public/boy" width={100} alt="" />
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
                                        <span className="logout" onClick={logout}>
                                            <SlLogout />
                                            logout
                                        </span>
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
                                                    <tr>
                                                        <td>1</td>
                                                        <td>500</td>
                                                        <td>2015-02-11</td>
                                                        <td>complet</td>
                                                        <td>Détails</td>
                                                    </tr>
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
