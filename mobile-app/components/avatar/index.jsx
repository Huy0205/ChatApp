import { Image, View } from 'react-native';
import React from 'react';

const Avatar = ({ uri, size }) => {
    return <Image source={{ uri: uri }} style={{ width: size, height: size, borderRadius: size / 2 }} />;
};

export default Avatar;
