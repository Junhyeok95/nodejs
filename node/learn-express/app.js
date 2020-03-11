var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // 요청에 동봉된 쿠키를 해석해줌
var logger = require('morgan'); // 로그 모듈

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
app.use(cookieParser()); // 해석된 쿠키들을 req.cookies 객체에 들어감
// // + static 미들웨어는 요청에 부합하는 정적 파일을 발견한 경우 응답으로 해당 파일을 전송, 즉 최대한 위쪽에 배치하는 것이 좋음
// app.use(express.static(path.join(__dirname, 'public'))); // 내장 미들웨어, public 폴더를 :port/~ 로 접근이 가능, 정적 파일들을 알아서 제공

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
