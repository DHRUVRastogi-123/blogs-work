import React from 'react';
import { useState } from 'react';
import { useContexts } from '../Components/context';

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const {registerUser} = useContexts();
    const [message, setMessage] = useState("Enter Your Details To Register");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!name) {
            setMessage("Enter a Valid Name");
            return;
        }

        if(!email) {
            setMessage("Enter a Valid Email");
            return;
        }

        if(!password) {
            setMessage("Enter a Valid Password");
            return;
        }

        if(password !== confirmPassword) {
            setMessage("Password should match Confirm Password");
            return;
        }

        const response = await registerUser(name, email, password);

        if(response === "Register Successful") {
            setMessage("Verification Link Send To Your Email");
        } else {
            setMessage(response);
        }

    };

    return (
        <div>
            <h2>{message}</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' value={name} onChange={(e) => {setName(e.target.value.trim())}} placeholder='Name' />
                <input type='text' value={email} onChange={(e) => {setEmail(e.target.value.trim())}} placeholder='Email' />
                <input type='password' value={password} onChange={(e) => {setPassword(e.target.value.trim())}} placeholder='Password' />
                <input type='password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value.trim())}} placeholder='Confirm Password' />
                <button type='submit'>Register</button>
            </form>
        </div>
    );

};

export default Register;