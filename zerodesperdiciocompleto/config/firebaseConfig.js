import { initializeApp, getApps, getApp } from "@firebase/app";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBaLg1f8anYbb_uwF8_OV-glfGQ1EamyvE",
  authDomain: "zerodesperdicio-3e036.firebaseapp.com",
  projectId: "zerodesperdicio-3e036",
  storageBucket: "zerodesperdicio-3e036.firebasestorage.app",
  messagingSenderId: "283415695775",
  appId: "1:283415695775:web:ebf82b6b6e610ef59aadaa"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export { GoogleAuthProvider, signInWithCredential };