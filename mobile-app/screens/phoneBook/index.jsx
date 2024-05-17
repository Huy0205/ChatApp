import { View, Text, Pressable, TouchableOpacity, Image } from 'react-native';
import React, { useLayoutEffect } from 'react';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/header';
import { faSearch, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const PhoneBook = () => {
    const navigation = useNavigation();
    const [isShow, setIsShow] = React.useState('Friend');

    return (
        // <View style={{ flex: 1, backgroundColor: '#D9D9D9' }}>
        //     <Header
        //         left={{
        //             icon: faSearch,
        //             textButton: 'Tìm kiếm',
        //             onPress: () => navigation.navigate('Search'),
        //         }}
        //         right={[
        //             {
        //                 icon: faUserPlus,
        //             },
        //         ]}
        //     />
        //     <View
        //         style={{
        //             flexDirection: 'row',
        //             backgroundColor: '#D9D9D9',
        //             justifyContent: 'space-around',
        //             paddingVertical: 20,
        //         }}
        //     >
        //         <Pressable onPress={() => setIsShow('Friend')}>
        //             <Text style={{ fontSize: 10, fontWeight: '600', color: isShow === 'Friend' ? 'black' : '#645C5C' }}>
        //                 BẠN BÈ
        //             </Text>
        //         </Pressable>
        //         <Pressable onPress={() => setIsShow('Group')}>
        //             <Text style={{ fontSize: 10, fontWeight: '600', color: isShow === 'Group' ? 'black' : '#645C5C' }}>
        //                 NHÓM
        //             </Text>
        //         </Pressable>
        //         <Pressable onPress={() => setIsShow('OA')}>
        //             <Text style={{ fontSize: 10, fontWeight: '600', color: isShow === 'OA' ? 'black' : '#645C5C' }}>
        //                 OA
        //             </Text>
        //         </Pressable>
        //     </View>
        //     {isShow === 'Friend' ? <Friend /> : isShow === 'Group' ? <Group /> : <OA />}
        // </View>
        <View>

        </View>
    );
};

export default PhoneBook;
