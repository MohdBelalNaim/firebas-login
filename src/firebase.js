import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyC_vGdmR5aBwgsUnycx531rGHKRgv11qB8",
  authDomain: "modern-login-9663d.firebaseapp.com",
  projectId: "modern-login-9663d",
  storageBucket: "modern-login-9663d.appspot.com",
  messagingSenderId: "544623553676",
  appId: "1:544623553676:web:266fe847a7015537c89fa9"
};


const app = initializeApp(firebaseConfig);

export const Authentication = getAuth(app)