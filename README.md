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
starts a GraphQL server.
```bash
npm run webserver
```

### websocket
starts a Websocket(socket.io) server.
```bash
npm run websocket
```

### worker
starts a Worker.
```bash
npm run worker
```

### util:sync
synchronizes schemas with given database configuration. it is useful when setting up a new database server.
```bash
npm run util:sync
```

## How to configure application
TBD

## How to test
TBD

## run with docker-compose
TBD