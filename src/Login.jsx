import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Login.css';
import { useLoginMutation, useGoogleLoginMutation } from './Api/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from './Redux/authSlice';

import { NavLink } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [shouldDisabled, setShouldDisable] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [googleLogin] = useGoogleLoginMutation();
    useEffect(() => {
        if (email && password) {
            setShouldDisable(false);
        } else {
            setShouldDisable(true);
        }
    }, [email, password])
    const [login] = useLoginMutation();
    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login({ email, password });
        if (result.data?.isSuccess) {
            toast.success(result.data.responseMessage);
            dispatch(setUser(result.data.responseData.token));
            navigate("/")
        }
        else if (!result.data?.isSuccess) {
            toast.error(result.data?.errorMessages.join('/n'));
        }
        else {
            toast.error("Failed to login")
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        console.log("Inside the google sign in")
        const result = await googleLogin({ jwttoken: credentialResponse.credential });
        console.log(result)
        if (result.data?.isSuccess) {
            toast.success(result.data.responseMessage);
            dispatch(setUser(result.data.responseData.token));
            navigate("/")
        }
        else if (!result.data?.isSuccess) {
            toast.error(result.data?.errorMessages.join('/n'));
        }
        else {
            toast.error("Failed to login")
        }
    };

    const handleGoogleError = () => {
        toast.error("Google Sign-In failed");
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5 shadow-lg" style={{ maxWidth: '450px', width: '100%', backgroundColor: '#212529', color: '#f0f0f0', borderRadius: '15px', border: '1px solid #373b3e' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-3" style={{ color: '#fff' }}>Welcome Back</h2>
                    <p className="mb-3 login-text-gradient">
                        Hey Book lover, login to explore, review and grow.
                    </p>
                </div>
                <form onSubmit={handleLogin} method='POST'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email address</label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            id="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ backgroundColor: '#2b2d31', border: '1px solid #495057', color: '#fff' }}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ backgroundColor: '#2b2d31', border: '1px solid #495057', color: '#fff' }}
                        />
                    </div>
                    <div className="mb-3">
                        <NavLink to="/register" >Don't have an account? Register</NavLink>
                    </div>
                    <div className="d-grid mb-3">
                        <input type="submit" className="btn btn-primary btn-lg fw-bold"
                            value="Login"
                            style={{ background: 'linear-gradient(45deg, #0d6efd, #0a58ca)', border: 'none' }} disabled={shouldDisabled}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_black"
                            shape="pill"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
