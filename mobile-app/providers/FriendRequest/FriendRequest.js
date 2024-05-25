import React, { createContext, useEffect, useState } from 'react';

export const FriendRequsetContext = createContext();

const FriendRequsetProvider = ({ children }) => {
    const [numberOfFriendRequset, setNumberOfFriendRequset] = useState(0);

    useEffect(() => {
        
    },[]);

    return (
        <FriendRequsetContext.Provider value={{ numberOfFriendRequset, setNumberOfFriendRequset }}>
            {children}
        </FriendRequsetContext.Provider>
    );
};

export default FriendRequsetProvider;
