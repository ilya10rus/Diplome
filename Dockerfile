FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Frontend_diplom
RUN npm i 
RUN npm run build

WORKDIR /usr/src/app/Backend_diplom
RUN npm i 

EXPOSE 3001

CMD ["node", "app.js"]