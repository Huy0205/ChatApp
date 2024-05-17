import { Dimensions, StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { footerText } from '../../constants/font';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: windowWidth,
        height: (8 * windowHeight) / 100,
        backgroundColor: myColors.first,
        shadowColor: myColors.third,
        shadowOffset: {
            width: 0,
            height: -1,
        },
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemName: {
        ...footerText,
        color: myColors.main,
        marginTop: 1,
    },
    notification: {
        position: 'absolute',
    },
});

export default styles;
