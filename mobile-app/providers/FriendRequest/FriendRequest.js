import React, { createContext, useState } from 'react';

export const FriendRequsetContext = createContext();

const FriendRequsetProvider = ({ children }) => {
    const [numberOfFriendRequset, setNumberOfFriendRequset] = useState(0);

    return (
        <FriendRequsetContext.Provider value={{ numberOfFriendRequset, setNumberOfFriendRequset }}>
            {children}
        </FriendRequsetContext.Provider>
    );
};

export default FriendRequsetProvider;
