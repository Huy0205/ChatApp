import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_16 } from '../../constants/font';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.first,
    },
    btnActiveWrapper: {
        flexDirection: 'row',
        backgroundColor: myColors.first,
    },
    btnActive: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        margin: 10,
    },
    btnActiveText: {
        ...font_16,
    },
    actionInFriend: {
        marginBottom: 10,
        backgroundColor: myColors.first,
    },
    btnInFriend: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    btnInFriendText: {
        ...font_16,
        marginLeft: 10,
    },
    listUser: {
        flex: 1,
        backgroundColor: myColors.first,
    },
});

export default styles;
