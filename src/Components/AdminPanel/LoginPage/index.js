import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"
import { adminLogin } from '../../Api/Admin';

function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(username, password)
            const response = await adminLogin({ username, password })
            if (response.data.token) {
                console.log(response.data.token)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", username)
                navigate('/admin-panel');
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Error logging in');
        }
    };

    return (
        <div className='adminLogin'>
            <div className="container">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='text-danger'>
                        {errorMessage && <p>{errorMessage}</p>}
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <p style={{ color: "green" }}>Use Below Username and Password</p>
                <p><i>Username: <b>admin</b></i></p>
                <p><i>Password: <b>admin@123</b></i></p>
            </div>
        </div>
    );
}

export default LoginPage;