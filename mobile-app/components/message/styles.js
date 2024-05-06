import { StyleSheet } from 'react-native';

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
        elevation: 5,
    },
});

export default styles;
