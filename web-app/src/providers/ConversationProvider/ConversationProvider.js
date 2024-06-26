import React from 'react';
import { useState } from 'react';
export const ConversationContext = React.createContext();
function ConversationProvider({ children }) {
    const [conversation, setConversation] = useState({
        recieveInfor: {}, _id: "",onlineUsers:[],totalUnread:0
    });
    console.log("conversation dc set >>",conversation)
    const setCurrentConversation = (avatar, name, _id, isGroup, members, conversationId) => {
        setConversation({...conversation, recieveInfor: { avatar, name, _id, isGroup, members }, _id: conversationId })
    }
    const setMembers = (members) => {
        setConversation({ ...conversation, recieveInfor: { ...conversation.recieveInfor, members: [...conversation.recieveInfor.members, ...members] } });
    }
   
    const setOnlineUsers = (onlineUsers) => {
        console.log("conversation truoc khi set>>>",conversation)
        setConversation({ ...conversation,onlineUsers});
    }
    const getMembers = () => {
        return conversation.recieveInfor.members;
    }
    const setTotalUnread = (totalUnread) => {
        setConversation({ ...conversation, totalUnread });
    }
    return <ConversationContext.Provider value={{ setOnlineUsers,conversation, setMembers, setCurrentConversation, getMembers,setTotalUnread}}>{children}</ConversationContext.Provider>;
}

export default ConversationProvider;
