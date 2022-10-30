# Forum Space Walk

A forum application built with NodeJS, Express, ReactJS and Postgresql.

### Features

1. Login Register System
2. Main Forum
3. SubForum
4. Thread
5. Comments system
6. JWT's

### Installation as a developer

Make sure you have these installed

1. Postgresql
2. Node JS
3. NPM
4. GIT

Clone the repository

```
git clone "https://github.com/faridafadilah/MiniProject-Reactjs-Nodejs.git"
```

Make sure you are in the directory of your application.
After this run these commands:

```
npm install --dev
cd client
npm install --dev
```

In your first terminal
```sh
npm start 
```
In the second 
```sh
npm run serv
```

```
npm test
```

### Deployment

Compile the server code and client code by running ```npm run build```.
This will generate a dist folder with the javascript server code and a build folder inside the client code with the built
client code. If you want to serve the static client files with Express, change the ```MODE``` env variable to 'PRODUCTION'.
Otherwise, you can simply serve them with a different service like NGINX. 

