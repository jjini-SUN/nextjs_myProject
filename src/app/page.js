import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "@/util/db";

export default async function Home() {
  const client = await connectDB; // 오래걸리는 작업은 건너뛰고 다음 코드 실행 (-> await으로 기다리게 변경)
  const db = client.db('mydb'); // 데이터베이스 이름
  let result = await db.collection('post').find().toArray(); //post에 적혀있는 거 다 가져옴
  console.log(result);

  return (
    <div>
      <p>{result[0]?.title}</p>
      <p>{result[0]?.content}</p>
      <p>{result[1]?.title}</p>
      <p>{result[1]?.content}</p>
    </div>
  );
}

// layout.js : page.js를 감싸고 있는 main 페이지
// app/page.js : Home 페이지
// global.css : layout.js에 연결된 css
// page.module.css : page.js에 연결된 css

// app 폴더의 경로가 'http://localhost:3000/'
// -> 'http://localhost:3000/list' 만들고 싶으면
// -> app 폴더에 list 폴더 만들고 그 아래 page.js 파일 만들기

//mongodb+srv://jjinpang203:<password>@cluster0.ie7wqey.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0