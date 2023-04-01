import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: 'AIzaSyDIGpWgvEYrMb3hxXSEGCAKaqF29Cs255k',
    authDomain: 'yearbook-portal-iiti.firebaseapp.com',
    projectId: 'yearbook-portal-iiti',
    storageBucket: 'yearbook-portal-iiti.appspot.com',
    messagingSenderId: '1007377731371',
    appId: '1:1007377731371:web:bb7c73ba24e50b0c50bf6e',
    measurementId: 'G-BND844SPS7',
  }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);