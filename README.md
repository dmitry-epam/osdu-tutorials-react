# osdu-tutorials-react

OSDU frontend tutorials in React

## How to run

Go to 'quickstart' folder and execute the following commands. Install dependencies with 'npm ci' and run application with 'npm start' command.

```
npm ci
```

```
npm run
```

### How to change backend host and port

Create `.env` file and define the following variables:
```
SERVER_HOST=backend
SERVER_PORT=8080
```
Note: when using docker-compose to define and run both UI and backend, the value of SERVER_HOST must be the same as the name of service for your backend:
```
services:
  backend:
    ...
  ui:
    ...
    depends_on:
      - backend
```