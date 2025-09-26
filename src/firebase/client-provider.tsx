'use client';

import { FirebaseProvider, FirebaseContext } from './provider';
import React, { useContext, useMemo } from 'react';
import { initializeFirebase } from './index';
import { getFirebaseConfig } from './config';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const serverAppContext = useContext(FirebaseContext);

  const clientAppContext = useMemo(() => {
    if (typeof window !== 'undefined' && !serverAppContext) {
      const firebaseConfig = getFirebaseConfig();
      if (!firebaseConfig) {
        console.error('Firebase config not found. Please set up your environment variables.');
        return null;
      }
      return initializeFirebase(firebaseConfig);
    }
    return null;
  }, [serverAppContext]);

  if (serverAppContext) {
    return <>{children}</>;
  }

  if (!clientAppContext) {
    return <>{children}</>; 
  }

  return (
    <FirebaseProvider
      app={clientAppContext.app}
      auth={clientAppContext.auth}
      firestore={clientAppContext.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
