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
