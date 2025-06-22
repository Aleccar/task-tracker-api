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

## Authentication and Authorization
This app uses JWT-based (*token based*) authentication to secure protected routes.

### Registering and Logging in:
**POST /register**
This will create a new user account.
Passwords are hashed using bcrypt in order to secure the passwords before they are stored in the database.

**POST /login**
This verifies the users credentials.
If successful in the verification the API will send a **JWT token** back to the user, allowing them to stay logged in for an hour before needing a new token.

### Protected routes
All protected routes have a validation middleware ran to check the precence and validity of a **JWT-token**.
If one exists and is valid, the user will be able to see and modify all of their own tasks. Importantly this makes it so that a user cannot modify other users tasks.

- Clients must include an 'Authorization' header.
Authization: Bearer <insert_token_here>

- API validates the bearer token using 'jsonwebtoken' and then attaches this information to req.body.

- Example protected route:
** GET /me** - returns the authenticated users information.

### Auth flow summary

1. **User registers** using an email and a password. The password gets encrypted using bcrypt and saved to the database.
2. **User logs in** and a token is returned to the user.
3. **Client stores the token** (*for example using localStorage*).
4. **The client sends the token** with each new request.
5. **Middleware verifies the token** and gives access to protected data (*for instance the users information or their own tasks*).

## Tech Stack
Node.js + Express
Supabase (PostgreSQL)
@supabase/supabase-js client

## Personal Notes
Part of the learning process with this project was structuring the directories to have a modular architecture. 

The reasoning behind doing it this way is that it leads to both a good separation of concerns, and also helps with scalability. I can now reuse a lot of my previously
written code in other routes in the future if needed. It also helps with debugging as one can easily find where the problem occurs without having to scroll through one 
file trying to find the specific bit of code that is causing an issue.