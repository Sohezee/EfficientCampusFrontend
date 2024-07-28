import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({
        offeringNameOne: "",
        teacherDisplayOne: "",
        offeringNameTwo: "",
        teacherDisplayTwo: "",
    });

    const updateUserInfo = (userInfo) => {
        setUserInfo(userInfo);
    };

    return (
        <UserContext.Provider value={{ userInfo, updateUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
