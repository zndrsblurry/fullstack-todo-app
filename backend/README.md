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
- npm (or pnpm/yarn)
- PostgreSQL database server (running locally, via Docker, or cloud service)
- Docker (Optional, if using the provided `docker-compose.yml`)

## Setup and Installation

1.  **Clone the Repository:**

    ```bash
    git clone https://github.com/<your-github-username>/<your-repo-name>.git
    cd fullstack-todo-app/backend
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # or: pnpm install / yarn install
    ```

3.  **Set Up Environment Variables:**

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

4.  **Database Setup (if not already running):**

    - **Using Docker (Recommended):**
      From the `backend` directory, run:
      ```bash
      docker-compose up -d
      ```
    - **Manual Setup:** Ensure your PostgreSQL server is running and accessible with the credentials provided in `.env`.

5.  **Apply Database Migrations:**
    Run Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev
    ```

## Running the Application

- **Development Mode (with hot-reloading):**

  ```bash
  npm run start:dev
  ```

  The server will start, typically on `http://localhost:3001` (or the port specified in `.env`).

- **Production Mode:**
  ```bash
  npm run build
  npm run start:prod
  ```

## API Endpoints

The following endpoints are available (base path: `/todos`):

- `GET /todos`: Get all todos.
- `POST /todos`: Create a new todo.
  - Body: `{ "title": "string", "description"?: "string" }`
- `GET /todos/:id`: Get a single todo by ID.
- `PATCH /todos/:id`: Update a todo by ID.
  - Body: `{ "title"?: "string", "description"?: "string", "completed"?: boolean }`
- `DELETE /todos/:id`: Delete a todo by ID.

## Linting and Formatting

- Format code: `npm run format`
- Lint code: `npm run lint`

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)
- [Docker](https://www.docker.com/)
