const http = require('http');
const routes = require('./routes');

// console.log(routes.tulisan)
const server = http.createServer(routes.handler);

server.listen(3000);