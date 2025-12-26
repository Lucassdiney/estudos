const http = require('http')

http.createServer((req, res) => {
    //console.log(req.method, req.url);

    if (req.method === 'POST' && req.url === '/login') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: true, data }));
            } catch {
                res.statusCode = 400;
                res.end('JSON inválido!')
            }
        });
        return;
    }
    res.statusCode = 404;
    res.end('Rota não encontrada!');
})

.listen(3000);

console.log('http://localhost:3000');