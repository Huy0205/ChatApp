import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import NoticeNumber from '../components/noticeNumber';
import Conversations from '../screens/conversations';
import Information from '../screens/information';
import PhoneBook from '../screens/phoneBook';
import myColors from '../constants/colors';
import { faCommentDots, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { UnseenMessagesContext } from '../providers/UnseenMessages/UnseenMessages';
import { FriendRequsetContext } from '../providers/FriendRequest/FriendRequest';
import { AuthContext } from '../providers/Auth/AuthProvider';
import { font_14 } from '../constants/font';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    const { user } = useContext(AuthContext);
    const { unseenMessages } = useContext(UnseenMessagesContext);
    const { numberOfFriendRequset } = useContext(FriendRequsetContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ color }) => {
                    let icon;
                    if (route.name === 'Conversations') {
                        icon = faCommentDots;
                    } else if (route.name === 'Information') {
                        icon = faUser;
                    } else {
                        icon = faPhone;
                    }
                    return (
                        <View style={styles.iconContainer}>
                            <FontAwesomeIcon icon={icon} color={color} size={28} />
                            <View style={styles.badge}>
                                {route.name === 'Conversations' && unseenMessages !== 0 && (
                                    <NoticeNumber number={unseenMessages} />
                                )}
                                {route.name === 'Information' && numberOfFriendRequset !== 0 && (
                                    <NoticeNumber number={numberOfFriendRequset} />
                                )}
                            </View>
                        </View>
                    );
                },
                tabBarLabel: ({ focused }) => {
                    if (focused) {
                        return (
                            <Text style={styles.name}>
                                {route.name === 'Conversations'
                                    ? 'Tin nhắn'
                                    : route.name === 'Information'
                                    ? 'Cá nhân'
                                    : 'Danh bạ'}
                            </Text>
                        );
                    } else {
                        return null;
                    }
                },
                tabBarActiveTintColor: myColors.main,
                tabBarInactiveTintColor: myColors.third,
                tabBarStyle: styles.tabBar,
            })}
        >
            <Tab.Screen name="Conversations" component={Conversations} />
            <Tab.Screen name="Phonebook" component={PhoneBook} />
            <Tab.Screen name="Information" component={Information} initialParams={{ userRender: user }} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    iconContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -12,
        top: -8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        ...font_14,
        color: myColors.main,
    },
    tabBar: {
        height: 70,
        padding: 10,
    },
});
