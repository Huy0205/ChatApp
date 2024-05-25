import { Camera } from 'expo-camera';
import * as Contacts from 'expo-contacts';

export const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    return status === 'granted';
};

export const requestAcceptPhoneBookPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    return status === 'granted';
};
