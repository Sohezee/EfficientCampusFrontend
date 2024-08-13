import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import Modal from './Modal';
import help from '../assets/images/help.svg';

import '../assets/styles/bootstrap.css';
import '../assets/styles/Home.css';
import '../assets/styles/Modal.css';



const Home = () => {
    const navigate = useNavigate();
    const { userInfo, logout } = useContext(UserContext);
    const [modalInfo, setModalInfo] = useState({ showModal: false, title: '', body: '', handleConfirm: null, handleCancel: null });

    const closeModal = () => {(setModalInfo(prevInfo => ({ ...prevInfo, showModal: false })))}

    const handleDelete = () => {
        setModalInfo({ showModal: true, title: 'Confirm Delete', body: 'By deleteing your account, Efficient Campus will delete your preferences and no longer sign you up for them. You can create your account again at any time. Are you sure you want to delete your account?', handleConfirm: deleteAccount, handleCancel: closeModal});
    }

    const deleteAccount = () => {
        const email = userInfo.email;
        axios
        .delete('http://localhost:8080/api/users', {
          data: { email },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        })
        .then(response => {
            setModalInfo({ showModal: true, title: 'Success', body: response.data, handleConfirm: () => {(setModalInfo(prevInfo => ({ ...prevInfo, showModal: false }))); logout(); navigate('/');}, handleCancel: null});
        })
        .catch(error => {
                setModalInfo({ showModal: true, title: 'Error', body: error.message, handleConfirm: closeModal, handleCancel: null});
        });
    };

    const handleSubmit = () => {

        
        var offeringOne = '';
        var teacherOne = '';

        if (selectedValueOne !== 'No Sign Up') {
            const offeringOneInfo = selectedValueOne.split(' --- ');
            offeringOne = offeringOneInfo[0];
            teacherOne = offeringOneInfo[1];
        }


        var offeringTwo = '';
        var teacherTwo = '';
        if (selectedValueTwo !== 'No Sign Up') {
            const offeringTwoInfo = selectedValueTwo.split(' --- ');
            offeringTwo = offeringTwoInfo[0];
            teacherTwo = offeringTwoInfo[1];
        }

        const user = {
            id: userInfo.id,
            password: userInfo.password,
            email: userInfo.email,
            offeringNameOne: offeringOne,
            offeringNameTwo: offeringTwo,
            teacherDisplayTwo: teacherTwo,
            teacherDisplayOne: teacherOne
        };

        axios.put('http://localhost:8080/api/users', user, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setModalInfo({ showModal: true, title: 'Success', body: 'Successfully updated user', handleConfirm: closeModal, handleCancel: null});
        })
        .catch(error => {
                setModalInfo({ showModal: true, title: 'Error', body: error.message, handleConfirm: closeModal, handleCancel: null});
        });
    }

    
    const [selectedValueOne, setSelectedValueOne] = useState(userInfo.offeringNameOne === '' ? 'No Sign Up' : userInfo.offeringNameOne +' --- '+ userInfo.teacherDisplayOne);
    const [selectedValueTwo, setSelectedValueTwo] = useState(userInfo.offeringNameTwo === '' ? 'No Sign Up' : userInfo.offeringNameTwo + ' --- ' + userInfo.teacherDisplayTwo);

    const handleSelectChangeOne = (event) => {
      setSelectedValueOne(event.target.value);
    };
    

    const handleSelectChangeTwo = (event) => {
      setSelectedValueTwo(event.target.value);
    };
  

    return (
        <div className='home'>
            <Modal showModal={modalInfo.showModal} title={modalInfo.title} body={modalInfo.body} handleConfirm={modalInfo.handleConfirm} handleCancel={modalInfo.handleCancel}/>
            <div className="input-panel">
                <div className="dropdown">
                    <label htmlFor="mod-one-select">Ac-Lab Mod One</label>
                    {/* Ensure each option has a value that does not contain more than one instance of " --- " */}
                    <select className="select form-select" name="mod-one-select" onChange={handleSelectChangeOne} value={selectedValueOne}>
                        <option value="No Sign Up">No Sign Up</option>
                        <option value="LIBRARY --- BALLARD-LONG">Library --- Ballard-Long</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="mod-two-select">Ac-Lab Mod Two</label>
                    {/* Ensure each option has a value that does not contain more than one instance of " --- " */}
                    <select className="select form-select" name="mod-two-select" onChange={handleSelectChangeTwo} value={selectedValueTwo}>
                        <option value="No Sign Up">No Sign Up</option>
                        <option value="LIBRARY --- BALLARD-LONG">Library --- Ballard-Long</option>
                    </select>
                </div>
                <button type="submit" className="update" onClick={handleSubmit}>Update</button>
            </div>
            <div className="account">
                <button className="button logout-button" onClick={() => logout()}>Logout</button>
                <button className="button delete-button" onClick={handleDelete}>Delete Account <a href="#" title="Delete your EC Account"><img src={help} alt="Logo" style={{width: '15px', height: '15px'}} /></a></button>
            </div>
            
            
            
        </div>
    );
};

export default Home;
