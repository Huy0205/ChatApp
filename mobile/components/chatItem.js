import { View, Text, Dimensions, Image, Pressable, Alert, TouchableOpacity, Linking, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Svg, SvgUri } from 'react-native-svg';
import { colors } from '../constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../providers/Auth/AuthProvider';

import {
    extraTimeStamp,
    fileIcons,
    fileLink,
    extractFileName,
    extractFileSize,
    extractFileExtension,
} from '../utils/fileUtil';

const windowWidth = Dimensions.get('window').width;

const ChatItem = ({ message }) => {
    const { user } = useContext(AuthContext);
    const [originalWidth, setOriginalWidth] = useState(null);
    const [originalHeight, setOriginalHeight] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const sender = message.senderId;

    useEffect(() => {
        if (message.type != 'image') return;
        // Lấy kích thước thực của ảnh
        Image.getSize(message.content, (width, height) => {
            setOriginalWidth(width);
            setOriginalHeight(height);
        });
    }, []);

    const RenderFileType = () => {
        const FileName = extraTimeStamp(extractFileName(message.content));
        const fileExtension = extractFileExtension(FileName);
        const fileSize = extractFileSize(message.content);
        const iconFile = fileIcons.find((item) => item?.type.includes(fileExtension))?.icon;

        const openFile = async () => {
            try {
                await Linking.openURL(fileLink(FileName));
            } catch (error) {
                console.error('Error opening file:', error);
            }
        };

        return (
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={openFile}>
                {/* <SvgUri width="50" height="50" uri={iconFile} /> */}
                <View style={{ marginBottom: 3 }}>
                    <Text style={{ fontSize: 16 }}>{FileName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14 }}>{fileSize.toUpperCase()}</Text>
                        <View style={{ borderWidth: 1.5, borderRadius: 10, marginHorizontal: 5 }}></View>
                        <Text style={{ fontSize: 14 }}>{fileExtension.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View
            style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                flexDirection: 'row',
                justifyContent: sender._id === user._id ? 'flex-end' : 'flex-start',
            }}
        >
            {sender._id !== user._id && (
                <View style={{ marginRight: 7 }}>
                    <Image
                        source={{ uri: sender.avatarPicture }}
                        style={{ width: 36, height: 36, borderRadius: 36 / 2 }}
                    />
                </View>
            )}
            {message.type === 'image' ? (
                <Image
                    source={{ uri: message.content }}
                    style={{
                        width: (70 * windowWidth) / 100 - 20,
                        height:
                            originalHeight && originalWidth
                                ? (originalHeight / originalWidth) * ((70 * windowWidth) / 100 - 20)
                                : null,
                        resizeMode: 'contain',
                        borderRadius: 10,
                    }}
                />
            ) : (
                <View>
                    <TouchableOpacity
                        onLongPress={() => setShowModal(true)}
                        style={{
                            backgroundColor: sender._id === user._id ? '#ABFCB5' : '#fff',
                            maxWidth: (70 * windowWidth) / 100,
                            borderRadius: 10,
                            padding: 10,
                        }}
                    >
                        {message.type === 'text' ? (
                            <Text style={{ fontSize: 16 }}>{message.content}</Text>
                        ) : message.type === 'icon' ? (
                            <Image
                                source={{ uri: message.content }}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                }}
                            />
                        ) : (
                            <RenderFileType />
                        )}
                        <Pressable
                            style={{
                                position: 'absolute',
                                top: 1,
                                right: 1,
                                width: 18,
                                height: 18,
                                borderRadius: 9,
                                borderWidth: 1,
                                borderColor: colors.lightGrey,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                size={14}
                                color="red"
                                secondaryColor="black"
                                style={{ borderWidth: 1, borderColor: 'black' }}
                            />
                        </Pressable>
                    </TouchableOpacity>
                    <Modal visible={showModal} transparent={true}>
                        <View
                            style={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
                                <Pressable onPress={() => setShowModal(false)}>
                                    <Text>Thu hồi</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

export default ChatItem;
