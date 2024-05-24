import { StyleSheet } from 'react-native';
import { font_16, font_18 } from '../../constants/font';
import myColors from '../../constants/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: myColors.first,
    },
    groupNameWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarWrapper: {
        paddingHorizontal: 20,
    },
    btnSelectGroupAvatar: {
        paddingHorizontal: 30,
    },
    txtGroupName: {
        flex: 1,
        paddingRight: 20,
        paddingVertical: 25,
        ...font_18,
    },
    searchContainer: {
        paddingHorizontal: 20,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: myColors.second,
        borderRadius: 10,
    },
    txtSearch: {
        flex: 1,
        padding: 10,
        ...font_16,
    },
    listUserWrapper: {
        flex: 1,
        paddingVertical: 10,
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    username: {
        ...font_16,
        flex: 1,
        paddingHorizontal: 15,
    },
    radioButton: {
        padding: 2,
        borderWidth: 1,
        borderRadius: 50,
    },
    radioButtonInside: {
        width: 15,
        height: 15,
        borderRadius: 50,
    },
    listUserSelectedContainer: {
        flexDirection: 'row',
        padding: 10,
        shadowColor: myColors.fifth, 
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25, 
        elevation: 5,
    },
    listUserSelectedWrapper: {
        flex: 1,
    },
    userSelected: {
        marginHorizontal: 10,
    },
    btnRemoveUser: {
        padding: 3,
        position: 'absolute',
        top: -2,
        right: -2,
        backgroundColor: myColors.second,
        borderRadius: 50,
    },
    btnCreateGroup: {
        padding: 10,
        backgroundColor: myColors.main,
        borderRadius: 50,
    },
    modalOutside: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    selectAvatarGroupWrapper: {
        padding: 15,
    },
    modalTitle: {
        ...font_18,
    },
    listImage: {
        borderBottomWidth: 1,
        borderBottomColor: myColors.second,
    },
    itemGroupAvatar: {
        margin: 10,
    },
    btnSelectImgeOther: {
        paddingVertical: 15,
    },
    btnSelectImgeOtherText: {
        ...font_16,
    },
});

export default styles;
