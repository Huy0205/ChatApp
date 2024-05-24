import { View, Text, Pressable, TextInput, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeftLong,
    faCamera,
    faDeleteLeft,
    faMagnifyingGlass,
    faRightLong,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import Avatar from '../../components/avatar';
import Header from '../../components/header';
import LoadingIndicator from '../../components/loadingIndicator';
import { avtarGroupAvailble } from '../../constants/groupAvatars';
import { getConversationsNotGroupByCurrentUserId } from '../../services/conversationService';
import { getUserById } from '../../services/userService';
import { socketContext } from '../../providers/Socket/SocketProvider';
import myColors from '../../constants/colors';
import { addGroup } from '../../services/groupService';

const CreateGroup = () => {
    const navigation = useNavigation();
    const { currentUserId } = useContext(socketContext);
    const [avatarGroup, setAvatarGroup] = useState(undefined);
    const [showModalImageSelect, setShowModalImageSelect] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [listUser, setListUser] = useState([]);
    const [selectedUserList, setSelectedUserList] = useState([]);
    const [groupName, setGroupName] = useState('');

    useEffect(() => {
        getConversationsNotGroupByCurrentUserId(currentUserId)
            .then((data) => {
                data.forEach((item) => {
                    const userId = item.members.find((member) => member !== currentUserId);
                    getUserById(userId)
                        .then((user) => {
                            setListUser((prev) => [...prev, user]);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCreateGroup = () => {
        if (selectedUserList.length < 2) {
            Alert.alert('Nhóm tối thiểu phải có 3 người', 'Vui lòng chọn thêm người để tạo nhóm');
            return;
        }
        if(groupName === '') {
            Alert.alert('Vui lòng nhập tên nhóm');
            return;
        }
        if(avatarGroup === undefined) {
            avatarGroup = avtarGroupAvailble[Math.floor(Math.random() * avtarGroupAvailble.length)];
        }
        const members = selectedUserList.map((user) => user._id);
        members.push(currentUserId);
        addGroup(groupName, members, currentUserId, avatarGroup)
            .then((data) => {
                navigation.navigate('Chat', { id: data._id });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleShowImageSelect = () => {
        setShowModalImageSelect(true);
    };

    const handleSlectImgeAvailable = (uri) => {
        setAvatarGroup(uri);
        setShowModalImageSelect(false);
    };

    const handleSelectUser = (userSelected) => {
        console.log(userSelected);
        if (selectedUserList.includes(userSelected)) {
            console.log('remove');
            setSelectedUserList((prev) => prev.filter((user) => user !== userSelected));
        } else {
            console.log('add');
            setSelectedUserList((prev) => [...prev, userSelected]);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    onPress: () => {
                        navigation.goBack();
                    },
                    text: 'Tạo nhóm mới',
                }}
            />
            <View style={styles.groupNameWrapper}>
                {avatarGroup ? (
                    <Pressable onPress={handleShowImageSelect} style={styles.avatarWrapper}>
                        <Avatar uri={avatarGroup} size={50} />
                    </Pressable>
                ) : (
                    <Pressable onPress={handleShowImageSelect} style={styles.btnSelectGroupAvatar}>
                        <FontAwesomeIcon icon={faCamera} size={30} />
                    </Pressable>
                )}
                <TextInput
                    placeholder="Đặt tên nhóm"
                    style={styles.txtGroupName}
                    value={groupName}
                    onChangeText={(text) => setGroupName(text)}
                />
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={18} />
                    <TextInput
                        placeholder="Tìm tên hoặc số điện thoại"
                        value={keyword}
                        style={styles.txtSearch}
                        onChangeText={(text) => setKeyword(text)}
                    />
                    {keyword && (
                        <Pressable onPress={() => setKeyword('')}>
                            <FontAwesomeIcon icon={faDeleteLeft} size={20} />
                        </Pressable>
                    )}
                </View>
            </View>
            <View style={styles.listUserWrapper}>
                {listUser.length === 0 ? (
                    <LoadingIndicator />
                ) : (
                    <FlatList
                        data={listUser}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.user}>
                                    <Avatar uri={item.avatarPicture} size={50} />
                                    <Text style={styles.username}>{item.username}</Text>
                                    <Pressable style={styles.radioButton} onPress={() => handleSelectUser(item)}>
                                        <View
                                            style={[
                                                styles.radioButtonInside,
                                                {
                                                    backgroundColor: selectedUserList.includes(item) ? 'blue' : 'white',
                                                },
                                            ]}
                                        />
                                    </Pressable>
                                </View>
                            );
                        }}
                        keyExtractor={(item) => item._id}
                    />
                )}
            </View>
            {selectedUserList.length > 0 && (
                <View style={styles.listUserSelectedContainer}>
                    <View style={styles.listUserSelectedWrapper}>
                        <FlatList
                            data={selectedUserList}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.userSelected}>
                                        <Avatar uri={item.avatarPicture} size={50} />
                                        <Pressable style={styles.btnRemoveUser}>
                                            <FontAwesomeIcon icon={faXmark} size={10} />
                                        </Pressable>
                                    </View>
                                );
                            }}
                            keyExtractor={(item) => item._id}
                            horizontal={true}
                        />
                    </View>
                    <TouchableOpacity onPress={handleCreateGroup} style={styles.btnCreateGroup}>
                        <FontAwesomeIcon icon={faRightLong} size={30} color={myColors.first} />
                    </TouchableOpacity>
                </View>
            )}
            <Modal visible={showModalImageSelect} animationType="fade" transparent={true}>
                <Pressable style={styles.modalOutside} onPress={() => setShowModalImageSelect(false)} />
                <View style={styles.selectAvatarGroupWrapper}>
                    <Text style={styles.modalTitle}>Cập nhật ảnh đại diện</Text>
                    <View style={styles.listImage}>
                        <FlatList
                            data={avtarGroupAvailble}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable
                                        style={styles.itemGroupAvatar}
                                        onPress={() => handleSlectImgeAvailable(item)}
                                    >
                                        <Avatar uri={item} size={70} />
                                    </Pressable>
                                );
                            }}
                            horizontal={true}
                            contentContainerStyle={{ paddingVertical: 10 }}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnSelectImgeOther}>
                        <Text style={styles.btnSelectImgeOtherText}>Chụp ảnh mới</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSelectImgeOther}>
                        <Text style={styles.btnSelectImgeOtherText}>Chọn ảnh từ điện thoại</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default CreateGroup;
