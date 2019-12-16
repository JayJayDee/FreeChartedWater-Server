```text
______             _____ _                _           _ _    _       _            
|  ___|           /  __ \ |              | |         | | |  | |     | |           
| |_ _ __ ___  ___| /  \/ |__   __ _ _ __| |_ ___  __| | |  | | __ _| |_ ___ _ __ 
|  _| '__/ _ \/ _ \ |   | '_ \ / _` | '__| __/ _ \/ _` | |/\| |/ _` | __/ _ \ '__|
| | | | |  __/  __/ \__/\ | | | (_| | |  | ||  __/ (_| \  /\  / (_| | ||  __/ |   
\_| |_|  \___|\___|\____/_| |_|\__,_|_|   \__\___|\__,_|\/  \/ \__,_|\__\___|_|   
```

# FreeChartedWater-Server
I'm a big fan of the Koei's [Uncharted Waters](https://en.wikipedia.org/wiki/Uncharted_Waters) series. but as you know, recent series (UW5, UW6) are sucks!


so, I decided to make my own Uncharted Water game, so this is the reason why the name of project is 'FreeChartedWater'.

## Environments
- node.js 10.x
- MariaDB or MySQL
- Redis (Optional, but recommended, for scaling out the websocket)

## Applications
each applications in this repository can be run like followings: 
```bash
npm run util:pourer # initial data pourer util
npm run webserver # http API server
```
you can run each application with a development mode.
```bash
npm run dev:util:pourer 
npm run dev:webserver
```
applications are same as followings:
- util:pourer
- util:sync
- webserver
- websocket
- worker

### webserver
a GraphQL server for in-game logics.
#### command
```bash
npm run webserver
```
#### configurations
```bash
MYSQL_HOST= mysql host
MYSQL_PORT= mysql port
MYSQL_USER= mysql user
MYSQL_PASSWORD= password of user
MYSQL_DATABASE= database name
MYSQL_CONNECTION_LIMIT= number of connection limitation
WEBSERVER_PORT= webserver port
```

### websocket
websocket(socket.io) server for asynchronous events.
#### command
starts a Websocket(socket.io) server.
```bash
npm run websocket
```
#### configurations
```bash
MYSQL_HOST= mysql host
MYSQL_PORT= mysql port
MYSQL_USER= mysql user
MYSQL_PASSWORD= password of user
MYSQL_DATABASE= database name
MYSQL_CONNECTION_LIMIT= number of connection limitation
WEBSOCKET_PORT= websocket server port
WEBSOCKET_USE_REDIS= (nullable) using redis when set TRUE, default is FALSE
WEBSOCKET_REDIS_HOST= (nullable) redis host
WEBSOCKET_REDIS_PORT= (nullable) redis port
```

### worker
worker for periodical jobs. for example, changing the date in the game, changing inflation rate between cities.. will be executed in worker.
#### command
starts a Worker.
```bash
npm run worker
```
#### configurations
```bash
MYSQL_HOST= mysql host
MYSQL_PORT= mysql port
MYSQL_USER= mysql user
MYSQL_PASSWORD= password of user
MYSQL_DATABASE= database name
MYSQL_CONNECTION_LIMIT= number of connection limitation
WORKER_PERIOD= e.g) 60 -> worker will run every 60 seconds.
```

### util:sync
synchronizes schemas with given database configuration. it is useful when setting up a new database server.
#### command
```bash
npm run util:sync
```
#### configurations
```bash
MYSQL_HOST= mysql host
MYSQL_PORT= mysql port
MYSQL_USER= mysql user
MYSQL_PASSWORD= password of user
MYSQL_DATABASE= database name
MYSQL_CONNECTION_LIMIT= number of connection limitation
```

## How to test
TBD

## run with docker-compose
TBD