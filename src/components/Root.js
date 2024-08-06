import React, { useState } from 'react';
import { Outlet} from 'react-router-dom';
import '../assets/styles/App.css';
import '../assets/styles/Root.css';

function Root() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-logo">EC</div>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
        
        
    );
}

export default Root;