import { initializeApp, applicationDefault, getApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseAdmin = getApps().length
    ? getApp()
    : initializeApp({ credential: applicationDefault() });

const firebaseAuth = getAuth(firebaseAdmin);

export default firebaseAuth;