import * as React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import myColors from '../../constants/colors';
import { requestAcceptPhoneBookPermission } from '../../constants/requestPermission';
import * as Contacts from 'expo-contacts';
import { getUserByPhone } from '../../services/userService';

function renderFriends() {
    const navigation = useNavigation();
    const [phoneBook, setPhoneBook] = React.useState([]);
    const handleShowPhoneBook = async () => {
        const permission = requestAcceptPhoneBookPermission();
        if (permission) {
            try {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                data.forEach(async (item) => {
                    if (item.phoneNumbers) {
                        const phoneNumber = item.phoneNumbers[0].number;
                        let temp;
                        if (phoneNumber.startsWith('+84')) {
                            temp = phoneNumber;
                        } else {
                            const digitsOnly = phoneNumber.replace(/\D/g, '');
                            temp = `+84${digitsOnly.slice(1)}`;
                        }
                        const user = await getUserByPhone(temp);
                        if (user) {
                            setPhoneBook((prev) => [...prev, user]);
                        }
                    }
                });
                navigation.navigate('ShowPhoneBook', { users: phoneBook });
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: myColors.second }]}>
            <View style={styles.actionInFriend}>
                <TouchableOpacity style={styles.btnInFriend}>
                    <FontAwesomeIcon icon={faUserGroup} size={25} color={myColors.main} />
                    <Text style={styles.btnInFriendText}>Lời mời kết bạn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnInFriend} onPress={handleShowPhoneBook}>
                    <FontAwesomeIcon icon={faAddressBook} size={25} color={myColors.main} />
                    <Text style={styles.btnInFriendText}>Danh bạ máy</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listUser}>
                <FlatList />
            </View>
        </View>
    );
}

function renderGroupsScreen() {
    return (
        <View style={styles.container}>
            <Text>Groups</Text>
        </View>
    );
}

const PhoneBook = () => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = React.useState('friends');
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
                ]}
            />
            <View style={styles.btnActiveWrapper}>
                <Pressable
                    style={[
                        styles.btnActive,
                        {
                            borderBottomWidth: activeTab === 'friends' ? 2 : 0,
                            borderBottomColor: activeTab === 'friends' ? myColors.main : myColors.third,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.btnActiveText,
                            {
                                color: activeTab === 'friends' ? myColors.fourth : myColors.third,
                                fontWeight: activeTab === 'friends' ? 'bold' : 'normal',
                            },
                        ]}
                        onPress={() => setActiveTab('friends')}
                    >
                        Bạn bè
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.btnActive,
                        {
                            borderBottomWidth: activeTab === 'groups' ? 2 : 0,
                            borderBottomColor: activeTab === 'groups' ? myColors.main : myColors.third,
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.btnActiveText,
                            {
                                color: activeTab === 'groups' ? myColors.fourth : myColors.third,
                                fontWeight: activeTab === 'groups' ? 'bold' : 'normal',
                            },
                        ]}
                        onPress={() => setActiveTab('groups')}
                    >
                        Nhóm
                    </Text>
                </Pressable>
            </View>
            {activeTab === 'friends' ? renderFriends() : renderGroupsScreen()}
        </View>
    );
};

export default PhoneBook;
