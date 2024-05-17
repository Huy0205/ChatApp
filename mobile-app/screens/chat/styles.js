import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_13 } from '../../constants/font';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.sixth,
    },
    messagesWrapper: {
        flex: 1,
    },
    messages: {
        paddingTop: 10,
    },
    action: {
        flexDirection: 'row',
        backgroundColor: myColors.first,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        shadowColor: myColors.second,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        borderBottomWidth: 1,
        borderBottomColor: myColors.second,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
    btnOtherMessage:{
        marginHorizontal: 5,
    },
    functions: {
        backgroundColor: myColors.first,
    },
    rowModal: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    itemModal: {
        flex: 1,
        alignItems: 'center',
    },
    iconWarapper: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: myColors.main,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        marginTop: 5,
        ...font_13,
    },
});

export default styles;
