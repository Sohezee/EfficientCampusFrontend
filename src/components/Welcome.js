import React from 'react';
import '../assets/styles/App.css';
import '../assets/styles/Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    const handleClick = () => { 
        navigate('/login');
    }


    return (
        <div className="welcome">
            <div className="text">
                <span>Welcome to...</span>
                <h1>Efficient</h1>
                <h1>Campus</h1>
            </div>
            <button type="button"  onClick={handleClick}>Get Started</button>
        </div>
    );
};

export default Welcome;