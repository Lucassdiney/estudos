/*O http serve pra criar servidor e fs serve pra ler e escrever arquivos!*/
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {

    /*verifica a rota e metodo*/
  if (req.method === 'POST' && req.url === '/contato') {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {
      try {
        /*Converte JSON*/
        const novoContato = JSON.parse(body);

        /*Lê o "banco de dados"*/

        const arquivo = fs.readFileSync('contatos.json', 'utf8');
        const contatos = JSON.parse(arquivo);

        /*Aqui ele adiciona novo dado/contato! */
        contatos.push(novoContato);

        /*Salva de volta no arquivo*/
        fs.writeFileSync(
          'contatos.json',
          JSON.stringify(contatos, null, 2)
        );

        /*responde com (ok:true) caso esteja TUDO CERTO!*/
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));

      } catch {
        res.statusCode = 400;
        res.end('Erro ao salvar contato');
      }
    });

    return;
  }

  res.statusCode = 404;
  res.end('Rota não encontrada');

}).listen(3000);

console.log('http://localhost:3000');
