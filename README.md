# Athiya L&D – Cross‑Cultural Module (Web + Mobile)

This package includes:
- **web/**: a CDN-based React prototype (no build step). Open `web/index.html` in a browser.
- **mobile/**: a React Native screen (`CrossCulturalScreen.tsx`) to drop into your RN app.
- **shared/**: `tips.json` and `quiz.json` used by both.
- **firebase/**: `firestore.rules` and a suggested data model in `schema.md`.

## SSO (stubs)
- Web header includes **Google** and **Microsoft** sign‑in buttons (placeholders). Wire them up using **Firebase Authentication**.
- For Microsoft/Azure AD, set up an **OIDC provider** in Firebase or use **Azure AD** + your gateway.

## Run web prototype
Just open `web/index.html` (double click). It loads React from CDN and the shared JSON files.

## React Native
Import the screen into your navigation and ensure bundler handles JSON imports (or fetch from API).

## Firebase
- Apply `firebase/firestore.rules` to your project.
- Suggested collections are documented in `firebase/schema.md`.
- Add Cloud Functions to award badges on quiz submission.

Generated: 2025-08-14
