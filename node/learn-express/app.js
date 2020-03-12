var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 요청에 동봉된 쿠키를 해석해줌
var logger = require('morgan'); // 로그 모듈

// 세션 관리용 미들웨어, 로그인 등의 이유로 세션을 구현할 때 매우 유용함
var session = require('express-session'); // 1.5 이전에는 cookie-parser 뒤에 위치해야 했음, 혹시 모르니 뒤에 둠
// 일회성 메시지들을 웹 브라우저에 나타낼 때 사용
var flash = require('connect-flash'); // cookie-parser와 express-session를 사용하므로 여기 위치

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// app.set 이용해서 익스프레스 앱을 설정할 수 있음
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  console.log(req.url, '미들웨어');
  next(); // 반드시 미들웨어 안에서 next를 호출

  // next의 특수한 기능
  // next() 다음 미들웨어, next('route') 다음 라우터, next(error) 에러 핸들러
});

// 미들웨어를 연결하는 부분
// 로그 모듈 사용, dev 대신 short, common, combined 등을 줄 수 있음
app.use(logger('dev')); // -> http요청 주소 http상태코드 응답속도 - 응답바이트
app.use(express.static(path.join(__dirname, 'public'))); // 35,36으로 인한 위치 변경
// app.use(logger('short'));
// app.use(logger('common'));
// app.use(logger('combined'));
app.use(express.json()); // 4.16.0 부터 body-parser의 일부 기능이 익스프레스에 내장
app.use(express.urlencoded({ extended: false })); // false면 node의 querystring모듈을 사용하여 해석, true면 qs모듈을 사용하여 해석 qs는 npm패키지

// app.use(cookieParser()); // 해석된 쿠키들을 req.cookies 객체에 들어감
// // + static 미들웨어는 요청에 부합하는 정적 파일을 발견한 경우 응답으로 해당 파일을 전송, 즉 최대한 위쪽에 배치하는 것이 좋음
// app.use(express.static(path.join(__dirname, 'public'))); // 내장 미들웨어, public 폴더를 :port/~ 로 접근이 가능, 정적 파일들을 알아서 제공

// session 추가
app.use(cookieParser('secret code'));
app.use(session({
  resave: false, // 요청이 왔을 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false, // 저장할 내역이 없더라도 세션을 저장할지에 대한 설정 -> 방문자를 추적할 때 사용됨
  secret: 'secret code', // 비밀키와 같은 역할
  cookie: { // maxAge, domain, path, expires, sameSite, httpOnly, secure 등 일반적인 쿠키 옵션이 모두 제공됨
    httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 함
    secure: false, // https가 아닌 환경에서도 사용할수 있게 함
    // store라는 옵션은 메모리에 세션을 저장하도록 되어 있음, 레디스의 사용 방법 -> 15.1.8
  },
}));

// flash 추가
app.use(flash());

// session 과 flash 의 아래에 위치시켜야함
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Router -> app.~~~ ( use는 모든 요청, get은 get 요청, post는 post 요청의 경우에 실행 됨 )
// 응답의 경우 send, sendFile, json, redirect, render를 주로 사용함

// 템플릿 엔진 사용하기
// res.render('index') 의 경우 views/index.pug를 렌더링
// res.render('admin/main') 의 경우 views/admin/main.pug를 렌더링

// 일치하는 주소가 없다면 여기로 옴, next가 핸들러로 보냄
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// next(error)을 핸들링 하는 부분
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 객체를 모듈로 만듬 -> bin/www 에서 사용된 app 모듈
module.exports = app;
