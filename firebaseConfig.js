import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
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


let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


const db = getFirestore(app);

export { auth, db };
