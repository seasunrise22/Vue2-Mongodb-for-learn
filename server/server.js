import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/router.js'
import userRouter from './routes/user.js'
import connectDB from './config/db.js';
import passport from 'passport'
import session from 'express-session'
import localStrategy from 'passport-local'
import UserModel from './models/auth/user.js'
import bcrypt from 'bcryptjs'

const app = express();
dotenv.config();

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // 봉인씰을 만들어내는 인장 같은 개념
  resave: false,
  saveUninitialized: false
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// passport local strategy: 로컬(데이터베이스나 파일 시스템 등)에서 사용자 인증을 처리할 때 사용(인증 미들웨어를 위한 일종의 설계도)
passport.use(new localStrategy({
  usernameField: 'id',
  passwordField: 'password'
}, async (id, password, done) => {
  try {
    const user = await UserModel.findOne({ id })
    if (!user) {
      return done(null, false, { message: 'Incorrect id.' })
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        throw err
      } else if (result === true) {
        return done(null, user) // done 함수가 호출되면 authenticate 함수 내부의 콜백 함수가 실행됨(err, user, info 인자를 받아 처리하는)
      } else {
        return done(null, false, { message: 'Incorrect password.' }) // 로그인 요청을 보낸 클라이언트에게 실패 메시지를 전달.
      }
    })
  } catch (err) {
    return done(err)
  }
}))

// passport serializeUser: 인증된 사용자를 식별하기 위해 세션에 저장할 정보를 선택, 로그인 성공시에만 호출됨.
passport.serializeUser(function (user, done) {
  done(null, user.id)
})

// passport deserializeUser: 세션에 저장된 정보를 기반으로 사용자 정보를 조회하고, req.user를 통해 사용 가능
passport.deserializeUser(async function (id, done) {
  try {
    const user = await UserModel.findOne({ id: id })
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// Routes
app.use("/", router);
app.use("/user", userRouter);

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise
app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`)
});  

