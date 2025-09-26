import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseProvider } from '@/firebase/provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { initializeFirebase } from '@/firebase';
import { getFirebaseConfig } from '@/firebase/config';

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
  const { app, auth, firestore } = initializeFirebase(firebaseConfig);

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
