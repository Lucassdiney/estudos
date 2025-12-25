
const http = require('http');

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/soma') {
        let body = '';

        req.on('data', chunk => body += chunk);

        req.on('end', () => {
            try {
                const data = JSON.parse(body);

                const a = Number(data.a);
                const b = Number(data.b);

                if (isNaN(a) || isNaN(b)) {
                    res.statusCode = 400;
                    res.end('Valores inválidos');
                    return;
                }

                const resultado = a + b;

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ resultado }));
            } catch {
                res.statusCode = 400;
                res.end('Json inválido!');
            }
        });
        return;
    }
    res.statusCode = 404;
    res.end('Rota não encontrada');
})
    .listen(3000);

console.log('Servidor ON!')