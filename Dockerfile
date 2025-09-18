FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install && npm install --save-dev jest supertest cross-env

COPY . .

EXPOSE 3000

CMD ["npm", "start"]