import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        offeringNameOne: "",
        teacherDisplayOne: "",
        offeringNameTwo: "",
        teacherDisplayTwo: "",
        email: "",
        password: "",
        id: ""
    });

    const [loggedIn, setLoggedIn] = useState(false);
    
    const updateUserInfo = (userInfo, loggedIn) => {
        setUserInfo(userInfo);
        setLoggedIn(true); 
    };

    const logout = () => {
        setUserInfo({
          offeringNameOne: '',
          teacherDisplayOne: '',
          offeringNameTwo: '',
          teacherDisplayTwo: '',
          email: '',
        });
        setLoggedIn(false);
      };

      return (
        <UserContext.Provider value={{ userInfo, loggedIn, updateUserInfo, logout }}>
          {children}
        </UserContext.Provider>
      );
};
