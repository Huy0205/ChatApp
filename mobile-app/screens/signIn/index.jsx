import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useContext } from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import * as authServices from '../../services/authService';
import { AuthContext } from '../../providers/Auth/AuthProvider';
import RNPhoneCodeModal from 'react-native-phone-code-select';
import Header from '../../components/header';

const SignIn = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation();
    const { setUser } = useContext(AuthContext);

    const checkPhoneNumber = () => {
        if (phoneNumber.length !== 9) return false;
        return true;
    };

    const checkPassword = () => {
        if (password.length < 8) return false;
        return true;
    };

    const handleSignIn = async () => {
        if (!checkPhoneNumber() || !checkPassword()) {
            Alert.alert('Thông tin không hợp lệ', 'Vui lòng kiểm tra lại thông tin');
            return;
        }

        try {
            const res = await authServices.login({ phonenumber: '+84' + phoneNumber, password: password });

            if (res.errCode === 0) {
                const user = res.data;
                setUser(user);
                navigation.navigate('Conversations');
                return;
            }
            Alert.alert('Thông báo', res.message || 'Đăng nhập thất bại');
        } catch (error) {
            console.log('Failed to sign in:', error.status);
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faAngleLeft,
                    onPress: () => navigation.goBack(),
                    text: 'Đăng nhập',
                }}
            />
            <View style={styles.require}>
                <Text style={styles.requireContent}>Vui lòng nhập số điện thoại và mật khẩu đăng nhập</Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: checkPhoneNumber() ? myColors.main : myColors.fifth,
                }}
            >
                <View style={styles.selectCountryWrapper}>
                    <Pressable style={{ flexDirection: 'row' }} onPress={() => setVisible(true)}>
                        <Text style={{ marginRight: 3 }}>{selectedCountry.dial_code || '+84'}</Text>
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
                <TextInput
                    placeholder="Số điện thoại"
                    autoFocus={true}
                    style={styles.txtPhoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    keyboardType="phone-pad"
                />
            </View>

            <View
                style={[styles.inputPassword, { borderBottomColor: checkPassword() ? myColors.main : myColors.fifth }]}
            >
                <View style={styles.iconPasswordWrapper}>
                    <FontAwesomeIcon icon={faLock} color="black" size={18} />
                </View>
                <TextInput
                    placeholder="Mật khẩu"
                    secureTextEntry={showPassword}
                    style={styles.txtPassword}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style={styles.showPassword}>
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Text style={styles.btnShowPasswordText}>{showPassword ? 'HIỆN' : 'ẨN'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.resetPassword}>
                <TouchableOpacity>
                    <Text style={styles.btnResetPasswordText}>Lấy lại mật khẩu</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <TouchableOpacity style={styles.btnSignIn} onPress={() => handleSignIn()}>
                    <Text style={styles.btnSignInText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.questions}>
                <Pressable>
                    <Text style={styles.btnQuestionsText}>Các câu hỏi thường gặp</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default SignIn;
