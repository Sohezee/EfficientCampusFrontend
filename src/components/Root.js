import { Outlet, useNavigate} from 'react-router-dom';
import '../assets/styles/App.css';
import '../assets/styles/Root.css';

function Root() {
    const navigate = useNavigate();
    const goHome = () => navigate('/');

    return (
        <>
            <header>
                <div className="header-container">
                    <div className="header-logo"><button onClick={goHome}>EC</button></div>
                </div>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
        
        
    );
}

export default Root;