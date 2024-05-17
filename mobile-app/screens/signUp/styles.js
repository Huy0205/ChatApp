import { StyleSheet } from 'react-native';
import { font_14, font_16 } from '../../constants/font';
import myColors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.first,
    },
    lbl: {
        paddingVertical: 10,
        marginTop: 20,
    },
    lblText: {
        ...font_16,
    },
    txt: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        ...font_16,
    },
    action: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'flex-end',
        paddingVertical: 15,
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
    bottomText: {
        ...font_14,
    }
});

export default styles;