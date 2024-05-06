import { StyleSheet } from 'react-native';
import { contentText } from '../../constants/texts';
import { colors } from '../../constants/colors';
import { btn, btnText } from '../../constants/button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    require: {
        padding: 8,
        backgroundColor: colors.lightGrey,
    },
    requireContent: {
        ...contentText,
    },
    content: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    alert: {
        ...contentText,
    },
    requestListening: {
        ...contentText,
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
        ...contentText,
    },
    sendTo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnSendToText: {
        ...contentText,
        marginRight: 20,
    },
    time: {
        ...contentText,
        color: colors.warning,
    },
    action: {
        flex: 7,
        paddingHorizontal: 80,
    },
    btnContinue: {
        ...btn,
        backgroundColor: colors.primary,
    },
    btnContinueText: {
        ...btnText,
        color: colors.secondary,
    },
});

export default styles;