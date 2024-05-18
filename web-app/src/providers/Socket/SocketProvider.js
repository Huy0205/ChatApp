import React from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../Auth/AuthProvider';
import { useContext, useEffect } from 'react';
import { useState } from 'react';
export const socketContext = React.createContext();
function SocketProvider({ children }) {
    const { getUser } = useContext(AuthContext);
    const [socket] = useState(io('ws://localhost:9000'));
    const user = getUser().data;
    useEffect(() => {

  
        if (!user._id) return;
        socket.emit('addUser', user._id);
        // socket.current.on('getUsers', (users) => {
        //     console.log('users>>', users);
        //     //   setOnlineUsers(
        //     //     user.followings.filter((f) => users.some((u) => u.userId === f))
        //     //   );
        // });
        //  if(window.location.pathname==='/phonebook'){

        //     socket.disconnect();

        //  }
    }, [user._id]);
    return <socketContext.Provider value={{ socket, currentUserId: user._id }}>{children}</socketContext.Provider>;
}

export default SocketProvider;
