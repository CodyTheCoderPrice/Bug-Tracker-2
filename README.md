# Bug-Tracker

## Download and run locally

1. Have Postgres installed on your local machine. You can download it from here: https://www.postgresql.org/download/

2. Access Postgres on your machine and run all commands in the schema.sql file (found in the server/database folder).

3. Change the Postgres user/password info in the db.js file (found in the server/database folder) to your own. I placed my postgres password in a .env file to keep it private from github.

4. In order to generating access and refresh jwTokens, create a .env file in the server folder with two variables called ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET. Give these variables randomly generated secrets.

5. Open a terminal and cd into the server folder. Run the command: npm run dev

6. Open another terminal and cd into the client folder. Run the command: npm run dev
