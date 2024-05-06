import { View } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Conversation from '../../components/conversation';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import Header from '../../components/header';
import styles from './style';
import { faSearch, faUserPlus, faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import { socketContext } from '../../providers/Socket/SocketProvider';
import * as ConversationService from '../../services/conversationService';
import * as MessageService from '../../services/messageService';
import * as UserService from '../../services/userService';
import * as GroupService from '../../services/groupService';
import Footer from '../../components/footer';
import LoadingIndicator from '../../components/loadingIndicator';

const Conversations = () => {
    const navigation = useNavigation();
    const [conversations, setConversations] = useState(null);
    const { socket, currentUserId } = useContext(socketContext);
    const [totalUnseenMessages, setTotalUnseenMessages] = useState(0);

    console.log('render conversations');

    const onRerenderConversations = useCallback(async () => {
        console.log('rerender conversations');
        try {
            const conversations = await ConversationService.getConversationByUserId(currentUserId);
            let total = 0;
            for (const conversation of conversations) {
                const count = await MessageService.countUnseenMessage(conversation._id, currentUserId);
                const numberOfUnseenMessages = count.data !== undefined ? count.data : count;
                conversation.numberOfUnseenMessages = numberOfUnseenMessages;
                total += numberOfUnseenMessages;

                let targetId;
                if (conversation.isGroup) {
                    targetId = conversation.members[0];
                } else {
                    targetId = conversation.members.find((member) => member !== currentUserId);
                }
                const userOrGroupData = conversation.isGroup
                    ? await GroupService.getGroupById(targetId)
                    : await UserService.getUserById(targetId);
                conversation.userOrGroup = userOrGroupData;
            }
            setConversations(conversations);
            setTotalUnseenMessages(total);
        } catch (error) {
            console.error(error);
        }
    }, [currentUserId, setConversations, setTotalUnseenMessages]);

    useEffect(() => {
        socket.on('reRenderConversations', onRerenderConversations);

        onRerenderConversations();

        return () => {
            socket.off('reRenderConversations', onRerenderConversations);
        };
    }, [onRerenderConversations, socket]);

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faSearch,
                    textButton: 'Tìm kiếm',
                    onPress: () => navigation.navigate('Search'),
                }}
                right={[
                    {
                        icon: faUserPlus,
                        onPress: () => navigation.navigate('AddFriend'),
                    },
                    {
                        icon: faUsersViewfinder,
                    },
                ]}
            />
            <View style={styles.conservationsWrapper}>
                {conversations === null ? (
                    <LoadingIndicator /> // Hiển thị một indicator khi dữ liệu đang được tải
                ) : (
                    <FlatList
                        data={conversations}
                        renderItem={({ item }) => (
                            <Conversation
                                userOrGroup={item.userOrGroup}
                                _id={item._id}
                                lastMessage={item.lastMessage}
                                isGroup={item.isGroup}
                                numberOfUnseenMessages={item.numberOfUnseenMessages}
                                updatedAt={item.updatedAt}
                            />
                        )}
                        keyExtractor={(item) => item._id}
                    />
                )}
            </View>
            <Footer numberOfMessageUnseen={totalUnseenMessages} />
        </View>
    );
};

export default Conversations;
