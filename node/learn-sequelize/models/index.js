// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

// ========== 수정 ==========

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 추가, 모델 생성 후 불러준다
db.User = require('./user')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});
db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id'});

module.exports = db;

// 쿼리 소개

// SELECT * FROM nodejs.users == User.findAll({});
// SELECT * FROM nodejs.users LIMIT 1 == User.findOne({});

// SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
// const { User, Sequelize: { Op } } = require('../models'); // -> Op 객체를 불러와서 WHERE 에서 사용한다
// User.findAll({
//     attributes: ['name', 'age'],
//     where: {
//         married: 1,
//         age: { [Op.gt]: 30 }, // -> 시퀄라이즈는 자바스크립트 객체를 사용해서 쿼리를 생성해야 하므로 특수한 연산자들이 사용됨
//         // Op.gt == 초과 / Op.gte == 이상 / Op.lt == 미만 / Op.lte == 이하 / Op.ne == 같지 않음
//         // Op.or == 또는 / Op.in == 배열 요소 중 하나 / Op.notIn == 배열 요소와 모두 다름
//     },
//     order: [['age', 'DESC']], // 배열 안에 배열이 있다는 점을 주의, 컬럼을 2개 이상으로 정렬 할 수 있기때문

//     // 범위 옵션
//     limit: 3, // 3개 까지만
//     offset: 5, // 5개 건너뛰고 6번째 부터
//     // 즉 6, 7, 8 조회

//     // 페이지를 조절할 경우 limits 를 정해두고 offset 을 n, (n + limit), (n + limit + limit) 등으로 설정
// });

// 쿼리 소개
