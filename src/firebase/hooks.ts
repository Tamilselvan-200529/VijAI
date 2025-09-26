
'use client';
import { useState, useEffect } from 'react';
import { getFirebaseConfig } from './config';
import { initializeFirebase } from './index';
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

// A hook to initialize Firebase on the client.
export const useFirebaseApp = () => {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && !app) {
      const config = getFirebaseConfig();
      if (config) {
        const instances = initializeFirebase(config);
        setApp(instances.app);
      } else {
        console.error('Firebase config not found. Check environment variables.');
      }
    }
  }, [app]);

  return app;
}

export const useFirestore = () => {
    const app = useFirebaseApp();
    const [firestore, setFirestore] = useState<Firestore | null>(null);

    useEffect(() => {
        if (app) {
            const { getFirestore } = require('firebase/firestore');
            setFirestore(getFirestore(app));
        }
    }, [app]);

    return firestore;
}
