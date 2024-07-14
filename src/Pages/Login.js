import React, { useState } from 'react';
import { useContexts } from '../Components/context';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const {loginUser} = useContexts();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setMessage("Please enter a valid email");
            return;
        }

        const response = await loginUser(email, password);

        if(response === "Login Successful") {
            navigate("/home");
        }
    };

    return (
        <div className='login-page'>
            <h2>{message}</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder='Password' />
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;