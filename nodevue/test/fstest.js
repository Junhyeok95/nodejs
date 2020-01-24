const fs = require('fs');
const util = require('util'); // 시간이 찍힘

fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
    if (err) return console.error(err);
    console.log("data >> ", data);
    // util.log("data >> ", data);
});

console.log("----------------");

let data2 = fs.readFileSync(__dirname + '/test.json', 'utf-8'); // 싱크를 남발하면 node의 장점이 사라진다
console.log("data2 >> ", data2);

console.log("================\n");


const msgfile = __dirname + '/message.txt';
fs.writeFileSync(msgfile, '>>> hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

let data3 = fs.readFileSync(msgfile, 'utf-8');
util.log("data3", data3);

