// npm i hashmap crypto-js open-graph-scraper --save
const ogs = require('open-graph-scraper'),
      HashMap = require('hashmap'),
      Crypto = require('crypto-js'),
      SHA256 = ('crypto-js/sha256');

const EKey = 'nodevue';

module.exports = {

    makeMap(key, value) {
        const map = new HashMap();
        map.set(key, value);
        console.log("TTT >> ", map.get(key));
        return map;
    },

    // 단방향 암호화 - 키를 줘서 매번 같은 것이 나오게 함
    encryptSha2(data, key) {
        if (!data) return null;
        key = key || EKey;

        try { // 에러나면 서버가 죽을 수 있으므로 트라이 캐치
            return Crypto.SHA256(data + key).toString();
        } catch (err) {
            console.error("Error on encryptSha2::", err);
        }
    },

    // 양방향 암호화
    encrypt(data, key) {
        return Crypto.AES.encrypt(data, key || EKey).toString();
    },

    decrypt(data, key) {
        return Crypto.AES.decrypt(data, key || EKey).toString(Crypto.enc.Utf8);
    },
    // 양방향 암호화

    osginfo(url, fn) {
        return ogs({url: url}, (err, ret) => {
            fn(err, ret);
        });
    }
};