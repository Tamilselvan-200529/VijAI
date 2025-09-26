import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { FirebaseConfig } from './config';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function initializeFirebase(firebaseConfig: FirebaseConfig | null): FirebaseInstances {
  if (!firebaseConfig) {
    throw new Error('Firebase config is not provided.');
  }

  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

export * from './provider';
export * from './client-provider';
export * from './auth/use-user';
