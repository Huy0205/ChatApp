import React, { createContext, useState } from 'react';

export const UnseenMessagesContext = createContext();

const UnseenMessagesProvider = ({ children }) => {
  const [unseenMessages, setUnseenMessages] = useState(0);

  return (
    <UnseenMessagesContext.Provider value={{ unseenMessages, setUnseenMessages }}>
      {children}
    </UnseenMessagesContext.Provider>
  );
};

export default UnseenMessagesProvider;
