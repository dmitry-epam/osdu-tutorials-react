# docker build --no-cache -t osdu-quickstart-react_ui .
# docker run -p 3000:3000 osdu-quickstart-react_ui

# Stage 1 - the build process
FROM node:10.16.3-alpine
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --no-progress

COPY . ./
RUN npm run build

EXPOSE 3000
CMD npm run serve
