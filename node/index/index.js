const http = require('http');

http.createServer((req, res) => {

  // rota correta
  if (req.method === 'POST' && req.url === '/contato') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      // valida se veio body
      if (!body) {
        res.statusCode = 400;
        res.end('Body vazio');
        return;
      }

      let novoContato;

      // valida JSON
      try {
        novoContato = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.end('JSON inválido');
        return;
      }

      // valida nome
      if (
        typeof novoContato.nome !== 'string' ||
        novoContato.nome.trim().length < 3
      ) {
        res.statusCode = 400;
        res.end('Nome inválido');
        return;
      }

      // resposta final
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ok: true,
        contato: novoContato
      }));
    });

    return; // ESSENCIAL
  }

  // Resultado de qualquer outra rota
  res.statusCode = 404;
  res.end('Rota não encontrada');

}).listen(3000);

console.log('http://localhost:3000');

