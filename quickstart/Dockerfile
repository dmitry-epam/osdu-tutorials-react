# Stage 1 - the build process
FROM node:10.16.3-alpine as build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-progress
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.17.5-alpine
COPY --from=build-deps /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]