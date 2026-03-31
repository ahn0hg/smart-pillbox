// firebaseConfig.ts
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAWuV_j2PBZyJqjYxndEWG5Ks7q3uq59Ek",
  authDomain: "smart-pillbox-6b6b3.firebaseapp.com",
  projectId: "smart-pillbox-6b6b3",
  databaseURL: "https://smart-pillbox-6b6b3-default-rtdb.asia-southeast1.firebasedatabase.app/", // 주소 확인 필수!
  storageBucket: "smart-pillbox-6b6b3.firebasestorage.app",
  messagingSenderId: "1030072549533",
  appId: "1:1030072549533:web:2089e22396eabab0a31474",
  measurementId: "G-J4HTPZW2W1"
};

// 앱이 이미 있으면 가져오고, 없으면 새로 만듭니다. (중복 방지)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;