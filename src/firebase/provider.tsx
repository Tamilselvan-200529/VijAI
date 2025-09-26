'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export interface FirebaseContextType {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
}

export const FirebaseContext = createContext<FirebaseContextType | null>(null);

interface FirebaseProviderProps {
  children: ReactNode;
  app?: FirebaseApp | null;
  auth?: Auth | null;
  firestore?: Firestore | null;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children, app, auth, firestore }) => {
  const parentContext = useContext(FirebaseContext);

  const value = app ? { app, auth: auth ?? null, firestore: firestore ?? null } : parentContext;

  return (
    <FirebaseContext.Provider value={value}>
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

export const useFirebaseApp = (): FirebaseApp | null => {
  return useFirebase()?.app ?? null;
};

export const useAuth = (): Auth | null => {
  return useFirebase()?.auth ?? null;
};

export const useFirestore = (): Firestore | null => {
  return useFirebase()?.firestore ?? null;
};
