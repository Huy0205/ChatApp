import React, { useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../Auth/AuthProvider';
import { useContext, useEffect } from 'react';

export const socketContext = React.createContext();

function SocketProvider({ children }) {
    const { user } = useContext(AuthContext);

    // const [socket] = useState(io('ws://192.168.1.91:9000'));
    const [socket] = useState(io('https://socketzaloclone-render.onrender.com'));


    useEffect(() => {
        if (!user._id) return;
        socket.emit('addUser', user._id);
    }, [user._id]);
    return <socketContext.Provider value={{ socket, currentUserId: user._id }}>{children}</socketContext.Provider>;
}

export default SocketProvider;
