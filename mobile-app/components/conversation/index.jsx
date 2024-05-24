import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../avatar';
import styles from './styles';
import * as MessageService from '../../services/messageService';
import { useNavigation } from '@react-navigation/native';
import { ConversationContext } from '../../providers/ConversationProvider/ConversationProvider';
import { socketContext } from '../../providers/Socket/SocketProvider';
import NoticeNumber from '../noticeNumber';
import myColors from '../../constants/colors';

const Conversation = ({ userOrGroup, _id, lastMessage, isGroup, numberOfUnseenMessages, updatedAt }) => {
    const navigation = useNavigation();
    const { currentUserId } = useContext(socketContext);
    const { setCurrentConversation } = useContext(ConversationContext);
    const [previousTime, setPreviousTime] = useState(Date.now() - new Date(updatedAt));

    useEffect(() => {
        const interval = setInterval(() => {
            setPreviousTime(Date.now() - new Date(updatedAt));
        }, 60000); // 1 phút thi cập nhật lại thời gian

        return () => clearInterval(interval);
    }, [updatedAt]);

    const handleShowChat = async () => {
        const avatar = userOrGroup.avatarPicture || userOrGroup.groupPicture;
        const name = userOrGroup.username || userOrGroup.groupName;
        const idOther = userOrGroup._id;
        const members = userOrGroup.members
            ? userOrGroup.members.map((item) => item._id) 
            : [currentUserId, userOrGroup._id]; 

        // Update conversation mới được chọn vào context
        setCurrentConversation(avatar, name, idOther, isGroup, members, _id);

        navigation.navigate('Chat', {userOrGroup, isGroup});
    };

    const formatTime = (miliseconds) => {
        const seconds = Math.floor(miliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ngày`;
        }
        if (hours > 0) {
            return `${hours} giờ`;
        }
        if (minutes > 0) {
            return `${minutes} phút`;
        }
        return `${seconds} giây`;
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handleShowChat}>
            <View style={styles.avatar}>
                <Avatar uri={userOrGroup.avatarPicture || userOrGroup.groupPicture} size={60} />
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.middle}>
                    <Text style={styles.name}>{userOrGroup.username || userOrGroup.groupName}</Text>
                    <Text
                        style={[
                            styles.lastMessage,
                            {
                                color: numberOfUnseenMessages > 0 ? myColors.fourth : myColors.third,
                                fontWeight: numberOfUnseenMessages > 0 ? '700' : '500',
                            },
                        ]}
                    >
                        {lastMessage}
                    </Text>
                </View>
                <View style={styles.right}>
                    <Text style={styles.previousTime}>{formatTime(previousTime)}</Text>
                    {numberOfUnseenMessages > 0 && <NoticeNumber number={numberOfUnseenMessages} />}
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default Conversation;
