import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';
import myColors from '../../constants/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../avatar';

const colorIcon = myColors.first;

const Header = ({ left, right }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftWrapper}>
                <TouchableOpacity style={styles.btnLeft} onPress={left.onPress}>
                    <FontAwesomeIcon icon={left.icon} color={colorIcon} size={25} />
                    {left.textButton && <Text style={styles.btnLeftText}>{left.textButton}</Text>}
                </TouchableOpacity>
                {left.text && <Text style={styles.title}>{left.text}</Text>}
                {left.txtSearch && (
                    <View style={styles.txtSearchWrapper}>
                        <FontAwesomeIcon icon={faSearch} color={myColors.fourth} size={16} style={{ padding: 8 }} />
                        <TextInput style={styles.txtSearch} placeholder="Tìm kiếm" autoFocus={true} />
                    </View>
                )}
                {left.avatarUri && (
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarWrapper}>
                            <Avatar uri={left.avatarUri} size={45} onPress={left.pressAvatar} />
                        </View>
                        <View style={styles.infoWrapper}>
                            <Text style={styles.name}>{left.name}</Text>
                            <Text style={styles.infoOther}>
                                {left.isGroup
                                    ? left.numberOfMembers + ' thành viên'
                                    : left.isFiend
                                    ? 'Bạn bè'
                                    : 'Người lạ'}
                            </Text>
                        </View>
                    </View>
                )}
            </View>
            <View style={styles.rightWrapper}>
                {right &&
                    right.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.btnRight} onPress={item.onPress}>
                            <FontAwesomeIcon icon={item.icon} color={colorIcon} size={25} />
                        </TouchableOpacity>
                    ))}
            </View>
        </View>
    );
};

export default Header;
