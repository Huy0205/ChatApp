import { StyleSheet } from 'react-native';
import { noticeNumberText } from '../../constants/font';

const styles = StyleSheet.create({
    container: {
        width: 22,
        height: 18,
        paddingBottom: 1.5,
        paddingLeft: 1,
        backgroundColor: 'red',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        ...noticeNumberText,
        color: '#fff',
    },
});

export default styles;
