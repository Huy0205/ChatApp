import { Dimensions, StyleSheet } from 'react-native';
import myColors from '../../constants/colors';
import { font_25, font_16 } from '../../constants/font';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: myColors.main,
    },
    leftWrapper: {
        flex: 1,
        height: (8 * windowHeight) / 100,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnLeft: {
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnLeftText: {
        ...font_25,
        color: myColors.first,
        marginLeft: 20,
    },
    title: {
        ...font_25,
        color: myColors.first,
    },
    txtSearchWrapper: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: myColors.first,
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    txtSearch: {
        flex: 1,
        ...font_16,
        paddingVertical: 8,
        paddingLeft: 12,
    },
    rightWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnRight: {
        marginHorizontal: 12,
    },
});

export default styles;
