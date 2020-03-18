const local = require('./localStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id); // 에러 발생인자와, 유저의 아이디만 저장하는 인자
    });

    // passport.session() 미들웨어가 이 메서드를 호출
    passport.deserializeUser((id, done) => { // 매 요청 시 실행됨
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, {
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }],
        }) // 데이터 베이스를 조회
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local(passport);
};

/*
    // 요약
    로그인 요청
    passport.authenticate 메서드 호출
    로그인 전략 수행
    로그인 성공시 사용자 정보 객체와 함께 req.login 호출
    req.login 메서드가 passport.serializeUser 호출
    req.session 에 done 이 아이디만 저장
    로그인 환료

    모든 요청에 passport.session() 미들웨어가 passport.deserializeUser 메서드 호출
    req.session에 저장된 아이디로 데이터베이스에서 사용자 조회
    조회된 사용자 정보를 req.user에 저장
    routes가 req.user 객체 사용 가능
*/