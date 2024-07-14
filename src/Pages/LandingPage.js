import React from 'react';
import { useContexts } from '../Components/context';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {

    const {isAuthenticated} = useContexts();
    const {navigate} = useNavigate();

    if(isAuthenticated) {
        navigate('/home');
    }

    return (
        <div>

        </div>
    );

};

export default LandingPage;