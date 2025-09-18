# Family Travel Tracker

Family Travel Tracker is a web application that allows you to track the countries visited by different family members. Each user can be assigned a color, and visited countries are visualized on a world map.

## Features

- Add family members with custom names and colors.
- Track which countries each user has visited.
- Visualize visited countries on an interactive world map.
- Simple and clean UI.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS (Embedded JavaScript templates)
- Docker (for easy setup)
- CSV for country data

## Project Structure

- `app.js` - Main application logic and server.
- `db/schema.sql` - Database schema.
- `countries.csv` - List of countries and codes.
- `views/` - EJS templates for UI.
- `public/styles/` - CSS files.
- `docker-compose.yml` & `Dockerfile` - For containerized setup.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)
- [PostgreSQL](https://www.postgresql.org/) (if not using Docker)

## Setup & Build

### Using Docker (Recommended)

1. Clone the repository.
2. Run the following command to start the app and database:
   ```sh
   docker-compose up --build
   ```
3. The app will be available at [http://localhost:3030](http://localhost:3030).

### Manual Setup

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up PostgreSQL and create a database named `Travel`.
4. Set environment variables in `app.env` (see provided file for example).
5. Initialize the database schema:
   ```sh
   npm run init-db
   ```
6. Start the application:
   ```sh
   npm start
   ```
7. Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

To run tests:
```sh
npm test
```

## Usage

- Add a new family member by clicking "Add Family Member".
- Select a user tab to track their travels.
- Add visited countries using the form.

## License

Elbod@Abdelrahman-Hassan
