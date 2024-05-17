import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { AuthContext } from '../../providers/Auth/AuthProvider';
import Avatar from '../avatar';
import MessageContent from '../messageContent';
import myColors from '../../constants/colors';
import { ConversationContext } from '../../providers/ConversationProvider/ConversationProvider';
import { useNavigation } from '@react-navigation/native';
import { getGroupById } from '../../services/groupService';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { getUserById } from '../../services/userService';

const Message = ({ message, group }) => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const { conversation } = useContext(ConversationContext);
    const sender = message.senderId;
    const senderId = sender._id || message.senderId;
    const prevSenderId = message.prevSenderId;

    const handleSeenInfo = async () => {
        getUserById(sender._id).then((response) => {
            navigation.navigate('Information', { userRender: response });
        });
    };

    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent: senderId === user._id ? 'flex-end' : 'flex-start',
                    paddingTop: prevSenderId === senderId ? 7 : 30,
                },
            ]}
        >
            {senderId !== user._id && prevSenderId !== senderId && (
                <View>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={handleSeenInfo}>
                        <Avatar uri={sender.avatarPicture} size={36} />
                        {group && group.createdBy === sender._id && (
                            <View style={styles.iconKeyWrapper}>
                                <FontAwesomeIcon icon={faKey} color="#FFD700" size={8} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            )}
            <Pressable
                style={[
                    styles.messageContent,
                    {
                        backgroundColor: senderId === user._id ? myColors.seventh : myColors.first,
                        marginLeft: senderId !== user._id && prevSenderId === senderId ? 56 : 0,
                    },
                ]}
            >
                {conversation.recieveInfor.isGroup && senderId !== user._id && (
                    <View style={styles.senderNameWrapper}>
                        <Text style={styles.senderName}>{sender.username}</Text>
                    </View>
                )}
                <MessageContent message={message} />
                {message.reaction && (
                    <View style={styles.reactionWrapper}>
                        <Text style={styles.emoji}>{message.reaction}</Text> 
                    </View>
                )}
            </Pressable>
        </View>
    );
};

export default Message;
