import { View, Text, Pressable } from 'react-native';
import React, { useContext } from 'react';
import styles from './styles';
import { AuthContext } from '../../providers/Auth/AuthProvider';
import Avatar from '../avatar';
import MessageContent from '../messageContent';
import myColors from '../../constants/colors';

const Message = ({ message }) => {
    const { user } = useContext(AuthContext);
    const sender = message.senderId;
    const prevSenderId = message.prevSenderId;

    return (
        <View
            style={[
                styles.container,
                {
                    justifyContent: sender._id === user._id ? 'flex-end' : 'flex-start',
                    paddingTop: prevSenderId === sender._id ? 7 : 30,
                },
            ]}
        >
            {sender._id !== user._id && prevSenderId !== sender._id && (
                <View style={styles.avatarWrapper}>
                    <Avatar uri={sender.avatarPicture} size={36} />
                </View>
            )}
            <Pressable
                style={[
                    styles.messageContent,
                    {
                        backgroundColor: sender._id === user._id ? myColors.seventh : myColors.first,
                        marginLeft: sender._id !== user._id && prevSenderId === sender._id ? 56 : 0,
                    },
                ]}
            >
                <MessageContent message={message} />
            </Pressable>
        </View>
    );
};

export default Message;
