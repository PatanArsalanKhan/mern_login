import React, { useState, useContext } from 'react';
import axios from 'axios';
import { store } from './App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [token, setToken] = useContext(store);  // Access token from context
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/login", data);

            if (res.data.token) {
                setToken(res.data.token);  // Save token to the context
                localStorage.setItem('token', res.data.token);  // Store token in localStorage
                navigate("/myprofile");  // Redirect to the profile page
                // alert("Login successful!");
            } else {
                alert("Login failed. No token received.");
            }
        } catch (err) {
            console.error(err);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <h3>Login</h3>
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' /><br /><br />
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' /><br /><br />
                    <input type="submit" value="Login" /><br />
                </form>
            </center>
        </div>
    );
};

export default Login;
