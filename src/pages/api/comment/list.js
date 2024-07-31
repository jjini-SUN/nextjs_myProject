import { connectDB } from "@/util/db";


export default async function handler(req, res) {
    console.log(req.query);

    const db = (await connectDB).db('mydb')
    let result = await db.collection('comment').find({
        parent:ObjectId.createFromHexString(req.query.id) //이 조건을 아이디 가져옴
    }).toArray();
    res.status(200).json(result);
}