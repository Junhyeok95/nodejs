const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

fs.readdir('uploads', (error) => {
  if (error) {
      // uploads 폴더가 없을 때 폴더를 생성함
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
  }
});

const upload = multer({
    // multer 모듈에 옵션을 주어 업로드를 생성함
    // storage 속성과 limits 속성을 줌 storage 는 파일 저장 방식과 경로, 파일명 등을 설정할 수 있음
  storage: multer.diskStorage({
      // 이미지가 서버의 디스크에 저장된다
    destination(req, file, cb) {
        // destination 메서드로 저장 경로를 프로젝트 폴더 아래 uploads로 지정
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        // 파일 명을 기존 이름에 업로드 날짜값과 기존확장자를 붙이도록 설정함, 중복방지
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 한계 5MB로 설정
});

// multer은 미들웨어를 만드는 여러 가지 메서드를 가지고 있음
// single은 하나의 이미지를 업로드 할 때 사용하고 req.file 객체를 생성
// array와 fields는 여러 개의 이미지를 업로드할 때 사용함 req.flies 객체를 생성
// array와 fieles의 차이점은 이미지를 업로드한 body 속성 개수
// 속성 하나에 이미지를 여러 개 업로드 -> array
// 여러 개의 속성에 이미지를 하나씩 업로드 했다면 fields
// none운 이미지를 올리지 않고 데이터만 multipart 형식으로 전송
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
  // 나머지 정보는 req.body로 보낸다
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
      // 디비에 저장됨
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    // 해시태그를 정규표현식으로 추출함
    const hashtags = req.body.content.match(/#[^\s#]*/g);
    if (hashtags) {
      const result = await Promise.all(hashtags.map(tag => Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() },
      })));
      // 메서드로 게시글과 해시태그의 관계를 PostHashtag 테이블에 넣음
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }
    return res.render('main', {
      title: `${query} | NodeBird`,
      user: req.user,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 실제 서버 운영 시 multer-s3나 multer-google-storage 같은 모듈을 사용하면 됨
module.exports = router;