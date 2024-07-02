import { connectDB } from "@/util/db";
import Link from "next/link";
import './list.css';
import ListItem from "./listItem";

export default async function ListPage() {
    const db = (await connectDB).db('mydb'); // 데이터베이스 이름
    let result = await db.collection('post').find().toArray();

    result = result.map(item => ({
        ...item,    // 스프레드 문법으로, item 객체의 모든 속성을 복사하여 새 객체에 포함시킴
        _id : item._id.toString(),  //_id 필드를 ObjectId에서 문자열로 변환
    }))
    // 최종 결과 -> 모든 객체의 _id가 문자열로 변환된 새로운 배열이 result에 저장

    return(
        <div className="bg-1280px">
            <div className="list-bg">
                <ListItem data={result}/>
            </div>

            <Link href='/write' className="write-btn">게시하기</Link>
        </div>
    )
}