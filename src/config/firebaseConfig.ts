import 'dotenv/config';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

const {
	FB_API_KEY,
	FB_AUTH_DOMAIN,
	FB_PROJECT_ID,
	FB_STORAGE_BUCKET,
	FB_MESSAGING_SENDER_ID,
	FB_APP_ID,
} = process.env;

const firebaseConfig = {
	apiKey: FB_API_KEY,
	authDomain: FB_AUTH_DOMAIN,
	projectId: FB_PROJECT_ID,
	storageBucket: FB_STORAGE_BUCKET,
	messagingSenderId: FB_MESSAGING_SENDER_ID,
	appId: FB_APP_ID
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

export { app, db };