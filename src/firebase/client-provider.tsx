'use client';

import { FirebaseProvider, FirebaseContext } from './provider';
import React, { useContext, useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { getFirebaseConfig } from './config';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const serverAppContext = useContext(FirebaseContext);
  const [clientAppContext, setClientAppContext] = useState<FirebaseInstances | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !serverAppContext?.app) {
      const firebaseConfig = getFirebaseConfig();
      if (firebaseConfig) {
        const instances = initializeFirebase(firebaseConfig);
        setClientAppContext(instances);
      } else {
        console.error('Firebase config not found on client. Please set up your environment variables.');
      }
    }
  }, [serverAppContext]);

  const contextValue = clientAppContext || serverAppContext;

  if (!contextValue?.app) {
    // Firebase is not yet initialized, you can show a loader or nothing
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      app={contextValue.app}
      auth={contextValue.auth}
      firestore={contextValue.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
