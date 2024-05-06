import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_12, font_13, font_14, font_16 } from '../../constants/font';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: myColors.first,
    },
    avatar: {
        paddingVertical: 10,
        paddingRight: 15,
        paddingLeft: 10,
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingRight: 10,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        borderBottomColor: myColors.second,
    },
    middle: {
        flex: 1,
    },
    name: {
        ...font_16,
        fontWeight: '700',
        marginBottom: 10,
    },
    lastMessage: {
        ...font_14,
    },
    right: {
        alignItems: 'flex-end',
    },
    previousTime: {
        ...font_12,
        color: myColors.third,
        marginBottom: 12,
    },
});

export default styles;
