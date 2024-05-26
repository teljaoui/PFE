import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';

export default function Forgotpassword() {
    return (
        <>
            <Meta title={"Forgot Password"} />
            <BreadCrumb title="Forgot Password" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3>Reset Your Password</h3>
                                <p className="text-center">we will send you an email to reset your password</p>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <input type="email" name="email" className="form-control" placeholder="Your Email" required />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center gap-15 align-items-center ">
                                        <button className="button w-25">Submit</button>
                                        <Link to="/login">Cancel</Link>
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
