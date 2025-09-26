'use client';

import { FirebaseProvider } from './provider';
import React from 'react';

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  // Firebase will be initialized via the useFirebaseApp hook in the provider
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
