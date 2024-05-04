import { StyleSheet } from 'react-native';
import { font_14, font_16 } from '../../constants/font';
import myColors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    textMessage: {
        ...font_16,
    },
    imgMessage: {
        borderRadius: 10,
    },
    iconMessage: {
        width: 30,
        height: 30,
    },
    fileMessage: {
        marginBottom: 3,
    },
    fileName: {
        ...font_16,
        fontWeight: '600'
    },
    fileInfor: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileSize: {
        ...font_14,
        color: myColors.third,
    },
    dots: {
        borderWidth: 1.5,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    fileExtension: {
        ...font_14,
        color: myColors.third,
    },
});

export default styles;
