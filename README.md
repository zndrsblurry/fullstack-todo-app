# Fullstack Todo Application

A modern, full-stack todo application built to demonstrate full-stack development capabilities and adherence to industry best practices. This project showcases the implementation of a complete web application using modern technologies and architectural patterns.

## Project Overview

This project is structured as a monorepo containing both frontend and backend applications, demonstrating:

- Modern full-stack development practices
- Type-safe development with TypeScript
- Clean architecture and code organization
- REST API implementation
- Database integration
- Modern UI/UX design
- State management
- Form handling and validation

## Technology Stack

### Frontend

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand (State Management)
- React Hook Form
- Zod (Schema Validation)
- Radix UI (Accessible Components)

### Backend

- NestJS
- TypeScript
- PostgreSQL
- Prisma ORM
- Class Validator
- Docker (for development database)

## Project Structure
```
fullstack-todo-app/
├── frontend/ # Next.js frontend application
│ ├── src/
│ │ ├── app/ # Next.js app directory
│ │ ├── components/# React components
│ │ ├── lib/ # Utility functions
│ │ ├── store/ # Zustand store
│ │ └── types/ # TypeScript types
│ └── public/ # Static assets
│
├── backend/ # NestJS backend application
│ ├── src/
│ │ ├── todos/ # Todo module
│ │ ├── prisma/ # Prisma configuration
│ │ └── main.ts # Application entry point
│ └── prisma/ # Database schema and migrations
```
## Features

- ✨ Modern, responsive UI
- 🔒 Type-safe end-to-end development
- 📝 CRUD operations for todos
- 🎨 Theme support
- ⚡ Fast development experience with Turbopack
- 🔍 Input validation on both frontend and backend
- 🗃️ PostgreSQL database with Prisma ORM
- 🐳 Docker support for development database

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/zndrsblurry/fullstack-todo-app.git
   cd fullstack-todo-app
   ```

2. Install dependencies:

   ```bash
   # Install pnpm if you haven't already
   npm install -g pnpm

   # Install dependencies in both frontend and backend
   cd frontend && pnpm install
   cd ../backend && pnpm install
   ```

3. Set up the backend:

   - Copy `.env.example` to `.env` in the backend directory
   - Start the PostgreSQL database with Docker:
     ```bash
     cd backend
     docker-compose up -d
     ```
   - Run Prisma migrations:
     ```bash
     pnpm dlx prisma migrate dev
     ```

4. Start the development servers:

   ```bash
   # In backend directory
   pnpm run start:dev

   # In frontend directory (new terminal)
   pnpm dev
   ```

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## Development Notes

- The frontend uses Next.js App Router for modern React server components
- Backend follows NestJS modular architecture
- Database schema is managed through Prisma migrations
- API documentation is available at `/api-docs` when running the backend
- Frontend components use Shadcn UI for consistent design
- State management is handled through Zustand for simplicity and performance

## Contributing

This project is meant to demonstrate development capabilities but contributions are welcome:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project as a reference or starting point for your own work.
