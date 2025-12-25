import React, { useEffect, useState } from 'react';
import './Login.css';
import { useLoginMutation, useRegisterMutation } from './Api/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [reEnterPassword, setReEnterPassword] = useState(null);
    const [shouldDisabled, setShouldDisable] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (email && password) {
            setShouldDisable(false);
        } else {
            setShouldDisable(true);
        }
    }, [email, password])
    const [register] = useRegisterMutation();
    const handleRegistration = async (e) => {
        e.preventDefault();
        const result = await register({ email, password });
        console.log(result);
        if (result.data?.isSuccess) {
            toast.success("User registered successfully. Login to continue");
            navigate("/login")
        }
        else if (!result.data?.isSuccess) {
            toast.error(result.data?.errorMessages.join('/n'));
        }
        else {
            toast.error("Failed to register")
        }
    }
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-5 shadow-lg" style={{ maxWidth: '450px', width: '100%', backgroundColor: '#212529', color: '#f0f0f0', borderRadius: '15px', border: '1px solid #373b3e' }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold mb-3" style={{ color: '#fff' }}>Welcome Back</h2>
                    <p className="mb-3 login-text-gradient">
                        Hey Book lover, register to explore, review and grow.
                    </p>
                </div>
                <form onSubmit={handleRegistration} method='POST'>
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
                    <div className="mb-4">
                        <label htmlFor="reEnterPassword" className="form-label fw-semibold">Re-Enter PAssword</label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            id="reEnterPassword"
                            placeholder="********"
                            value={reEnterPassword}
                            onChange={(e) => setReEnterPassword(e.target.value)}
                            style={{ backgroundColor: '#2b2d31', border: '1px solid #495057', color: '#fff' }}
                        />
                        <span className='text-danger'>{password !== reEnterPassword && "Passwords do not match"}</span>
                    </div>
                    <div className="d-grid">
                        <input type="submit" className="btn btn-primary btn-lg fw-bold"
                            value="Register"
                            style={{ background: 'linear-gradient(45deg, #0d6efd, #0a58ca)', border: 'none' }} disabled={shouldDisabled}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
