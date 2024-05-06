import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, Linking } from 'react-native';
import styles from './styles';
import { SvgUri } from 'react-native-svg';
import {
    extraTimeStamp,
    fileIcons,
    fileLink,
    extractFileName,
    extractFileSize,
    extractFileExtension,
} from '../../utils/fileUtil';

const windowWidth = Dimensions.get('window').width;

const MessageContent = ({ message }) => {
    const [originalWidth, setOriginalWidth] = useState(null);
    const [originalHeight, setOriginalHeight] = useState(null);

    switch (message.type) {
        case 'text':
            return (
                <View style={styles.container}>
                    <Text style={styles.textMessage}>{message.content}</Text>
                </View>
            );
        case 'image':
            useEffect(() => {
                // Lấy kích thước thực của ảnh
                Image.getSize(message.content, (width, height) => {
                    setOriginalWidth(width);
                    setOriginalHeight(height);
                });
            }, []);
            return (
                <Image
                    source={{ uri: message.content }}
                    style={[
                        styles.imgMessage,
                        {
                            width: (70 * windowWidth) / 100 - 20,
                            height:
                                originalHeight && originalWidth
                                    ? (originalHeight / originalWidth) * ((70 * windowWidth) / 100 - 20)
                                    : null,
                        },
                    ]}
                />
            );
        case 'icon':
            return (
                <View style={styles.container}>
                    <Image source={{ uri: message.content }} style={styles.iconMessage} />
                </View>
            );
        case 'file':
            const fileName = extraTimeStamp(extractFileName(message.content));
            const fileExtension = extractFileExtension(fileName);
            const fileSize = extractFileSize(message.content);
            const iconFile = fileIcons.find((item) => item?.type.includes(fileExtension))?.icon;

            const openFile = async () => {
                try {
                    await Linking.openURL(fileLink(fileName));
                } catch (error) {
                    console.error('Error opening file:', error);
                }
            };
            return (
                <TouchableOpacity style={[styles.container, { flexDirection: 'row' }]} onPress={openFile}>
                    <SvgUri width="50" height="50" uri={iconFile} />
                    <View style={styles.fileMessage}>
                        <Text style={styles.fileName}>{fileName}</Text>
                        <View style={styles.fileInfor}>
                            <Text style={styles.fileSize}>{fileSize.toUpperCase()}</Text>
                            <View style={styles.dots} />
                            <Text style={styles.fileExtension}>{fileExtension.toUpperCase()}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        default:
            return null;
    }
};

export default MessageContent;
