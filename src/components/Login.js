import React, { useEffect } from 'react';
import '../assets/styles/App.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.svg';

import '../login/vendor/bootstrap/css/bootstrap.min.css';
import '../login/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import '../login/fonts/iconic/css/material-design-iconic-font.min.css';
import '../login/vendor/animate/animate.css';
import '../login/vendor/css-hamburgers/hamburgers.min.css';
import '../login/vendor/animsition/css/animsition.min.css';
import '../login/vendor/select2/select2.min.css';
import '../login/vendor/daterangepicker/daterangepicker.css';
import '../assets/styles/Login.css';
import '../assets/styles/util.css';

import $ from 'jquery';
import 'jquery-validation';

const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Your jQuery code here
        $('.input100').each(function(){
            $(this).on('blur', function(){
                if($(this).val().trim() !== "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            });
        });

        $('.validate-form').on('submit', function(){
            var check = true;

            $('.validate-input .input100').each(function(){
                if(validate(this) === false){
                    showValidate(this);
                    check = false;
                }
            });

            if(check) {
                navigate('/home');
            }

            return check;
        });

        $('.validate-form .input100').each(function(){
            $(this).focus(function(){
                hideValidate(this);
            });
        });

        function validate(input) {
            if($(input).attr('type') === 'email' || $(input).attr('name') === 'email') {
                if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) === null) {
                    return false;
                }
            } else {
                if($(input).val().trim() === '') {
                    return false;
                }
            }
            return true;
        }

        function showValidate(input) {
            var thisAlert = $(input).parent();
            $(thisAlert).addClass('alert-validate');
        }

        function hideValidate(input) {
            var thisAlert = $(input).parent();
            $(thisAlert).removeClass('alert-validate');
        }

        var showPass = 0;
        $('.btn-show-pass').on('click', function(){
            if(showPass === 0) {
                $(this).next('input').attr('type','text');
                $(this).find('i').removeClass('zmdi-eye');
                $(this).find('i').addClass('zmdi-eye-off');
                showPass = 1;
            }
            else {
                $(this).next('input').attr('type','password');
                $(this).find('i').addClass('zmdi-eye');
                $(this).find('i').removeClass('zmdi-eye-off');
                showPass = 0;
            }
        });
    }, []);

    return (
        <>
            <div className="login">
                <div className="limiter">
                    <div className="container-login100">
                        <div className="wrap-login100">
                            <form className="login100-form validate-form">
                                <span className="login100-form-title p-b-26">
                                    Welcome
                                </span>
                                <span className="login100-form-title p-b-48">
                                    <img src={logo} alt="Logo" style={{width: '70px', height: '70px'}} />
                                </span>

                                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                                    <input className="input100" type="text" name="email" />
                                    <span className="focus-input100" data-placeholder="Email"></span>
                                </div>

                                <div className="wrap-input100 validate-input" data-validate="Enter password">
                                    <span className="btn-show-pass">
                                        <i className="zmdi zmdi-eye"></i>
                                    </span>
                                    <input className="input100" type="password" name="pass" />
                                    <span className="focus-input100" data-placeholder="Password"></span>
                                </div>

                                <div className="container-login100-form-btn">
                                    <div className="wrap-login100-form-btn">
                                        <div className="login100-form-bgbtn"></div>
                                        <button 
                                            className="login100-form-btn"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center p-t-115">
                                <span className="txt1 note" >
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
