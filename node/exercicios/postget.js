const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

  // POST /contato
  if (req.method === 'POST' && req.url === '/contato') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      try {
        const novoContato = JSON.parse(body);

        const arquivo = fs.readFileSync('contatos.json', 'utf8');
        const contatos = JSON.parse(arquivo);

        contatos.push(novoContato);

        fs.writeFileSync(
          'contatos.json',
          JSON.stringify(contatos, null, 2)
        );

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.statusCode = 400;
        res.end('Erro ao salvar contato');
      }
    });

    return;
  }

  // GET /contatos
  if (req.method === 'GET' && req.url === '/contatos') {
    try {
      const arquivo = fs.readFileSync('contatos.json', 'utf8');
      const contatos = JSON.parse(arquivo);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(contatos));
    } catch {
      res.statusCode = 500;
      res.end('Erro ao ler contatos');
    }

    return;
  }

  // 404
  res.statusCode = 404;
  res.end('Rota não encontrada');

}).listen(3000);

console.log('http://localhost:3000');
