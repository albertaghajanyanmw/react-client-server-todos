### 1. PROJECT DESCRIPTION
------------------------------
#### Todo app
```
TODO
```
### 2. Install and run guide for development mode.
------------------------------
#### Install all requirements in both parts (client, server)
#### server
```
cd server
npm ci
```
#### client
```
cd client
npm ci
```
------------------------------
------------------------------
#### Runs the app in the development mode.
```
Make sure you are added correct variables in .env files (client/.env, server/.env)
```
#### server
```
cd server
npm run debug
```
#### client
```
cd client
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
------------------------------
### 3. Runs the app via docker.
#### install docker and docker-compose
```
DOCKER         - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-ru

DOCKER COMPOSE - https://docs.docker.com/compose/install/

```
```
bash run-docker-containers-local.sh
```
Open [http://localhost:80](http://localhost:80) to view it in the browser.
