import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeftLong, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    text: 'Cài đặt',
                    onPress: () => navigation.goBack(),
                }}
            />
            <TouchableOpacity>
                <Text>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Đổi ngôn ngữ</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Đang xuất</Text>
                <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default Setting;
