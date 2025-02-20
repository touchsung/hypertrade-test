# Project Setup Instructions

## Prerequisites

- Node.js (v20 or later)

- Yarn package manager

- Docker (optional, for containerized deployment)

## Installation

1. **Install dependencies**

```bash
yarn install
```

2. **Environment Setup**

Create a `.env` file in the root directory with the following content:

```
VITE_API_URL=<your-api-url>
```

3. **Start Development Server**

```bash
yarn dev
```

This will start the development server, typically at `http://localhost:5173`

## Building for Production

1. **Create Production Build**

```bash
yarn build
```

This will create optimized production files in the `dist` directory.

2. **Preview Production Build**

```bash
yarn preview
```

## Docker Deployment

1. **Build Docker Image**

```bash
docker build -t your-app-name .
```

2. **Run Docker Container**

```bash
docker run -p 80:80 your-app-name
```

The application will be available at `http://localhost`

## Available Scripts

```json
  "scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest"
  }
```

- `yarn dev`: Start development server

- `yarn build`: Create production build

- `yarn lint`: Run ESLint

- `yarn preview`: Preview produ
- `yarn test`: Run tests with Vitestction build

## Project Structure

- `/src`: Source code

  - `/components`: React components

  - `/service`: API services

  - `/types`: TypeScript type definitions

- `/public`: Static assets

- `/dist`: Production build output (generated)

## Notes

- The project uses Tailwind CSS for styling

- React Query is used for server state management

- TypeScript is configured for type safety

- ESLint is set up for code linting

- Vitest is configured for testing
