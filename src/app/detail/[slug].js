// src/pages/api/detail/[slug].js
// import { connectDB } from "@/util/db";
// import { ObjectId } from "mongodb";

// export default async function handler(req, res) {
//     const { slug } = req.query;

//     if (req.method === 'GET') {
//         try {
//             const db = (await connectDB).db('mydb');
//             let result = await db.collection('post').findOne({ _id: ObjectId.createFromHexString(slug) });
//             let list = await db.collection('post').find().toArray();
            
//             // ObjectId를 문자열로 변환
//             result._id = result._id.toString();
//             list = list.map(item => ({ ...item, _id: item._id.toString() }));

//             res.status(200).json({ result, list });
//         } catch (error) {
//             res.status(500).json({ error: 'DB 조회 중 오류가 발생했습니다.' });
//         }
//     } else {
//         res.status(405).json({ error: 'GET 요청만 허용됩니다.' });
//     }
// }
