import React, { useState } from 'react';
import { Outlet} from 'react-router-dom';
import '../assets/styles/App.css';
import '../assets/styles/Root.css';

function Root() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState( 
        {
            offeringNameOne: "",
            teacherDisplayOne: "",
            offeringNameTwo: "",
            teacherDisplayTwo: "",
        }
    );

    const updateUserInfo = (userInfo) => {
        setUserInfo(userInfo);
    }

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-logo">EC</div>
                </div>
            </header>
            <main>
                <Outlet updateUserInfo={updateUserInfo} userInfo={userInfo}/>
            </main>
        </>
        
        
    );
}

export default Root;