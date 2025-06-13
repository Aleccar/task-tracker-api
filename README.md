# task-tracker-api

**A task tracker API**
A simple task tracking API built with Node.js, Express, and Supabase as the backend database.

## Setup

### Clone repository
```bash
git clone https://github.com/aleccar/task-tracker-api.git
cd task-tracker-api
```

### Install dependencies
npm install

### Create a .env File
create a .env file in the root directory with the following:
```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
PORT=3000
```
### Run the server
```
npm run dev
```

## Tech Stack
Node.js + Express
Supabase (PostgreSQL)
@supabase/supabase-js client

## Personal Notes
Part of the learning process with this project was structuring the directories to have a modular architecture. 

The reasoning behind doing it this way is that it leads to both a good separation of concerns, and also helps with scalability. I can now reuse a lot of my previously
written code in other routes in the future if needed. It also helps with debugging as one can easily find where the problem occurs without having to scroll through one 
file trying to find the specific bit of code that is causing an issue.