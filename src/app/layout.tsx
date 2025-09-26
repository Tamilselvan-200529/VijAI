import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { initializeFirebase } from '@/firebase';
import { getFirebaseConfig } from '@/firebase/config';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export const metadata: Metadata = {
  title: 'VijAI - Your Personal AI Assistant',
  description: 'A full-stack chatbot web application using NVIDIA API, built by Tamil.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const firebaseConfig = getFirebaseConfig();
  let app: FirebaseApp | null = null;
  let auth: Auth | null = null;
  let firestore: Firestore | null = null;

  if (firebaseConfig) {
    const firebaseInstances = initializeFirebase(firebaseConfig);
    app = firebaseInstances.app;
    auth = firebaseInstances.auth;
    firestore = firebaseInstances.firestore;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseProvider app={app} auth={auth} firestore={firestore}>
          <FirebaseClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </FirebaseClientProvider>
        </FirebaseProvider>
      </body>
    </html>
  );
}
