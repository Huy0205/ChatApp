import { StyleSheet } from 'react-native';
import myColors from '../../constants/colors';

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
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: myColors.second,
        shadowOffset: {
            width: 0,
            height: -1,
        },
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10,
    },
});

export default styles;
