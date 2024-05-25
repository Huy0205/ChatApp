import { Image, Pressable, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const navigation = useNavigation();
    const [language, setLanguage] = useState('Vietnamese');

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} backgroundColor={myColors.first} />
            <View style={styles.title}>
                <Text style={styles.titleText}>CHAT APP</Text>
            </View>
            <View style={styles.banner}>
                <Image source={require('../../assets/banner.jpg')} style={styles.imgBanner} />
            </View>
            <View style={styles.action}>
                <TouchableOpacity
                    style={styles.btnLogin}
                    onPress={() => {
                        navigation.navigate('SignIn');
                    }}
                >
                    <Text style={styles.btnLoginText}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnRegister}
                    onPress={() => {
                        navigation.navigate('CreateAccount');
                    }}
                >
                    <Text style={styles.btnRegisterText}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.language}>
                <Pressable style={styles.btnVietnamese} onPress={() => setLanguage('Vietnamese')}>
                    <Text
                        style={[
                            styles.btnLanguageText,
                            {
                                color: language === 'Vietnamese' ? myColors.fourth : myColors.third,
                                fontWeight: language === 'Vietnamese' ? '500' : 'normal',
                            },
                        ]}
                    >
                        Tiếng Việt
                    </Text>
                </Pressable>
                <Pressable onPress={() => setLanguage('English')}>
                    <Text
                        style={[
                            styles.btnLanguageText,
                            {
                                color: language === 'English' ? myColors.fourth : myColors.third,
                                fontWeight: language === 'English' ? '500' : 'normal',
                            },
                        ]}
                    >
                        English
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default Home;
