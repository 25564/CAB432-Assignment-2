const app = require('../app');
const http = require('http');

const port = (parseInt(process.env.PORT, 10) || 3000);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  throw error;
}
