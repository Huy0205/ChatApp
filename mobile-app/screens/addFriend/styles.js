import { Dimensions, StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_13, font_16, font_18 } from '../../constants/font';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.sixth,
    },
    infor: {
        padding: 20,
        width: (55 * windowWidth) / 100,
        height: (55 * windowWidth) / 100,
        justifyContent: 'center',
        backgroundColor: myColors.eighth,
        alignItems: 'center',
        borderRadius: 15,
    },
    qrWrapper: {
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 25,
    },
    username: {
        ...font_16,
        color: myColors.first,
    },
    require: {
        ...font_13,
        color: myColors.first,
    },
    qrContent: {
        padding: 5,
        borderRadius: 10,
        margin: 10,
        backgroundColor: myColors.first,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: myColors.first,
        paddingVertical: 15,
    },
    input: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: myColors.third,
        borderRadius: 15,
        width: (80 * windowWidth) / 100,
    },
    selectCountry: {
        backgroundColor: myColors.sixth,
        paddingHorizontal: 5,
        borderRightWidth: 1,
        borderRightColor: myColors.second,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    btnSelectCountry:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    codeCountry: {
        ...font_16,
        marginRight: 3,
    },
    txtWrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtPhoneNumber: {
        flex: 1,
        ...font_16,
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    btnClear: {
        padding: 5,
        margin: 5,
    },
    btnSearch: {
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: myColors.main,
        marginLeft: 10,
    },
    btnWrapper: {
        marginTop: 10,
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: myColors.first,
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
    },
    btnText: {
        ...font_18,
        marginLeft: 10,
    },
    line: {
        height: 1,
        backgroundColor: myColors.second,
    },
});

export default styles;
