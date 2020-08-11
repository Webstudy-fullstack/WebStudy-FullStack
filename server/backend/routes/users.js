var express = require('express');
var router = express.Router();
const User = require('../models/user')
const statusCode = require('../modules/statusCode')
const resMessage = require('../modules/responseMessage')
const util = require('../modules/util')
const Token = require('../modules/token')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  if(await Token.checktoken(req.cookies.user)){
    res.send("실패")
    return
  }
  res.send("성공")
  return
});

router.post('/registrations', async(req,res)=>{
  const {name, password, email } = req.body;
  if(!name || !password || !email){
    console.log("1")
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  //사용중인 아이디가 있는지 확인 코드
  if(await User.checkUser(email)){
    console.log("2")
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_EMAIL));
    return;
  }

  const salt = 'dfw23EFVR3fefnd68FW3r4343';
  const idx = await User.signup(name, password, salt, email);
  console.log(idx)
  if (idx === -1){
    console.log("3")
    return res.status(statusCode.DB_ERROR)
    .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
  }
  console.log("4")
  res.status(statusCode.CREATED)
  .send(util.success(statusCode.CREATED, resMessage.CREATED_USER, {userIdx : idx}));
})


router.post('/logged_in', async(req,res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    return;
  }

  if(await User.signin(email, password)){
    res.status(statusCode.BAD_REQUEST)
    .send(util.fail(statusCode.BAD_REQUEST,resMessage.MISS_MATCH_PW));
    return; //나중에 로그인페이지 이동 예정
  }

  var token = await Token.createToken(email);
  res.status(statusCode.OK)
  .cookie("user",token)
  .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS,{logged_in:token, user:email}));
})

module.exports = router;
