import { StyleSheet } from "react-native";
import myColors from "../../constants/colors";
import { font_16 } from "../../constants/font";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchContainer:{
        padding: 20,
    },
    searchWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: myColors.third,
    },
    txtSearch:{
        flex: 1,
        paddingHorizontal: 10,
    },
    listUser:{
        flex: 1,
        padding: 20,
    },
    itemUser:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: myColors.third,
    },
    username:{
        ...font_16,
        flex: 1,
        paddingLeft: 10,
    }
});

export default styles;