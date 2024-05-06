import { Camera } from 'expo-camera';

export const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync({
        permissionDialogTitle: 'Yêu cầu Quyền Sử dụng Camera',
        permissionDialogMessage:
            'Ứng dụng cần quyền truy cập vào camera của bạn để có thể sử dụng tính năng này. Vui lòng cấp quyền truy cập để tiếp tục.',
    });
    return status === 'granted';
};
