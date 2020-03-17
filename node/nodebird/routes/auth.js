const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

// 회원가입 라우터
router.post('/join', isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            req.flash('joinError', '이미 가입된 이메일입니다.'); // 기존에 있는 이메일의 경우
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12); // 비밀번호를 알아내기 어려워진다 12~31 사용가능
        await User.create({ // 어싱크 어웨이
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

// 로그인 라우터
router.post('/login', isNotLoggedIn, (req, res, next) => {

    // 미들웨어가 로그인 전략을 수행함 미들웨어이지만 사용자 정의 기능을 추가하고 싶을 때 이렇게 구현
    // 성공하거나 실패하면 autheniticate 콜백함수가 실행됨, 첫 번째 인자 -> 실패 / 두 번째 -> 성공
    passport.authenticate('local', (authError, user, info) => { 
        // 두번째 user 인자가 있을 경우 -> req.login 호출
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash('loginError', info.message);
            return res.redirect('/');
        }
        // passport 는 req 객체에 login, logout 메서드를 추가함
        // req.login 은 passport.serializeUser를 호출함
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다. 필수

});

// 로그아웃 라우터
router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;