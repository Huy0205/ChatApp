import { StyleSheet } from 'react-native';
import { contentText } from '../../constants/texts';
import { colors } from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.secondary,
    },
    lbl: {
        paddingVertical: 10,
        marginTop: 20,
    },
    lblText: {
        fontSize: 18,
    },
    txt: {
        borderBottomWidth: 1,
        paddingVertical: 8,
        ...contentText,
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
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        padding: 10,
    },
    bottomText: {
        ...contentText,
    }
});

export default styles;