import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyA3BUhMZSSqAmdBDeUHowRDs964a5VCM9Y',
  authDomain: 'mentor-dashboard-5d31f.firebaseapp.com',
});

export default app;