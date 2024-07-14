import React, {useState, useEffect, createContext, useContext} from 'react';
import {jwtDecode} from 'jwt-decode';

const Context = createContext();

export const ContextProvider = ({children}) => {

    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setToken(localStorage.getItem("jwtToken"));

        if(token) {
            try {
                const decode = jwtDecode(token);
                setUserId(decode.user.id);
                setIsAuthenticated(true);
            } catch (e) {
                console.error("Invalid Token", e);
                setIsAuthenticated(false);
                setUserId(null);
            }
        } else {
            setIsAuthenticated(false);
            setUserId(null);
        }

    }, [token]);

    const loginUser = async (email, password) => {

        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            if(response.status === 200) {
                const data = await response.json();
                setToken(data.token);
                setUserId(data.userId);
                isAuthenticated(true);
                localStorage.setItem('jwtToken', token);
                return "Login Successful";
            }
            else {
                return "Invalid Credentials";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const logoutUser = async (e) => {
        setUserId(null);
        localStorage.removeItem('jwtToken');
        setToken(null);
        setIsAuthenticated(false);
    }

    const registerUser = async (name, email, password) => {

        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                }),
            });

            if(response.status === 200) {
                return "Register Successful";
            }
            else {
                return "Register Failed";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const verifyUser = async (userId, verificationToken) => {

        try {
            const response = await fetch('http://localhost:5000/api/verify', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    verificationToken: verificationToken,
                }),
            });

            if(response.status === 200) {
                return "Verification Successful";
            }
            else {
                return "Verification Failed";
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <Context.Provider 
            value = {{
                loginUser,
                logoutUser,
                registerUser,
                verifyUser,
                isAuthenticated,
                userId,
            }}>
            {children}
        </Context.Provider>
    )
};

export const useContexts = () => {
    return useContext(Context);
};