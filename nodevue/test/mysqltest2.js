const util = require('util');
const Promise = require("bluebird");

const Pool = require('../pool');

const sql1 = "SELECT COUNT(*) FROM user";

const sql2 = "SELECT COUNT(*) FROM user";

const pool = new Pool();

Promise.using(pool.connect(), conn => {
    conn.queryAsync(sql1, (err, ret) => {
        util.log("sql1 = ", ret);
        // util.log("sql1 = ", ret.affectedRows);
        
        // conn.queryAsync(sql2, (err2, ret2) => {
        //     util.log("sql2 = ", ret.affectedRows);
        // });
    });
    pool.end();
});