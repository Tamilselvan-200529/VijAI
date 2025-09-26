# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Hosting Your Project

This project is configured for deployment using [Firebase App Hosting](https://firebase.google.com/docs/hosting/app-hosting).

### Deployment Steps:

1.  **Push to GitHub:** Make sure your project code is in a GitHub repository.
2.  **Connect to Firebase:**
    *   Go to the [Firebase Console](https://console.firebase.google.com/).
    *   Select your project.
    *   In the "Build" section of the sidebar, click on **App Hosting**.
    *   Follow the on-screen instructions to connect your GitHub repository.
3.  **Automatic Deploys:** Once connected, Firebase App Hosting will automatically build and deploy your application whenever you push changes to your main branch.

The `apphosting.yaml` file in your project root is already configured for a basic Next.js deployment. You can customize it for more advanced needs like setting up environment variables or changing the number of running instances.
