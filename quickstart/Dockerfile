# docker build --no-cache -t osdu-quickstart-react_ui .
# docker run -p 3000:3000 osdu-quickstart-react_ui

FROM node:10.16.3

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --no-progress

COPY . ./

EXPOSE 3000

CMD [ "npm", "run", "start"]