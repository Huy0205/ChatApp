import React, { useState, useEffect } from 'react';
import { Text, View, Animated, Pressable } from 'react-native';
import styles from './styles';
import { Camera } from 'expo-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faImages, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

const ScanQR = ({route}) => {
    const navigation = useNavigation();
    const [scanned, setScanned] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    const { onDataScanned } = route.params;

    const handleBarCodeScanned = ({ data }) => {
        // tắt màn hình scan chuyển dữ liệu về màn hình trước
        onDataScanned(data);
        setScanned(true);
    };

    const startAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    };

    return (
        <View style={styles.container}>
            <Camera
                style={styles.camera}
                type={Camera.Constants.Type.back}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <View style={styles.overlay}>
                <Pressable style={styles.btnClose} onPress={() => navigation.goBack()}>
                    <FontAwesomeIcon icon={faXmark} color="white" size={20} />
                </Pressable>
                <Text style={styles.title}>Hướng camera về phía mã QR</Text>
                <Animated.View
                    style={[
                        {
                            transform: [
                                {
                                    scale: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1, 1.1],
                                    }),
                                },
                            ],
                        },
                    ]}
                    onLayout={startAnimation}
                >
                    <View style={styles.scanWrapper}>
                        <View style={styles.lineHorizontal_up_left} />
                        <View style={styles.lineVertical_up_left} />
                        <View style={styles.lineHorizontal_up_right} />
                        <View style={styles.lineVertical_up_right} />
                        <View style={styles.lineHorizontal_below_left} />
                        <View style={styles.lineVertical_below_left} />
                        <View style={styles.lineHorizontal_below_right} />
                        <View style={styles.lineVertical_below_right} />
                    </View>
                </Animated.View>
                <Pressable style={styles.btnSelectImg}>
                    <FontAwesomeIcon icon={faImages} color="white" size={25} />
                </Pressable>
                <Text style={styles.lblSelectImg}>Ảnh có sẵn</Text>
            </View>
        </View>
    );
};

export default ScanQR;
