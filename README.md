# RentzQuip Frontend

RentzQuip is an equipment-rental marketplace. Customers can browse and rent equipment, while providers can list their equipment and manage rental requests. The app also includes dashboards for customers, providers, and administrators.

This repository contains the frontend application built with Next.js, React, TypeScript, Tailwind CSS, and TanStack Query. It talks to the RentzQuip backend through a configured API client.

## What the app does

RentzQuip brings the main rental steps into one place:

- Browse equipment by category
- Search, sort, and paginate equipment listings
- View equipment details, pricing, availability, and security deposits
- Submit rental requests for selected dates and quantities
- Complete rental payments through the payment flow
- Track customer rental history and upcoming bookings
- Add and manage equipment as a provider
- Review and update provider rental requests
- Manage users and providers as an administrator
- Sign in with email/password or Google OAuth
- Protect dashboard routes based on the user role

## User roles

The application supports the following roles:

- **Customer**: Browse equipment, create rental requests, make payments, and track rentals.
- **Provider**: Add equipment, manage listings, and review rental requests.
- **Administrator**: Manage users, review providers, and monitor marketplace activity.
- **Moderator**: Supported by the shared role model and authentication flow.

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query for server state and caching
- TanStack Form and Zod for form handling and validation
- Lucide React for icons
- Google OAuth
- Biome for formatting and linting
- Bun as the package manager

## Requirements

Before running the project, make sure you have:

- Node.js 20 or newer
- Bun 1.4 or newer
- A running RentzQuip backend API
- A Google OAuth client ID if Google sign-in is enabled

You can use npm instead of Bun if that is what you already use. The project includes npm-compatible scripts.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/rupongomez/rentzquip-frontend.git
cd rentzquip-frontend
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

Using npm:

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root. Do not commit this file or put real passwords and secrets in the repository.

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

The demo login buttons also use these optional variables:

```env
NEXT_PUBLIC_TEST_ADMIN_EMAIL=
NEXT_PUBLIC_TEST_ADMIN_PASSWORD=
NEXT_PUBLIC_TEST_ADMIN_NAME=

NEXT_PUBLIC_TEST_MOD_EMAIL=
NEXT_PUBLIC_TEST_MOD_PASSWORD=
NEXT_PUBLIC_TEST_MOD_NAME=

NEXT_PUBLIC_TEST_PROVIDER_EMAIL=
NEXT_PUBLIC_TEST_PROVIDER_PASSWORD=
NEXT_PUBLIC_TEST_PROVIDER_NAME=

NEXT_PUBLIC_TEST_USER_EMAIL=
NEXT_PUBLIC_TEST_USER_PASSWORD=
NEXT_PUBLIC_TEST_USER_NAME=
```

For production, set `NEXT_PUBLIC_API_BASE_URL` to the deployed backend API. The backend must allow the frontend origin through CORS and must support credentials if authentication uses cookies.

### 4. Start the development server

Using Bun:

```bash
bun dev
```

Using npm:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command          | What it does                                  |
| ---------------- | --------------------------------------------- |
| `bun dev`        | Starts the development server.                |
| `bun run build`  | Creates the production build.                 |
| `bun start`      | Runs the production build locally.            |
| `bun run lint`   | Checks the project with Biome.                |
| `bun run format` | Formats project files with Biome.             |
| `npm run dev`    | Starts the development server with npm.       |
| `npm run build`  | Creates the production build with npm.        |
| `npm start`      | Runs the production build with npm.           |
| `npm run lint`   | Checks the project with Biome through npm.    |
| `npm run format` | Formats project files with Biome through npm. |

Before opening a pull request, run:

```bash
bun run lint
bun run build
```

## Main routes

### Public routes

- `/` - Marketplace landing page
- `/about-us` - About RentzQuip
- `/contact-us` - Contact and support page
- `/equipments` - Equipment marketplace
- `/equipments/[id]` - Equipment details
- `/login` - Login
- `/register` - Registration
- `/register/verify-account` - Account verification

### Customer routes

- `/user` - Customer dashboard
- `/user/manage-rental` - Customer rental management
- `/user/payment` - Payment result and payment flow
- `/user/profile` - Customer profile
- `/user/become-provider` - Provider application

### Provider routes

- `/provider` - Provider dashboard
- `/provider/add-equipment` - Add equipment
- `/provider/manage-equipment` - Manage equipment listings
- `/provider/manage-rental` - Manage rental requests
- `/provider/profile` - Provider profile

### Administrator routes

- `/admin` - Administrator dashboard
- `/admin/manage-users` - Manage users
- `/admin/manage-provider` - Manage provider applications
- `/admin/profile` - Administrator profile

## Project structure

```text
src/
├── api/                 API functions and backend requests
├── app/                 Next.js routes, layouts, and error boundaries
├── components/          Reusable UI and feature components
├── hooks/               React Query and shared application hooks
├── lib/                 Shared utilities and API client setup
├── providers/           Context and query providers
├── types/               Shared TypeScript types
└── validation/          Form validation schemas
```

The application uses Next.js route groups to keep public, authentication, and dashboard routes organized without adding the group names to the URL.

## Authentication and API notes

Authentication is handled through the backend authentication API. The frontend uses the authenticated session when requesting the current user, rental data, equipment data, and dashboard data.

For local and production authentication to work properly:

1. The frontend API base URL must be correct.
2. The backend must allow requests from the frontend origin.
3. Credentialed requests must be enabled on both sides when cookies are used.
4. Production cookie settings must match the frontend/backend deployment setup.
5. The frontend and backend must use the same expected API response shape.

Never put private backend secrets in a variable beginning with `NEXT_PUBLIC_`. Next.js exposes `NEXT_PUBLIC_` variables to the browser.

## Static export and equipment pages

The equipment detail route uses `generateStaticParams()` when the app is built for static export. The build fetches equipment records from the backend and generates a page for each equipment ID available at build time.

That means newly created equipment may require a fresh deployment before its static detail page is available. Make sure the backend API is reachable during the production build.

## Deployment

The project can be deployed to Vercel or another platform that supports Next.js.

For a production deployment:

1. Add the production `NEXT_PUBLIC_API_BASE_URL`.
2. Add the Google OAuth client ID if Google sign-in is enabled.
3. Add only the demo variables you actually need.
4. Configure the backend CORS origin to match the deployed frontend URL.
5. Confirm that credentialed authentication cookies work in production.
6. Run a clean production build.

```bash
npm run build
npm start
```

If the project uses static export in `next.config.ts`, remember that dynamic data is fetched during the build. Rebuild and redeploy after adding equipment that should have a generated detail page.

## Contributing

Keep changes focused and easy to review:

1. Create a feature branch.
2. Keep related changes together.
3. Follow the existing component and route patterns.
4. Do not commit `.env.local`, credentials, or generated build files.
5. Run the formatter, linter, and production build before opening a pull request.

## Support

For questions about the project or a rental, email [rupongomez@gmail.com](mailto:rupongomez@gmail.com).
