# **App Name**: AetherMind AI

## Core Features:

- User Authentication: Secure user registration and login using Email + Password, bcrypt-hashed passwords, and JWT tokens for session management.
- Chat Interface: A real-time chat interface for users to interact with the NVIDIA-powered AI, styled with message bubbles.
- AI-Powered Chat: Integration with the NVIDIA API for chat completions using specified models like nvidia/llama-3.1-70b-instruct, enabling dynamic and context-aware responses.
- Chat History: Persistent chat history saved in MongoDB, allowing users to load and review past conversations.
- File Upload and Processing: Enables users to upload PDFs and images which the AI processes and incorporates into the chat via a tool.
- Voice Chat: Real-time voice input (speech-to-text) and AI voice replies (text-to-speech) to enhance user interaction.
- Theme Customization: Dark mode / light mode toggle with theme preference stored in localStorage for a personalized user experience.

## Style Guidelines:

- Primary color: Deep midnight blue (#2C3E50) to create a professional and focused atmosphere.
- Background color: Soft, muted gray (#ECEFF1) for a clean and unobtrusive backdrop.
- Accent color: Vibrant teal (#26A69A) to highlight interactive elements and provide a touch of modernity.
- Headline font: 'Space Grotesk' (sans-serif) for a modern, tech-inspired feel in headings. Body text: 'Inter' (sans-serif) for a clean, readable interface.
- Code font: 'Source Code Pro' for displaying code snippets.
- Minimalist, line-based icons to maintain a clean and modern aesthetic.
- Smooth Framer Motion animations for transitions and message bubbles to enhance user experience.