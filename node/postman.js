const http = require('http');

http.createServer((req, res) => {

  if (req.method === 'POST' && req.url === '/contato') {
    let body = '';

    req.on('data', chunk => body += chunk);

    /*Ler o body completo e transformar em json*/
    req.on('end', () => {
      try {
        /*transformando string em objeto js*/
        const data = JSON.parse(body);

        /*Retorna status e o retorno é json*/
        res.writeHead(200, { 'Content-Type': 'application/json' });
        /*Transforma objeto em texto sem fazer o postman travar*/
        res.end(JSON.stringify({ ok: true, data }));
      } catch {
        res.statusCode = 400;
        res.end('JSON inválido');
      }
    });

    return; // 🔴 IMPORTANTE
  }

  // 🔽 resposta para qualquer outra rota
  res.statusCode = 404;
  res.end('Rota não encontrada');

}).listen(3000);

console.log('http://localhost:3000');
