import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from '../components/UserContext';
import Modal from './Modal';
import logo from '../assets/images/logo.svg';

// Styles
import '../assets/styles/App.css';
import '../assets/styles/loading.css';
import '../assets/styles/Modal.css';
import '../assets/styles/bootstrap.css';
import '../assets/styles/Login.css';
import '../assets/styles/util.css';

// Vendor styles
import '../login/vendor/bootstrap/css/bootstrap.min.css';
import '../login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../login/fonts/iconic/css/material-design-iconic-font.min.css';
import '../login/vendor/animate/animate.css';
import '../login/vendor/css-hamburgers/hamburgers.min.css';
import '../login/vendor/animsition/css/animsition.min.css';
import '../login/vendor/select2/select2.min.css';
import '../login/vendor/daterangepicker/daterangepicker.css';

const Login = () => {
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [action, setAction] = useState('Logging in...');
    const [modalInfo, setModalInfo] = useState({ showModal: false, title: '', body: '', handleConfirm: null, handleCancel: null });


    const { updateUserInfo } = useContext(UserContext);
    const [error, setError] = useState(null);

    const closeModal = () => {(setModalInfo(prevInfo => ({ ...prevInfo, showModal: false })))}

    const login = (email, password) => {
        setLoading(true);
        setAction('Logging in...');
        email = email.toLowerCase();
        axios.post('http://localhost:8080/api/users/login', JSON.stringify({ email, password }), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setLoading(false);
            updateUserInfo(response.data, true);
            navigate('/home');
        })
        .catch(error => {
            if (error.response && error.response.data.message === "A user with this email doesn't exist.") {
                setLoading(false);

                setModalInfo({ showModal: true, title: 'Unregistered User', body: 'A user with this email doesn\'t exist. Register email?', handleConfirm: () => {closeModal(); verify(email, password);}, handleCancel: closeModal});
            } else {
                setError(error);
                setLoading(false);
                setModalInfo({ showModal: true, title: 'Error', body: error.response.status === 401 ? "Invalid email or password" : error.message, handleConfirm: closeModal, handleCancel: null});
            }
        });
    };
    


    const verify = (email, password) => {
        setLoading(true);
        setAction('Verifying credentials, this may take a moment...');
        email = email.toLowerCase();
        axios.post('http://localhost:8080/api/users/verify', JSON.stringify({ email, password }), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setLoading(false);
            if (response.data) addUser(email, password);
            else setModalInfo({ showModal: true, title: 'Invalid email or password', body: 'Invalid email or password. No Google account with given email password pair exists, or something went wrong on our end. Please try again.', handleConfirm: closeModal, handleCancel: null});
        })
        .catch(error => {
                setError(error);
                setLoading(false);
                setModalInfo({ showModal: true, title: 'Error', body: error.response.status === 401 ? "Invalid email or password" : error.message, handleConfirm: closeModal, handleCancel: null});
        });
    };

    const addUser = (email, password) => {
        setLoading(true);
        setAction('Adding user to database...');
        email = email.toLowerCase();
        const user = {
            email,
            password,
            offeringNameOne: "",
            teacherDisplayOne: "",
            offeringNameTwo: "",
            teacherDisplayTwo: ""
        };

        axios.post('http://localhost:8080/api/users', user, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setLoading(false);
            if (response.status >= 200 && response.status < 300) {
                updateUserInfo(response.data, true);
                navigate('/home');
                //setModalInfo({ showModal: true, title: 'Success', body: 'User registered succefully', handleConfirm: closeModal, handleCancel: null});
            }
            setModalInfo({ showModal: true, title: 'Error', body: 'Something went wrong', handleConfirm: closeModal, handleCancel: null});
        })
        .catch(error => {
                setError(error);
                setLoading(false);
                setModalInfo({ showModal: true, title: 'Error', body: error.response.status === 401 ? "Invalid email or password" : error.message, handleConfirm: closeModal, handleCancel: null});
        });
    };

    useEffect(() => {
        const inputElements = document.querySelectorAll('.input100');
        inputElements.forEach(input => {
            input.addEventListener('blur', handleBlur);
        });

        return () => {
            inputElements.forEach(input => {
                input.removeEventListener('blur', handleBlur);
            });
        };
    }, []);

    const handleBlur = (event) => {
        const input = event.target;
        if (input.value.trim() !== "") {
            input.classList.add('has-val');
        } else {
            input.classList.remove('has-val');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let isValid = true;

        const inputElements = document.querySelectorAll('.validate-input .input100');
        inputElements.forEach(input => {
            if (!validate(input)) {
                showValidate(input);
                isValid = false;
            }
        });

        if (isValid) {
            login(email, password);
            if (error != null) {
                setModalInfo({ showModal: true, title: 'Error', body: error.response.status === 401 ? "Invalid email or password" : error.message, handleConfirm: closeModal, handleCancel: null});
            }
        }

        return isValid;
    };

    const validate = (input) => {
        if (input.type === 'email' || input.name === 'email') {
            const emailRegex = /.*rsdmo\.org$/i;
            if (!input.value.trim().match(emailRegex)) {
                return false;
            }
        } else {
            if (input.value.trim() === '') {
                return false;
            }
        }
        return true;
    };

    const showValidate = (input) => {
        const thisAlert = input.parentElement;
        thisAlert.classList.add('alert-validate');
    };

    const hideValidate = (input) => {
        const thisAlert = input.parentElement;
        thisAlert.classList.remove('alert-validate');
    };

    const handleFocus = (event) => {
        hideValidate(event.target);
    };

    const toggleShowPass = () => {
        setShowPass(!showPass);
    };

    return (
        <>
            <div className="login">
                <div className="limiter">
                    <div className="container-login100">

                    <Modal showModal={modalInfo.showModal} title={modalInfo.title} body={modalInfo.body} handleConfirm={modalInfo.handleConfirm} handleCancel={modalInfo.handleCancel}/>

                        <div className="wrap-login100">
                            <form className="login100-form validate-form" onSubmit={handleSubmit}>
                                <span className="login100-form-title p-b-26">
                                    Welcome
                                </span>
                                <span className="login100-form-title p-b-48">
                                    <img src={logo} alt="Logo" style={{ width: '70px', height: '70px' }} />
                                </span>

                                <div className="wrap-input100 validate-input" data-validate="Must be rsdmo.org email">
                                    <input
                                        className="input100"
                                        type="text"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={handleFocus}
                                        disabled={modalInfo.showModal}
                                    />
                                    <span className="focus-input100" data-placeholder="Email"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <span className="btn-show-pass" onClick={toggleShowPass}>
                                        <i className={`zmdi ${showPass ? 'zmdi-eye-off' : 'zmdi-eye'}`}></i>
                                    </span>
                                    <input
                                        className="input100"
                                        type={showPass ? 'text' : 'password'}
                                        name="pass"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={handleFocus}
                                        disabled={modalInfo.showModal}
                                    />
                                    <span className="focus-input100" data-placeholder="Password"></span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button className="login100-form-btn" disabled={loading || modalInfo.showModal}>
                                            Login
                                        </button>
                                    </div>
                                </div>

                                {loading && (
                                    <div className="loading">
                                        <div id="wrapper">
                                            <div className="profile-main-loader">
                                                <div className="loader">
                                                    <svg className="circular-loader" viewBox="25 25 50 50">
                                                        <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542" strokeWidth="2" />
                                                    </svg>
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <small><i>{action}</i></small>
                                    </div>
                                )}

                                <div className="text-center p-t-115">
                                    <span className="txt1 note">
                                        *Login with RSDMO email and password
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="dropDownSelect1"></div>
        </>
    );
};

export default Login;