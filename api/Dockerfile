#  Dockerfile for Node Express Backend

FROM node:10.16-alpine

# Create App Directory
WORKDIR /usr/src/app/server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "start"]