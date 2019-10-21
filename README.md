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

### How to change port

Just create `.env` file and define PORT variable. You can find example in `.env.dist` file.

### API calls

In `package.json` you can find `proxy` section. By default it sets to `http://localhost:8080`. It will redirect any calls with unknown routing to defined proxy server. For example:

```
fetch('/find?wellname=my-well')
```

This request will be proxied to `http://localhost:8080/find?wellname=my-well`.
