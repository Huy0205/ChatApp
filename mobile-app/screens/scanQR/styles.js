import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    border: {
        padding: 20,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
    },
    btnClose: {
        position: 'absolute',
        top: 60,
        left: 30,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    title: {
        marginBottom: 50,
        color: 'white',
        fontSize: 14,
    },
    scanWrapper: {
        width: (60 * windowWidth) / 100,
        height: (60 * windowWidth) / 100,
    },
    lineHorizontal_up_left: {
        position: 'absolute',
        width: 45,
        height: 10,
        backgroundColor: 'white',
        top: 0,
        left: 0,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderTopRightRadius: 40,
    },
    lineVertical_up_left: {
        position: 'absolute',
        width: 10,
        height: 36,
        backgroundColor: 'white',
        top: 9,
        left: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    lineHorizontal_up_right: {
        position: 'absolute',
        width: 45,
        height: 10,
        backgroundColor: 'white',
        top: 0,
        right: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    lineVertical_up_right: {
        position: 'absolute',
        width: 10,
        height: 36,
        backgroundColor: 'white',
        top: 9,
        right: 0,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    lineHorizontal_below_left: {
        position: 'absolute',
        width: 45,
        height: 10,
        backgroundColor: 'white',
        top: (60 * windowWidth) / 100 - 10,
        right: 0,
        borderTopLeftRadius: 40,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    lineVertical_below_left: {
        position: 'absolute',
        width: 10,
        height: 36,
        backgroundColor: 'white',
        top: (60 * windowWidth) / 100 - 36 - 9,
        right: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    lineHorizontal_below_right: {
        position: 'absolute',
        width: 45,
        height: 10,
        backgroundColor: 'white',
        top: (60 * windowWidth) / 100 - 10,
        left: 0,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    lineVertical_below_right: {
        position: 'absolute',
        width: 10,
        height: 36,
        backgroundColor: 'white',
        top: (60 * windowWidth) / 100 - 36 - 9,
        left: 0,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
    },
    btnSelectImg: {
        position: 'absolute',
        bottom: 60,
        right: windowWidth / 2 - 25,
        padding: 12,
        borderRadius: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    lblSelectImg: {
        color: 'white',
        fontSize: 12,
        position: 'absolute',
        bottom: 42,
        right: windowWidth / 2 - 30,
    },
});

export default styles;
