// api/post/edit으로 API 요청하면 동작할 서버함수
// 받아온 input 정보로 DB에 수정하고 list 페이지로 이동하기

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    console.log(req.body);
    
    if(req.method == 'POST') {
        let {id, title, content} = req.body;
        if(id && title && content) {
            try{
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').updateOne(
                    {_id:ObjectId.createFromHexString(id)},
                    {$set: {
                        title : title,
                        content: content
                    }}
                );
                return res.redirect(302, '/detail/' + id);
            }catch(error) {
                return res.status(500).json({error:error});
            }
        }else {
            return res.status(400).json({error: '필수 필드가 비어있습니다.'})
        }
    }
    else {
        return res.status(405).json({error: 'POST요청을 보내주세요'})
    }
}