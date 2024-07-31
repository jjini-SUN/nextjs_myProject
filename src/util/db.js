import {MongoClient} from "mongodb";
const url = "mongodb+srv://jjinpang203:seojin0807@cluster0.ie7wqey.mongodb.net/";
// const options = {useNewUrlParser: true, useUnifiedTopology: true};
const options = {};
let connectDB;

if(process.env.NODE_ENV === 'development') { //개발환경일 때
    // npm run dev 일때
    if(!global._mongo) {
        global._mongo = new MongoClient(url, options).connect();
    }
    connectDB = global._mongo;
}
else { //배포환경이 아닐 때
    // npm run build 일때
    connectDB = new MongoClient(url, options).connect();
}

export {connectDB};

// 위에꺼 하나만 만들고 돌려씀.