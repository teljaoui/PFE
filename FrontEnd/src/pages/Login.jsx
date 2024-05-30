import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email: email,
                password: password,
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                navigate('/dashboard');
            } else {
                throw new Error('Failed to login. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                console.error('Error:', error.response.data);
            } else {
                setErrorMessage(error.message);
                console.error('Error:', error.message);
            }
        }
    };
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    return (
        <>
            <Meta title={"Login"} />
            <BreadCrumb title="Login" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3>Login</h3>
                                <form action="" className="d-flex flex-column gap-15">
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    <div>
                                        <input type="email" name="email" className="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div>
                                        <Link to="/forgotpassword">Forgot Password?</Link>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center gap-15 align-items-center ">
                                        <button className="button w-25" onClick={handleSubmit}>Login</button>
                                        <Link to="/signup" className="signup">If you don't have an account?  Register now</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
