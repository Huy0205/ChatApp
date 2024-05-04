import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { headerText } from '../../constants/texts';
import styles from './styles';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from 'react-native-otp-entry';
import firebase from 'firebase/compat/app';
import Header from '../../components/header';

const ActiveAccount = ({ route }) => {
    const [otp, setOtp] = useState('');
    const [time, setTime] = useState(60);
    const navigation = useNavigation();

    const confirmOTP = () => {
        try {
            console.log('OTP: ', otp);
            const credential = firebase.auth.PhoneAuthProvider.credential(route.params.id, otp);
            firebase
                .auth()
                .signInWithCredential(credential)
                .then(() => {
                    navigation.navigate('SignUp', route.params.phone);
                })
                .catch((error) => {
                    alert('Invalid OTP');
                });
        } catch (error) {
            alert('Invalid OTP');
        }

    };

    useEffect(() => {
        if (time === 0) return;
        const timer = setInterval(() => {
            setTime(time - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [time]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const handleContinue = () => {
        if (otp.length < 4) return;
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faAngleLeft,
                    onPress: () => navigation.goBack(),
                    text: 'Kích hoạt tài khoản',
                }}
            />
            <View style={styles.require}>
                <Text style={styles.requireContent}>Vui lòng không chia sẻ mã xác thực để tránh mất tài khoản</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.alert}>Đang gọi đến số (+84) XXX XXX XXX</Text>
                <Text style={styles.requestListening}>vui lòng bật máy để nghe mã</Text>
            </View>
            <View style={styles.inputOTP}>
                <OtpInput
                    numberOfDigits={6}
                    onTextChange={(text) => {
                        setOtp(text);
                    }}
                    focusColor={colors.primary}
                />
            </View>
            <View pointerEvents={time === 0 ? 'auto' : 'none'} style={styles.sendTo}>
                <TouchableOpacity
                    onPress={() => {
                        if (time === 0) {
                            setTime(60);
                        }
                    }}
                >
                    <Text style={styles.btnSendToText}>{time === 0 ? 'Gửi lại mã' : ''}</Text>
                </TouchableOpacity>
                <Text style={styles.time}>{formatTime(time)}</Text>
            </View>
            <View style={styles.action}>
                <TouchableOpacity style={styles.btnContinue} onPress={confirmOTP}>
                    <Text style={styles.btnContinueText}>Tiếp tục</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ActiveAccount;
