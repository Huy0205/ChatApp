import React from 'react';
import AuthProvider from './providers/Auth/AuthProvider';
import SocketProvider from './providers/Socket/SocketProvider';
import ConversationProvider from './providers/ConversationProvider/ConversationProvider';
import MainNavigation from './navigations/main';
// import AddFriend from './screens/addFriend';
// import Information from './screens/information';

export default function App() {
    return (
        <AuthProvider>
            <SocketProvider>
                <ConversationProvider>
                    <MainNavigation />
                </ConversationProvider>
            </SocketProvider>
        </AuthProvider>
        // <Information
        //     userRender={{
        //         _id: '66201d63bef1d4e9a5128660',
        //         username: 'PhamHieu',
        //         phonenumber: '+84971754389',
        //         password: '$2b$10$BKYQKIiBTsLzEyh2LCV1keK1J5FHvwN85wC0y6il1P988NJ.IZNPq',
        //         avatarPicture:
        //             'https://didongviet.vn/dchannel/wp-content/uploads/2023/08/galaxy-huyen-bi-hinh-nen-iphone-12-pro-max-didongviet-2-576x1024.jpg',
        //         backgroundPicture:
        //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1dKSyQWsTU7VPPyYFifkT_L7N7VCjbO8aIA&usqp=CAU',
        //         gender: 0,
        //         // birth: "2024-03-06T07:53:00.000Z",
        //         birth: null,
        //         friends: [],
        //         groups: [
        //             {
        //                 $oid: '66201ee2bef1d4e9a5128731',
        //             },
        //         ],
        //         keywords: ['P', 'Ph', 'Pha', 'Pham', 'PhamH', 'PhamHi', 'PhamHie', 'PhamHieu'],
        //         freshToken:
        //             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjIwMWQ2M2JlZjFkNGU5YTUxMjg2NjAiLCJ1c2VybmFtZSI6IlBoYW1IaWV1IiwicGhvbmVudW1iZXIiOiIrODQ5NzE3NTQzODkiLCJiYWNrZ3JvdW5kUGljdHVyZSI6Imh0dHBzOi8vZW5jcnlwdGVkLXRibjAuZ3N0YXRpYy5jb20vaW1hZ2VzP3E9dGJuOkFOZDlHY1QxZEtTeVFXc1RVN1ZQUHlZRmlma1RfTDdON1ZDamJPOGFJQSZ1c3FwPUNBVSIsImF2YXRhclBpY3R1cmUiOiJodHRwczovL2RpZG9uZ3ZpZXQudm4vZGNoYW5uZWwvd3AtY29udGVudC91cGxvYWRzLzIwMjMvMDgvZ2FsYXh5LWh1eWVuLWJpLWhpbmgtbmVuLWlwaG9uZS0xMi1wcm8tbWF4LWRpZG9uZ3ZpZXQtMi01NzZ4MTAyNC5qcGciLCJnZW5kZXIiOjAsImJpcnRoIjpudWxsLCJrZXl3b3JkcyI6WyJQIiwiUGgiLCJQaGEiLCJQaGFtIiwiUGhhbUgiLCJQaGFtSGkiLCJQaGFtSGllIiwiUGhhbUhpZXUiXSwiaWF0IjoxNzEzMzgwNzIwLCJleHAiOjE3MTM0NjcxMjB9.N1KN2NurDqV9eu2v55Z_yFD0AdYFhm13ta5j6Jp4Q4s',
        //         createdAt: {
        //             $date: '2024-04-17T19:05:08.000Z',
        //         },
        //         updatedAt: {
        //             $date: '2024-04-17T19:11:30.541Z',
        //         },
        //         __v: 0,
        //     }}
        // />
    );
}
