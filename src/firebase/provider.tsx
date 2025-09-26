'use client';

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, Auth, User } from 'firebase/auth';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import { useFirebaseApp, useFirestore as useFirestoreInstance } from './hooks';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  currentUser: User | null;
  loading: boolean;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const app = useFirebaseApp();
  const firestore = useFirestoreInstance();
  const auth = app ? getAuth(app) : null;
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const value = { app, auth, firestore, currentUser, loading };

  return (
    <FirebaseContext.Provider value={value}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = (): FirebaseContextType => {
  const context = useContext(FirebaseContext);
  if (context === null) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useAuth = () => {
    const { currentUser, auth, loading } = useFirebase();
    return { currentUser, auth, loading };
};

export const useFirestore = (): Firestore | null => {
  return useFirebase()?.firestore ?? null;
};
