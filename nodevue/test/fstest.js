const fs = require('fs');

fs.readFile(__dirname + '/test.json', 'utf-8', (err, data) => {
    if (err) return console.error(err);
    console.log("data >> ", data);
});

console.log("----------------");

let data2 = fs.readFileSync(__dirname + '/test.json', 'utf-8');
console.log("data2 >> ", data2);

console.log("================");
