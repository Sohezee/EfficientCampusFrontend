import React from 'react';
import { Outlet } from 'react-router-dom';
import '../assets/styles/App.css';
import '../assets/styles/Root.css';

function Root() {
    return (
        <>
            <header>
                <div class="header-container">
                    <div class="header-logo">EC</div>
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
        
        
    );
}

export default Root;