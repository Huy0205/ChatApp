import { View, Text, Image, TouchableOpacity, Pressable, TextInput, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import Avatar from '../../components/avatar';
import styles from './style';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faArrowLeft,
    faBan,
    faCircleNotch,
    faGear,
    faMessage,
    faPenToSquare,
    faSquareCheck,
    faUserPlus,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { updateUser, updateBlockUser } from '../../services/userService';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../../providers/Auth/AuthProvider';
import { sendRequestFriend } from '../../services/requestFriendService';

const Information = ({ route }) => {
    const navigation = useNavigation();
    const { user, setUser } = useContext(AuthContext);
    const [bgPictureSize, setBgPictureSize] = useState(null);
    const [avatarSize, setAvatarSize] = useState(null);
    const [editable, setEditable] = useState(false);
    const [userOld, setUserOld] = useState(route.params.userRender);
    const [userUpdate, setUserUpdate] = useState(route.params.userRender);
    const [showPicker, setShowPicker] = useState(false);
    const [isBlock, setIsBlock] = useState(false);

    const showDatepicker = () => {
        setShowPicker(true);
    };

    const onChangeDate = (event, selectedDate) => {
        if (event.type === 'set') {
            setUserUpdate({ ...userUpdate, birth: selectedDate });
        }
        setShowPicker(false);
    };

    const handleUpdate = () => {
        if (editable) {
            Alert.alert('Thông báo', 'Bạn có muốn lưu thay đổi không?', [
                {
                    text: 'Hủy',
                    onPress: () => {
                        setUserUpdate(userOld);
                        setEditable(false);
                    },
                },
                {
                    text: 'Lưu',
                    onPress: async () => {
                        console.log(userUpdate.username, userUpdate.gender, userUpdate.birth);
                        try {
                            const userReponse = await updateUser(userUpdate._id, {
                                username: userUpdate.username.trim(),
                                gender: userUpdate.gender,
                                birth: userUpdate.birth,
                            });
                            setUserOld(userReponse);
                            setUserUpdate(userReponse);
                            setUser(userReponse);
                            setEditable(false);
                            Alert.alert('Thông báo', 'Cập nhật thông tin thành công');
                        } catch (error) {
                            console.error(error);
                        }
                    },
                },
            ]);
        } else {
            setEditable(true);
        }
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleBlock = async () => {
        if (isBlock) {
            if (await updateBlockUser(user._id, userOld._id)) {
                setIsBlock(false);
                Alert.alert('Thông báo', 'Đã bỏ chặn người này');
            }
        } else {
            Alert.alert('Thông báo', 'Bạn có muốn chặn người này không?', [
                {
                    text: 'Hủy',
                },
                {
                    text: 'Chặn',
                    onPress: async () => {
                        if (await updateBlockUser(user._id, userOld._id)) {
                            setIsBlock(true);
                        }
                    },
                },
            ]);
        }
    };

    const handleAddFriend = () => {
        Alert.alert('Thông báo', 'Bạn có muốn gửi lời mời kết bạn không?', [
            {
                text: 'Hủy',
            },
            {
                text: 'Gửi',
                onPress: async () => {
                    await sendRequestFriend(user._id, userOld._id)
                        .then((res) => {
                            Alert.alert('Thông báo', 'Đã gửi lời mời kết bạn');
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
            },
        ]);
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: userOld.backgroundPicture }}
                style={styles.backgroundPicture}
                onLayout={(event) => {
                    setBgPictureSize(event.nativeEvent.layout);
                }}
            />
            <TouchableOpacity style={styles.btnBack} onPress={handleGoBack}>
                <FontAwesomeIcon icon={faArrowLeft} size={20} color={myColors.first} />
            </TouchableOpacity>
            {userOld._id === user._id && (
                <TouchableOpacity style={styles.btnSetting}>
                    <FontAwesomeIcon icon={faGear} size={20} color={myColors.first} />
                </TouchableOpacity>
            )}
            <View
                style={[
                    styles.avatarWrapper,
                    {
                        top: bgPictureSize ? bgPictureSize.height - (avatarSize ? avatarSize.height / 1.8 : 70) : null,
                        left: bgPictureSize ? bgPictureSize.width / 2 - (avatarSize ? avatarSize.width / 2 : 65) : null,
                    },
                ]}
                onLayout={(event) => {
                    setAvatarSize(event.nativeEvent.layout);
                }}
            >
                <Avatar uri={userOld.avatarPicture} size={120} />
            </View>
            <View style={[styles.content, { top: avatarSize ? avatarSize.y + avatarSize.height : null }]}>
                <View style={[styles.usernameWrapper, { marginBottom: userOld._id !== user._id ? 0 : 10 }]}>
                    <Text style={styles.username}>{userOld.username}</Text>
                </View>
                {userOld._id !== user._id && (
                    <View style={styles.btnWrapper}>
                        <TouchableOpacity style={styles.btnChat}>
                            <FontAwesomeIcon icon={faMessage} size={20} color={myColors.main} />
                            <Text style={styles.btnText}>Nhắn tin</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnAddFriend} onPress={handleAddFriend}>
                            <FontAwesomeIcon icon={faUserPlus} size={20} color={myColors.main} />
                            <Text style={styles.btnText}>Kết bạn</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={styles.informationWrapper}>
                    <View style={styles.lblInformationWrapper}>
                        <Text style={styles.lblInformation}>Thông tin cá nhân</Text>
                        {userOld._id === user._id && (
                            <TouchableOpacity onPress={handleUpdate}>
                                <FontAwesomeIcon
                                    icon={editable ? faSquareCheck : faPenToSquare}
                                    size={20}
                                    color={editable ? myColors.main : myColors.third}
                                />
                            </TouchableOpacity>
                        )}
                    </View>
                    <View style={styles.information}>
                        <View style={styles.field}>
                            <Text style={styles.text}>Số điện thoại:</Text>
                            <Text style={[styles.text, { color: myColors.third }]}>{userUpdate.phonenumber}</Text>
                        </View>
                        <View style={[styles.field, { paddingTop: 5, paddingBottom: 5 }]}>
                            <View style={{ justifyContent: 'flex-end' }}>
                                <Text style={styles.text}>Tên hiển thị:</Text>
                            </View>
                            <TextInput
                                editable={editable}
                                style={styles.text}
                                value={userUpdate.username}
                                onChangeText={(text) => setUserUpdate({ ...userUpdate, username: text })}
                            />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.text}>Ngày sinh:</Text>
                            <Pressable disabled={!editable} onPress={showDatepicker}>
                                <Text style={[styles.text, { color: !editable ? myColors.third : myColors.fourth }]}>
                                    {userUpdate.birth
                                        ? formatDate(new Date(userUpdate.birth))
                                        : editable
                                        ? 'Chọn ngày'
                                        : 'Chưa cập nhật'}
                                </Text>
                            </Pressable>
                            {showPicker && (
                                <DateTimePicker
                                    value={userUpdate.birth ? new Date(userUpdate.birth) : new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={onChangeDate}
                                />
                            )}
                        </View>
                        <View style={[styles.field, { borderBottomWidth: 0 }]}>
                            <Text style={styles.text}>Giới tính:</Text>
                            {editable === false ? (
                                <Text style={[styles.text, { color: myColors.third }]}>
                                    {userUpdate.gender === 0 ? 'Nam' : 'Nữ'}
                                </Text>
                            ) : (
                                <View style={styles.radioButtonWrapper}>
                                    <View style={styles.radioButtonGroup}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => setUserUpdate({ ...userUpdate, gender: 0 })}
                                        >
                                            <View
                                                style={[
                                                    styles.circle,
                                                    { backgroundColor: userUpdate.gender === 0 ? myColors.main : null },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <Text>Nam</Text>
                                    </View>
                                    <View style={styles.radioButtonGroup}>
                                        <TouchableOpacity
                                            style={styles.radioButton}
                                            onPress={() => setUserUpdate({ ...userUpdate, gender: 1 })}
                                        >
                                            <View
                                                style={[
                                                    styles.circle,
                                                    { backgroundColor: userUpdate.gender === 1 ? myColors.main : null },
                                                ]}
                                            />
                                        </TouchableOpacity>
                                        <Text>Nữ</Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                {userOld._id !== user._id && (
                    <View>
                        <TouchableOpacity style={styles.funtionsOther}>
                            <FontAwesomeIcon icon={faUsers} size={20} color={myColors.main} />
                            <Text style={styles.btnText}>Nhóm chung (4)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.funtionsOther} onPress={handleBlock}>
                            <FontAwesomeIcon
                                icon={isBlock ? faCircleNotch : faBan}
                                size={20}
                                color={isBlock ? myColors.main : myColors.fifth}
                            />
                            <Text style={styles.btnText}>{isBlock ? 'Bỏ Chặn' : 'Chặn tin nhắn'}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};
export default Information;
