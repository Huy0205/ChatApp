import { View, Text, Pressable, TextInput } from 'react-native';
import React from 'react';
import styles from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faDeleteLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const CreateGroup = () => {
    return (
        <View>
            <View>
                <Pressable>
                    <FontAwesomeIcon icon={faCamera} size={30}/>y61
                </Pressable>
                <TextInput placeholder="Đặt tên nhóm"/>
            </View>
            <View>
                <FontAwesomeIcon icon={faMagnifyingGlass} size={30}/>
                <TextInput placeholder="Tìm tên hoặc số điện thoại"/>
                <FontAwesomeIcon icon={faDeleteLeft} size={30}/>
            </View>
            <View>

            </View>
        </View>
    );
};

export default CreateGroup;
