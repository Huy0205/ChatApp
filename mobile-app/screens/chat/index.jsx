import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    Text,
    TouchableWithoutFeedback,
    Alert,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/header';
import Message from '../../components/message';
import styles from './styles';
import {
    faArrowLeftLong,
    faCamera,
    faEllipsis,
    faFaceSmile,
    faFile,
    faImage,
    faLocationDot,
    faMicrophone,
    faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import * as MessageService from '../../services/messageService';
import { socketContext } from '../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../providers/ConversationProvider/ConversationProvider';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import myColors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Chat = ({ route }) => {
    const navigation = useNavigation();
    const { currentUserId, socket } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [isShowFunctions, setIsShowFunctions] = useState(false);
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(254.90908813476562);
    const [actionHeight, setActionHeight] = useState(0);
    const txtRef = useRef(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const messages = await MessageService.getMessageByConversationId(conversation._id);
                for (let i = 0; i < messages.length - 1; i++) {
                    for (let j = i + 1; j < messages.length; j++) {
                        messages[j].prevSenderId = messages[i].senderId._id;
                    
                    }
                }
                // Đảo ngược mảng tin nhắn để hiển thị tin nhắn mới nhất ở cuối
                setMessages(messages.reverse());
            } catch (error) {
                console.error(error);
            }
        };
        getMessages();
    }, []);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
            setIsShowKeyboard(true);
            setKeyboardHeight(event.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyboard(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const focusOnTextInput = () => {
        txtRef.current.focus();
    };

    const toggleFunctions = () => {
        if (!isShowFunctions && !isShowKeyboard) {
            setIsShowFunctions(true);
        } else {
            if (isShowFunctions) {
                focusOnTextInput();
                setTimeout(() => {
                    setIsShowFunctions(false);
                }, 150);
            } else {
                Keyboard.dismiss();
                setIsShowFunctions(true);
            }
        }
    };

    // Xử lý khi người dùng nhấn bên ngoài
    const handlePressOutside = () => {
        if (isShowFunctions) setIsShowFunctions(false);
    };

    const handleLastMessage = (type, content) => {
        switch (type) {
            case 'text':
                return content;
            case 'image':
                return 'Đã gửi một ảnh';
            case 'icon':
                return 'Đã gửi một icon';
            case 'file':
                return 'Đã gửi một file';
        }
    };

    // Xử lý gửi tin nhắn
    const handleSendMessage = async (type, content) => {
        try {
            const data = {
                senderId: currentUserId,
                conversationId: conversation._id,
                content,
                members: conversation.recieveInfor.members,
            };
            const new_message = await MessageService.sendMessage(type, data);
            const lastMessage = handleLastMessage(type, content);

            await MessageService.updateLastMessage(conversation._id, lastMessage, currentUserId);
            new_message.prevSenderId = messages.length > 0 ? messages[0].senderId._id : null;

            if (type === 'image' || type === 'file') {
                // update lại tin nhắn đa
                setMessages((prev) => {
                    const updatedMessages = [...prev];
                    updatedMessages[0] = new_message;
                    return updatedMessages;
                });
            } else {
                setMessages((prev) => [new_message, ...prev]); // Thêm tin nhắn mới vào đầu mảng
            }
            socket.emit('sendMessage', { ...data, new_message });
            socket.emit('reRenderConversations', {
                members: conversation.recieveInfor.members,
                conversationId: conversation._id,
                lastMessage,
                unseen: 1,
                sendAt: new Date().toISOString(),
            }); // render lại Conversations

            if (isShowFunctions) setIsShowFunctions(false);
        } catch (error) {
            console.error(error);
        }
    };

    // Nhận tin nhắn
    useEffect(() => {
        const onMessage = ({ conversationId, new_message }) => {
            
            if (conversationId === conversation._id) {
                new_message.prevSenderId = messages.length > 0 ? messages[0].senderId._id : null;
                setMessages((prev) => [new_message, ...prev]);
            }
        };
        socket.on('getMessage', onMessage);

        return () => {
            socket.off('getMessage', onMessage);
        };
    }, [conversation._id, messages]);

    // đăng kí socket nhận emoji tin nhắn
    useEffect(() => {
        const onMessageEmoji = ({ conversationId, new_message }) => {
            if (conversationId === conversation._id) {
                setMessages((prev) => {
                    prev.forEach((message) => {
                        if (message._id === new_message._id) {
                            message.reaction = new_message.reaction;
                        }
                    });
                    return [...prev];
                });
            }
        };

        socket.on('getMessageEmoji', onMessageEmoji);
        return () => {
            socket.off('getMessageEmoji', onMessageEmoji);
        };
    }, [conversation._id]);

    //đăng kí socket nhận tin nhắn đã xóa
    useEffect(() => {
        const onMessageDelete = async ({ conversationId, new_message }) => {
        
            if (conversationId === conversation._id) {
                setMessages((prev) => {
                    prev.forEach((message) => {
                        if (message._id === new_message._id) {
                            message.isDeleted = new_message.isDeleted;
                        }
                    });
                    return [...prev];
                });
            }
        };
        socket.on('getMessageDelete', onMessageDelete);
        return () => {
            socket.off('getMessageDelete', onMessageDelete);
        };
    }, [conversation._id]);

    // đăng kí socket nhận tin nhắn đã thu hồi
    useEffect(() => {
        const onRecallMessage = async ({ conversationId, new_message }) => {
       
            if (conversationId === conversation._id) {
                setMessages((prev) => {
                    prev.forEach((message) => {
                        if (message._id === new_message._id) {
                            message.isRecall = new_message.isRecall;
                        }
                    });
                    return [...prev];
                });
            }
        };

        socket.on('getRecallMessage', onRecallMessage);
        return () => {
            socket.off('getRecallMessage', onRecallMessage);
        };
    }, []);

    // Xử lý gửi ảnh
    const handleSendImage = async () => {
        try {
            let resultSelectImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh
                quality: 1, // Chất lượng ảnh
            });

            // Nếu bấm vào nhưng không chọn ảnh
            if (resultSelectImage.canceled) {
                setIsShowFunctions(false);
                return;
            }

            const messageTemp = {
                type: 'loading', // type 'loading' để hiển thị tin nhắn loading 'file đang được gửi...'
                senderId: currentUserId,
                prevSenderId: messages.length > 0 ? messages[0].senderId._id : null,
            };
            setMessages((prev) => [messageTemp, ...prev]);

            // Nếu chọn ảnh
            const img = resultSelectImage.assets[0];

            const formData = new FormData();
            formData.append('file', {
                uri: img.uri,
                type: img.mimeType,
                name: img.fileName,
            });
            formData.append('name', img.fileName);
            const response = await MessageService.uploadImageMessageMobile(formData);

            await handleSendMessage('image', response.url);
        } catch (error) {
            setMessages((prev) => prev.filter((item) => item.type !== 'loading'));
            Alert.alert('Lỗi', 'Không thể gửi ảnh');
            console.error(error);
        }
    };

    // Xử lý gửi emoji
    const handleSendEmoji = () => {
        console.log('Emoji');
    };

    // Xử lý gửi file
    const handleSendFile = async () => {
        try {
            const response = await DocumentPicker.getDocumentAsync({ type: '*/*', copyToCacheDirectory: true });

            if (response.canceled) {
                setIsShowFunctions(false);
                return;
            }

            const messageTemp = {
                type: 'loading', // type 'loading' để hiển thị tin nhắn loading 'file đang được gửi...'
                senderId: currentUserId,
                prevSenderId: messages.length > 0 ? messages[0].senderId._id : null,
            };
            setMessages((prev) => [messageTemp, ...prev]);

            let { name, size, uri } = response.assets[0];
            let nameParts = name.split('.');
            let fileType = nameParts[nameParts.length - 1];
            var fileToUpload = {
                name: name,
                size: size,
                uri: uri,
                type: 'application/' + fileType,
            };
            const formData = new FormData();
            formData.append('file', fileToUpload);
            const res = await MessageService.uploadFileMessage(formData);
            await handleSendMessage('file', res.fileName);
        } catch (error) {
            setMessages((prev) => prev.filter((item) => item.type !== 'loading'));
            Alert.alert('Lỗi', 'Không thể gửi file');
            console.error(error);
        }
    };

    const goBack = async () => {
        await MessageService.updateSeenMessages(conversation._id, currentUserId);
        socket.emit('reRenderConversations', { members: [currentUserId] });
        // render lại Conversations
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    onPress: goBack,
                    avatarUri: route.params.isGroup
                        ? route.params.userOrGroup.groupPicture
                        : route.params.userOrGroup.avatarPicture,
                    name: route.params.isGroup ? route.params.userOrGroup.groupName : route.params.userOrGroup.username,
                    isGroup: route.params.isGroup,
                    numberOfMembers: route.params.isGroup ? route.params.userOrGroup.members.length : null,
                }}
            />
            {!isShowFunctions && !isShowKeyboard ? (
                <View style={styles.messagesWrapper}>
                    <FlatList
                        data={messages}
                        inverted
                        renderItem={({ item }) => {
                            return (
                                <Message
                                    message={item}
                                    group={route.params.isGroup ? route.params.userOrGroup : null}
                                />
                            );
                        }}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.messages}
                    />
                </View>
            ) : (
                <TouchableWithoutFeedback onPress={handlePressOutside}>
                    <View
                        style={{
                            width: windowWidth,
                            height: windowHeight - (8 * windowHeight) / 100 - actionHeight - keyboardHeight,
                        }}
                    >
                        <FlatList
                            data={messages}
                            inverted
                            renderItem={({ item }) => {
                                return (
                                    <Message
                                        message={item}
                                        group={route.params.isGroup ? route.params.userOrGroup : null}
                                    />
                                );
                            }}
                            keyExtractor={(item) => item._id}
                            contentContainerStyle={styles.messages}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )}

            <View
                style={styles.action}
                onLayout={(event) => {
                    setActionHeight(event.nativeEvent.layout.height);
                }}
            >
                <TouchableOpacity style={styles.btnOtherMessage} onPress={handleSendEmoji}>
                    <FontAwesomeIcon icon={faFaceSmile} size={24} color={myColors.main} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tin nhắn..."
                    value={text}
                    ref={txtRef}
                    onChangeText={(text) => {
                        setText(text);
                    }}
                    onSubmitEditing={({ nativeEvent }) => {
                        handleSendMessage('text', nativeEvent.text);
                        setText('');
                    }}
                />
                <TouchableOpacity style={styles.btnOtherMessage}>
                    <FontAwesomeIcon icon={faMicrophone} size={24} color={myColors.main} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOtherMessage} onPress={toggleFunctions}>
                    <FontAwesomeIcon
                        icon={faEllipsis}
                        size={24}
                        color={
                            !isShowKeyboard && !isShowFunctions
                                ? myColors.main
                                : isShowKeyboard
                                ? myColors.main
                                : myColors.fifth
                        }
                    />
                </TouchableOpacity>
            </View>
            {isShowFunctions && (
                <View style={[styles.functions, { height: keyboardHeight }]}>
                    <View style={styles.rowModal}>
                        <TouchableOpacity style={styles.itemModal}>
                            <View style={styles.iconWarapper}>
                                <FontAwesomeIcon icon={faCamera} size={24} color={myColors.first} />
                            </View>
                            <Text style={styles.itemName}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemModal} onPress={handleSendImage}>
                            <View style={styles.iconWarapper}>
                                <FontAwesomeIcon icon={faImage} size={24} color={myColors.first} />
                            </View>
                            <Text style={styles.itemName}>Ảnh có sẵn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemModal} onPress={handleSendFile}>
                            <View style={styles.iconWarapper}>
                                <FontAwesomeIcon icon={faFile} size={24} color={myColors.first} />
                            </View>
                            <Text style={styles.itemName}>Tài liệu</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.rowModal}>
                        <TouchableOpacity style={styles.itemModal}>
                            <View style={styles.iconWarapper}>
                                <FontAwesomeIcon icon={faVideo} size={24} color={myColors.first} />
                            </View>
                            <Text style={styles.itemName}>Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemModal}>
                            <View style={styles.iconWarapper}>
                                <FontAwesomeIcon icon={faLocationDot} size={24} color={myColors.first} />
                            </View>
                            <Text style={styles.itemName}>Vị trí</Text>
                        </TouchableOpacity>
                        <View style={styles.itemModal}></View>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Chat;
