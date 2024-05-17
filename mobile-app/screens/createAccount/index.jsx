import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAngleDown, faAngleLeft, faRightLong } from '@fortawesome/free-solid-svg-icons';
import RNPhoneCodeModal from 'react-native-phone-code-select';
import { firebaseConfig } from '../../firebase/firebaseConfig';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat/app';
import Header from '../../components/header';

const CreateAccount = () => {
    const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({});
    const [txtActive, setTxtActive] = useState(false);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const RecaptchaVerifier = useRef(null);

    const sendOTP = () => {
        try {
            if (phone.length === 9) {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                phoneProvider.verifyPhoneNumber(`+84${phone}`, RecaptchaVerifier.current).then((verificationId) => {
                    navigation.navigate('ActiveAccount', { id: verificationId, phone: phone, pressResend: sendOTP});
                });
            } else {
                alert('Số điện thoại không hợp lệ');
            }
        } catch (error) {
            alert('Failed to send OTP');
            console.log(error);
        }

        // navigation.navigate('ActiveAccount');
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal ref={RecaptchaVerifier} firebaseConfig={firebaseConfig} />
            <Header
                left={{
                    icon: faAngleLeft,
                    onPress: () => navigation.goBack(),
                    text: 'Tạo tài khoản',
                }}
            />
            <View style={styles.require}>
                <Text style={styles.requireContent}>Nhập số điện thoại của bạn để tạo tài khoản mới</Text>
            </View>
            <View style={styles.input}>
                <View>
                    <Pressable style={styles.selectCountry} onPress={() => setVisible(true)}>
                        <Text style={styles.selectCountryText}>{selectedCountry.dial_code || '+84'}</Text>
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
                    onChangeText={(text) => {
                        text.length === 9 || text.length === 10 ? setTxtActive(true) : setTxtActive(false);
                        setPhone(text);
                    }}
                    keyboardType="phone-pad"
                    placeholder="Số điện thoại"
                    autoFocus={true}
                    style={[styles.txtPhone, { borderBottomColor: txtActive ? myColors.main : myColors.fifth }]}
                />
            </View>
            <View style={styles.emty}></View>
            <View style={styles.action}>
                <View style={styles.rules}>
                    <Text style={styles.bottomText}>Tiếp tục nghĩa là bạn đồng ý với các</Text>
                    <Pressable>
                        <Text style={[styles.bottomText, { color: myColors.main }]}>
                            điều khoản sử dụng của chúng tôi
                        </Text>
                    </Pressable>
                </View>
                <View>
                    <TouchableOpacity style={styles.btnNext} onPress={sendOTP}>
                        <FontAwesomeIcon icon={faRightLong} color={myColors.first} size={28} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CreateAccount;