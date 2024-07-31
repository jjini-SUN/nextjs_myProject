import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/db";

export default async function handler(req, res) {
    if(req.method == 'POST') {
        console.log(req.body);
        // JSON 문자열은 해체해서 사용한다 (자바스크립트는 object 형태로 해체가 됨)
        
        let reqObject = JSON.parse(req.body); // JSON문자열 -> object자료형 (parse=분석하다)
        let session = await getServerSession(req, res, authOptions)

        // 댓글을 DB에 저장
        // 1. 댓글내용  2. 게시글 ID  3. 사용자의 이메일
        if(session !== null) {
            let insertItem = {
                content: reqObject.comment,
                parent: ObjectId.createFromHexString(reqObject.boardId),
                email: session.user?.email
            }

            try {
                const db = (await connectDB).db('mydb')
                let result = await db.collection('comment').insertOne(insertItem);
                console.log('댓글입력완료')
                res.status(200).json(insertItem)
            }catch(error) {
                console.log('댓글입력실패 : ', error);
                res.status(500).json({error:error})
            }
        }else {
            res.status(400).json({error: '로그인이 필요합니다.'})
        }
    }
}