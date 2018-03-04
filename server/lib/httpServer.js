const http = require('http');
const config = require('s-conf').requireOptions('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(config.require('port'), config.get('ip', '0.0.0.0'), () => {
    const address = server.address();
    console.log('Server listening on %s:%d', address.address, address.port);
});
