import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Header from '../../components/header';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const navigation = useNavigation();
    
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    onPress: () => navigation.goBack(),
                    txtSearch: () => navigation.navigate('Search'),
                }}
            />
        </View>
    );
};

export default Search;
