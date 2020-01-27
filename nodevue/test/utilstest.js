const util = require('util');
const utils = require('../utils');


let map = utils.makeMap('name', 'jang');
util.log("map >>> ", map.get('name'));

return;

let str = "NodeJS";

let enc = utils.encrypt(str);
util.log("enc = ", enc);

let dec = utils.decrypt(enc);
util.log("enc = ", dec);

let shaEnc = utils.encryptSha2(str);
util.log("shaEnc = ", shaEnc);

// util.log("enc = ", utils.encrypt(str, "aaa"));

return;

let url = "https://naver.com";
// let url2 = "https://google.com";

utils.osginfo(url, (err, ret) => {
    util.log(err, ret);
});

// utils.osginfo(url2, (err, ret) => {
//     util.log(err, ret);
// });
