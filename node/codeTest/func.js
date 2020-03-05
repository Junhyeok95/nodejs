var { odd, even } = require('./var');

function checkOddOrEven(num) {
    if (num % 2) {
        return odd;
    }
    return even;
}

console.log(odd);
console.log(even);

module.exports = checkOddOrEven;