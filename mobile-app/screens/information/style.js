import { Dimensions, StyleSheet } from 'react-native';
import { font_18, font_16 } from '../../constants/font';
import myColors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.first,
    },
    backgroundPicture: {
        width: '100%',
        height: '30%',
    },
    btnBack: {
        position: 'absolute',
        top: (5 * windowWidth) / 100,
        left: (5 * windowWidth) / 100,
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSetting: {
        position: 'absolute',
        top: (5 * windowWidth) / 100,
        right: (5 * windowWidth) / 100,
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
    content: {
        position: 'absolute',
        width: '100%',
        backgroundColor: myColors.sixth,
    },
    usernameWrapper:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: myColors.first,
        paddingBottom: 10,
    },
    username: {
        ...font_18,
    },
    btnWrapper: {
        flexDirection: 'row',
        backgroundColor: myColors.first,
        padding: 15,
        paddingTop: 5,
        marginBottom: 10,
    },
    btnChat: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        marginRight: 15,
        borderWidth: 1,
        borderColor: myColors.main,
    },
    btnAddFriend: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: myColors.main,
    },
    informationWrapper: {
        paddingHorizontal: 15,
        backgroundColor: myColors.first,
        marginBottom: 10,
    },
    lblInformationWrapper:{
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    lblInformation: {
        ...font_18,
    },
    information: {
        flex: 1,
    },
    field:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: myColors.second,
    },
    text:{
        ...font_16,
    },
    funtionsOther:{
        flexDirection: 'row',
        padding: 15,
        backgroundColor: myColors.first,
    },
    btnText:{
        ...font_16,
        marginLeft: 10,
    },
    radioButtonWrapper:{
        flexDirection: 'row',
    },
    radioButtonGroup:{
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    radioButton:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9,
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: myColors.third,
        marginRight: 3,
    },
    circle:{
        width: 12,
        height: 12,
        borderRadius: 6,
    },
});

export default styles;
