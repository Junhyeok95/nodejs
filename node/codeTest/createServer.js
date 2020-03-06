const http = require('http');

const server = http.createServer((req, res) => {
    console.log('req - - - > res !');
    res.write('<h1>hello node ~!</h1>');
    res.end('<p>bye bye</p>');
});

server.listen(8080);

