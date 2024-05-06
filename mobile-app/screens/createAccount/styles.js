import { StyleSheet } from 'react-native';
import { contentText } from '../../constants/texts';
import { colors } from '../../constants/colors';
import { LinearGradient } from 'react-native-svg';

const styles = StyleSheet.create({
    iconBack: {
        width: 10,
        height: 18,
        marginRight: 30,
    },
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
    input: {
        padding: 15,
        flexDirection: 'row',
    },
    selectCountry: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectCountryText: {
        ...contentText,
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
        borderBottomColor: colors.warning,
        padding: 5,
        ...contentText,
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
        backgroundColor: colors.primary,
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
        ...contentText,
    },
});

export default styles;
