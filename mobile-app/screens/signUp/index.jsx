import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleLeft, faRightLong } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import * as AuthuService from '../../services/authService';
import Header from '../../components/header';

const SignUp = ({ route }) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkUsername = () => {
        if (username.length < 2 || username.length > 40) return false;
        return true;
    };

    const checkPassword = () => {
        if (password.length < 8) return false;
        return true;
    };

    const checkConfirmPassword = () => {
        if (confirmPassword === '' || confirmPassword !== password) return false;
        return true;
    };

    const handleContinue = async () => {
        if (!checkUsername()) {
            Alert.alert('Tên người dùng không hợp lệ', 'Gồm 2-40 ký tự');
            return;
        }
        if (!checkPassword()) {
            Alert.alert('Mật khẩu không hợp lệ', 'Từ 8 ký tự trở lên');
            return;
        }
        if (!checkConfirmPassword()) {
            Alert.alert('Mật khẩu không khớp', 'Vui lòng nhập lại mật khẩu');
            return;
        }
        const phone = route.params;
        try {
            const res = await AuthuService.register({
                username: username,
                password: password,
                phonenumber: '+84' + phone,
            });
            if (res.errCode) {
                Alert.alert('thông báo !!!', res.message || 'Đăng ký thất bại');
            } else {
                //đăng kí thành công
                Alert.alert('thông báo !!!', res.message || 'Đăng ký thành công');
                navigation.navigate('SignIn');
            }
        } catch (error) {
            Alert.alert(res.data?.message || 'Đăng ký thất bại');
            console.log(error);
        }

        // navigation.navigate('SignIn');
    };

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faAngleLeft,
                    onPress: () => navigation.goBack(),
                    text: 'Tạo tài khoản',
                }}
            />
            <View style={{ flex: 1, padding: 15, paddingTop: 0 }}>
                <View style={styles.lbl}>
                    <Text style={styles.lblText}>Tên người dùng</Text>
                </View>
                <TextInput
                    placeholder="Gồm 2-40 ký tự"
                    placeholderTextColor={'#645C5C'}
                    maxLength={40}
                    autoFocus={true}
                    style={[
                        styles.txt,
                        {
                            borderBottomColor: checkUsername() ? myColors.main : myColors.fifth,
                        },
                    ]}
                    onChangeText={(text) => {
                        setUsername(text);
                    }}
                />
                <View style={styles.lbl}>
                    <Text style={styles.lblText}>Mật khẩu</Text>
                </View>
                <TextInput
                    placeholder="Từ 8 ký tự trở lên"
                    placeholderTextColor={'#645C5C'}
                    secureTextEntry={true}
                    style={[
                        styles.txt,
                        {
                            borderBottomColor: checkPassword() ? myColors.main : myColors.fifth,
                        },
                    ]}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.lbl}>
                    <Text style={styles.lblText}>Xác nhận mật khẩu</Text>
                </View>
                <TextInput
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor={'#645C5C'}
                    secureTextEntry={true}
                    style={[
                        styles.txt,
                        {
                            borderBottomColor: checkConfirmPassword() ? myColors.main : myColors.fifth,
                        },
                    ]}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
                <View style={styles.action}>
                    <View style={styles.rules}>
                        <Text style={styles.bottomText}>Tiếp tục nghĩa là bạn đồng ý với các</Text>
                        <Pressable>
                            <Text style={[styles.bottomText, { color: myColors.main }]}>điều khoản sử dụng Zalo</Text>
                        </Pressable>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.btnNext} onPress={() => handleContinue()}>
                            <FontAwesomeIcon icon={faRightLong} color={myColors.first} size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SignUp;
