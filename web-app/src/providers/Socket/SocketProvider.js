import React from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../Auth/AuthProvider';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { ConversationContext } from '../ConversationProvider/ConversationProvider';
export const socketContext = React.createContext();
function SocketProvider({ children }) {
    const { getUser } = useContext(AuthContext);
    const { setOnlineUsers, conversation } = useContext(ConversationContext);
    const [socket] = useState(io('ws://localhost:9000'));
    const user = getUser().data;
    useEffect(() => {
        if (!user._id) return;
        socket.emit('addUser', user._id);
    }, [user._id]);

    useEffect(() => {
        const onOnlineUser = (users) => {
            console.log('conversation trong socket>>>', conversation);
            setOnlineUsers(users.filter((user) => user.userId !== user._id));
        };
        socket.on('getUsers', onOnlineUser);
        return () => {
            socket.off('getUsers', onOnlineUser);
        };
    }, [conversation]);
    return <socketContext.Provider value={{ socket, currentUserId: user._id }}>{children}</socketContext.Provider>;
}

export default SocketProvider;
