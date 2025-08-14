import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const isBrowser = typeof window !== "undefined";

let cachedApp: FirebaseApp | null = null;

export function isFirebaseEnabled(): boolean {
	return Boolean(
		firebaseConfig.apiKey &&
		firebaseConfig.projectId &&
		firebaseConfig.appId
	);
}

export function getFirebaseApp(): FirebaseApp {
	if (!isBrowser) {
		throw new Error("Firebase app requested on the server. Call only in client components/events.");
	}
	if (!isFirebaseEnabled()) {
		throw new Error("Firebase is not configured. Set NEXT_PUBLIC_FIREBASE_* in .env.local");
	}
	if (cachedApp) return cachedApp;
	const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
	cachedApp = app;
	return app;
}

export function getFirebaseAuth(): Auth {
	return getAuth(getFirebaseApp());
}

export function getFirestoreDb(): Firestore {
	return getFirestore(getFirebaseApp());
}

export function getFirebaseStorage(): FirebaseStorage {
	return getStorage(getFirebaseApp());
}



