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
        .delete('http://efficientcampus.org:8080/api/users', {
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

        axios.put('http://efficientcampus.org:8080/api/users', user, {
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
                        <option value="Academic Help --- INDELICATO-FAW, DAWN MICHELLE">Academic Help --- INDELICATO-FAW, DAWN MICHELLE</option>
                        <option value="Academic Help --- BUTCHART, RYAN THOMAS">Academic Help --- Butchart, Ryan Thomas</option>
                        <option value="Academic Help --- WHITE, AMY LEE">Academic Help --- WHITE, AMY LEE</option>
                        <option value="Academic Help --- CLARK, KATRINA N">Academic Help --- CLARK, KATRINA N</option>
                        <option value="Academic Help --- WAECKERLE, MATTHEW JACOB">Academic Help --- WAECKERLE, MATTHEW JACOB</option>
                        <option value="Academic Help --- HAGGLUND, ERIN E">Academic Help --- HAGGLUND, ERIN E</option>
                        <option value="Academic Help --- CONROY, MEGHAN CLARE">Academic Help --- CONROY, MEGHAN CLARE</option>
                        <option value="Academic Help --- RALPH, WHITNEY E">Academic Help --- RALPH, WHITNEY E</option>
                        <option value="Academic Help --- PESTKA, EMILY G">Academic Help --- PESTKA, EMILY G</option>
                        <option value="Academic Help --- RUCKMAN, ZACHARY THOMAS">Academic Help --- RUCKMAN, ZACHARY THOMAS</option>
                        <option value="Academic Help --- STALLIS, STEVEN NIKOLAUS">Academic Help --- STALLIS, STEVEN NIKOLAUS</option>
                        <option value="Academic Help --- CONSOLINO, FRANK EDWARD">Academic Help --- CONSOLINO, FRANK EDWARD</option>
                        <option value="Academic Help --- THOMAS, DYLAN J">Academic Help --- THOMAS, DYLAN J</option>
                        <option value="Academic Help --- ZIMMERMAN, CHERYL L">Academic Help --- ZIMMERMAN, CHERYL L</option>
                        <option value="Academic Help --- SILVERNAIL, KRISTA L">Academic Help --- SILVERNAIL, KRISTA L</option>
                        <option value="Academic Help --- KLAGES, KATHRYN ELIZABETH">Academic Help --- KLAGES, KATHRYN ELIZABETH</option>
                        <option value="Academic Help --- KLAGES, KATHRYN ELIZABETH">Academic Help --- MARASIGAN-KOSA, CRISTINA</option>
                        <option value="Academic Help --- LOFGREN, CHRISTOPHER L">Academic Help --- LOFGREN, CHRISTOPHER L</option>
                        <option value="Academic Help --- DONOVAN, LISA A">Academic Help --- DONOVAN, LISA A</option>
                        <option value="Academic Help --- CAMPBELL, SHANNON KARIN">Academic Help --- CAMPBELL, SHANNON KARIN</option>
                        <option value="Academic Help --- KLAWITER, STEVE H">Academic Help --- KLAWITER, STEVE H</option>
                        <option value="Academic Help --- REMPE, CRYSTAL ANNE">Academic Help --- REMPE, CRYSTAL ANNE</option>
                        <option value="Academic Help --- WIER, JOSEPH RYAN">Academic Help --- WIER, JOSEPH RYAN</option>
                        <option value="Academic Help --- SCHNEIDER, JASON LEE">Academic Help --- SCHNEIDER, JASON LEE</option>
                        <option value="Academic Help --- SHAFFER, LINDA C">Academic Help --- SHAFFER, LINDA C</option>
                        <option value="Academic Help --- WILLARD, NATHAN STUART">Academic Help --- WILLARD, NATHAN STUART</option>
                        <option value="Academic Help --- ELL, DOUGLAS">Academic Help --- ELL, DOUGLAS</option>
                        <option value="Academic Help --- SAKOWSKI, LAUREN ELIZABETH">Academic Help --- SAKOWSKI, LAUREN ELIZABETH</option>
                        <option value="Academic Help --- BROWN, KORY MASHELL">Academic Help --- BROWN, KORY MASHELL</option>
                        <option value="Academic Help --- HORST, DANIEL">Academic Help --- HORST, DANIEL</option>
                        <option value="Academic Help --- BOLTON, TRACI LYNN">Academic Help --- BOLTON, TRACI LYNN</option>
                        <option value="Academic Help --- TAMAROFF, EMMANUELLE">Academic Help --- TAMAROFF, EMMANUELLE</option>
                        <option value="Academic Help --- GUENZLER-HEANEY, CARRIE ELIZABETH">Academic Help --- GUENZLER-HEANEY, CARRIE ELIZABETH</option>
                        <option value="Academic Help --- LAWRENCE, REBECCA SUE">Academic Help --- LAWRENCE, REBECCA SUE</option>
                        <option value="Academic Help --- TROTT, BRITTANY ANN">Academic Help --- TROTT, BRITTANY ANN</option>
                        <option value="Academic Help --- FISH, BRIAN CHRISTOPHER">Academic Help --- FISH, BRIAN CHRISTOPHER</option>
                        <option value="Academic Help --- MABIE, PATRICIA JEAN">Academic Help --- MABIE, PATRICIA JEAN</option>
                        <option value="Academic Help --- LOEFFLER, KELLI ELIZABETH">Academic Help --- LOEFFLER, KELLI ELIZABETH</option>
                        <option value="Academic Help --- CHOATE, DAVID HUMBIRD">Academic Help --- CHOATE, DAVID HUMBIRD</option>
                        <option value="Academic Help --- JAYCOX, PAUL">Academic Help --- JAYCOX, PAUL</option>
                        <option value="Academic Help --- BENNER, EMILY DORMAN">Academic Help --- BENNER, EMILY DORMAN</option>
                        <option value="Academic Help --- JONES, JENNIFER DIANE">Academic Help --- JONES, JENNIFER DIANE</option>
                        <option value="Academic Help --- KREIENKAMP, DONALD ANDREW">Academic Help --- KREIENKAMP, DONALD ANDREW</option>
                        <option value="Academic Help --- KOZLOWSKI, CHRISTINE">Academic Help --- KOZLOWSKI, CHRISTINE</option>
                        <option value="Academic Help --- DEBLASI, VINCENT CHARLES">Academic Help --- DEBLASI, VINCENT CHARLES</option>
                        <option value="Academic Help --- SHEA, KATHRYN MARIE">Academic Help --- SHEA, KATHRYN MARIE</option>
                        <option value="Academic Help --- BRIGINETS, LYUBOV GENNADEVNA">Academic Help --- BRIGINETS, LYUBOV GENNADEVNA</option>
                        <option value="Academic Help --- MCALLISTER, MARK ANDREW">Academic Help --- MCALLISTER, MARK ANDREW</option>
                        <option value="Academic Help --- LANDOW, JEFFREY WILLIAM">Academic Help --- LANDOW, JEFFREY WILLIAM</option>
                        <option value="Academic Help --- HALL, CARRIE ANN">Academic Help --- HALL, CARRIE ANN</option>
                        <option value="Academic Help --- FOWLER, JODIE ANN">Academic Help --- FOWLER, JODIE ANN</option>
                        <option value="Academic Help --- WHELAN, GRETCHEN ELAINE">Academic Help --- WHELAN, GRETCHEN ELAINE</option>
                        <option value="Academic Help --- SCERBA, SARAH J">Academic Help --- SCERBA, SARAH J</option>
                        <option value="Academic Help --- HRUBY, STEFANIE D">Academic Help --- HRUBY, STEFANIE D</option>
                        <option value="Academic Help --- WARREN, MATTHEW STEVEN">Academic Help --- WARREN, MATTHEW STEVEN</option>
                        <option value="Academic Help --- AHLERS, CURTIS EVERETT">Academic Help --- AHLERS, CURTIS EVERETT</option>
                        <option value="Academic Help --- ARNET, LAUREN ELIZABETH">Academic Help --- ARNET, LAUREN ELIZABETH</option>
                        <option value="Academic Help --- KEMPF, JESSICA ANN">Academic Help --- KEMPF, JESSICA ANN</option>
                        <option value="Academic Help --- HICKS, CORY">Academic Help --- HICKS, CORY</option>
                        <option value="Academic Help --- SCHEIDENHELM, ALICIA K">Academic Help --- SCHEIDENHELM, ALICIA K</option>
                        <option value="Academic Help --- HOLTMANN, SCOTT A">Academic Help --- HOLTMANN, SCOTT A</option>
                        <option value="Academic Help --- BRAWNER, JESSICA A">Academic Help --- BRAWNER, JESSICA A</option>
                        <option value="Academic Help --- BEAVER, SCOTT FREILING">Academic Help --- BEAVER, SCOTT FREILING</option>
                        <option value="Academic Help --- DEKEN, JOHN CORNELIUS">Academic Help --- DEKEN, JOHN CORNELIUS</option>
                        <option value="Academic Help --- LANDWEHR, MEGHAN MARIE">Academic Help --- LANDWEHR, MEGHAN MARIE</option>
                        <option value="Academic Help --- WRIGHT KEMPEN, DEBBIE ANN">Academic Help --- WRIGHT KEMPEN, DEBBIE ANN</option>
                        <option value="Academic Help --- O'DONNELL, MEGHAN E">Academic Help --- O'DONNELL, MEGHAN E</option>
                        <option value="Academic Help --- OVERCASH, ELIZABETH H">Academic Help --- OVERCASH, ELIZABETH H</option>
                        <option value="Academic Help --- BATES, JULIE L">Academic Help --- BATES, JULIE L</option>
                        <option value="Academic Help --- MERRIOTT, AMY V">Academic Help --- MERRIOTT, AMY V</option>
                        <option value="Academic Help --- STOCKWELL, BENJAMIN E">Academic Help --- STOCKWELL, BENJAMIN E</option>
                        <option value="Academic Help --- ATKINS, SETH D">Academic Help --- ATKINS, SETH D</option>
                        <option value="Academic Help --- O'GORMAN, KEVIN P">Academic Help --- O'GORMAN, KEVIN P</option>
                        <option value="Academic Help --- PALECEK, KATHLEEN D">Academic Help --- PALECEK, KATHLEEN D</option>
                        <option value="Academic Help --- JAKCSY, ROBERT ANDREW">Academic Help --- JAKCSY, ROBERT ANDREW</option>
                        <option value="Academic Help --- BEASLEY, SOPHIA L">Academic Help --- BEASLEY, SOPHIA L</option>
                        <option value="Academic Help --- GREEN, HOLLY A">Academic Help --- GREEN, HOLLY A</option>
                        <option value="Academic Help --- GREIFE, CHRISTINE">Academic Help --- GREIFE, CHRISTINE</option>
                        <option value="Academic Help --- STEFFENS, MATTHEW S">Academic Help --- STEFFENS, MATTHEW S</option>
                        <option value="Academic Help --- HAUSER, LIN NICOLE">Academic Help --- HAUSER, LIN NICOLE</option>
                        <option value="Academic Help --- HARMON, JILL">Academic Help --- HARMON, JILL</option>
                        <option value="Academic Help --- DIRNBECK, MATTHEW">Academic Help --- DIRNBECK, MATTHEW</option>
                        <option value="Academic Help --- TIGHE, AARON R">Academic Help --- TIGHE, AARON R</option>
                        <option value="Academic Help --- OCONNOR, SEAN PATRICK">Academic Help --- OCONNOR, SEAN PATRICK</option>
                        <option value="Academic Help --- LIVESAY, CHRISTOPHER EDWARD">Academic Help --- LIVESAY, CHRISTOPHER EDWARD</option>
                        <option value="Academic Help --- WIDEMAN, CRAIG M">Academic Help --- WIDEMAN, CRAIG M</option>
                        <option value="Academic Help --- HAXTON, SCOTT A">Academic Help --- HAXTON, SCOTT A</option>
                        <option value="Academic Help --- PEARL, SARAH E">Academic Help --- PEARL, SARAH E</option>
                        <option value="Academic Help --- DZIEWA, LORI">Academic Help --- DZIEWA, LORI</option>
                        <option value="Academic Help --- RITCHIE, SAMUEL L">Academic Help --- RITCHIE, SAMUEL L</option>
                        <option value="Academic Help --- BATT, SHANNON L">Academic Help --- BATT, SHANNON L</option>
                        <option value="Academic Help --- FLORES, JILLIAN MARIE">Academic Help --- FLORES, JILLIAN MARIE</option>
                        <option value="Academic Help --- ORETO, ZACHARY">Academic Help --- ORETO, ZACHARY</option>
                        <option value="Academic Help --- PAYNE, NEILEIGH">Academic Help --- PAYNE, NEILEIGH</option>
                        <option value="Academic Help --- DELANEY, SARAH MARIE">Academic Help --- DELANEY, SARAH MARIE</option>
                        <option value="Academic Help --- VERNON, JESSICA ANNEL">Academic Help --- VERNON, JESSICA ANNEL</option>
                        <option value="Academic Help --- SWINDLE, MICHAEL">Academic Help --- SWINDLE, MICHAEL</option>
                        <option value="Academic Help --- LYNCH, DANNA CHRISTINA-LYNCH">Academic Help --- LYNCH, DANNA CHRISTINA-LYNCH</option>
                        <option value="Academic Help --- MAJESKY, MAGGIE NICOLE">Academic Help --- MAJESKY, MAGGIE NICOLE</option>
                        <option value="Academic Help --- WEBB, MATTHEW">Academic Help --- WEBB, MATTHEW</option>
                        <option value="Academic Help --- PENBERTHY, AUDREY">Academic Help --- PENBERTHY, AUDREY</option>
                        <option value="Academic Help --- RAWSON, WILLIAM">Academic Help --- RAWSON, WILLIAM</option>
                        <option value="Academic Help --- MCDANIEL, ZACHARY">Academic Help --- MCDANIEL, ZACHARY</option>
                        <option value="Academic Help --- FLUCHEL, CADE">Academic Help --- FLUCHEL, CADE</option>
                        <option value="Academic Help --- HILL, CATHERINE">Academic Help --- HILL, CATHERINE</option>
                        <option value="Academic Help --- KLEIN, TERILYNN E">Academic Help --- KLEIN, TERILYNN E</option>
                        <option value="Academic Help --- NNAKWE, RAMONA FERNANDEZ">Academic Help --- NNAKWE, RAMONA FERNANDEZ</option>
                        <option value="Academic Help --- BALOG, BRAD MICHAEL">Academic Help --- BALOG, BRAD MICHAEL</option>
                        <option value="Academic Help --- LOWE, KEVIN">Academic Help --- LOWE, KEVIN</option>
                        <option value="Advisory--Service --- LINGAFELTER, JANE LYNN">Advisory--Service --- LINGAFELTER, JANE LYNN</option>
                        <option value="Basketball/PE Make Ups --- LEWIS, ASHLEY J">Basketball/PE Make Ups --- LEWIS, ASHLEY J</option>
                        <option value="Counseling --- HICKS, SARAH N">Counseling --- HICKS, SARAH N</option>
                        <option value="Counseling --- LAUDEL, CINDY M">Counseling --- LAUDEL, CINDY M</option>
                        <option value="Counseling --- CHAMBERLAIN, HEATHER DOREEN">Counseling --- CHAMBERLAIN, HEATHER DOREEN</option>
                        <option value="Counseling --- MULLINS, STEPHANIE WOLLARD">Counseling --- MULLINS, STEPHANIE WOLLARD</option>
                        <option value="Counseling --- DUSENBERRY, LEIGH A">Counseling --- DUSENBERRY, LEIGH A</option>
                        <option value="Counseling --- SMALL, TERENCE M">Counseling --- SMALL, TERENCE M</option>
                        <option value="Counseling --- DAVIS, ANNE MARIE">Counseling --- DAVIS, ANNE MARIE</option>
                        <option value="Counseling --- BRAILE, MAKAYLA NICHOLE">Counseling --- BRAILE, MAKAYLA NICHOLE</option>
                        <option value="LIBRARY --- BALLARD-LONG, NICHOLE AYN">LIBRARY --- BALLARD-LONG, NICHOLE AYN</option>
                        <option value="Student Council Meeting --- CHOATE, DAVID HUMBIRD">Student Council Meeting --- CHOATE, DAVID HUMBIRD</option>
                        <option value="Walking the Track/Basketball --- O'CONNELL, MEGHAN LOUISE">Walking the Track/Basketball --- O'CONNELL, MEGHAN LOUISE</option>
                        <option value="Weight Room --- HICKS, ADAM JOSEPH">Weight Room --- HICKS, ADAM JOSEPH</option>
                    </select>
                </div>
                <div className="dropdown">
                    <label htmlFor="mod-two-select">Ac-Lab Mod Two</label>
                    {/* Ensure each option has a value that does not contain more than one instance of " --- " */}
                    <select className="select form-select" name="mod-two-select" onChange={handleSelectChangeTwo} value={selectedValueTwo}>
                        <option value="No Sign Up">No Sign Up</option>
                        <option value="Academic Help --- INDELICATO-FAW, DAWN MICHELLE">Academic Help --- INDELICATO-FAW, DAWN MICHELLE</option>
                        <option value="Academic Help --- BUTCHART, RYAN THOMAS">Academic Help --- Butchart, Ryan Thomas</option>
                        <option value="Academic Help --- WHITE, AMY LEE">Academic Help --- WHITE, AMY LEE</option>
                        <option value="Academic Help --- CLARK, KATRINA N">Academic Help --- CLARK, KATRINA N</option>
                        <option value="Academic Help --- WAECKERLE, MATTHEW JACOB">Academic Help --- WAECKERLE, MATTHEW JACOB</option>
                        <option value="Academic Help --- HAGGLUND, ERIN E">Academic Help --- HAGGLUND, ERIN E</option>
                        <option value="Academic Help --- CONROY, MEGHAN CLARE">Academic Help --- CONROY, MEGHAN CLARE</option>
                        <option value="Academic Help --- RALPH, WHITNEY E">Academic Help --- RALPH, WHITNEY E</option>
                        <option value="Academic Help --- PESTKA, EMILY G">Academic Help --- PESTKA, EMILY G</option>
                        <option value="Academic Help --- RUCKMAN, ZACHARY THOMAS">Academic Help --- RUCKMAN, ZACHARY THOMAS</option>
                        <option value="Academic Help --- STALLIS, STEVEN NIKOLAUS">Academic Help --- STALLIS, STEVEN NIKOLAUS</option>
                        <option value="Academic Help --- CONSOLINO, FRANK EDWARD">Academic Help --- CONSOLINO, FRANK EDWARD</option>
                        <option value="Academic Help --- THOMAS, DYLAN J">Academic Help --- THOMAS, DYLAN J</option>
                        <option value="Academic Help --- ZIMMERMAN, CHERYL L">Academic Help --- ZIMMERMAN, CHERYL L</option>
                        <option value="Academic Help --- SILVERNAIL, KRISTA L">Academic Help --- SILVERNAIL, KRISTA L</option>
                        <option value="Academic Help --- KLAGES, KATHRYN ELIZABETH">Academic Help --- KLAGES, KATHRYN ELIZABETH</option>
                        <option value="Academic Help --- KLAGES, KATHRYN ELIZABETH">Academic Help --- MARASIGAN-KOSA, CRISTINA</option>
                        <option value="Academic Help --- LOFGREN, CHRISTOPHER L">Academic Help --- LOFGREN, CHRISTOPHER L</option>
                        <option value="Academic Help --- DONOVAN, LISA A">Academic Help --- DONOVAN, LISA A</option>
                        <option value="Academic Help --- CAMPBELL, SHANNON KARIN">Academic Help --- CAMPBELL, SHANNON KARIN</option>
                        <option value="Academic Help --- KLAWITER, STEVE H">Academic Help --- KLAWITER, STEVE H</option>
                        <option value="Academic Help --- REMPE, CRYSTAL ANNE">Academic Help --- REMPE, CRYSTAL ANNE</option>
                        <option value="Academic Help --- WIER, JOSEPH RYAN">Academic Help --- WIER, JOSEPH RYAN</option>
                        <option value="Academic Help --- SCHNEIDER, JASON LEE">Academic Help --- SCHNEIDER, JASON LEE</option>
                        <option value="Academic Help --- SHAFFER, LINDA C">Academic Help --- SHAFFER, LINDA C</option>
                        <option value="Academic Help --- WILLARD, NATHAN STUART">Academic Help --- WILLARD, NATHAN STUART</option>
                        <option value="Academic Help --- ELL, DOUGLAS">Academic Help --- ELL, DOUGLAS</option>
                        <option value="Academic Help --- SAKOWSKI, LAUREN ELIZABETH">Academic Help --- SAKOWSKI, LAUREN ELIZABETH</option>
                        <option value="Academic Help --- BROWN, KORY MASHELL">Academic Help --- BROWN, KORY MASHELL</option>
                        <option value="Academic Help --- HORST, DANIEL">Academic Help --- HORST, DANIEL</option>
                        <option value="Academic Help --- BOLTON, TRACI LYNN">Academic Help --- BOLTON, TRACI LYNN</option>
                        <option value="Academic Help --- TAMAROFF, EMMANUELLE">Academic Help --- TAMAROFF, EMMANUELLE</option>
                        <option value="Academic Help --- GUENZLER-HEANEY, CARRIE ELIZABETH">Academic Help --- GUENZLER-HEANEY, CARRIE ELIZABETH</option>
                        <option value="Academic Help --- LAWRENCE, REBECCA SUE">Academic Help --- LAWRENCE, REBECCA SUE</option>
                        <option value="Academic Help --- TROTT, BRITTANY ANN">Academic Help --- TROTT, BRITTANY ANN</option>
                        <option value="Academic Help --- FISH, BRIAN CHRISTOPHER">Academic Help --- FISH, BRIAN CHRISTOPHER</option>
                        <option value="Academic Help --- MABIE, PATRICIA JEAN">Academic Help --- MABIE, PATRICIA JEAN</option>
                        <option value="Academic Help --- LOEFFLER, KELLI ELIZABETH">Academic Help --- LOEFFLER, KELLI ELIZABETH</option>
                        <option value="Academic Help --- CHOATE, DAVID HUMBIRD">Academic Help --- CHOATE, DAVID HUMBIRD</option>
                        <option value="Academic Help --- JAYCOX, PAUL">Academic Help --- JAYCOX, PAUL</option>
                        <option value="Academic Help --- BENNER, EMILY DORMAN">Academic Help --- BENNER, EMILY DORMAN</option>
                        <option value="Academic Help --- JONES, JENNIFER DIANE">Academic Help --- JONES, JENNIFER DIANE</option>
                        <option value="Academic Help --- KREIENKAMP, DONALD ANDREW">Academic Help --- KREIENKAMP, DONALD ANDREW</option>
                        <option value="Academic Help --- KOZLOWSKI, CHRISTINE">Academic Help --- KOZLOWSKI, CHRISTINE</option>
                        <option value="Academic Help --- DEBLASI, VINCENT CHARLES">Academic Help --- DEBLASI, VINCENT CHARLES</option>
                        <option value="Academic Help --- SHEA, KATHRYN MARIE">Academic Help --- SHEA, KATHRYN MARIE</option>
                        <option value="Academic Help --- BRIGINETS, LYUBOV GENNADEVNA">Academic Help --- BRIGINETS, LYUBOV GENNADEVNA</option>
                        <option value="Academic Help --- MCALLISTER, MARK ANDREW">Academic Help --- MCALLISTER, MARK ANDREW</option>
                        <option value="Academic Help --- LANDOW, JEFFREY WILLIAM">Academic Help --- LANDOW, JEFFREY WILLIAM</option>
                        <option value="Academic Help --- HALL, CARRIE ANN">Academic Help --- HALL, CARRIE ANN</option>
                        <option value="Academic Help --- FOWLER, JODIE ANN">Academic Help --- FOWLER, JODIE ANN</option>
                        <option value="Academic Help --- WHELAN, GRETCHEN ELAINE">Academic Help --- WHELAN, GRETCHEN ELAINE</option>
                        <option value="Academic Help --- SCERBA, SARAH J">Academic Help --- SCERBA, SARAH J</option>
                        <option value="Academic Help --- HRUBY, STEFANIE D">Academic Help --- HRUBY, STEFANIE D</option>
                        <option value="Academic Help --- WARREN, MATTHEW STEVEN">Academic Help --- WARREN, MATTHEW STEVEN</option>
                        <option value="Academic Help --- AHLERS, CURTIS EVERETT">Academic Help --- AHLERS, CURTIS EVERETT</option>
                        <option value="Academic Help --- ARNET, LAUREN ELIZABETH">Academic Help --- ARNET, LAUREN ELIZABETH</option>
                        <option value="Academic Help --- KEMPF, JESSICA ANN">Academic Help --- KEMPF, JESSICA ANN</option>
                        <option value="Academic Help --- HICKS, CORY">Academic Help --- HICKS, CORY</option>
                        <option value="Academic Help --- SCHEIDENHELM, ALICIA K">Academic Help --- SCHEIDENHELM, ALICIA K</option>
                        <option value="Academic Help --- HOLTMANN, SCOTT A">Academic Help --- HOLTMANN, SCOTT A</option>
                        <option value="Academic Help --- BRAWNER, JESSICA A">Academic Help --- BRAWNER, JESSICA A</option>
                        <option value="Academic Help --- BEAVER, SCOTT FREILING">Academic Help --- BEAVER, SCOTT FREILING</option>
                        <option value="Academic Help --- DEKEN, JOHN CORNELIUS">Academic Help --- DEKEN, JOHN CORNELIUS</option>
                        <option value="Academic Help --- LANDWEHR, MEGHAN MARIE">Academic Help --- LANDWEHR, MEGHAN MARIE</option>
                        <option value="Academic Help --- WRIGHT KEMPEN, DEBBIE ANN">Academic Help --- WRIGHT KEMPEN, DEBBIE ANN</option>
                        <option value="Academic Help --- O'DONNELL, MEGHAN E">Academic Help --- O'DONNELL, MEGHAN E</option>
                        <option value="Academic Help --- OVERCASH, ELIZABETH H">Academic Help --- OVERCASH, ELIZABETH H</option>
                        <option value="Academic Help --- BATES, JULIE L">Academic Help --- BATES, JULIE L</option>
                        <option value="Academic Help --- MERRIOTT, AMY V">Academic Help --- MERRIOTT, AMY V</option>
                        <option value="Academic Help --- STOCKWELL, BENJAMIN E">Academic Help --- STOCKWELL, BENJAMIN E</option>
                        <option value="Academic Help --- ATKINS, SETH D">Academic Help --- ATKINS, SETH D</option>
                        <option value="Academic Help --- O'GORMAN, KEVIN P">Academic Help --- O'GORMAN, KEVIN P</option>
                        <option value="Academic Help --- PALECEK, KATHLEEN D">Academic Help --- PALECEK, KATHLEEN D</option>
                        <option value="Academic Help --- JAKCSY, ROBERT ANDREW">Academic Help --- JAKCSY, ROBERT ANDREW</option>
                        <option value="Academic Help --- BEASLEY, SOPHIA L">Academic Help --- BEASLEY, SOPHIA L</option>
                        <option value="Academic Help --- GREEN, HOLLY A">Academic Help --- GREEN, HOLLY A</option>
                        <option value="Academic Help --- GREIFE, CHRISTINE">Academic Help --- GREIFE, CHRISTINE</option>
                        <option value="Academic Help --- STEFFENS, MATTHEW S">Academic Help --- STEFFENS, MATTHEW S</option>
                        <option value="Academic Help --- HAUSER, LIN NICOLE">Academic Help --- HAUSER, LIN NICOLE</option>
                        <option value="Academic Help --- HARMON, JILL">Academic Help --- HARMON, JILL</option>
                        <option value="Academic Help --- DIRNBECK, MATTHEW">Academic Help --- DIRNBECK, MATTHEW</option>
                        <option value="Academic Help --- TIGHE, AARON R">Academic Help --- TIGHE, AARON R</option>
                        <option value="Academic Help --- OCONNOR, SEAN PATRICK">Academic Help --- OCONNOR, SEAN PATRICK</option>
                        <option value="Academic Help --- LIVESAY, CHRISTOPHER EDWARD">Academic Help --- LIVESAY, CHRISTOPHER EDWARD</option>
                        <option value="Academic Help --- WIDEMAN, CRAIG M">Academic Help --- WIDEMAN, CRAIG M</option>
                        <option value="Academic Help --- HAXTON, SCOTT A">Academic Help --- HAXTON, SCOTT A</option>
                        <option value="Academic Help --- PEARL, SARAH E">Academic Help --- PEARL, SARAH E</option>
                        <option value="Academic Help --- DZIEWA, LORI">Academic Help --- DZIEWA, LORI</option>
                        <option value="Academic Help --- RITCHIE, SAMUEL L">Academic Help --- RITCHIE, SAMUEL L</option>
                        <option value="Academic Help --- BATT, SHANNON L">Academic Help --- BATT, SHANNON L</option>
                        <option value="Academic Help --- FLORES, JILLIAN MARIE">Academic Help --- FLORES, JILLIAN MARIE</option>
                        <option value="Academic Help --- ORETO, ZACHARY">Academic Help --- ORETO, ZACHARY</option>
                        <option value="Academic Help --- PAYNE, NEILEIGH">Academic Help --- PAYNE, NEILEIGH</option>
                        <option value="Academic Help --- DELANEY, SARAH MARIE">Academic Help --- DELANEY, SARAH MARIE</option>
                        <option value="Academic Help --- VERNON, JESSICA ANNEL">Academic Help --- VERNON, JESSICA ANNEL</option>
                        <option value="Academic Help --- SWINDLE, MICHAEL">Academic Help --- SWINDLE, MICHAEL</option>
                        <option value="Academic Help --- LYNCH, DANNA CHRISTINA-LYNCH">Academic Help --- LYNCH, DANNA CHRISTINA-LYNCH</option>
                        <option value="Academic Help --- MAJESKY, MAGGIE NICOLE">Academic Help --- MAJESKY, MAGGIE NICOLE</option>
                        <option value="Academic Help --- WEBB, MATTHEW">Academic Help --- WEBB, MATTHEW</option>
                        <option value="Academic Help --- PENBERTHY, AUDREY">Academic Help --- PENBERTHY, AUDREY</option>
                        <option value="Academic Help --- RAWSON, WILLIAM">Academic Help --- RAWSON, WILLIAM</option>
                        <option value="Academic Help --- MCDANIEL, ZACHARY">Academic Help --- MCDANIEL, ZACHARY</option>
                        <option value="Academic Help --- FLUCHEL, CADE">Academic Help --- FLUCHEL, CADE</option>
                        <option value="Academic Help --- HILL, CATHERINE">Academic Help --- HILL, CATHERINE</option>
                        <option value="Academic Help --- KLEIN, TERILYNN E">Academic Help --- KLEIN, TERILYNN E</option>
                        <option value="Academic Help --- NNAKWE, RAMONA FERNANDEZ">Academic Help --- NNAKWE, RAMONA FERNANDEZ</option>
                        <option value="Academic Help --- BALOG, BRAD MICHAEL">Academic Help --- BALOG, BRAD MICHAEL</option>
                        <option value="Academic Help --- LOWE, KEVIN">Academic Help --- LOWE, KEVIN</option>
                        <option value="Advisory--Service --- LINGAFELTER, JANE LYNN">Advisory--Service --- LINGAFELTER, JANE LYNN</option>
                        <option value="Basketball/PE Make Ups --- LEWIS, ASHLEY J">Basketball/PE Make Ups --- LEWIS, ASHLEY J</option>
                        <option value="Counseling --- HICKS, SARAH N">Counseling --- HICKS, SARAH N</option>
                        <option value="Counseling --- LAUDEL, CINDY M">Counseling --- LAUDEL, CINDY M</option>
                        <option value="Counseling --- CHAMBERLAIN, HEATHER DOREEN">Counseling --- CHAMBERLAIN, HEATHER DOREEN</option>
                        <option value="Counseling --- MULLINS, STEPHANIE WOLLARD">Counseling --- MULLINS, STEPHANIE WOLLARD</option>
                        <option value="Counseling --- DUSENBERRY, LEIGH A">Counseling --- DUSENBERRY, LEIGH A</option>
                        <option value="Counseling --- SMALL, TERENCE M">Counseling --- SMALL, TERENCE M</option>
                        <option value="Counseling --- DAVIS, ANNE MARIE">Counseling --- DAVIS, ANNE MARIE</option>
                        <option value="Counseling --- BRAILE, MAKAYLA NICHOLE">Counseling --- BRAILE, MAKAYLA NICHOLE</option>
                        <option value="LIBRARY --- BALLARD-LONG, NICHOLE AYN">LIBRARY --- BALLARD-LONG, NICHOLE AYN</option>
                        <option value="Student Council Meeting --- CHOATE, DAVID HUMBIRD">Student Council Meeting --- CHOATE, DAVID HUMBIRD</option>
                        <option value="Walking the Track/Basketball --- O'CONNELL, MEGHAN LOUISE">Walking the Track/Basketball --- O'CONNELL, MEGHAN LOUISE</option>
                        <option value="Weight Room --- HICKS, ADAM JOSEPH">Weight Room --- HICKS, ADAM JOSEPH</option>
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
