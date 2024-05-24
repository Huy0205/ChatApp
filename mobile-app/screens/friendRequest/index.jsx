import { View, Text, Pressable } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import { icon, text } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeftLong, faGear } from '@fortawesome/free-solid-svg-icons';
import { getFriendRequest } from '../../services/requestFriendService';

const FrienfRequest = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        getFriendRequest()
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <View>
            <Header
                left={{
                    icon: faArrowLeftLong,
                    text: 'Lời mời kết bạn',
                }}
                right={[
                    {
                        icon: faGear,
                    },
                ]}
            />
            <View>
                <Pressable>
                    <Text>Đã nhận {}</Text>
                </Pressable>
                <Pressable>
                    <Text>Đã gửi {}</Text>
                </Pressable>
            </View>
            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return <ItemUserList friendRequest={item} />;
                    }}
                    keyExtractor={(item) => item._id}
                />
            </View>
        </View>
    );
};

export default FrienfRequest;
