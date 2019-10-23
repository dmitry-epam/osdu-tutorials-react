# Stage 1 - the build process
FROM node:10.16.3-alpine as build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-progress
COPY . ./

CMD [ "npm", "run", "start"]