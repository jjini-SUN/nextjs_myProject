'use client'
// 'use client'가 적혀 있어야 onClick, useState 등 사용 가능
import Link from "next/link";
import { useState } from "react"
import './list.css';

export default function ListItem({data}) {
    const [listData, setListData] = useState(data);

    return(
        <>
            {
                listData && listData.length > 0 ? listData.map((item, index)=>{
                    return(
                        <div key={index} className="list-item">
                            <img src={item.image}/>
                            <Link href={'/detail/' + item._id}>
                                <h4>{item.title}</h4>
                                <p>{item.content}</p>
                            </Link>
                        </div>
                    )
                }) : null
            }
        </>
    )
}