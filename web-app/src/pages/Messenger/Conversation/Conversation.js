import './Conversation.scss';
import Search from '../../../components/Search/Search';
import clsx from 'clsx';
import ConversationItem from './ConversationItem/ConversationItem';
import * as conversationService from '../../../services/conversationService';
import * as messageService from '../../../services/messageService';
import { useEffect, useState, useContext, useRef } from 'react';
import { socketContext } from '../../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../../providers/ConversationProvider/ConversationProvider';
import { useLang } from '../../../hooks';
import { timeDuaration } from '../../../utils/chatUtil';

import { ViewPortContext } from '../../../providers/ViewPort/ViewPortProvider';

const Conversation = () => {
    const { view } = useContext(ViewPortContext);

    const { socket, currentUserId } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext);
    const [openPopper, setOpenPopper] = useState('');
    const [conversations, setConversations] = useState([]);
    const [activeFilter, setActiveFilter] = useState(1);
    const [activeConversation, setActiveConversation] = useState(conversation._id);
    const { t } = useLang();

    const fetchConversations = async () => {
        try {
            //get toàn bộ conversation
            const conversations = await conversationService.getConversationByUserId(currentUserId);
            for (let i = 0; i < conversations.length; i++) {
                const conversationID = conversations[i]._id;
                conversations[i].timeDuaration = timeDuaration(conversations[i].updatedAt);
                //get toàn bộ message của conversation tương ứng

                const totalUnseen = await messageService.countUnseenMessage(conversationID, currentUserId);

                //thêm trường totalUnseen vào mảng object conversation
                conversations[i].totalUnseen = typeof totalUnseen === 'number' ? totalUnseen : totalUnseen.data;
                console.log('totalUnseen>>', conversations[i].totalUnseen);
            }
            console.log('conversations in fet', conversations);
            setConversations([...conversations]);
        } catch (err) {
            console.log(err);
        }
    };

    // useEffect(() => {
    //     let timeOut = setTimeout(() => {
    //         fetchConversations();
    //     }, 60000);

    //     return () => {
    //         clearTimeout(timeOut);
    //     };
    // }, []);

    const handleRerenderConversation = async (conversationId, unseen, lastmessage, sendAt) => {
        let i = 0;
        let flag = false;
        console.log("conversations", conversations);
        conversations.forEach((con, index) => {

            if (con._id === conversationId) {
                i = index;
                flag = true;
                const totalunseen = con.totalUnseen;
               
                console.log("currentConversation", conversation._id);
                if (conversation._id == conversationId) {
                    con.totalUnseen = 0;
             
                    
                } else {
                    con.totalUnseen = unseen + totalunseen;
                }
                con.lastMessage = lastmessage ? lastmessage : con.lastMessage;
                con.timeDuaration = sendAt ? timeDuaration(sendAt) : con.timeDuaration;
                console.log('con.timeDuaration', con.timeDuaration);
            }
        });

        if (!flag) {
            const new_conversation = await conversationService.getConversationById(conversationId);
            new_conversation.timeDuaration = timeDuaration(new_conversation.updatedAt);
            new_conversation.totalUnseen = new_conversation.lastSenderid === currentUserId ? 0 : unseen;
            if (new_conversation.lastMessage) {
                conversations.unshift(new_conversation);

                setConversations((prev) => [...prev]);
                return;
            }
        } else {
            if (!unseen && !lastmessage) {
                setConversations((prev) => [...prev]);
                return;
            }

            let newArray = [];
            if (i >= 0 && i < conversations.length) {
                let element = conversations[i]; // Lấy phần tử tại chỉ số đó
                newArray = [element, ...conversations.slice(0, i), ...conversations.slice(i + 1)]; // Tạo mảng mới với phần tử được di chuyển lên đầu
            }
            newArray.length > 0 && setConversations([...newArray]);
            return;
        }
        setConversations((prev) => [...prev]);
    };

    useEffect(() => {
        const onRerenderConversations = ({ conversationId, unseen, lastMessage, sendAt }) => {
            handleRerenderConversation(conversationId, unseen, lastMessage, sendAt);
            setActiveConversation(conversation._id);
        };
        socket.on('reRenderConversations', onRerenderConversations);

        return () => {
            socket.off('reRenderConversations', onRerenderConversations);
        };
    }, [conversations, conversation._id]);

    useEffect(() => {
        if (activeFilter) {
            fetchConversations();
        } else {
            const filterConversations = conversations.filter((item) => item.totalUnseen > 0);
            setConversations([...filterConversations]);
        }
    }, [activeFilter]);
    return (
        <div
            id="wp_conversation"
            className={clsx('bg-white', !view.conversation ? 'd-none' : !view.chat ? 'w-100' : '')}
        >
            <Search />
            <div className="filter_conversations">
                <span onClick={() => setActiveFilter(1)} className={clsx('filter_item', activeFilter ? 'active' : '')}>
                    {t('messenger.filter.all')}
                </span>
                <span onClick={() => setActiveFilter(0)} className={clsx('filter_item', !activeFilter ? 'active' : '')}>
                    {t('messenger.filter.unread')}
                </span>
            </div>
            <div className="conversations">
                {conversations.length > 0 &&
                    conversations.map((item, index) => (
                        <ConversationItem
                            activeConversation={activeConversation}
                            onActiveConversation={setActiveConversation}
                            conversationId={item._id}
                            currentUserId={currentUserId}
                            key={index}
                            {...item}
                            openPopper={openPopper}
                            onDetail={() => setOpenPopper(item._id)}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Conversation;
