import { View, Text, Pressable, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Avatar from '../../components/avatar';
import styles from './styles';
import QRCode from 'react-native-qrcode-svg';
import { AuthContext } from '../../providers/Auth/AuthProvider';
import Header from '../../components/header';
import { text } from '@fortawesome/fontawesome-svg-core';
import {
    faAddressBook,
    faAngleDown,
    faArrowLeftLong,
    faArrowRight,
    faDeleteLeft,
    faQrcode,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import RNPhoneCodeModal from 'react-native-phone-code-select';
import myColors from '../../constants/colors';
import * as UserServices from '../../services/userService';
import { useNavigation } from '@react-navigation/native';
import { requestCameraPermission } from '../../constants/requestPermission';

const AddFriend = () => {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});

    const handleSearch = async () => {
        if (phoneNumber.length == 0) {
            Alert.alert('Vui lòng nhập số điện thoại');
            return;
        }
        if (phoneNumber.length !== 10) {
            Alert.alert('Số điện thoại không hợp lệ');
            return;
        }
        try {
            const response = await UserServices.searchUser(user._id, phoneNumber);
            navigation.navigate('Information', { userRender: response[0] });
        } catch (err) {
            console.err(err);
        }
    };

    const onDataScanned = async (data) => {
        console.log(data);
        try {
            const response = await UserServices.getUserById(data);
            navigation.navigate('Information', { userRender: response });
        } catch (err) {
            Alert.alert('Không tìm thấy người dùng', 'Vui lòng kiểm tra lại QR và thử lại!!!');
            console.error(err.status);
        }
    };

    const hanleScanQR = () => {
        const hasPermission = requestCameraPermission();
        if (hasPermission === null) {
            return;
        }
        if (hasPermission === false) {
            Alert.alert('Bạn cần cấp quyền truy cập camera để sử dụng tính năng này');
            return;
        }
        navigation.navigate('ScanQR', { onDataScanned });
    };
    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    onPress: () => navigation.goBack(),
                    text: 'Thêm bạn bè',
                }}
            />
            <View style={styles.qrWrapper}>
                <View style={styles.infor}>
                    <Text style={styles.username}>{user.username}</Text>
                    <View style={styles.qrContent}>
                        <QRCode
                            value={user._id}
                            size={110}
                            // logo={require('../../assets/img/mic.png')}
                            // logoSize={20}
                            // logoBackgroundColor="transparent"
                        />
                    </View>
                    <Text style={styles.require}>Quét mã để thêm bạn với tôi</Text>
                </View>
            </View>
            <View style={styles.searchWrapper}>
                <View style={styles.input}>
                    <View style={styles.selectCountry}>
                        <Pressable style={styles.btnSelectCountry} onPress={() => setVisible(true)}>
                            <Text style={styles.codeCountry}>{selectedCountry.dial_code || '+84'}</Text>
                            <FontAwesomeIcon icon={faAngleDown} color="black" size={18} />
                        </Pressable>
                        <RNPhoneCodeModal
                            visible={visible}
                            onDismiss={() => setVisible(false)}
                            onCountryPress={(country) => {
                                setSelectedCountry(country);
                            }}
                            primaryColor="#f04a4a"
                            buttonText="Đóng"
                        />
                    </View>
                    <View style={styles.txtWrapper}>
                        <TextInput
                            placeholder="Số điện thoại"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={(text) => setPhoneNumber(text)}
                            style={styles.txtPhoneNumber}
                        />
                        {phoneNumber.length > 0 && (
                            <Pressable style={styles.btnClear} onPress={() => setPhoneNumber('')}>
                                <FontAwesomeIcon icon={faDeleteLeft} color="black" size={18} />
                            </Pressable>
                        )}
                    </View>
                </View>
                <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
                    <FontAwesomeIcon icon={faArrowRight} color={myColors.main} size={18} />
                </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
                <TouchableOpacity style={styles.btn} onPress={hanleScanQR}>
                    <FontAwesomeIcon icon={faQrcode} color={myColors.main} size={18} />
                    <Text style={styles.btnText}>Quét mã QR</Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={styles.btn}>
                    <FontAwesomeIcon icon={faAddressBook} color={myColors.main} size={18} />
                    <Text style={styles.btnText}>Danh bạ máy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddFriend;
