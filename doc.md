# Shafadoc Kiosk - Project Documentation

<!-- Ctrl + R  for hot realod the project -->

## Overview

**Shafadoc Kiosk** is a desktop application built with Electron, React, and TypeScript. It's designed as a kiosk system for healthcare centers to display medical information, particularly focusing on doctors and center details. The application supports RTL languages (Persian/Farsi) and includes theming capabilities.

**Current Version:** 1.0.0  
**Status:** Early Development (Initial Setup Phase)

---

## Technology Stack

### Core Framework

- **Electron 39.2.6** - Desktop application framework
- **React 19.2.1** - UI library
- **TypeScript 5.9.3** - Type-safe JavaScript

### State Management

- **Redux Toolkit 2.12.0** - Global state management
- **React Redux 9.3.0** - React bindings for Redux

### UI & Styling

- **Material-UI (MUI) 9.0.1** - Component library
- **@emotion/react & @emotion/styled** - CSS-in-JS library
- **Stylis & stylis-plugin-rtl** - RTL text direction support

### Data Fetching & Caching

- **TanStack React Query 5.100.10** - Server state management
- **TanStack React Query DevTools 5.62.0** - Debugging tools
- **Axios 1.16.1** - HTTP client

### Routing & Navigation

- **React Router DOM 7.15.1** - Client-side routing
- **Hash-based routing** (for Electron compatibility)

### Forms & Validation

- **React Hook Form 7.54.0** - Form state management
- **@hookform/resolvers 3.3.4** - Form validation resolvers
- **Zod 3.22.4** - TypeScript-first schema validation

### Date & Localization

- **date-fns-jalali 4.0.0-0** - Jalali (Persian) calendar support
- **Sonner 2.0.7** - Toast notification library

### Data Persistence

- **Electron Store 8.2.0** - Persistent configuration storage

### Development Tools

- **Electron Vite 5.0.0** - Build tool for Electron + Vite
- **Vite 7.2.6** - Frontend build tool
- **ESLint 9.39.1** - Code linting
- **Prettier 3.7.4** - Code formatting

---

## Project Structure

```
shafadoc-new-kiosk/
├── src/
│   ├── main/                          # Electron main process
│   │   ├── index.ts                   # Main process entry point
│   │   ├── ipc/
│   │   │   └── settings.ts            # IPC handlers for settings
│   │   └── store/
│   │       └── index.ts               # Electron Store configuration
│   │
│   ├── preload/
│   │   └── index.ts                   # Preload script for security
│   │
│   ├── renderer/                      # React application
│   │   └── src/
│   │       ├── main.tsx               # React entry point
│   │       ├── App.tsx                # Root component
│   │       ├── router/
│   │       │   └── index.tsx          # Route configuration
│   │       ├── layouts/
│   │       │   └── mainLayout/        # Main application layout
│   │       ├── pages/
│   │       │   ├── home/              # Home page
│   │       │   ├── settings/          # Settings page
│   │       │   └── centerDoctors/     # Center doctors listing
│   │       ├── components/
│   │       │   ├── sidebar/           # Navigation sidebar
│   │       │   └── Versions.tsx       # Version display
│   │       ├── features/
│   │       │   └── centerDoctors/
│   │       │       └── service/
│   │       │           ├── api/       # API calls
│   │       │           └── query/     # React Query hooks
│   │       ├── lib/
│   │       │   ├── redux/
│   │       │   │   ├── store.ts       # Redux store configuration
│   │       │   │   ├── hooks/         # Redux hooks
│   │       │   │   ├── slices/        # Redux slices (theme, center)
│   │       │   │   └── storeProvider/ # Redux provider component
│   │       │   ├── routes/            # Route definitions
│   │       │   ├── http/              # Axios configuration
│   │       │   ├── reactQuery/        # React Query configuration
│   │       │   ├── materialUi/
│   │       │   │   ├── muiTheme/      # Theme configuration
│   │       │   │   └── muiRTL/        # RTL configuration
│   │       │   └── customUseQuery/    # Custom React Query hooks
│   │       ├── hooks/
│   │       │   └── useKioskSettings/  # Kiosk settings hook
│   │       ├── types/
│   │       ├── assets/                # Images & static files
│   │       └── styles/                # Global styles
│   │
│   └── shared/
│       └── types/
│           ├── global/                # Global type definitions
│           └── common/                # Common types (Center, Doctor, KioskSettings)
│
├── resources/                         # Electron app icons & assets
├── dist/                              # Build output
├── package.json                       # Project dependencies
├── tsconfig.json                      # TypeScript configuration
└── electron.vite.config.ts            # Electron Vite configuration
```

---

## Key Components

### 1. **Error Boundary** (`src/renderer/src/components/ErrorBoundary/index.tsx`)

Catches React errors anywhere in the component tree and displays a user-friendly error page with options to:

- Retry the current action
- Return to home page
- Shows error message in development for debugging

Features:

- Class-based component for proper error catching
- Material-UI styled error display
- Persian error messages
- Automatic error logging

### 2. **404 Not Found Page** (`src/renderer/src/pages/notFound/index.tsx`)

Displays when user navigates to non-existent routes with:

- Animated 404 text
- "Return to Home" button
- "Go Back" button
- Persian UI text
  The settings page allows users to configure:
- **Theme Mode**: Toggle between light and dark modes
- **Center ID**: Input field for medical center identification

Features:

- Loads settings from Electron Store on mount
- Persists settings to Electron Store
- Material-UI styled cards and components
- Support for Persian/Farsi text (RTL)
- Save button with loading state

### 2. **Center Doctors Page** (`src/renderer/src/pages/centerDoctors/index.tsx`)

Currently a placeholder component for displaying doctors associated with a medical center.

- Intended to fetch and display doctor information
- Will integrate with React Query for data fetching

### 3. **Home Page** (`src/renderer/src/pages/home/index.tsx`)

The default landing page of the application.

### 4. **Main Layout** (`src/renderer/src/layouts/mainLayout/index.tsx`)

Provides the main application wrapper including:

- Navigation sidebar
- Main content area
- Routing outlet for nested routes

### 5. **Sidebar** (`src/renderer/src/components/sidebar/index.tsx`)

Navigation component for switching between pages.

---

## Data Types

### Center (from API)

```typescript
type CenterType = {
  id: string; // UUID
  city_id: string; // UUID
  name: string;
  en_title: string;
  alias: string | null;
  type: number; // e.g., 1 = hospital
  phones: string[];
  address: string;
  description: string | null;
  // ... additional fields
  city: {
    id: number;
    name: string;
    state: { id: number; name: string; tel_prefix: string };
  };
};
```

### Doctor (from API)

```typescript
interface DoctorType {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  mobile: string;
  // ... extensive medical credentials and specialization fields
  status: "active" | "inactive";
  approved: 0 | 1;
}
```

### Kiosk Settings (Electron Store)

```typescript
type KioskSettingsType = {
  themeMode: "light" | "dark";
  centerId: string;
};
```

---

## State Management

### Redux Store

Located in `src/renderer/src/lib/redux/store.ts`

**Slices:**

1. **themeMode** - Manages application theme (light/dark)
2. **center** - Manages selected center information

### React Query

- Configured in `src/renderer/src/lib/reactQuery/index.tsx`
- Used for server state management (API data)
- DevTools available for debugging

---

## Configuration

### Content Security Policy (CSP)

Located in `src/renderer/index.html`. The CSP controls what external resources can be loaded:

- `connect-src 'self' https://api.shafadev.ir` - Allows API requests to the backend
- If adding new API domains, update this directive: `connect-src 'self' https://api.shafadev.ir https://new-api-domain.com`

**Common CSP Blocking Issues:**

- API requests blocked: Add domain to `connect-src` directive
- Images from external sources blocked: Add to `img-src` directive
- External fonts blocked: Add to `font-src` directive
  Environment variables use the **Vite prefix** `VITE_` and are accessed via `import.meta.env`:
- Define in `.env`: `VITE_API_URL=https://api.shafadev.ir/api/`
- Access in code: `import.meta.env.VITE_API_URL`
- **Note:** This is a Vite-based Electron app, not Next.js, so use `VITE_` prefix instead of `NEXT_PUBLIC_`
  Routes are defined in `src/renderer/src/lib/routes/index.ts` and implemented in `src/renderer/src/router/index.tsx`

**Available Routes:**

- `/` - Home page
- `/settings` - Settings page
- `/center-doctors` - Center doctors listing

Hash-based routing is used for compatibility with Electron.

### Material-UI Theme

- RTL-aware theme configuration in `src/renderer/src/lib/materialUi/muiTheme/`
- RTL plugin setup in `src/renderer/src/lib/materialUi/muiRTL/`
- Supports light and dark modes via Redux state

### HTTP Client

Axios configuration in `src/renderer/src/lib/http/index.ts` for API communication.

---

## Electron Integration

### Main Process

**File:** `src/main/index.ts`

Responsibilities:

- Creates the browser window (900x670px)
- Loads the React application in development or production
- Handles IPC communication
- Manages window lifecycle

### Preload Script

**File:** `src/preload/index.ts`

Exposes secure APIs to the renderer process:

- `window.electronAPI.settings` - Settings management

### Settings IPC Handler

**File:** `src/main/ipc/settings.ts`

Handles:

- `getKioskSettings()` - Retrieve settings from store
- `setKioskSettings(settings)` - Save settings to store

### Electron Store

**File:** `src/main/store/index.ts`

Persists user settings to disk in a platform-appropriate location.

---

## Build & Development

### Development Server

```bash
npm run dev
```

Starts Electron with hot module reload (HMR)

### Type Checking

```bash
npm run typecheck          # Check both node and web
npm run typecheck:node     # Check main process
npm run typecheck:web      # Check renderer process
```

### Linting & Formatting

```bash
npm run lint               # Run ESLint
npm run format             # Format with Prettier
```

### Building

```bash
npm run build              # Full build with type checking
npm run build:win          # Windows executable
npm run build:mac          # macOS application
npm run build:linux        # Linux executable
npm run build:unpack       # Unpack directory build (for testing)
```

---

## RTL & Internationalization

The application has built-in support for RTL languages:

- **Stylis RTL Plugin** - Automatically mirrors CSS for RTL
- **Persian Calendar Support** - Via date-fns-jalali
- **Persian Text** - Used throughout the Settings page

The application is configured with:

- RTL-aware Material-UI theme
- Right-to-left text direction support
- Persian language strings in UI components

---

## Recent Development

Based on git history:

1. **Initial setup** - Created Electron + React + TypeScript boilerplate
2. **Store setup** - Implemented Electron Store for persistence
3. **TypeScript fixes** - Resolved compilation errors
4. **Refactoring** - Code structure improvements
5. **Center Doctors** - Initial feature setup

---

## API Integration

The application is designed to communicate with a backend API:

- **HTTP Client**: Axios with custom configuration
- **Query Management**: React Query for caching and synchronization
- **Data Types**: Typed interfaces for Center and Doctor entities

API endpoints would be configured in feature-specific service files (e.g., `src/renderer/src/features/centerDoctors/service/api/`)

---

## Performance Considerations

- **Code Splitting**: Vite handles automatic code splitting
- **Hot Module Reload**: Development mode supports HMR
- **Query Caching**: React Query caches API responses
- **Bundle Analysis**: Can be checked with Electron Builder

---

## Security

- **Sandbox**: Electron window sandbox is disabled for preload access (consider enabling for production)
- **Preload Script**: Controls renderer process access to Node APIs
- **IPC Validation**: Settings handlers should validate input
- **CORS**: API requests handled by axios with proper headers

---

## Future Development Areas

1. **Center Doctors Implementation** - Complete the center doctors page with doctor listing and details
2. **Doctor Details** - Create detailed doctor profile page
3. **Search & Filter** - Implement search and filtering for doctors
4. **Analytics** - Add usage tracking
5. **Testing** - Implement unit and E2E tests
6. **Offline Support** - Add service worker for offline functionality
7. **Accessibility** - Audit and improve a11y
8. **Performance** - Profile and optimize rendering
9. **Documentation** - Expand API documentation
10. **Route-level Error Boundaries** - Add specific error boundaries for different feature areas

---

## Contributing Guidelines

- Follow the existing code structure
- Use TypeScript for type safety
- Run `npm run lint` before committing
- Run `npm run typecheck` to verify types
- Test changes with `npm run dev`
- Update documentation when adding features
- **Import Components Directly**: Do not use barrel export pattern in `index.ts` files. Instead, import components directly from their source files
- **Use Material-UI Icons**: Always use Material-UI icons from `@mui/icons-material` instead of react-icons
- **Environment Variables**: Use `VITE_` prefix for all environment variables and access them via `import.meta.env` in the renderer process
- **CSP Updates**: When adding external API calls, update the CSP `connect-src` directive in `src/renderer/index.html` (not `process.env.NEXT_PUBLIC_`)

---

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Documentation](https://redux.js.org)
- [Material-UI Documentation](https://mui.com)
- [React Router Documentation](https://reactrouter.com)
- [React Query Documentation](https://tanstack.com/query)
- [TypeScript Documentation](https://www.typescriptlang.org)
