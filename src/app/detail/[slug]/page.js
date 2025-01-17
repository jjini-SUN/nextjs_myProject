
// localhost:3000/detail/1
// localhost:3000/detail/what
// localhost:3000/detail/anything
// -> 동적 라우트 사용? -> [아무거나] : 동적 route(URL)
// slug : 내가 이동한 URL의 값이 담기게 됨.

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";
import './detail.css';
import Link from "next/link";
import DetailItem from "../DetailItem";
import Comment from "@/app/components/comment/comment";

// 어떤 항목에 대해 열린 페이지인지 알아야 상세내용을 보여줌
// URL 마다 다른 내용이 보여야 하기 때문에 {params}로 매개변수를 받는다
export default async function Detail({params}) {
    // console.log('메롱: ', params); // params 자체가 slug: '_id'
    const db = (await connectDB).db('mydb');
    let result = await db.collection('post').findOne({_id:ObjectId.createFromHexString(params.slug)});
    //let list = await db.collection('post').find().toArray();

    // console.log(params); -> 
    // findOne: 하나만 가져옴
    return(
        <div className="bg-1280px">
            <div className="detail-item">
                <h2>{result.title + ' 고양이'}</h2>
                <p>{result.content}</p>
                <img src={result.image}/>
            </div>

            <div className="detail-write">
                <DetailItem slug={params.slug} result={result}/>
            </div>

            <br/>
            <Comment boardId={result?._id.toString()}/>
        </div>
    )
}


// community/page.js
// community/listItem.js
// detail/[slug]/page.js  ->  이 코드만 해결 못한 상태
// api/delete/delete.js