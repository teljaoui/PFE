import React, { useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name: name,
                email: email,
                lastName: lastName,
                password: password,
                password_confirmation: confirmPassword,
                phone: phone,
            });

            if (response.status === 200) {
                const data = response.data;
                console.log(data);
                alert('Registration successful! Please log in.');
                navigate('/login');
            } else {
                throw new Error('Failed to register. Please try again.');
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

    return (
        <>
            <Meta title={"Signup"} />
            <BreadCrumb title="Signup" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3>Create Account</h3>
                                <form className="d-flex flex-column gap-15" onSubmit={handleSubmit}>
                                    {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                                    <div>
                                        <input type="text" name="name" className="form-control" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="text" name="name" className="form-control" placeholder="Your Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

                                    </div>
                                    <div>
                                        <input type="email" name="email" className="form-control" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="password" name="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="password" name="confirmPassword" className="form-control" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    </div>
                                    <div>
                                        <input type="tel" name="phone" className="form-control" placeholder="Your Number Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center gap-15 align-items-center ">
                                        <button className="button w-25" type="submit">Create</button>
                                        <Link to="/login">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
