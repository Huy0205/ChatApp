import { View, Text, FlatList, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import Avatar from '../../components/avatar';
import Header from '../../components/header';
import { faArrowLeftLong, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

const ShowPhoneBook = ({ route }) => {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(route.params.users);
    }, []);

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    text: 'Danh bạ máy',
                    onPress: () => {
                        navigation.goBack();
                    },
                }}
            />
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <FontAwesomeIcon icon={faSearch} size={20} />
                    <TextInput placeholder="Tìm kiếm" style={styles.txtSearch}/>
                </View>
            </View>
            <View style={styles.listUser}>
                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <View style={styles.itemUser}>
                            <Avatar uri={item.avatarPicture} size={50} />
                            <Text style={styles.username}>{item.username}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </View>
    );
};

export default ShowPhoneBook;
