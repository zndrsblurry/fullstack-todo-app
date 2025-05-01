# Fullstack Todo App - Backend

This directory contains the backend server for the Fullstack Todo application, built with NestJS, TypeScript, PostgreSQL, and Prisma.

## Features

- RESTful API for managing Todos (CRUD operations).
- Database interaction via Prisma ORM.
- Input validation using `class-validator`.
- PostgreSQL database.
- CORS enabled for frontend communication.

## Prerequisites

- Node.js (v18 or later recommended)
- pnpm (v8 or later recommended)
- PostgreSQL database server (running locally, via Docker, or cloud service)
- Docker (Optional, if using the provided `docker-compose.yml`)

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

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/zndrsblurry/fullstack-todo-app.git
   cd fullstack-todo-app/backend
   ```

3. **Install Dependencies:**

   ```bash
   pnpm install
   ```

4. **Set Up Environment Variables:**

   - Copy the example environment file:
     ```bash
     cp .env.example .env
     ```
     _(Note: We need to create `.env.example` first. Let's do that next.)_
   - Edit the `.env` file with your PostgreSQL database connection string:

     ```dotenv
     # backend/.env
     DATABASE_URL="postgresql://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>?schema=public"
     # Example using docker-compose defaults:
     # DATABASE_URL="postgresql://user:password@localhost:5432/tododb?schema=public"

     # Optional: Specify the port the backend server runs on
     # PORT=3001
     ```

5. **Database Setup (if not already running):**

   - **Using Docker (Recommended):**
     From the `backend` directory, run:
     ```bash
     docker-compose up -d
     ```
   - **Manual Setup:** Ensure your PostgreSQL server is running and accessible with the credentials provided in `.env`.

6. **Apply Database Migrations:**
   Run Prisma migrations to set up the database schema:
   ```bash
   pnpm dlx prisma migrate dev
   ```

## Running the Application

- **Development Mode (with hot-reloading):**

  ```bash
  pnpm run start:dev
  ```

  The server will start, typically on `http://localhost:3001` (or the port specified in `.env`).

- **Production Mode:**
  ```bash
  pnpm run build
  pnpm run start:prod
  ```

## Linting and Formatting

- Format code: `pnpm run format`
- Lint code: `pnpm run lint`

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [Docker](https://www.docker.com/)
