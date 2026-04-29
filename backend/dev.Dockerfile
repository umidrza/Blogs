FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install

COPY . .

USER node

CMD ["npm", "run", "dev"]