import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_14, font_16 } from '../../constants/font';
import { btn } from '../../constants/button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.first,
    },
    require: {
        padding: 8,
        backgroundColor: myColors.second,
    },
    requireContent: {
        ...font_14,
    },
    content: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    alert: {
        ...font_14,
    },
    requestListening: {
        ...font_14,
        color: '#645C5C',
    },
    inputOTP: {
        textAlign: 'center',
        paddingHorizontal: 30,
        paddingVertical: 25,
    },
    txt: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: 35,
        textAlign: 'center',
        marginRight: 10,
        paddingVertical: 5,
        ...font_16,
    },
    sendTo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnSendToText: {
        ...font_16,
        marginRight: 20,
    },
    time: {
        ...font_16,
        color: myColors.fifth,
    },
    action: {
        flex: 7,
        paddingHorizontal: 80,
    },
    btnContinue: {
        ...btn,
        backgroundColor: myColors.main,
    },
    btnContinueText: {
        ...font_16,
        color: myColors.first,
    },
});

export default styles;
