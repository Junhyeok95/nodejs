const http = require('http');
const fs = require('fs');

const users = {};

http.createServer((req, res) => {
    if (req.method === 'GET'){ // get 요청의 3가지 대응 
        if (req.url === '/'){
            return fs.readFile('./restFront.html', (err, data) => {
                if (err){
                    throw err;
                }
                res.end(data);
            });
        } else if (req.url === '/about'){
            return fs.readFile('./about.html', (err, data) => {
                if (err){
                    throw err;
                }
                res.end(data);
            });
        } else if (req.url === '/users'){
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`, (err, data) => { // {} 시작 ... 저장 된 값이 있으면 그것을 ...
            if (err){
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
    } else if (req.method === 'POST'){
        if (req.url === '/users'){
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('POST 본문 : ', body);
                const {name} = JSON.parse(body);
                // body 는 data 로 넘어온 값
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        }
    } else if (req.method === 'PUT'){
        if (req.url.startsWith('/users/')){
            const key = req.url.split('/')[2]; // 키 값 추출
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT 본문 : ', body);
                users[key] = JSON.parse(body).name; // xhr.send(JSON.stringify({name:name})) 으로 인한 ...
                return res.end(JSON.stringify(users));
            });
        }
    } else if (req.method === 'DELETE'){
        if (req.url.startsWith('/users/')){
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }

    // 결국 위의 if 문을 통과하지 못하면 ... else !
    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
}).listen(8082, () => {
    console.log('8082번 포트에서 서버 대기중');
});