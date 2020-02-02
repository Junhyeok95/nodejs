const express = require('express');
const app = express(),
      util = require('util'),
      testJson = require('./test/test.json');

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', (req, res) => {
    // res.send("Hello NodeJS");
    res.render('index', {name:'장준혁'});
});

app.get('/test/:email', (req, res) => {
    testJson.email = req.params.email; // req.body, req.query
    testJson.urlQuery = req.query.urlQuery;
    res.json(testJson);
});

const server = app.listen(5000, function(){
    console.log("Express's started on port 5000");
});

const io = require('Socket.io').listen(server, {
    log: false,
    origins: '*:*', // url 달라도 가능 
    pingInterval: 3000, // 재접속
    pingTimeout: 5000 // 연결 확인
});

app.get('/chat', function(req, res) {
    res.redirect('/chat.html');
});

// 채팅 구현
io.sockets.on('connection', (socket, opt) => {
    // 접속을 하면 접속한 유저의 아이디를 알려준다
    socket.emit('message', {msg: 'Welcome ' + socket.id}); // 소켓 아이디는 유일 키

    // 여기서 쿼리란 ?aaa=123 이런식
    // EIO 는 상태값 t 는 토큰
    util.log("connection >>", socket.id, socket.handshake.query);

    /*
    아이디를 받고 싶을 경우에 추가한다
    // socket.on('join', function(roomId, userid, fn) {
    // socket.userid = userid;
    */

    socket.on('join', function(roomId, fn) {
        socket.join(roomId, function(){ // 이해를 돕기위한 ...

            // 조인을 하고 성공하면 룸 나가기를 요청하므로 현재 방 -> 나간방,들어간방 -> 나간방,들어간방 ... 이 맞다
            util.log("join >>", roomId, Object.keys(socket.rooms));
            if(fn) // 클라이언트에 콜백을 해주기 위함
                fn();
        });
    });

    // fn 은 클라이언트가 주는 펑션
    // 서버와 클라이언트 간의 RPC가 된다 .. 즉 원격제어가 가능하다
    socket.on('leave', function(roomId, fn){
        socket.leave(roomId, function() {
            if(fn) // 잘 나왔을 때
                fn();
        });
    });

    socket.on('rooms', function(fn){
        if(fn) // 클라에서 요청 했을 경우
            fn(Object.keys(socket.rooms));
    });

    /*
        room 의 message 종류 !!
        1. socket.broadcast.emit(...) // 채팅 서버에 접속 한 모든이, ! 나 제외 (all room, not me)
        2. socket.broadcast.to('roomid').emit(...) // roomid 접속 모든 유저, ! 나 제외 (joinedRoom, not me)
        3. io.io('roomid').emit(...) // roomid 접속 모든 유저, 나 포함 (joinedRoom all!!)
    */

    // room 데이터 구조 -> data: {room: 'roomid', msg: 'msg 내용 ...'}
    // roomId 데이터 구조 -> {roomId : [socket1, socket2]} 룸 안에는 소켓 아이디가 있다
    socket.on('message', (data, fn) => {
        // 클라이언트에서 send를 이용해서 emit message 하면 여기로 온다
        // data.msg 는 msg 값
        util.log("message >>", data.msg, Object.keys(socket.rooms)); // 룸을 이용해서 방에 있는 사람한테 보낼 수 있다

        socket.broadcast.to(data.room).emit('message', {room: data.room, msg: data.msg});

        // !!!! 이걸 통해서 클라이언트한테 메시지를 보낸다
        if (fn)
            fn(data.msg);
            
        // 귓속말 상대한테 보내면 상대의 방이 만들어짐으로 거기로 보낸다
    });

    // 귓속말 추가
    socket.on('message-for-one', (socketid, msg, fn) => {
        socket.to(socketid).emit('message', {msg: msg});
    });

    // 룸이라는게 없으면 끊어줘야 하지만 안해두 됨
    // room 이 없으면 map 등을 이용하여 구현 해줘야 함
    socket.on('disconnecting', function(roomId, fn){
        util.log("disconnecting >>", socket.id , Object.keys(socket.rooms));
    });

    socket.on('disconnect', function(roomId, fn){
        util.log("disconnect >>", socket.id , Object.keys(socket.rooms));
    });
        
    
});