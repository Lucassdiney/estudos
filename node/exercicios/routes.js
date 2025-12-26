
/*Criando rotas com node.js*/
const http = require('http');

http.createServer((req, res)=> {
    if(req.method === 'GET' && req.url === '/hello'){
        res.end('Hello world');
    }

    else if (req.method === 'GET' && req.url === '/data'){
        res.end('23/12/25');
    }

    else{
        res.statusCode = 404;
        res.end('Rota não encontrada!');
    }
})

.listen(3000);