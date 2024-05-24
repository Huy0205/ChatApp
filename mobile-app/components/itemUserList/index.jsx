import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Avatar from '../avatar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { acceptFriendRequest, declineFriendRequest } from '../../services/requestFriendService';
import { getUserById } from '../../services/userService';

const ItemUserList = ({ friendRequest }) => {
    const [sender, setSender] = useState({});

    useEffect(() => {
        getUserById(friendRequest.sender)
            .then((res) => {
                setSender(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleAcceptFriendRequest = () => {
        acceptFriendRequest(friendRequest._id)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDeclineFriendRequest = () => {
        declineFriendRequest(friendRequest._id)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <View>
            <Avatar uri={sender.avatar} size={40} />
            <View>
                <Text>{sender.name}</Text>
                <Text>Muốn kết bạn</Text>
            </View>
            <View>
                <TouchableOpacity onPress={handleAcceptFriendRequest}>
                    <Text>Chấp nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeclineFriendRequest}>
                    <FontAwesomeIcon icon={faXmark} size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItemUserList;
