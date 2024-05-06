import { View, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { faCommentDots, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import NoticeNumber from '../noticeNumber';

const Footer = ({ numberOfMessageUnseen, numberOfFriendRequset }) => {
    const [actived, setActived] = useState('Conversations');

    const iconSize = 28;

    const handleSelected = (screenName) => {
        setActived(screenName);
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.item} onPress={() => handleSelected('Conversations')}>
                <FontAwesomeIcon
                    icon={faCommentDots}
                    color={actived === 'Conversations' ? myColors.main : myColors.second}
                    size={iconSize}
                />
                {actived === 'Conversations' && <Text style={styles.itemName}>Tin nhắn</Text>}
                {numberOfMessageUnseen > 0 && (
                    <View
                        style={[
                            styles.notification,
                            { top: actived === 'Conversations' ? 4 : 9, right: actived === 'Conversations' ? 35 : 39 },
                        ]}
                    >
                        <NoticeNumber number={numberOfMessageUnseen} />
                    </View>
                )}
            </Pressable>
            <Pressable style={styles.item} onPress={() => handleSelected('Phonebook')}>
                <FontAwesomeIcon
                    icon={faPhone}
                    color={actived === 'Phonebook' ? myColors.main : myColors.second}
                    size={iconSize}
                />
                {actived === 'Phonebook' && <Text style={styles.itemName}>Danh bạ</Text>}
                {numberOfFriendRequset > 0 && (
                    <View
                        style={[
                            styles.notification,
                            { top: actived === 'Phonebook' ? 4 : 9, right: actived === 'Phonebook' ? 35 : 39 },
                        ]}
                    >
                        <NoticeNumber number={numberOfFriendRequset} />
                    </View>
                )}
            </Pressable>
            <Pressable style={styles.item} onPress={() => handleSelected('Information')}>
                <FontAwesomeIcon
                    icon={faUser}
                    color={actived === 'Information' ? myColors.main : myColors.second}
                    size={iconSize}
                />
                {actived === 'Information' && <Text style={styles.itemName}>Cá nhân</Text>}
            </Pressable>
        </View>
    );
};

export default Footer;
