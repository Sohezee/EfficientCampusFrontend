
import '../assets/styles/bootstrap.css';
import help from '../assets/images/help.svg';
import '../assets/styles/Home.css';

import { UserContext } from '../components/UserContext';
import React, { useContext } from 'react';



const Home = () => {
    const { userInfo } = useContext(UserContext);


    return (
        <div className='home'>
            <div className="input-panel">
                <div className="dropdown">
                    <label htmlFor="mod-one-select">Ac-Lab Mod One</label>
                    <select className="select form-select" name="mod-one-select">
                        <option value="none">No Sign Up</option>
                        <option value={userInfo.offeringNameOne} selected>{userInfo.offeringNameOne}</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="mod-two-select">Ac-Lab Mod Two</label>
                    <select className="select form-select" name="mod-two-select">
                        <option value="none">No Sign Up</option>
                        <option value={userInfo.offeringNameTwo} selected>{userInfo.offeringNameTwo}</option>
                    </select>
                </div>
                <button type="submit" className="update">Update</button>
            </div>
            <div className="account">
                <button className="button logout-button">Logout</button>
                <button className="button delete-button">Delete Account <a href="#" title="Delete your EC Account"><img src={help} alt="Logo" style={{width: '15px', height: '15px'}} /></a></button>
            </div>
            
            
            
        </div>
    );
};

export default Home;
