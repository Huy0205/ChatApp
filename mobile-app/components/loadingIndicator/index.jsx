import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import myColors from '../../constants/colors';

const LoadingIndicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={myColors.main} />
        </View>
    );
};

export default LoadingIndicator;
