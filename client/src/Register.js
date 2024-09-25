import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/register", data);
            alert(res.data.message);  // Display success message
        } catch (err) {
            console.error(err);
            alert(err.response.data.message);  // Show error
        }
    };

    return (
        <div>
            <center>
                <form onSubmit={submitHandler}>
                    <h3>Register</h3>
                    <input type="text" onChange={changeHandler} name="username" placeholder='User name' /><br /><br />
                    <input type="email" onChange={changeHandler} name="email" placeholder='Email' /><br /><br />
                    <input type="password" onChange={changeHandler} name="password" placeholder='Password' /><br /><br />
                    <input type="password" onChange={changeHandler} name="confirmpassword" placeholder='Confirm password' /><br /><br />
                    <button type="submit">Register</button>
                </form>
            </center>
        </div>
    );
};

export default Register;
