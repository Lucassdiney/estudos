const http = require('http');

const server = http.createServer((req, res)=> {
    res.end('Lucas sidney');
});

server.listen(4000, () => {
    console.log('Server: http://localhost:3000')
})