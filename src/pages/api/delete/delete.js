import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    // console.log(req.body);

    if(req.mtehod == 'DELETE') {
        try{
            let {id, email} = req.body;
            let session = await getServerSession(req, res, authOptions); // 현재 로그인 정보
            
            if(session?.user?.email === email) {
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').deleteOne({_id: ObjectId.createFromHexString(id)});
                res.status(200).json({msg:'삭제완료'});
            }else {
                res.status(400).json({error: '삭제는 글 작성자만 할 수 있습니다'})
            }
        }catch(error) {
            res.status(500).json({msg: '서버기능오류: ' + error});
        }
    }else {
        res.status(405).json({msg: 'DELETE 요청만 처리합니다'})
    }
}