import { StyleSheet } from 'react-native';
import { font_18 } from '../../constants/font';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundPicture: {
        width: '100%',
        height: '30%',
    },
    btnBack: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSetting: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarWrapper: {
        padding: 4,
        position: 'absolute',
        borderRadius: 100,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    username: {
        ...font_18,
        marginTop: 5,
    },
});

export default styles;
