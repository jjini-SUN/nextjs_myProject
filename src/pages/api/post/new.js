// localhost:3000/api/post/new 로 요청하면 이 서버 파일 실행된다.

// import { Formidable } from 'formidable';
// import fs from 'fs';
// import path from 'path';
import { connectDB } from "@/util/db";

// export const config = {
//     api: {
//         bodyParser: false, // formidable를 사용하기 때문에 bodyParser를 비활성화합니다.
//     },
// };

export default async function writeHandler(req, res) {
    // POST요청은 body라는 곳에 데이터를 담아보냄 (req.body에 input으로 입력한 것들이 있음) 
    // console.log(req.body);   
    if(req.method == 'POST') {
        // body에 담긴 값들을 꺼내고 비어있지 않으면 mongoDB에 insertOne으로 입력

        let {title, content} = req.body;

        if(title && content) { // 비어있지 않으면
            try{
                const db = (await connectDB).db('mydb');
                let result = await db.collection('post').insertOne({title, content});
                return res.redirect(302, '/list'); //끝나면 /list 페이지로 이동
            }catch(error) { // error가 발생했을 경우, 이를 해결할 코드를 적음
                console.log('Database Error: ', error);
                return res.status(500).json({error: '서버기능 오류'});
            }
        }else {
                // 빈칸으로 입력해서 요청했을 때 (사용자 실수)
            return res.status(400).json({error: '빈칸은 허용되지 않습니다'});
        }
    }
    else {
        return res.status(405).json({error: 'Method Mot Allowed'});
        // POST요청 외에는 에러처리
    }
}


// export default async function writeHandler(req, res) {
//     // POST요청은 body라는 곳에 데이터를 담아보냄 (req.body에 input으로 입력한 것들이 있음) 
//     // console.log(req.body);   
//     if(req.method == 'POST') {
//         // body에 담긴 값들을 꺼내고 비어있지 않으면 mongoDB에 insertOne으로 입력

//         const form = new Formidable({
//             uploadDir: path.join(process.cwd(), 'public/uploads'), // 절대 경로 사용
//             keepExtensions: true, // 파일 확장자 유지
//         });

//         if (!fs.existsSync(form.uploadDir)) {
//             fs.mkdirSync(form.uploadDir, { recursive: true });
//         }

//         form.parse(req, async (err, fields, files) => {
//             if (err) {
//                 console.error('Form parse error:', err);
//                 return res.status(500).json({ error: '서버 기능 오류' });
//             }

//             const { title, content } = fields;
//             const image = files.image;

//             if(title && content && image) { // 비어있지 않으면
//                 try{
//                     const db = (await connectDB).db('mydb');
//                     const imagePath = path.basename(image.filepath || image.path); // 이미지 경로
//                     let result = await db.collection('post').insertOne({
//                         title,
//                         content,
//                         image: `/uploads/${imagePath}`
//                     });
//                     return res.redirect(302, '/list'); //끝나면 /list 페이지로 이동
//                 }catch(error) { // error가 발생했을 경우, 이를 해결할 코드를 적음
//                     console.log('Database Error: ', error);
//                     return res.status(500).json({error: '서버기능 오류'});
//                 }
//             }else {
//                 // 빈칸으로 입력해서 요청했을 때 (사용자 실수)
//                 return res.status(400).json({error: '빈칸은 허용되지 않습니다'});
//             }
//         });
//     }
//     else {
//         return res.status(405).json({error: 'Method Mot Allowed'});
//         // POST요청 외에는 에러처리
//     }
// }