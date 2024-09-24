/**
 * 몽고db 설치는 Node.js 교과서 367p '몽고디비 설치하기'를 따랐음.
 * 콤파스로 커넥션 생성할 때 URI는 'mongodb://lee:1234@localhost:27017/admin' 로 생성.
 * 콤파스 커넥션 생성 시 Athentication Method 에서 username/password 에 각각 db.createUser로 생성했던 계정정보 입력해 줌.
 * 커넥션 생성 후 서버 실행해도 'learnVue' DB는 자동으로 생성되지 않고, 실제 데이터를 넣으면 생성 됨.
 * 경로 끝에 admin 넣는 이유는 lee 계정이 admin 데이터베이스에서 생성된 계정이기 때문에, 연결 시 admin 데이터베이스에서 인증을 받아야 함.
 * admin을 지정해주지 않으면 기본적으로 test 데이터베이스로 연결되기 때문에 인증에 실패할 우려가 있음.
 */

import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGO_ID = process.env.MONGO_ID;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_URL = `mongodb://${MONGO_ID}:${MONGO_PASSWORD}@localhost:27017/admin`;

const connectDB = () => {
    mongoose.connect(MONGO_URL, {
        dbName: 'learnVue',
        useNewUrlParser: true,
    }, (error) => {
        if(error) {
            console.log('몽고디비 연결 에러', error);
        } else {
            console.log('몽고디비 연결 성공');
        }
    });

    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 가동 중 연결 에러', error);
    });
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    });
}

export default connectDB
