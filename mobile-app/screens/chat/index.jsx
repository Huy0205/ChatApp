import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/header';
import Message from '../../components/message';
import styles from './styles';
import { faArrowLeftLong, faFaceSmile, faFile, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import * as MessageService from '../../services/messageService';
import { socketContext } from '../../providers/Socket/SocketProvider';
import { ConversationContext } from '../../providers/ConversationProvider/ConversationProvider';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const Chat = () => {
    const navigation = useNavigation();
    const { currentUserId, socket } = useContext(socketContext);
    const { conversation } = useContext(ConversationContext);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    console.log('render chat');

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
            setMessages((prev) => [new_message, ...prev]); // Thêm tin nhắn mới vào đầu mảng
            socket.emit('sendMessage', { ...data, new_message });
        } catch (error) {
            console.error(error);
        }
    };

    // Nhận tin nhắn
    useEffect(() => {
        const onMessage = ({ conversationId, new_message }) => {
            if (conversationId === conversation._id) {
                setMessages((prev) => [new_message, ...prev]);
            }
        };
        socket.on('getMessage', onMessage);

        return () => {
            socket.off('getMessage', onMessage);
        };
    }, [conversation._id]);

    // Xử lý gửi ảnh
    const handleSendImage = async () => {
        try {
            let resultSelectImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Chỉ chọn ảnh
                quality: 1, // Chất lượng ảnh
            });

            // Nếu bấm vào nhưng không chọn ảnh
            if (resultSelectImage.canceled) {
                return;
            }

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
            console.log('response', response);
            await handleSendMessage('image', response.url);
        } catch (error) {
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
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    text: 'Trở về',
                    onPress: () => {
                        socket.emit('reRenderConversations', conversation.recieveInfor.members); // render lại Conversations
                        navigation.goBack();
                    },
                }}
            />
            <View style={styles.messagesWrapper}>
                <FlatList
                    data={messages}
                    inverted
                    renderItem={({ item }) => {
                        return <Message message={item} />;
                    }}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.messages}
                />
            </View>
            <View style={styles.action}>
                <TouchableOpacity onPress={handleSendEmoji}>
                    <FontAwesomeIcon icon={faFaceSmile} size={24} />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tin nhắn"
                    value={text}
                    onChangeText={(text) => {
                        setText(text);
                    }}
                    onSubmitEditing={({ nativeEvent }) => {
                        handleSendMessage('text', nativeEvent.text);
                        setText('');
                    }}
                />
                <TouchableOpacity onPress={handleSendFile}>
                    <FontAwesomeIcon icon={faFile} size={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSendImage}>
                    <FontAwesomeIcon icon={faImage} size={24} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Chat;
