import { StyleSheet } from 'react-native';
import { font_14, font_16, font_18 } from '../../constants/font';
import { btn } from '../../constants/button';
import myColors from '../../constants/colors';

const styles = StyleSheet.create({
    iconBack: {
        width: 10,
        height: 18,
        marginRight: 20,
    },
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
    selectCountryWrapper:{
        width: 70,
        borderRightColor: myColors.second,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtPhoneNumber: {
        flex: 1,
        padding: 15,
        ...font_16,
    },
    inputPassword: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingRight: 15,
    },
    iconPasswordWrapper: {
        width: 70,
        borderRightColor: myColors.second,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtPassword: {
        flex: 1,
        padding: 15,
        ...font_16,
    },
    showPassword: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnShowPasswordText: {
        ...font_16,
    },
    resetPassword: {
        padding: 15,
    },
    btnResetPasswordText: {
        color: myColors.main,
        ...font_16,
    },
    action: {
        flex: 1,
        paddingVertical: 15,
        paddingHorizontal: 80,
    },
    btnSignIn: {
        ...btn,
        backgroundColor: myColors.main,
    },
    btnSignInText: {
        ...font_18,
        color: myColors.first,
    },
    questions: {
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnQuestionsText: {
        ...font_14,
    },
});

export default styles;
