import express from "express";
import userController from "../controllers/user.js";

const userRoute = express.Router()

userRoute.post('/api/login', userController.login) // 로그인
userRoute.post('/api/register', userController.register) // 회원가입
userRoute.get('/api/auth/check', userController.checkLoggedIn) // 로그인 여부 확인
userRoute.post('/api/auth/logout', userController.logout) // 로그아웃 로직

export default userRoute