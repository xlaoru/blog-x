import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDCkkAi0wJq7LrhPmP4L0DJ8tuu-EvTcMs",
  authDomain: "blog-x-d5983.firebaseapp.com",
  projectId: "blog-x-d5983",
  storageBucket: "blog-x-d5983.appspot.com",
  messagingSenderId: "739796476897",
  appId: "1:739796476897:web:dcb01d0cc905093deba8a0",
  measurementId: "G-T3FY71ERE6"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage()