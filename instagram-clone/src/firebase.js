import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyC7qqFGOlLKuCw2exBumJ23HtodlZuHWNU',
  authDomain: 'instagram-clone-a5c70.firebaseapp.com',
  databaseURL: 'https://instagram-clone-a5c70.firebaseio.com',
  projectId: 'instagram-clone-a5c70',
  storageBucket: 'instagram-clone-a5c70.appspot.com',
  messagingSenderId: '113729313792',
  appId: '1:113729313792:web:5d99ed5caccc8e7960cce5',
  measurementId: 'G-TJ39Z3QHZH',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
