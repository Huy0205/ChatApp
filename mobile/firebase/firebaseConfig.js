import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    // apiKey: 'AIzaSyC8Kvpv-Lel_FjDlH4g7DamYJrha13QOjM',
    // authDomain: 'testotpauth-a2306.firebaseapp.com',
    // projectId: 'testotpauth-a2306',
    // storageBucket: 'testotpauth-a2306.appspot.com',
    // messagingSenderId: '1001990318714',
    // appId: '1:1001990318714:web:bc9b3d3a1129b548eba9c3',
    // measurementId: 'G-2DRZ51V6W3',

    apiKey: 'AIzaSyCPtGpUnOa7MCw9X5NIbLhS9cZE2YW0noM',
    authDomain: 'authchatapp-7a70c.firebaseapp.com',
    projectId: 'authchatapp-7a70c',
    storageBucket: 'authchatapp-7a70c.appspot.com',
    messagingSenderId: '106166186271',
    appId: '1:106166186271:web:e5162f596f902c8303802a',
    measurementId: 'G-JX3MVPPECZ',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
