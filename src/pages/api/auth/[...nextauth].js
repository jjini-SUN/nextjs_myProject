import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';
import { connectDB } from "@/util/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email:{label:"이메일", type:"text"},
                password:{label:"비밀번호", type:"password"},
            },

            // 로그인 시도 시 동작할 함수
            async authorize(credentials) {
                // 그냥 메뉴얼임
                // mongoDB에 접속해서 해당 이메일과 비밀번호가 있는지 찾고
                // 만약에 찾았으면 그 유저정보를 return
                let db = (await connectDB).db('mydb');
                let user = await db.collection('user').findOne({email: credentials.email});
                // findOne() : 조건에 맞는 것을 찾아서 object 형식으로 반환 / 못찾으면 null

                if(!user) {
                    console.log('일치하는 아이디가 없습니다')
                    return null;
                }

                const checkPassword = await bcrypt.compare(credentials.password, user.password)
                if(!checkPassword) {
                    console.log('비밀번호가 일치하지 않습니다')
                    return null; // 비밀번호 틀렸으니 유저정보 인증
                }

                return user; // 이메일도 찾았고 비밀번호도 맞으니깐 유저정보 줌
            }
        })
    ],
    callbacks: {
        // 로그인 방식에 따라서 다르게 처리 (웹 보안 로그인 인증방식 2가지)
        jwt: async({token, user})=>{
            // 토큰방식 로그인 (Json Web Token 압축정보 / 토큰방식)
            if(user) {
                token.user = {};
                token.user.nam = user.name;
                token.user.email = user.email;
            }
            return token; //name과 email을 반환
        },
        session: async({session, token})=>{
            // 세션방식 로그인 (서버에서 보관하는 사용자 정보 이용 / 아이디 비밀번호 형식)
            session.user = token.user;
            return session;
        },
    },
    // 로그인 유지 기간
    session: {
        strategy: 'jwt',
        maxAge: 2 * 24 * 60 * 60 //2일
    },
    secret: 'anything'
}

export default NextAuth(authOptions);