import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_14, font_16 } from '../../constants/font';

const styles = StyleSheet.create({
    iconBack: {
        width: 10,
        height: 18,
        marginRight: 30,
    },
    container: {
        flex: 1,
        backgroundColor: myColors.first,
        paddingBottom: 10,
    },
    require: {
        padding: 8,
        backgroundColor: myColors.second,
    },
    requireContent: {
        ...font_14,
    },
    input: {
        padding: 15,
        flexDirection: 'row',
    },
    selectCountry: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: myColors.main,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectCountryText: {
        ...font_16,
        marginRight: 3,
    },
    iconSelect: {
        width: 13,
        height: 10,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    txtPhone: {
        flex: 5,
        marginLeft: 15,
        borderBottomWidth: 1,
        padding: 5,
        ...font_16,
    },
    emty: {
        flex: 1,
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
    },
    rules: {
        flex: 1,
        justifyContent: 'space-between',
    },
    btnNext: {
        backgroundColor: myColors.main,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 10,
    },
    iconNext: {
        width: 20,
        height: 20,
    },
    bottomText: {
        ...font_14,
    },
});

export default styles;
