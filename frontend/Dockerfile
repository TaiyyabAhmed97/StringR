# Dockerfile for React client

# Build react client
FROM node:10.16-alpine

ENV DEBUG=*
WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]