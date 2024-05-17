import { StyleSheet } from 'react-native';
import { font_12, font_14 } from '../../constants/font';
import myColors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingRight: 10,
    },
    avatarWrapper: {
        paddingHorizontal: 10,
    },
    messageContent: {
        maxWidth: '70%',
        borderRadius: 10,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    senderNameWrapper: {
        padding: 10,
        paddingBottom: 0,
    },
    senderName: {
        ...font_12,
        color: myColors.main,
    },
    iconKeyWrapper:{
        position: 'absolute',
        right: 8,
        bottom: -3,
        backgroundColor: 'rgba(0,0,0,0.5)',
        elevation: 3,
        padding: 2,
        borderRadius: 40,
    },
    reactionWrapper: {
        position: 'absolute',
        bottom: -10,
        right: 4,
        borderRadius: 20,
        elevation: 3,
        backgroundColor: myColors.first,
        padding: 3,
    },
    emoji:{
        fontSize: 10,
    }
});

export default styles;
