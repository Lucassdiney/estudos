require

const server = createServer((req, res) => {
    Response.end('Hello world');
});

server.listen(3000, () => {
    console.log('Server: http://localhost:3000')
})