import { View, Text } from 'react-native';
import React from 'react';
import styles from './styles';

const NoticeNumber = ({ number }) => {

    const formatNumber = (number) => {
        if (number > 5) {
            return '5+';
        }
        return number;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{formatNumber(number)}</Text>
        </View>
    );
};

export default NoticeNumber;
