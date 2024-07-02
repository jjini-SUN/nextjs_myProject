import { connectDB } from "@/util/db";

export default async function ListPage() {
    const db = (await connectDB).db('mydb'); // 데이터베이스 이름
    let result = await db.collection('post').find().toArray();

    return(
        <div className="bg-1280px">
            <div className="list-bg">
                {
                    result && result.length > 0 ? result.map((item, index)=>{
                        return(
                            <div key={index} className="list-item">
                                <img src={item.image}/>
                                <div>
                                    <h4>{item.title}</h4>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        )
                    }) : null
                }
            </div>
        </div>
    )
}