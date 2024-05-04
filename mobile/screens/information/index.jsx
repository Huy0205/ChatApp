import { View, Text, Image, TouchableOpacity, Pressable, StatusBar, Dimensions } from 'react-native';
import React, { useLayoutEffect, useState, useContext } from 'react';
import Avatar from '../../components/avatar';
import styles from './style';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faGear,
    faMessage,
    faPenToSquare,
    faSearch,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header';

const windowWidth = Dimensions.get('window').width;

const Information = ({ user }) => {
    const [bgPictureSize, setBgPictureSize] = useState(null);

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: user.backgroundPicture }}
                style={styles.backgroundPicture}
                onLayout={(event) => {
                    console.log(event.nativeEvent.layout);
                    setBgPictureSize(event.nativeEvent.layout);
                }}
            />
            <TouchableOpacity style={styles.btnBack}>
                <FontAwesomeIcon icon={faArrowLeft} size={20} color={myColors.first} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSetting}>
                <FontAwesomeIcon icon={faGear} size={20} color={myColors.first} />
            </TouchableOpacity>
            <View
                style={[
                    styles.avatarWrapper,
                    {
                        top: bgPictureSize ? bgPictureSize.height - 45 : null,
                        left: bgPictureSize ? bgPictureSize.width / 2 - 45 : null,
                    },
                ]}
            >
                <Avatar uri={user.avatarPicture} size={90} />
                <Text style={styles.username}>{user.username}</Text>
            </View>
            <View>
                <Text>Thông tin cá nhân</Text>
                <View>
                    <Text>Tên hiển thị:</Text>
                    <Text>Số điện thoại:</Text>
                    <Text>Ngày sinh:</Text>
                    <Text>Giới tính:</Text>
                </View>
                <View>
                    <Text>{user.username}</Text>
                    <Text>{user.phoneNumber}</Text>
                    <Text>{user.birth ? user.birth : 'Chưa cập nhật'}</Text>
                    <Text>{user.gender === 0 ? 'nam' : 'nữ'}</Text>
                </View>
            </View>
            <View>
                
            </View>
            <View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faMessage} size={20} color={myColors.first} />
                    <Text>Nhắn tin</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faUserPlus} size={20} color={myColors.first} />
                    <Text>Kết bạn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Information;
