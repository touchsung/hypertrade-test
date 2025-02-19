# Backoffice POS System

A full-stack Point of Sale (POS) system with product and category management capabilities.

## Prerequisites

- Docker
- Docker Compose

## Project Structure

├── client/ # React frontend
|
├── server/ # FastAPI backend
|
└── docker-compose.yml

## Getting Started

1. Start the application:

```bash
docker-compose up -d
```

This will:

- Build and start the PostgreSQL database
- Initialize the database with sample data
- Start the FastAPI backend server
- Build and start the React frontend

2. Access the application:

- Frontend: http://localhost:80
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

3. Stop the application:

```bash
docker-compose down -v
```

## Development

The project uses volume mounts for both frontend and backend, enabling hot-reload during development. Any changes made to the source code will automatically reflect in the running application.

### API Endpoints

The backend provides RESTful APIs for:

- Product management (CRUD operations)
- Category management (CRUD operations)

For detailed API documentation, visit http://localhost:8000/docs after starting the application.

## Database

The PostgreSQL database is initialized with sample data including:

- Product categories (Electronics, Clothing, Books, etc.)
- Sample products in each category

Database credentials:

- Host: localhost
- Port: 5432
- Username: postgres
- Password: postgres
- Database: postgres

## Technologies Used

- Frontend:

  - React
  - TypeScript
  - Vite
  - TailwindCSS
  - React Query
  - HeadlessUI

- Backend:

  - FastAPI
  - SQLAlchemy
  - Pydantic
  - PostgreSQL

- Infrastructure:
  - Docker
  - Docker Compose
  - Nginx
