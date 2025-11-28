import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAMYIVIMpn4x3ioCkrbjcPwL-RVII-DdiY",
  authDomain: "zenroutine-688c6.firebaseapp.com",
  projectId: "zenroutine-688c6",
  storageBucket: "zenroutine-688c6.firebasestorage.app",
  messagingSenderId: "295933909782",
  appId: "1:295933909782:web:6a54e647949ef7f42c8e37"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
