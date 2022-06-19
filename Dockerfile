FROM node:12
RUN apt-get update && apt-get install -y openjdk-8-jdk
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json .
RUN npm install --quiet
RUN npm install nodemon -g --quiet
COPY . .
EXPOSE 8000
CMD nodemon -L --watch . app.js
