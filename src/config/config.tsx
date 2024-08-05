


import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBZ_9ScLuDdbiKUK_MRM4WJP3ohZa6N0d4",
    authDomain: "garage-operations.firebaseapp.com",
    projectId: "garage-operations",
    storageBucket: "garage-operations.appspot.com",
    messagingSenderId: "140254954505",
    appId: "1:140254954505:web:c78560994ee198381de4d8",
    measurementId: "G-XZ5Z7XE8GC"
  };
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth()
const _db = firebase.firestore()

export const db = getFirestore(app);
export const db_storage = getStorage(app);
export  {_db,auth} 