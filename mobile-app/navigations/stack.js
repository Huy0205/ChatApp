import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import SignIn from '../screens/signIn';
import Chat from '../screens/chat';
import AddFriend from '../screens/addFriend';
import ScanQR from '../screens/scanQR';
import Information from '../screens/information';
import CreateAccount from '../screens/createAccount';
import ActiveAccount from '../screens/activeAccount';
import SignUp from '../screens/signUp';
import BottomNavigation from './bottom';
import CreateGroup from '../screens/createGroup';
import ShowPhoneBook from '../screens/showPhoneBook';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="Conversations" component={BottomNavigation} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="AddFriend" component={AddFriend} />
            <Stack.Screen name="ScanQR" component={ScanQR} />
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="CreateAccount" component={CreateAccount} />
            <Stack.Screen name="ActiveAccount" component={ActiveAccount} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
            <Stack.Screen name="ShowPhoneBook" component={ShowPhoneBook} />
        </Stack.Navigator>
    );
};

export default StackNavigation;
