import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAbcGYezhasUa7wwypTx3sk4iUx8l4AMO8",
  authDomain: "yearbook-portal-75c4e.firebaseapp.com",
  projectId: "yearbook-portal-75c4e",
  storageBucket: "yearbook-portal-75c4e.appspot.com",
  messagingSenderId: "131318662277",
  appId: "1:131318662277:web:5aca49c8a5f932ba17d5ec",
  measurementId: "G-5T023WQZ2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
