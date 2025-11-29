import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMYIVIMpn4x3ioCkrbjcPwL-RVII-DdiY",
  authDomain: "zenroutine-688c6.firebaseapp.com",
  projectId: "zenroutine-688c6",
  storageBucket: "zenroutine-688c6.appspot.com",
  messagingSenderId: "295933909782",
  appId: "1:295933909782:web:6a54e647949ef7f42c8e37"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  auth = getAuth(app);
}


const db = getFirestore(app);

export { app, auth, db };
