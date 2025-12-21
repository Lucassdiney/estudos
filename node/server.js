const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello world 2');
});

server.listen(3000);
console.log('Olha no navegador!')