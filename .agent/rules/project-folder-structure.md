---
trigger: always_on
---

## Project Structure (Src-Based Architecture)
- **Root Source:** `src/` (All application logic lives here)
- **Entry Point:** `src/App.tsx` (Main component) & `index.js` (App registry)
- **Navigation:** `src/navigation/` (React Navigation setup - Stack/Tab Navigators) -> *Note to AI: We use React Navigation, not Expo Router.*
- **Screens:** `src/screens/` (Full page views e.g., `HomeScreen.tsx`, `DetailsScreen.tsx`)
- **API Layer:** `src/api/` (Axios instances and endpoints for Spring Boot)
- **State Management:** `src/contexts/` (Global state using React Context API)
- **Components:** `src/components/` (Reusable UI widgets)
- **Custom Hooks:** `src/hooks/` (Shared logic like `useAuth`, `useTenant`)
- **Theming:** `src/theme/` (Design tokens, colors, fonts)
- **Storage:** `src/storage/` (Local storage handlers e.g., MMKV or AsyncStorage)
- **Utilities:** `src/utils/` (Helper functions and formatters)
- **Assets:** `src/assets/` (Images and static files)
- **Testing:** `__tests__/` (Unit and Integration tests)