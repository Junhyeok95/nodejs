const util = require('util');
const Promise = require("bluebird");

const Pool = require('../pool');

const sql1 = "SELECT COUNT(*) FROM user";

const sql2 = "SELECT COUNT(*) FROM user";

const pool = new Pool();

Promise.using(pool.connect(), conn => {
    Promise.all([
        conn.queryAsync(sql1),
        conn.queryAsync(sql2)
    ]).then(result => {
        console.log("End Then !");
        util.log("sql1 =", result[0]);
        util.log("sql2 =", result[1]);
        pool.end();
    }).catch(err => {
        util.log("err >>> ", err);
        pool.end();
    });
});


// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1)
//         .then(console.log)
//          .then(pool.end())
//         .catch(err => {
//             util.log("err >>> ", err);
//         });

//     // pool.end();
// });


// Promise.using(pool.connect(), conn => {
//     conn.queryAsync(sql1, (err, ret) => {
//         util.log("sql1 = ", ret);
//         // util.log("sql1 = ", ret.affectedRows);
        
//         // conn.queryAsync(sql2, (err2, ret2) => {
//         //     util.log("sql2 = ", ret.affectedRows);
//         // });
//     });
//     pool.end();
// });