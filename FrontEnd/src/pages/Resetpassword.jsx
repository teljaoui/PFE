import React from 'react'
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

export default function Resetpassword() {
    return (
        <>
            <Meta title={"Reset Password"} />
            <BreadCrumb title="Reset Password" />
            <div className="login-wrapper py-5 home-wrapper-2">
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="auth-card">
                                <h3>Reset Password</h3>
                                <form action="" className="d-flex flex-column gap-15">
                                    <div>
                                        <input type="password" name="password" className="form-control" placeholder="New Password" required />
                                    </div>
                                    <div>
                                        <input type="password" name="confirmpassword" className="form-control" placeholder="Confirm Password" required />
                                    </div>
                                    <div className="d-flex flex-column justify-content-center gap-15 align-items-center ">
                                        <button className="button w-25">OK</button>
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
