// npm i bruebird --save

const mysql = require('mysql');
const util = require('util');
const Promise = require("bluebird");


Promise.promisifyAll(mysql);
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

const DB_INFO = { // 디비 정보
    host    :   'localhost',
    user    :   'root',
    password:   'secret',
    database:   'testdb',
    multipleStatements: true,
    connectionLimit: 5, // 커넥트 제한 갯수
    waitForConnections: false // 커넥션을 기다리지 말고 새로 만들어라
};

// ex -> A, B, C 연결되면 클로즈 하지 않고 재사용 하게 할 수 있다.
// 커넥트 하는 비용 감소

module.exports = class { // 클래스는 json 이 아니므로 컴마도 없음
    constructor(dbinfo) { // new 했을 때 생성자
        dbinfo = dbinfo || DB_INFO;
        this.pool = mysql.createPool(dbinfo);
    }
    connect() {
        // 커넥션 다 쓰고 닫아야 할 때
        return this.pool.getConnectionAsync().disposer(conn => {
            // 릴리즈 쉬게 해준다. 클로즈가 아니다 !
            return conn.release();
        })
    }
    end() { // 풀은 메모리에 올라가 있는데 그걸 닫아준다
        this.pool.end( function(err) {
            util.log(">>> END of Pool !")
            if (err) util.log("ERR pool ending ...");
        });
    }
};