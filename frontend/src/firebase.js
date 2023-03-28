// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyDTp3sJ4RR81nq6H-g3Z0HhNqDoZvzgT7U',
   authDomain: 'doantotnghiep-379304.firebaseapp.com',
   projectId: 'doantotnghiep-379304',
   storageBucket: 'doantotnghiep-379304.appspot.com',
   messagingSenderId: '385358619632',
   appId: '1:385358619632:web:9ca4e83f7611af2bfff335',
   measurementId: 'G-WVH0HTXZ91',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
