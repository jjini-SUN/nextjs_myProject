// id를 받아와서 그 아이디로 DB에서 검색해서 보여줌
// 기존의 내용을 먼저 보여줌
// 수정하기 버튼을 누르면 수정하는 페이지로 POST요청

import { connectDB } from "@/util/db"
import { ObjectId } from "mongodb";
import './edit.css';

export default async function EditPage({params}) {
    // {params} : 동적 URL 값을 받아오기 위해
    // params.slug = edit 뒤에 입력한 URL
    // console.log('동적 URL: ', params)

    const db = (await connectDB).db('mydb');
    let result = await db.collection('post').findOne({_id:ObjectId.createFromHexString(params.slug)});

    return(
        <div className="bg-1280px">
            <div className="edit-bg">
                <form action='/api/post/edit' method="POST" className="input-container">
                    <input type="hidden" name="id" value={params.slug} />
                    <input name="title" defaultValue={result.title} className="input-title"/>
                    <textarea name="content" defaultValue={result.content} className="input-content"/>
                    <button type="submit">수정하기</button>
                </form>
            </div>
        </div>
    )
}