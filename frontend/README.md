# Fullstack Todo App - Frontend

This directory contains the frontend application for the Fullstack Todo app, built with Next.js, TypeScript, Tailwind CSS, and various React libraries for UI components.

## Features

- Modern UI built with Next.js and React
- Type-safe development with TypeScript
- Styling with Tailwind CSS
- Form handling with React Hook Form
- State management with Zustand
- UI components from Radix UI
- Shadcn UI is used for the UI components

## Prerequisites

- Node.js (v18 or later recommended)
- pnpm (v8 or later recommended)
- Backend server running (see backend/README.md)

## Setup and Installation

1. **Install pnpm** (if not already installed):

   ```bash
   # Using npm
   npm install -g pnpm

   # Using Homebrew (macOS)
   brew install pnpm

   # Using Scoop (Windows)
   scoop install pnpm

   # Using Curl
   curl -fsSL https://get.pnpm.io/install.sh | sh -
   ```

2. **Install Dependencies:**

   ```bash
   pnpm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env.local` file in the frontend directory:
   ```dotenv
   # API URL (adjust if your backend runs on a different port)
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

## Running the Application

- **Development Mode:**

  ```bash
  pnpm dev
  ```

  The application will start on `http://localhost:3000`

- **Production Build:**
  ```bash
  pnpm build
  pnpm start
  ```

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Create production build
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Project Structure

frontend/
├── src/
│ ├── app/ # Next.js app directory
│ ├── components/ # React components
│ ├── lib/ # Utility functions and shared code
│ ├── store/ # Zustand store definitions
│ └── types/ # TypeScript type definitions
├── public/ # Static files
└── tailwind.config.js

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Zod](https://zod.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Shadcn UI](https://ui.shadcn.com/)

## Development Notes

- The project uses the Next.js App Router
- Turbopack is enabled for faster development experience
- Shadcn UI is used for the UI components
- Tailwind CSS is configured with custom theme extensions
- Components use the Radix UI primitives for accessibility
- Form validation is handled through Zod schemas
