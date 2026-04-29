FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY . .

ENV DEBUG=todo-backend:*

USER node

CMD ["npm", "start"]