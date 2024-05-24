import * as React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAddressBook, faSearch, faUserGroup, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import myColors from '../../constants/colors';

function renderFriends() {

    return (
        <View style={[styles.container, { backgroundColor: myColors.second }]}>
            <View style={styles.actionInFriend}>
                <TouchableOpacity style={styles.btnInFriend}>
                    <FontAwesomeIcon icon={faUserGroup} size={25} color={myColors.main} />
                    <Text style={styles.btnInFriendText}>Lời mời kết bạn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnInFriend}>
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
