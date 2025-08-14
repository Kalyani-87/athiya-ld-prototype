# Firebase Data Model (Suggested)

## Collections
- `orgs/{orgId}`
  - `users/{userId}`: profile, role, streak, badges[]
  - `modules/{moduleId}`: title, description, contentRef (e.g., storage path), quizRef
  - `progress/{userId}`: { moduleId -> { cardIndex, quiz: { answers[], score, submittedAt } } }

## Auth Providers
- GoogleAuthProvider
- Microsoft / Azure AD (OIDC) or SAML via Firebase Authentication

## Cloud Functions (optional)
- On quiz submission, compute score, issue badge if score ≥ 80, write to `users/{userId}.badges`.
