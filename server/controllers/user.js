import passport from 'passport'
import UserSchema from '../models/auth/user.js'
import bcrypt from 'bcryptjs' // 비밀번호 hash값으로 저장시키기 위한 모듈

const userController = {
  // 회원가입 로직
  register: async (req, res) => {
    try {
      const { id, password } = req.body
      let user = await UserSchema.findOne({ id })
      if (user) {
        res.status(400).json({ msg: '아이디가 존재합니다.' })
        return
      }
      user = new UserSchema({
        id,
        password
      })
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)
      await user.save()
      res.send('User registerd')
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  },
  // 로그인 로직
  login: async (req, res, next) => {
    try {
      // 인증 미들웨어 생성
      const authenticate = passport.authenticate('local', (err, user, info) => {
        if (err) {
          return next(err)
        }
        if (!user) {
          return res.status(401).json({ message: info.message })
        }
        req.logIn(user, (err) => { // 로그인 시도
          if (err) {
            return next(err)
          }
          if (req.isAuthenticated()) { // 로그인 성공
            return res.status(200).json({ message: '로그인에 성공하였습니다.', user })
          } else {
            return res.status(400).json({ message: '로그인에 실패하였습니다.' })
          }
        })
      })

      authenticate(req, res, next)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server error')
    }
  },
  // 로그인 여부 확인 로직
  checkLoggedIn: async (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ message: '인증되었습니다.', user: req.user })
    } else {
      res.status(401).json()
    }
  },
  // 로그아웃 로직
  logout: async (req, res) => {
    await req.logout((err) => { // 세션해제
      if (err) {
        return next(err)
      }
    })
    res.status(200).json({ message: 'User LoggedOut' })
  }
}

export default userController