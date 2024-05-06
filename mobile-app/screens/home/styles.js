import { StyleSheet, Dimensions } from 'react-native';
import myColors from '../../constants/colors';
import { btn } from '../../constants/button';
import { font_18, font_30 } from '../../constants/font';

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: myColors.first,
    },
    title: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        ...font_30,
        color: myColors.main,
    },
    banner: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBanner: {
        width: windowWidth - 60,
        height: windowWidth - 60,
        resizeMode: 'contain',
    },
    action: {
        flex: 2,
        justifyContent: 'space-around',
        paddingHorizontal: 80,
    },
    btnLogin: {
        ...btn,
        backgroundColor: myColors.main,
    },
    btnLoginText: {
        ...font_18,
        color: myColors.first,
    },
    btnRegister: {
        ...btn,
        backgroundColor: myColors.second,
    },
    btnRegisterText: {
        ...font_18,
    },
    language: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: 20,
    },
    btnVietnamese: {
        marginRight: 20,
    },
    btnLanguageText: {
        ...font_18,
    },
});

export default styles;