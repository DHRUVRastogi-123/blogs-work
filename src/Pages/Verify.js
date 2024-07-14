import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContexts } from "../Components/context";

const Verify = () => {

    const {userId, verificationToken} = useParams();
    const {verifyUser} = useContexts();
    const [message, setMessage] = useState("Click the Verify Button to Verify!");
    const navigate = useNavigate();

    const handleVerify = async (event) => {
        event.preventDefault();

        const resposne = await verifyUser(userId, verificationToken);
        setMessage(resposne);
        navigate('/login');
    }

    return (
        <div>
            <h3>{message}</h3>
            <button onClick={handleVerify}>Verify</button>
        </div>
    );
};

export default Verify;
